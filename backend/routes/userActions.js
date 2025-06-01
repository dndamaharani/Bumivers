const express = require('express');
const UserAction = require('../models/UserAction');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// GET user's actions history
router.get('/', authenticateToken, async (req, res) => {
  try {
    const actions = await UserAction.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('user', 'username');
      
    res.json(actions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user actions', error: error.message });
  }
});

// POST new user action
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { label, points, category } = req.body;
    
    // Create user action
    const action = new UserAction({
      user: req.user.id,
      label,
      points,
      category
    });
    await action.save();
    
    // Update user total points
    await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { totalPoints: points } }
    );
    
    res.status(201).json(action);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user action', error: error.message });
  }
});

// GET leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find()
      .select('username totalPoints')
      .sort({ totalPoints: -1 })
      .limit(10);
      
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
});

module.exports = router;