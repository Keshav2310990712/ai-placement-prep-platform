const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const { getQuestion, submitAnswer } = require("../controllers/interview.controller");

router.post("/question", protect, getQuestion);
router.post("/answer", protect, submitAnswer);

module.exports = router;