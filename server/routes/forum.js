const Forum = require('../models/Forum');
const User = require('../models/User');
const { verify, verifyTokenAuth, verifyTokenAdmin } = require('./verifyToken');

const router = require('express').Router();

// Create a new forum post
router.post('/', verifyTokenAuth, async (req, res) => {
  try {
    const newForumPost = new Forum(req.body);
    const savedForumPost = await newForumPost.save();

    // Update the user's posts array
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { posts: savedForumPost._id } // $addToSet ensures no duplicates
    }).exec();

    res.status(201).json(savedForumPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all forum posts
router.get('/', async (req, res) => {
  try {
    const forumPosts = await Forum.find()
      .populate('creator', '-password')
      .sort({ createdAt: -1 });
    res.status(200).json(forumPosts);
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
  const forumID = req.params.id;

  try {
    // Find the forum to get the creator's ID
    const forum = await Forum.findById(forumID);
    if (!forum) {
      return res.status(404).json('Forum not found.');
    }

    // Check if the authenticated user is the creator or an admin
    const isAdmin = req.user.role === 'admin';
    const isCreator = forum.creator.toString() === req.user.id;

    if (!isAdmin && !isCreator) {
      return res.status(403).json('You are not allowed to delete this forum.');
    }

    // If the creator is deleting their own post, update their post count
    if (isCreator) {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { posts: forumID },
        $inc: { postsCount: -1 }
      }).exec();
    }

    // If an admin is deleting the post, update the creator's post count
    if (isAdmin && !isCreator) {
      await User.findByIdAndUpdate(forum.creator, {
        $pull: { posts: forumID },
        $inc: { postsCount: -1 }
      }).exec();
    }

    // Remove the forum from the database
    await Forum.deleteOne({ _id: forumID });
    return res.status(200).json('Forum deleted.');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;