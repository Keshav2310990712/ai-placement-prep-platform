const axios = require("axios");

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

  const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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

  let text = response.data.candidates[0].content.parts[0].text;

  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}") + 1;

  if (jsonStart !== -1 && jsonEnd !== -1) {
    text = text.substring(jsonStart, jsonEnd);
  }

  return text;
};

//console.log("Calling Gemini with key:", process.env.GEMINI_API_KEY);
