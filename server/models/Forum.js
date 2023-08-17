const mongoose = require('mongoose');
const validator = require('validator');

const forumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A post must have a title'],
    trim: true
  },

  description: {
    type: String,
    required: [true, 'A post must have a description'],
    trim: true
  },

  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A post must have a creator']
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

  media: {
    type: String,
    required: [false, 'A file is must required to create a post!'],
    trim: true
  },

  tags: {
    type: Array,
    default: []
  },

  upVotes: {
    type: Array,
    default: []
  },

  replies: {
    type: mongoose.Schema.ObjectId,
    ref: 'Reply'
  }
});

const Forum = mongoose.model('Forum', forumSchema);
module.exports = Forum;
