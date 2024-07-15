// socketHandler/disconnectHandler.js
const { getOnlineUsers, removeConnectedUser } = require("../serverStore.js");

const disconnectHandler = (socket) => {
  const userId = socket.userId;
  removeConnectedUser(userId);
  console.log(`User ${userId} disconnected`);
};

module.exports = { disconnectHandler };
