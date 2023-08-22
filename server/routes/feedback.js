const Feedback = require('../models/Feedback');
const User = require('../models/User');
const { verify, verifyTokenAuth, verifyTokenAdmin } = require('./verifyToken');

const router = require('express').Router();

// Create a new Feedback post
router.post('/', verifyTokenAuth, async (req, res) => {
  try {
    const newFeedbackPost = new Feedback(req.body);
    const savedFeedbackPost = await newFeedbackPost.save();

    res.status(201).json(savedFeedbackPost);
  } catch (err) {
    res.status(500).json(err);
  }
});