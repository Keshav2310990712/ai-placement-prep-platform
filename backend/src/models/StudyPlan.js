const mongoose = require("mongoose");

const studyPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    targetRole: String,
    weakTopic: String,
    planText: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudyPlan", studyPlanSchema);