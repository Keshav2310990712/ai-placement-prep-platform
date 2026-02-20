const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const { createPlan } = require("../controllers/studyplan.controller");

router.post("/generate", protect, createPlan);

module.exports = router;