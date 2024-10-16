// auth.middleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { JWT_SECRET } = require('../config/app.config');

exports.protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token)
      return res.status(401).json({ success: false, message: 'Not authorized' });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user)
      return res.status(401).json({ success: false, message: 'User not found' });

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ success: false, message: 'Access denied' });

    next();
  };
};
