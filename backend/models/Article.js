const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const articleSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  summary: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  likes: { 
    type: Number, 
    default: 0 
  },
  dislikes: { 
    type: Number, 
    default: 0 
  },
  comments: [commentSchema],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Article', articleSchema);
