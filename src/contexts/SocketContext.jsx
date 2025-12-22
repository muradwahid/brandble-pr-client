// import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
// import { io, Socket } from 'socket.io-client';

// const SocketContext = createContext ({
//   socket: null,
//   isConnected: false,
//   connectSocket: () => { },
//   disconnectSocket: () => { },
// });

// // eslint-disable-next-line react-refresh/only-export-components
// export const useSocket = () => useContext(SocketContext);


// export const SocketProvider= ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const connectionAttempted = useRef(false);

//   const connectSocket = (user) => {
//     // Prevent multiple connection attempts
//     if (connectionAttempted.current || socket?.connected) {
//       return;
//     }

//     connectionAttempted.current = true;

//     try {
//       const newSocket = io('http://localhost:5050', {
//         transports: ['websocket', 'polling'],
//         autoConnect: true,
//         reconnection: true,
//         reconnectionAttempts: 5,
//         reconnectionDelay: 1000,
//         auth: {
//           userId: user.id,
//           userRole: user.role,
//         },
//       });

//       newSocket.on('connect', () => {
//         console.log('Connected to server');
//         setIsConnected(true);

//         // Join user to their rooms
//         newSocket.emit('user_join', {
//           userId: user.id,
//           userRole: user.role,
//         });
//       });

//       newSocket.on('disconnect', (reason) => {
//         console.log('Disconnected from server:', reason);
//         setIsConnected(false);
//       });

//       newSocket.on('connect_error', (error) => {
//         console.error('Connection error:', error);
//         setIsConnected(false);
//         connectionAttempted.current = false; // Allow retry on error
//       });

//       newSocket.on('reconnect_attempt', (attempt) => {
//         console.log(`Reconnection attempt ${attempt}`);
//       });

//       newSocket.on('reconnect', (attempt) => {
//         console.log(`Reconnected after ${attempt} attempts`);
//         setIsConnected(true);
//       });

//       setSocket(newSocket);
//     } catch (error) {
//       console.error('Failed to create socket connection:', error);
//       connectionAttempted.current = false;
//     }
//   };

//   const disconnectSocket = () => {
//     if (socket) {
//       socket.disconnect();
//       setSocket(null);
//       setIsConnected(false);
//       connectionAttempted.current = false;
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (socket) {
//         socket.disconnect();
//       }
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket, isConnected, connectSocket, disconnectSocket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };


import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";
import { SOCKET_EVENTS, SOCKET_URL } from "./socketEvents";
import { SocketContext } from "./SocketContext";




export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const connectionAttempted = useRef(false);

  const connectSocket = useCallback((user) => {
    if (!user?.id) return;
    if (connectionAttempted.current) return;
    if (socket?.connected) return;

    connectionAttempted.current = true;

    const s = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      auth: { userId: user.id, userRole: user.role },
    });

    s.on("connect", () => {
      setIsConnected(true);
      s.emit(SOCKET_EVENTS.USER_JOIN, { userId: user.id, userRole: user.role });
    });

    s.on("disconnect", () => setIsConnected(false));

    s.on("connect_error", () => {
      setIsConnected(false);
      connectionAttempted.current = false;
    });

    setSocket(s);
  }, [socket]);

  const disconnectSocket = useCallback(() => {
    if (!socket) return;
    socket.disconnect();
    setSocket(null);
    setIsConnected(false);
    connectionAttempted.current = false;
  }, [socket]);

  const emit = useCallback((event, payload) => {
    if (!socket?.connected) return;
    socket.emit(event, payload);
  }, [socket]);

  useEffect(() => {
    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);

  const value = useMemo(
    () => ({ socket, isConnected, connectSocket, disconnectSocket, emit }),
    [socket, isConnected, connectSocket, disconnectSocket, emit]
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

