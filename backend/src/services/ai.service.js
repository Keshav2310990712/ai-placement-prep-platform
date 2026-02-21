const { GoogleGenerativeAI } = require("@google/generative-ai");
const AppError = require("../utils/AppError");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

// Common function
const callGemini = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
  console.error("Gemini SDK FULL Error:", JSON.stringify(error, null, 2));
  throw error;   // temporarily throw raw error
}
};

// ================= Resume =================
exports.analyzeResume = async (resumeText) => {
  const prompt = `
You are a professional placement mentor.

Analyze the following resume:

${resumeText}

Return response strictly in JSON format:
{
  "score": number,
  "improvementPoints": [],
  "missingSkills": []
}
`;

  let text = await callGemini(prompt);

  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}") + 1;

  if (jsonStart !== -1 && jsonEnd !== -1) {
    text = text.substring(jsonStart, jsonEnd);
  }

  return text;
};

// ================= Question =================
exports.generateQuestion = async (topic) => {
  const prompt = `
You are a technical interviewer.
Generate ONE interview question about ${topic}.
Only return the question text.
`;

  return (await callGemini(prompt)).trim();
};

// ================= Evaluate =================
exports.evaluateAnswer = async (question, answer) => {
  const prompt = `
You are a senior technical interviewer.

Question:
${question}

Answer:
${answer}

Give short feedback (5-6 lines).
`;

  return (await callGemini(prompt)).trim();
};

// ================= Study Plan =================
exports.generateStudyPlan = async (targetRole, weakTopic) => {
  const prompt = `
Create a structured 7-day study plan.

Target Role: ${targetRole}
Weak Topic: ${weakTopic}

Return clean readable format.
`;

  return (await callGemini(prompt)).trim();
};