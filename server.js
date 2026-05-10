require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const tutorialRoutes = require('./routes/tutorialRoutes');
const challengeRoutes = require('./routes/challengeRoutes');
const problemRoutes = require('./routes/problemRoutes');
const supportRoutes = require('./routes/supportRoutes');

const app = express();

console.log('Starting CodeQuest Backend Server...');

// Connect Database
connectDB();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:8080",
    "https://quest-code-unlocked.vercel.app/"
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'CodeQuest Backend Running' });
});

// Routes
console.log('Mounting user routes at /api/users');
app.use('/api/users', userRoutes);

console.log('Mounting tutorial routes at /api/tutorials');
app.use('/api/tutorials', tutorialRoutes);

console.log('Mounting challenge routes at /api/challenges');
app.use('/api/challenges', challengeRoutes);

console.log('Mounting problem routes at /api/problems');
app.use('/api/problems', problemRoutes);

console.log('Mounting support routes at /api/support');
app.use('/api/support', supportRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running successfully on port ${PORT}`);
  console.log(`🌐 Server available at http://localhost:${PORT}`);
});