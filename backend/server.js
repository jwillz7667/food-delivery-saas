// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');
const errorHandler = require('./middlewares/error.middleware');
const appConfig = require('./config/app.config');
const logger = require('./utils/logger');

// Routes
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');
const driverRoutes = require('./routes/driver.routes');
const customerRoutes = require('./routes/customer.routes');
const restaurantRoutes = require('./routes/restaurant.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/restaurants', restaurantRoutes);

// Error Handler
app.use(errorHandler);

// Start server
const server = app.listen(appConfig.PORT, () => {
  logger.info(`Server running on port ${appConfig.PORT}`);
});

// Socket.io setup
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

require('./sockets/socket')(io);

module.exports = app; // Export app for testing
