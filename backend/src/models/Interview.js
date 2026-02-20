const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    topic: String,
    question: String,
    answer: String,
    feedback: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);