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

// Get all replies
router.get('/', async (req, res) => {
  try {
    const replies = await Reply.find()
      .populate('creator', '-password')
      .sort({ createdAt: -1 });
    res.status(200).json(replies);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a reply
router.put('/:id', verifyTokenAuth, async (req, res) => {
  try {
    const updatedReply = await Reply.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    if (!updatedReply) {
      return res.status(404).json({ message: 'Reply not found' });
    }
    res.status(200).json(updatedReply);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a reply
router.delete('/:id', verifyTokenAuth, async (req, res) => {
  try {
    const deletedReply = await Reply.findByIdAndDelete(req.params.id);
    if (!deletedReply) {
      return res.status(404).json({ message: 'Reply not found' });
    }
    res.status(200).json({ message: 'Reply has been deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
