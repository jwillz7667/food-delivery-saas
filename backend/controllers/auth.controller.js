// auth.controller.js
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/app.config');

exports.register = async (req, res, next) => {
  try {
    const { role, name, email, password, phone, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: 'Email already in use' });

    const user = new User({ role, name, email, password, phone, address });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(201).json({
      success: true,
      data: { token, user: { id: user._id, name: user.name, role: user.role } },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user)
      return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      success: true,
      data: { token, user: { id: user._id, name: user.name, role: user.role } },
    });
  } catch (error) {
    next(error);
  }
};
