const Reply = require('../models/Reply');
const { verify, verifyTokenAuth, verifyTokenAdmin } = require('./verifyToken');

const router = require('express').Router();

// Create a new reply 
router.post('/', verifyTokenAuth, async (req, res) => {
  const newReply = new Reply(req.body);

  try {
    const savedReply = await newReply.save();
    res.status(201).json(savedReply);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all reply
router.get('/', async (req, res) => {
  try {
    const reply = await Reply.find()
      .populate('creator', '-password')
      .sort({ createdAt: -1 });
    res.status(200).json(reply);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single forum post by ID
router.get('/find/:id', async (req, res) => {
  try {
    const forumPost = await Forum.findById(req.params.id).populate(
      'creator',
      '-passowrd'
    );
    if (!forumPost) {
      return res.status(404).json({ message: 'Forum post not found' });
    }
    res.status(200).json(forumPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a forum post
router.put('/:id', verifyTokenAuth, async (req, res) => {
  try {
    const updatedForumPost = await Forum.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    if (!updatedForumPost) {
      return res.status(404).json({ message: 'Forum post not found' });
    }
    res.status(200).json(updatedForumPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a forum post
router.delete('/:id', verifyTokenAuth, async (req, res) => {
  try {
    const deletedForumPost = await Forum.findByIdAndDelete(req.params.id);
    if (!deletedForumPost) {
      return res.status(404).json({ message: 'Forum post not found' });
    }
    res.status(200).json({ message: 'Forum post has been deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
