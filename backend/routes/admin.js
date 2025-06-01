const express = require('express');
const User = require('../models/User');
const Article = require('../models/Article');
const Education = require('../models/Education');
const Category = require('../models/Category');
const Commitment = require('../models/Commitment');
const UserAction = require('../models/UserAction');
const authenticateToken = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

// Apply auth middleware to all admin routes
router.use(authenticateToken);
router.use(isAdmin);

// Dashboard Stats
router.get('/dashboard', async (req, res) => {
  try {
    const [
      userCount,
      articleCount,
      educationCount,
      actionCount,
      totalPoints,
      recentUsers,
      recentActions
    ] = await Promise.all([
      User.countDocuments(),
      Article.countDocuments(),
      Education.countDocuments(),
      UserAction.countDocuments(),
      User.aggregate([{ $group: { _id: null, total: { $sum: '$totalPoints' } } }]),
      User.find().sort({ createdAt: -1 }).limit(5).select('username email createdAt totalPoints'),
      UserAction.find().sort({ createdAt: -1 }).limit(10).populate('user', 'username')
    ]);

    res.json({
      statistics: {
        users: userCount,
        articles: articleCount,
        educationTopics: educationCount,
        userActions: actionCount,
        totalPoints: totalPoints[0]?.total || 0
      },
      recentUsers,
      recentActions
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
});

// User Management
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;
    
    let query = {};
    if (search) {
      query = {
        $or: [
          { username: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(query)
    ]);
    
    res.json({
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        hasNext: skip + users.length < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Update user role
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Also delete user's actions
    await UserAction.deleteMany({ user: req.params.id });
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// Article Management
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .select('title category likes dislikes createdAt comments');
      
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
});

// Delete article
router.delete('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error: error.message });
  }
});

// User Actions Management
router.get('/user-actions', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    
    const [actions, total] = await Promise.all([
      UserAction.find()
        .populate('user', 'username email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      UserAction.countDocuments()
    ]);
    
    res.json({
      actions,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalActions: total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user actions', error: error.message });
  }
});

// Analytics
router.get('/analytics', async (req, res) => {
  try {
    // User registration trend (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const [
      userTrend,
      categoryStats,
      topUsers,
      actionTrend
    ] = await Promise.all([
      User.aggregate([
        {
          $match: { createdAt: { $gte: thirtyDaysAgo } }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      UserAction.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
            totalPoints: { $sum: '$points' }
          }
        },
        { $sort: { count: -1 } }
      ]),
      User.find()
        .sort({ totalPoints: -1 })
        .limit(10)
        .select('username totalPoints'),
      UserAction.aggregate([
        {
          $match: { createdAt: { $gte: thirtyDaysAgo } }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
            totalPoints: { $sum: '$points' }
          }
        },
        { $sort: { _id: 1 } }
      ])
    ]);
    
    res.json({
      userRegistrationTrend: userTrend,
      categoryStatistics: categoryStats,
      topUsers,
      actionTrend
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});

module.exports = router;