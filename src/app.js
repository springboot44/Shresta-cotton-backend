import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/AuthRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import cors from 'cors';
import CottonRoutes from './routes/CottonRoutes.js';
dotenv.config();

import verifyToken from './middleware/AuthMiddleWare.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse incoming JSON
app.use(cors()); // Enable CORS

// Routes
app.get('/', (req, res) => {
  res.send('This is a test route');
});

app.use('/api/auth', authRoutes); // Auth routes

app.use('/api/users', verifyToken, UserRoutes); // User routes

app.use('/api/cotton', CottonRoutes); // Cotton routes
// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
