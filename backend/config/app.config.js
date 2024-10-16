// app.config.js
module.exports = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: '7d',
  };
  