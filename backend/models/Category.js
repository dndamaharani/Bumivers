const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  icon: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  funFact: { 
    type: String, 
    required: true 
  },
  tips: { 
    type: String, 
    required: true 
  },
  quote: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Category', categorySchema);