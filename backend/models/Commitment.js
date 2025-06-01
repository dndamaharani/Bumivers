const mongoose = require('mongoose');

const commitmentSchema = new mongoose.Schema({
  label: { 
    type: String, 
    required: true 
  },
  points: { 
    type: Number, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Commitment', commitmentSchema);