// order.routes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth.middleware');
const {
  createOrder,
  getOrderDetails,
  updateOrderStatus,
  getOrdersByRestaurant,
} = require('../controllers/order.controller');

// Customer creates a new order
router.post('/', protect, authorize('customer'), createOrder);

// Customer gets order status
router.get('/:orderId', protect, authorize('customer'), getOrderDetails);

// Restaurant updates order status
router.put('/:orderId/status', protect, authorize('restaurant'), updateOrderStatus);

// Restaurant gets all orders
router.get('/restaurant/orders', protect, authorize('restaurant'), getOrdersByRestaurant);

module.exports = router;
