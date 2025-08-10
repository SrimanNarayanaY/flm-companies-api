import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes placeholder
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
