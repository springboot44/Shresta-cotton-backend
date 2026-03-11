import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/AuthRoutes.js";
import UserRoutes from "./src/routes/UserRoutes.js";
import CottonRoutes from "./src/routes/CottonRoutes.js";
import verifyToken from "./src/middleware/AuthMiddleWare.js";

dotenv.config();

const app = express();

// connect DB
connectDB();

// CORS FIRST
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.options("*", cors());   // handle preflight

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("This is a test route");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", verifyToken, UserRoutes);
app.use("/api/cotton", CottonRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});