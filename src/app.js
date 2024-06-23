import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Add allowed origins
app.use(cors({ origin: process.env.CORS_ORIGIN }));
// Allow our application to use json
app.use(express.json({ limit: "16kb" }));
// For nested level objects
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// Public Assests folder
app.use(express.static("public"));

// routes import
import userRouter from "./routes/user.routes.js";

// Routes Declaration
app.use("/api/v1/auth", userRouter);

export default app;
