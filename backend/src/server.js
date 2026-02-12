const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");


dotenv.config();

const app = express();

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);



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
