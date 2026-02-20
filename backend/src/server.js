const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const resumeRoutes = require("./routes/resume.routes");
const interviewRoutes = require("./routes/interview.routes");

const app = express();

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);


// Health route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
