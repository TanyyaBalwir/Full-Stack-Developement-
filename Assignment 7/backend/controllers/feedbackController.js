const Feedback = require("../models/Feedback");

const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch feedback right now." });
  }
};

const createFeedback = async (req, res) => {
  try {
    const { studentName, studentEmail, courseName, teacherName, semester, rating, review } =
      req.body;

    if (!studentName || !studentEmail || !courseName || !teacherName || !semester || !rating || !review) {
      return res.status(400).json({ message: "Please fill all fields before submitting." });
    }

    const feedback = await Feedback.create({
      studentName,
      studentEmail,
      courseName,
      teacherName,
      semester,
      rating,
      review,
    });

    res.status(201).json({
      message: "Feedback submitted successfully.",
      feedback,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to save feedback right now." });
  }
};

const getFeedbackSummary = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    const totalReviews = feedbacks.length;
    const averageRating =
      totalReviews === 0
        ? 0
        : (
            feedbacks.reduce((total, item) => total + item.rating, 0) / totalReviews
          ).toFixed(1);

    const ratingsBreakdown = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    feedbacks.forEach((item) => {
      ratingsBreakdown[item.rating] += 1;
    });

    res.status(200).json({
      totalReviews,
      averageRating: Number(averageRating),
      ratingsBreakdown,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to load summary right now." });
  }
};

module.exports = {
  getAllFeedback,
  createFeedback,
  getFeedbackSummary,
};
