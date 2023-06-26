const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json('Email already exists');
    }

    // Encrypt the password
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASS_SEC
    ).toString();

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: encryptedPassword
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Generate an access token
    const accessToken = jwt.sign(
      { id: savedUser._id, role: savedUser.role },
      process.env.JWT_SEC,
      { expiresIn: '3d' } // Token expires in 3 days
    );

    // Return the user info and access token
    const { password: savedPassword, ...user } = savedUser._doc;
    res.status(200).json({ ...user, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // !user && res.status(401).json('Wrong username');
    if (!user) {
      return res.status(401).json('Wrong email');
    }

    // decrypt password
    const hashedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPass = hashedPass.toString(CryptoJS.enc.Utf8);
    const inputPass = req.body.password;

    // originalPass !== inputPass && res.status(401).json('Wrong password');
    if (originalPass !== inputPass) {
      return res.status(401).json('Wrong password');
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SEC,
      { expiresIn: '3d' } // token expires in 3 days
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken }); // return user info and token
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
