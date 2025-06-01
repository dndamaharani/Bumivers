// backend/server.js (FIXED - Safe 404 Handler)
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (enable when ready)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/education', require('./routes/education'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/commitments', require('./routes/commitments'));
app.use('/api/user-actions', require('./routes/userActions'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'BUMIVERSE server is running! 🌍',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/stats', async (req, res) => {
  try {
    const User = require('./models/User');
    const Article = require('./models/Article');
    const Education = require('./models/Education');
    const UserAction = require('./models/UserAction');
    
    const [userCount, articleCount, educationCount, actionCount] = await Promise.all([
      User.countDocuments(),
      Article.countDocuments(),
      Education.countDocuments(),
      UserAction.countDocuments()
    ]);
    
    res.json({
      users: userCount,
      articles: articleCount,
      educationTopics: educationCount,
      userActions: actionCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

// Default route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to BUMIVERSE API! 🌱', 
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      admin: '/api/admin',
      articles: '/api/articles',
      education: '/api/education',
      categories: '/api/categories',
      commitments: '/api/commitments',
      userActions: '/api/user-actions',
      health: '/api/health',
      stats: '/api/stats'
    }
  });
});

// FIXED: Safe 404 handler (no wildcard!)
app.use((req, res) => {
  res.status(404).json({ 
    message: 'API endpoint not found', 
    path: req.originalUrl 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 BUMIVERSE Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;