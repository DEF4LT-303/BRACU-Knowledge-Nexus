const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//Register
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString()
  });

  try {
    const user = await newUser.save();
    res.status(200).json(user);
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
