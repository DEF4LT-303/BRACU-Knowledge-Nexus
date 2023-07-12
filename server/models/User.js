const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'user must have a name']
  },

  displayName: {
    type: String,
    default: ''
  },

  about: {
    type: String,
    default: ''
  },

  gender: {
    type: String,
    default: 'male'
  },

  githubLink: {
    type: 'String',
    default: ''
  },

  linkedInLink: {
    type: String,
    default: ''
  },

  technicalSkills: {
    type: Array,
    default: []
  },

  email: {
    type: String,
    required: [true, 'User must provide an email'],
    unique: true,
    lowercase: true,
    validate: {
      validator: async function (email) {
        const user = await this.constructor.findOne({ email });
        return !user; // Return true if user is not found (i.e., email is not taken)
      },
      message: 'Email address is already taken'
    }
  },

  photo: {
    type: String,
    default: ''
  },

  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8
  },

  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
    default: 'student'
  },

  // isAdmin: {
  //   type: Boolean,
  //   default: false
  // },

  posts: {
    type: mongoose.Schema.ObjectId,
    ref: 'Forum'
  },

  favourites: {
    type: Array,
    default: []
  },

  materialCount: {
    type: Number,
    default: 0
  },

  doubtsCount: {
    type: Number,
    default: 0
  },

  repliesCount: {
    type: Number,
    default: 0
  },

  reputation: {
    type: Number,
    default: 0.0
  }
});

module.exports = mongoose.model('User', userSchema);
