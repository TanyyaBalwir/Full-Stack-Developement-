import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/feedbacks";

const emptyForm = {
  studentName: "",
  studentEmail: "",
  courseName: "",
  teacherName: "",
  semester: "",
  rating: "5",
  review: "",
};

function App() {
  const [formData, setFormData] = useState(emptyForm);
  const [feedbacks, setFeedbacks] = useState([]);
  const [summary, setSummary] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratingsBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const [feedbackResponse, summaryResponse] = await Promise.all([
        axios.get(API_URL),
        axios.get(`${API_URL}/summary`),
      ]);

      setFeedbacks(feedbackResponse.data);
      setSummary(summaryResponse.data);
      setError("");
    } catch (fetchError) {
      setError("Unable to connect to the backend. Please check your server and MongoDB.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");
      setError("");

      await axios.post(API_URL, {
        ...formData,
        rating: Number(formData.rating),
      });

      setMessage("Feedback submitted successfully.");
      setFormData(emptyForm);
      fetchFeedbacks();
    } catch (submitError) {
      setError(
        submitError.response?.data?.message || "Something went wrong while submitting feedback."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="tag">Assignment 7</p>
          <h1>Student Feedback Review System</h1>
          <p className="hero-text">
            A simple platform where students can share course and teacher feedback in one place.
          </p>
        </div>
        <div className="hero-card">
          <h3>Quick Overview</h3>
          <p>
            Total Reviews: <strong>{summary.totalReviews}</strong>
          </p>
          <p>
            Average Rating: <strong>{summary.averageRating}/5</strong>
          </p>
        </div>
      </header>

      <main className="layout">
        <section className="panel form-panel">
          <h2>Submit Feedback</h2>
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="grid">
              <input
                type="text"
                name="studentName"
                placeholder="Student Name"
                value={formData.studentName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="studentEmail"
                placeholder="Student Email"
                value={formData.studentEmail}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="courseName"
                placeholder="Course Name"
                value={formData.courseName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="teacherName"
                placeholder="Teacher Name"
                value={formData.teacherName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="semester"
                placeholder="Semester"
                value={formData.semester}
                onChange={handleChange}
                required
              />
              <select name="rating" value={formData.rating} onChange={handleChange}>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Needs Improvement</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>

            <textarea
              name="review"
              rows="5"
              placeholder="Write your feedback here..."
              value={formData.review}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>

          {message && <p className="success-text">{message}</p>}
          {error && <p className="error-text">{error}</p>}
        </section>

        <section className="panel">
          <h2>Review Summary</h2>
          <div className="stats">
            {Object.entries(summary.ratingsBreakdown)
              .sort((first, second) => Number(second[0]) - Number(first[0]))
              .map(([rating, total]) => (
                <div className="stat-card" key={rating}>
                  <span>{rating} Star</span>
                  <strong>{total}</strong>
                </div>
              ))}
          </div>
        </section>

        <section className="panel">
          <div className="section-head">
            <h2>Recent Feedback</h2>
            <button type="button" className="refresh-btn" onClick={fetchFeedbacks}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="info-text">Loading feedback...</p>
          ) : feedbacks.length === 0 ? (
            <p className="info-text">No feedback yet. Be the first one to submit.</p>
          ) : (
            <div className="feedback-list">
              {feedbacks.map((item) => (
                <article className="feedback-card" key={item._id}>
                  <div className="feedback-top">
                    <div>
                      <h3>{item.courseName}</h3>
                      <p>
                        {item.teacherName} | {item.semester}
                      </p>
                    </div>
                    <span className="rating-badge">{item.rating}/5</span>
                  </div>
                  <p className="review-text">{item.review}</p>
                  <div className="feedback-bottom">
                    <span>By {item.studentName}</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
