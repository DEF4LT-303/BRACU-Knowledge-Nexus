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

// Get all Feedback posts
router.get('/',verifyTokenAdmin, async (req, res) => {
    try {
      const feedbackPosts = await Feedback.find()
        .populate('creator', '-password')
        .sort({ createdAt: -1 });
      res.status(200).json(feedbackPosts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Delete
router.delete('/:id', verifyTokenAdmin, async (req, res) => {
    try {
      await Feedback.findByIdAndDelete(req.params.id);
      res.status(200).json('Feedback has been deleted...');
    } catch (err) {
      res.status(500).json(err);
    }
  });
  