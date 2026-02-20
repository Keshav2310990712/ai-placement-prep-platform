const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const { aiLimiter } = require("../middleware/rateLimit.middleware");
const { getQuestion, submitAnswer } = require("../controllers/interview.controller");

router.post("/question", protect, aiLimiter, getQuestion);
router.post("/answer", protect, aiLimiter, submitAnswer);

module.exports = router;