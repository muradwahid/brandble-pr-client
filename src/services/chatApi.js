import config from "../config";

const API_BASE = config.serverUrl;

export const chatApi = {
  // Get user chats for admin
  async getUserChats(adminId) {
    const response = await fetch(`${API_BASE}/chat/user-chats/${adminId}`);
    return response.json();
  },
  async getClientChats(userId) {
    const response = await fetch(`${API_BASE}/chat/client-chats/${userId}`);
    return response.json();
  },



  // Get order chats for admin
  async getOrderChats(adminId) {
    const response = await fetch(`${API_BASE}/chat/order-chats/${adminId}`);
    return response.json();
  },
  async getUserOrderChats(userId) {
    const response = await fetch(`${API_BASE}/chat/order-user-chats/${userId}`);
    return response.json();
  },

  // Get user's chat rooms
  async getUserChatRooms(userId) {
    const response = await fetch(`${API_BASE}/chat/user/${userId}/chats`);
    return response.json();
  },

  // Get or create chat room
  async getChatRoom(orderId, userId, adminId) {
    const response = await fetch(`${API_BASE}/chat/room`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, userId, adminId }),
    });
    return response.json();
  },

  // Send message
  async sendMessage(chatRoomId, senderId, content, messageType = 'text'){
    const response = await fetch(`${API_BASE}/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatRoomId, senderId, content, messageType }),
    });
    return response.json();
  },

  // Get chat room messages
  async getMessages(chatRoomId) {
    const response = await fetch(`${API_BASE}/chat/room/${chatRoomId}/messages`);
    return response.json();
  },
};