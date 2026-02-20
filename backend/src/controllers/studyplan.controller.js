const StudyPlan = require("../models/StudyPlan");
const { generateStudyPlan } = require("../services/ai.service");

exports.createPlan = async (req, res) => {
  try {
    const { targetRole, weakTopic } = req.body;

    if (!targetRole || !weakTopic) {
      return res.status(400).json({ message: "All fields required" });
    }

    const planText = await generateStudyPlan(targetRole, weakTopic);

    const plan = await StudyPlan.create({
      user: req.user._id,
      targetRole,
      weakTopic,
      planText
    });

    res.status(200).json({
      success: true,
      plan
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};