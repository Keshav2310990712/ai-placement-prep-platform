const express = require("express");
const router = express.Router();
const { analyze } = require("../controllers/resume.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/analyze", protect, analyze);

module.exports = router;
