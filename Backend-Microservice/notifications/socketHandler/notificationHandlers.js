const { getOnlineUsers, getSocketServerInstance } = require("../serverStore");

const courseAddedHandler = (io, userIds = [], data = {}) => {

  const connectedUsers = getOnlineUsers() || [];
  userIds.forEach((userId) => {
    const userSockets = connectedUsers.filter(user => user.userId === userId);
    userSockets.forEach(userSocket => {
      io.to(userSocket.socketId).emit("real-time-notify", data);
    });
  });
};

const updateNotificationHandler = (socket, data) => {
  console.log(`Update notification: ${data.message}`);
  // Implement the logic to handle update notifications
};

const recommendationHandler = (socket, data) => {
  console.log(`Recommendation: ${data.recommendation}`);
  // Implement the logic to handle recommendations
};

module.exports = {
  courseAddedHandler,
  updateNotificationHandler,
  recommendationHandler,
};
