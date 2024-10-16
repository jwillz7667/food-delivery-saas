// MenuItem.model.js
const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema(
  {
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    category: { type: String },
    availability: { type: Boolean, default: true },
    // Additional fields as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', MenuItemSchema);
