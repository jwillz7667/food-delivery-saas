// socket.js
module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('Socket connected:', socket.id);
  
      // Join user-specific room
      socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room ${userId}`);
      });
  
      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
      });
  
      // Additional socket events as needed
    });
  };
  