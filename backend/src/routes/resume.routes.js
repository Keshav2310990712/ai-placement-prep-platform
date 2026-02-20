const express = require("express");
const router = express.Router();
const { analyze } = require("../controllers/resume.controller");
const { protect } = require("../middleware/auth.middleware");
const { aiLimiter } = require("../middleware/rateLimit.middleware");

router.post("/analyze", protect, analyze, aiLimiter);

module.exports = router;
