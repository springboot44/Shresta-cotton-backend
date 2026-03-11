import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
// import connectDB from './src/config/db.js';
// import authRoutes from '/routes/AuthRoutes.js';
// import UserRoutes from '/routes/UserRoutes.js';
// import cors from 'cors';
// import CottonRoutes from '/routes/CottonRoutes.js';

import connectDB from './src/config/db.js';
import authRoutes from './src/routes/AuthRoutes.js';
import UserRoutes from './src/routes/UserRoutes.js';
import cors from 'cors';
import CottonRoutes from './src/routes/CottonRoutes.js';



import verifyToken from './src/middleware/AuthMiddleWare.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse incoming JSON
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

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
