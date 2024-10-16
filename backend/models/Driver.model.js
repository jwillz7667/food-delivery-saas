// Driver.model.js
const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleType: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    availabilityStatus: {
      type: String,
      enum: ['Available', 'Unavailable'],
      default: 'Available',
    },
    currentLocation: {
      type: { type: String, default: 'Point' },
      coordinates: [Number], // [longitude, latitude]
    },
    // Additional fields as needed
  },
  { timestamps: true }
);

DriverSchema.index({ currentLocation: '2dsphere' });

module.exports = mongoose.model('Driver', DriverSchema);
