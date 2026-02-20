const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    resumeText: String,
    score: Number,
    improvementPoints: [String],
    missingSkills: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
