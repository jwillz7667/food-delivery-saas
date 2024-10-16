// customer.controller.js
const Order = require('../models/Order.model');

exports.getCustomerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
      .populate('restaurant', 'name')
      .populate('items.menuItem', 'name price')
      .sort('-createdAt');

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

exports.getOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('driver', 'user currentLocation')
      .populate('restaurant', 'name address');

    if (!order || order.customer.toString() !== req.user.id)
      return res.status(404).json({ success: false, message: 'Order not found or access denied' });

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// Additional methods as needed...
