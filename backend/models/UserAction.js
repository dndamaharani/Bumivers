const mongoose = require('mongoose');

const userActionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  label: { 
    type: String, 
    required: true 
  },
  points: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('UserAction', userActionSchema);