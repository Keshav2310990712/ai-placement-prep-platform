const Interview = require("../models/Interview");
const { generateQuestion, evaluateAnswer } = require("../services/ai.service");

// Generate Question
exports.getQuestion = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const question = await generateQuestion(topic);

    res.status(200).json({
      success: true,
      question
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit Answer
exports.submitAnswer = async (req, res) => {
  try {
    const { topic, question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer required" });
    }

    const feedback = await evaluateAnswer(question, answer);

    const interview = await Interview.create({
      user: req.user._id,
      topic,
      question,
      answer,
      feedback
    });

    res.status(200).json({
      success: true,
      feedback
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};