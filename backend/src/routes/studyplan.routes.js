const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const { aiLimiter } = require("../middleware/rateLimit.middleware");
const { createPlan } = require("../controllers/studyplan.controller");

router.post("/generate", protect, aiLimiter, createPlan);

module.exports = router;