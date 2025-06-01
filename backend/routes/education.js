const express = require('express');
const Education = require('../models/Education');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// GET all education topics
router.get('/', async (req, res) => {
  try {
    const educationTopics = await Education.find().sort({ createdAt: -1 });
    res.json(educationTopics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching education topics', error: error.message });
  }
});

// GET single education topic
router.get('/:id', async (req, res) => {
  try {
    const topic = await Education.findById(req.params.id);
    
    if (!topic) {
      return res.status(404).json({ message: 'Education topic not found' });
    }
    
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching education topic', error: error.message });
  }
});

// POST new education topic (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    const topic = new Education(req.body);
    await topic.save();
    
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ message: 'Error creating education topic', error: error.message });
  }
});

module.exports = router;