import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4060;

// Basic middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/auth", authRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server running",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
