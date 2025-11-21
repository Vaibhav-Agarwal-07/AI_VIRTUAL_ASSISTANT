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

// ✅ FIXED CORS CONFIG
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://virtualassistant-ai.netlify.app"   // <-- your real Netlify URL
    ],
    credentials: true,
  })
);

// ✅ Allow preflight requests
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Connect DB + Start Server
app.listen(port, () => {
  connectDb();
  console.log("Server started on port", port);
});
