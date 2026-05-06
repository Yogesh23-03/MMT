const router = require('express').Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    res.json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
