import React, { createContext, useContext, useEffect, useState } from "react";
import { connectWithSocketServer } from "../common/realtimeCommunication/socketConnection";
import ConnectionLoader from "../modules/common/components/ConnectionLoader";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ jwtToken, children }) => {
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (jwtToken) {
            const socketInstance = connectWithSocketServer(jwtToken);
            setSocket(socketInstance);
            setLoading(false);

            socketInstance.on("connect_error", (err) => {
                // eslint-disable-next-line no-console
                console.log("Socket Error \n", error, err);
                setError("Connection failed. Please check your token.");
                setLoading(false);
            });

            return () => {
                if (socketInstance) {
                    socketInstance.disconnect();
                }
            };
        } else {
            setLoading(false);
            setError("No token provided.");
        }
    }, [jwtToken]);

    if (loading) {
        return <ConnectionLoader />;
    }

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
