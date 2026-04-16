const express = require("express");
const {
  getAllFeedback,
  createFeedback,
  getFeedbackSummary,
} = require("../controllers/feedbackController");

const router = express.Router();

router.get("/", getAllFeedback);
router.post("/", createFeedback);
router.get("/summary", getFeedbackSummary);

module.exports = router;
