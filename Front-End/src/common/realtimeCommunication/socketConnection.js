import io from "socket.io-client";

export const connectWithSocketServer = (jwtToken) => {
  const socketURL = process.env.REACT_APP_SOCKET;
  const socket = io(socketURL, {
    transports: ["websocket"],
    secure: socketURL.startsWith("https"),
    auth: {
      token: jwtToken
    }
  });

  socket.on("connect", () => {
    // eslint-disable-next-line no-console
    console.log("Successfully connected with socket.io server", socket.id);
  });

  return socket;
};
