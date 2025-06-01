const express = require('express');
const Article = require('../models/Article');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// GET all articles
router.get('/', async (req, res) => {
  try {
    const { category, limit } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    const articles = await Article.find(query)
      .limit(limit ? parseInt(limit) : 0)
      .sort({ createdAt: -1 })
      .populate('comments.author', 'username');
      
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
});

// GET single article
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('comments.author', 'username');
      
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error: error.message });
  }
});

// POST new article (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    const article = new Article(req.body);
    await article.save();
    
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error creating article', error: error.message });
  }
});

// PUT like article
router.put('/:id/like', authenticateToken, async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error liking article', error: error.message });
  }
});

// PUT dislike article
router.put('/:id/dislike', authenticateToken, async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $inc: { dislikes: 1 } },
      { new: true }
    );
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error disliking article', error: error.message });
  }
});

// POST comment on article
router.post('/:id/comments', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;
    
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    article.comments.push({
      author: req.user.id,
      content
    });
    
    await article.save();
    await article.populate('comments.author', 'username');
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
});

module.exports = router;