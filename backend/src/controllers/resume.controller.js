const Resume = require("../models/Resume");
const { analyzeResume } = require("../services/ai.service");

exports.analyze = async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({ message: "Resume text is required" });
    }

    const aiResponse = await analyzeResume(resumeText);

    const parsed = JSON.parse(aiResponse);

    const resume = await Resume.create({
      user: req.user._id,
      resumeText,
      score: parsed.score,
      improvementPoints: parsed.improvementPoints,
      missingSkills: parsed.missingSkills
    });

    res.status(200).json({
      success: true,
      data: resume
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
