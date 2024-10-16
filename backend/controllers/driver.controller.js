// driver.controller.js
const Driver = require('../models/Driver.model');
const Order = require('../models/Order.model');
const { sendNotification } = require('../services/notification.service');

exports.updateLocation = async (req, res, next) => {
  try {
    const { longitude, latitude } = req.body;

    const driver = await Driver.findOneAndUpdate(
      { user: req.user.id },
      {
        currentLocation: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      },
      { new: true }
    );

    if (!driver)
      return res.status(404).json({ success: false, message: 'Driver not found' });

    res.status(200).json({ success: true, data: driver });
  } catch (error) {
    next(error);
  }
};

exports.getAvailableOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ status: 'Out for Delivery', driver: req.user.id })
      .populate('customer', 'name address')
      .populate('restaurant', 'name address');

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);

    if (!order || order.driver.toString() !== req.user.id)
      return res.status(404).json({ success: false, message: 'Order not found or access denied' });

    order.status = status;
    await order.save();

    // Notify customer about status update
    sendNotification(order.customer, `Your order status updated to ${status}`);

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// Additional methods as needed...
