// driver.routes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth.middleware');
const {
  updateLocation,
  getAvailableOrders,
  updateOrderStatus,
} = require('../controllers/driver.controller');

// Driver updates current location
router.put('/location', protect, authorize('driver'), updateLocation);

// Driver gets available orders
router.get('/orders', protect, authorize('driver'), getAvailableOrders);

// Driver updates order status
router.put('/orders/:orderId/status', protect, authorize('driver'), updateOrderStatus);

module.exports = router;
