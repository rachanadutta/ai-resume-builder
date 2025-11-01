import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js"
import cors from "cors";
import ai from "./routes/ai.js"
dotenv.config();
const app = express();

// middleware to parse JSON
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://rachanadutta.github.io",
      "http://localhost:5173", // for local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight manually (some servers need this)
app.options("*", cors());


// connect to MongoDB
connectDB();

// routes
app.use("/auth", authRoutes);
app.use("/resume", resumeRoutes);
app.use("/api/ai", ai);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
