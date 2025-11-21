import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();
const port = process.env.PORT || 5000;

// Allowed frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "https://virtualassistant-ai.netlify.app"
];

// Main CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Additional headers (Express 5 compatible)
app.use((req, res, next) => {
  if (allowedOrigins.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Start server
app.listen(port, () => {
  connectDb();
  console.log("Server started on port", port);
});
