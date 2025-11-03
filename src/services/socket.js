// // src/services/socket.js
// import { io } from 'socket.io-client';

// class SocketService {
//   constructor() {
//     this.socket = null;
//     this.isConnected = false;
//   }

//   // Connect to socket server
//   connect() {
//     if (this.socket) {
//       return this.socket;
//     }

//     const token = localStorage.getItem('authToken');

//     this.socket = io(import.meta.env.VITE_SOCKET_URL, {
//       auth: {
//         token: token
//       },
//       transports: ['websocket', 'polling']
//     });

//     this.setupEventListeners();

//     return this.socket;
//   }

//   // Setup common event listeners
//   setupEventListeners() {
//     this.socket.on('connect', () => {
//       console.log('Connected to server');
//       this.isConnected = true;
//     });

//     this.socket.on('disconnect', () => {
//       console.log('Disconnected from server');
//       this.isConnected = false;
//     });

//     this.socket.on('connect_error', (error) => {
//       console.error('Connection error:', error);
//       this.isConnected = false;
//     });
//   }

//   // Join a chat room
//   joinRoom(roomId) {
//     if (this.socket && this.isConnected) {
//       this.socket.emit('join-room', roomId);
//     }
//   }

//   // Leave a chat room
//   leaveRoom(roomId) {
//     if (this.socket && this.isConnected) {
//       this.socket.emit('leave-room', roomId);
//     }
//   }

//   // Send a message
//   sendMessage(roomId, content, type = 'text', fileUrl = null) {
//     if (this.socket && this.isConnected) {
//       this.socket.emit('send-message', {
//         roomId,
//         content,
//         type,
//         fileUrl
//       });
//     }
//   }

//   // Start typing indicator
//   startTyping(roomId) {
//     if (this.socket && this.isConnected) {
//       this.socket.emit('typing-start', roomId);
//     }
//   }

//   // Stop typing indicator
//   stopTyping(roomId) {
//     if (this.socket && this.isConnected) {
//       this.socket.emit('typing-stop', roomId);
//     }
//   }

//   // Mark messages as read
//   markMessagesAsRead(roomId) {
//     if (this.socket && this.isConnected) {
//       this.socket.emit('mark-read', roomId);
//     }
//   }

//   // Disconnect socket
//   disconnect() {
//     if (this.socket) {
//       this.socket.disconnect();
//       this.socket = null;
//       this.isConnected = false;
//     }
//   }

//   // Get socket instance
//   getSocket() {
//     return this.socket;
//   }

//   // Check connection status
//   getConnectionStatus() {
//     return this.isConnected;
//   }
// }

// // Create singleton instance
// const socketService = new SocketService();
// export default socketService;


// src/services/socketService.js
import { io } from 'socket.io-client';
import { getToken } from '../utils/auth';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = new Map();
  }

  connect() {
    if (this.socket) {
      return this.socket;
    }

    const token = getToken();

    this.socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling']
    });

    this.setupEventListeners();
    return this.socket;
  }

  setupEventListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.isConnected = true;
      this.emitToListeners('connection-change', true);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.isConnected = false;
      this.emitToListeners('connection-change', false);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.isConnected = false;
      this.emitToListeners('connection-change', false);
    });

    // Message events
    this.socket.on('new-message', (message) => {
      this.emitToListeners('new-message', message);
    });

    this.socket.on('user-typing', (data) => {
      this.emitToListeners('user-typing', data);
    });

    this.socket.on('user-stop-typing', (data) => {
      this.emitToListeners('user-stop-typing', data);
    });

    this.socket.on('messages-read', (data) => {
      this.emitToListeners('messages-read', data);
    });

    this.socket.on('room-joined', (data) => {
      this.emitToListeners('room-joined', data);
    });

    this.socket.on('message-sent', (data) => {
      this.emitToListeners('message-sent', data);
    });

    this.socket.on('error', (error) => {
      this.emitToListeners('error', error);
    });
  }

  // Event listener management
  addListener(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
  }

  removeListener(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  emitToListeners(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        callback(data);
      });
    }
  }

  // Socket actions
  joinRoom(roomId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('join-room', roomId);
    }
  }

  leaveRoom(roomId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leave-room', roomId);
    }
  }

  sendMessage(roomId, content, type = 'text', fileUrl = null) {
    if (this.socket && this.isConnected) {
      this.socket.emit('send-message', {
        roomId,
        content,
        type,
        fileUrl
      });
    }
  }

  startTyping(roomId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('typing-start', roomId);
    }
  }

  stopTyping(roomId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('typing-stop', roomId);
    }
  }

  markMessagesAsRead(roomId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('mark-read', roomId);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.listeners.clear();
    }
  }

  getConnectionStatus() {
    return this.isConnected;
  }
}

// Create singleton instance
const socketService = new SocketService();
export default socketService;