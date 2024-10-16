// restaurant.controller.js
const Restaurant = require('../models/Restaurant.model');
const MenuItem = require('../models/MenuItem.model');

exports.getRestaurantDetails = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.user.id })
      .populate('menuItems');

    if (!restaurant)
      return res.status(404).json({ success: false, message: 'Restaurant not found' });

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    next(error);
  }
};

exports.addMenuItem = async (req, res, next) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;
    const restaurant = await Restaurant.findOne({ user: req.user.id });

    if (!restaurant)
      return res.status(404).json({ success: false, message: 'Restaurant not found' });

    const menuItem = new MenuItem({
      restaurant: restaurant._id,
      name,
      description,
      price,
      category,
      imageUrl,
    });

    await menuItem.save();

    restaurant.menuItems.push(menuItem._id);
    await restaurant.save();

    res.status(201).json({ success: true, data: menuItem });
  } catch (error) {
    next(error);
  }
};

exports.updateMenuItem = async (req, res, next) => {
  try {
    const { menuItemId } = req.params;
    const updates = req.body;

    const menuItem = await MenuItem.findOneAndUpdate(
      { _id: menuItemId, restaurant: req.user.restaurantId },
      updates,
      { new: true }
    );

    if (!menuItem)
      return res.status(404).json({ success: false, message: 'Menu item not found' });

    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    next(error);
  }
};

// Additional methods as needed...
