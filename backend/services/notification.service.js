// notification.service.js
const sendNotification = (userId, message) => {
    // Implementation for sending notifications
    // This could be via WebSockets, push notifications, SMS, etc.
    console.log(`Notification to user ${userId}: ${message}`);
  };
  
  module.exports = { sendNotification };
  