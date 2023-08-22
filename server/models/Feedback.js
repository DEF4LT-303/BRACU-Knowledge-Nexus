const mongoose = require('mongoose');
const validator = require('validator');

const feedbackSchema = new mongoose.Schema({

  description: {
    type: String,
    required: [true, 'A Feedback must have a description'],
    trim: true
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;