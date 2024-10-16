// Restaurant.model.js
const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    cuisineType: { type: String },
    openingHours: { type: String },
    menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
    // Additional fields as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model('Restaurant', RestaurantSchema);
