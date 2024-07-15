const { Server } = require("socket.io");
const { setSocketServerInstance } = require("./serverStore.js");
const { disconnectHandler } = require("./socketHandler/disconnectHandler.js");
const {
  newConnectionHandler,
} = require("./socketHandler/newConnectionHandler.js");
const jwt = require("jsonwebtoken")

const logger = require("./utils/logger-utils.js");

const registerSocketServer = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  setSocketServerInstance(io);

  // middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
      jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
        if (err) {
          return next(new Error('Authentication error'));
        }
        socket.user = user;
        next();
      });
    } else {
      logger.error('Authentication error: No token provided');
      next(new Error('Authentication error'));
    }
  });

  io.on("connection", (socket) => {
    console.log('New connection: %s', socket.id)
    newConnectionHandler(socket, io);

    socket.on("disconnect", (reason) => {
      logger.info('Disconnect: %s (%s)', socket.id, reason);
      console.log('Disconnect: %s (%s)', socket.id, reason);
      disconnectHandler(socket);
    });

    socket.on("error", (error) => {
      logger.error('Socket error: %o', error);
    });
  });
};


module.exports = { registerSocketServer };
