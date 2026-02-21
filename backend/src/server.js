const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const resumeRoutes = require("./routes/resume.routes");
const interviewRoutes = require("./routes/interview.routes");
const studyPlanRoutes = require("./routes/studyplan.routes");
const errorHandler = require("./middleware/error.middleware");
const { apiLimiter } = require("./middleware/rateLimit.middleware");


const app = express();

connectDB();

// 🔐 SECURITY & GLOBAL SETTINGS
app.set("trust proxy", 1);
app.use(helmet());
app.disable("x-powered-by");

// cors (production - ready format)
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));


//  Body Parser (limit to prevent abuse)
app.use(express.json({ limit: "10kb" }));

//logging 
//app.use(morgan("dev"));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// 🔒 Apply global rate limiter BEFORE routes
app.use("/api", apiLimiter);

//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/study-plan", studyPlanRoutes);




// Health route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀"
  });
});


// Global error handler MUST be last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
