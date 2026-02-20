const rateLimit = require("express-rate-limit");

// General API limiter
exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window per IP
  message: {
    status: "fail",
    message: "Too many requests. Please try again later."
  }
});

// Strict limiter for AI routes
exports.aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // 20 AI calls per 15 minutes
  message: {
    status: "fail",
    message: "AI request limit exceeded. Please try later."
  }
});