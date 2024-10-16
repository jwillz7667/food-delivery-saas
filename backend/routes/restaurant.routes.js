// restaurant.routes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth.middleware');
const {
  getRestaurantDetails,
  addMenuItem,
  updateMenuItem,
} = require('../controllers/restaurant.controller');

// Get restaurant details
router.get('/', protect, authorize('restaurant'), getRestaurantDetails);

// Add a new menu item
router.post('/menu', protect, authorize('restaurant'), addMenuItem);

// Update a menu item
router.put('/menu/:menuItemId', protect, authorize('restaurant'), updateMenuItem);

module.exports = router;
