import { useEffect } from "react";
import { useSocket } from "../contexts/useSocket";

export const useSocketListener = (eventName, callback, dependencies = []) => {
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (socket && isConnected) {
      socket.on(eventName, callback);
    }

    return () => {
      socket?.off(eventName);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, isConnected, ...dependencies]);
};