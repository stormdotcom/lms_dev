// socketHandler/newConnectionHandler.js
const { addNewConnectedUser } = require("../serverStore.js");

const newConnectionHandler = (socket, io) => {
  const user = socket.user
  addNewConnectedUser(user, socket.id);

  // Notify other users
  io.emit("user-connected", { userId: user.id });
};

module.exports = { newConnectionHandler };
