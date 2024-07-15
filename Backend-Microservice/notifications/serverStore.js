const connectedUsers = new Map();

let io = null;
const setSocketServerInstance = async (ioInstance) => {
  io = ioInstance;
  console.log("socket server online")
};

const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = (user, socketId) => {
  connectedUsers.set(user.id, socketId);
  console.log("connectedUsers ", connectedUsers.size);
};

const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log("[Socket]disconnected user \n", connectedUsers);
  }
};

const getActiveConnection = (userId) => {
  const activeConnections = [];

  connectedUsers.forEach((value, key) => {
    if (value === userId) {
      activeConnections.push(key);
    }
  });
  return activeConnections;
};

const getOnlineUsers = () => {
  const onlineUsers = [];
  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: value, userId: key });
  });
  return onlineUsers;
};

module.exports = {
  setSocketServerInstance,
  getSocketServerInstance,
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnection,
  getOnlineUsers,
};
