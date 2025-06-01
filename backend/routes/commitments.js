const express = require('express');
const Commitment = require('../models/Commitment');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// GET all commitments
router.get('/', async (req, res) => {
  try {
    const commitments = await Commitment.find().sort({ points: -1 });
    res.json(commitments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching commitments', error: error.message });
  }
});

// POST new commitment (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    const commitment = new Commitment(req.body);
    await commitment.save();
    
    res.status(201).json(commitment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating commitment', error: error.message });
  }
});

module.exports = router;
