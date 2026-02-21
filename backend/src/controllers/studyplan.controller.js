const StudyPlan = require("../models/StudyPlan");
const { generateStudyPlan } = require("../services/ai.service");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

exports.createPlan = asyncHandler(async (req, res, next) => {
    throw new Error("Testing error middleware");
  const { targetRole, weakTopic } = req.body;

  if (!targetRole || !weakTopic) {
    return next(new AppError("All fields required", 400));
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

});