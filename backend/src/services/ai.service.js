const axios = require("axios");

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

const callGemini = async (prompt) => {
  const response = await axios.post(
    GEMINI_URL,
    {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.candidates[0].content.parts[0].text;
};

// =======================
// Resume Analysis
// =======================
exports.analyzeResume = async (resumeText) => {

  const prompt = `
You are a professional placement mentor.

Analyze the following resume:

${resumeText}

Return response strictly in this JSON format:

{
  "score": number (out of 10),
  "improvementPoints": ["point1", "point2", "point3", "point4", "point5"],
  "missingSkills": ["skill1", "skill2", "skill3"]
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

// =======================
// Generate Interview Question
// =======================
exports.generateQuestion = async (topic) => {

  const prompt = `
You are a technical interviewer.

Generate ONE interview question about ${topic}.
Only return the question text.
`;

  const text = await callGemini(prompt);

  return text.trim();
};

// =======================
// Evaluate Interview Answer
// =======================
exports.evaluateAnswer = async (question, answer) => {

  const prompt = `
You are a senior technical interviewer.

Question:
${question}

Candidate Answer:
${answer}

Give short feedback (5-6 lines).
Mention strengths and improvements.
`;

  const text = await callGemini(prompt);

  return text.trim();
};
