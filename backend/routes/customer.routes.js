// customer.routes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth.middleware');
const {
  getCustomerOrders,
  getOrderStatus,
} = require('../controllers/customer.controller');

// Get all orders for customer
router.get('/orders', protect, authorize('customer'), getCustomerOrders);

// Get specific order status
router.get('/orders/:orderId/status', protect, authorize('customer'), getOrderStatus);

module.exports = router;
