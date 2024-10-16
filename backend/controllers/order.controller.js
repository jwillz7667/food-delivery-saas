// order.controller.js
const Order = require('../models/Order.model');
const { sendNotification } = require('../services/notification.service');
const { assignDriverToOrder } = require('../services/driverAssignment.service');

exports.createOrder = async (req, res, next) => {
  try {
    const { restaurantId, items, totalAmount, deliveryAddress } = req.body;

    const order = new Order({
      customer: req.user.id,
      restaurant: restaurantId,
      items,
      totalAmount,
      deliveryAddress,
    });

    await order.save();

    // Notify restaurant about the new order
    sendNotification(restaurantId, 'New order received');

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

exports.getOrderDetails = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('customer', 'name email')
      .populate('restaurant', 'name')
      .populate('items.menuItem', 'name price')
      .populate('driver', 'user');

    if (!order)
      return res.status(404).json({ success: false, message: 'Order not found' });

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);

    if (!order)
      return res.status(404).json({ success: false, message: 'Order not found' });

    order.status = status;

    // If the order is out for delivery, assign a driver
    if (status === 'Out for Delivery' && !order.driver) {
      const driver = await assignDriverToOrder(order);
      order.driver = driver._id;
    }

    await order.save();

    // Notify customer about status update
    sendNotification(order.customer, `Your order status updated to ${status}`);

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

exports.getOrdersByRestaurant = async (req, res, next) => {
  try {
    const orders = await Order.find({ restaurant: req.user.restaurantId })
      .populate('customer', 'name email')
      .populate('items.menuItem', 'name price')
      .sort('-createdAt');

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// Additional methods as needed...
