import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSocket } from '../../../contexts/SocketContext';
import { chatApi } from '../../../services/chatApi';

const AdminChatDashboard = () => {


  const admin = {
    "id": "355152b6-39ba-4538-8551-fc286a99fbfd",
    "userId": "JMrPBgQVO6fgryE",
    "stripeCustomerId": null,
    "name": "admin murad wahid",
    "email": "admin@gmail.com",
    "password": "$2b$10$oSnhhz22rQPD6htAFs7G7eCiLGHSrOXvPjVt6iMc7maWBIOd.S2Aa",
    "role": "admin",
    "image": null,
    "company": null,
    "designation": null,
    "phoneNumber": null,
    "paymentStatus": null,
    "createdAt": "2025-11-07T16:09:00.122Z",
    "updatedAt": "2025-11-07T16:09:00.122Z"
  }

  const [activeTab, setActiveTab] = useState('users');
  const [userChats, setUserChats] = useState([]);
  const [orderChats, setOrderChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef();

  const { socket, isConnected, connectSocket } = useSocket();

  // Fixed: Use useCallback to prevent unnecessary re-renders
  const loadChats = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const chats = await chatApi.getUserChats(admin.id);
        setUserChats(chats);
      } else {
        const chats = await chatApi.getOrderChats(admin.id);
        setOrderChats(chats);
      }
    } catch (error) {
      console.error('Failed to load chats:', error);
    } finally {
      setLoading(false);
    }
  }, [admin.id, activeTab]);

  // Fixed: Only connect socket once when component mounts
  useEffect(() => {
    if (admin && !isConnected) {
      connectSocket(admin);
    }
  }, []); // Empty dependency array - only run once

  // Fixed: Proper dependency array for loadChats
  useEffect(() => {
    loadChats();
  }, [loadChats]);

  // Socket event listeners - fixed dependencies
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (selectedChat && message.chatRoomId === selectedChat.id) {
        setMessages(prev => [...prev, message]);
      }
      loadChats();
    };

    const handleChatUpdated = () => {
      loadChats();
    };

    const handleUserTyping = (data) => {
      if (selectedChat && data.userId !== admin.id) {
        setTypingUsers(prev => [...new Set([...prev, data.userId])]);
      }
    };

    const handleUserStopTyping = (data) => {
      setTypingUsers(prev => prev.filter(id => id !== data.userId));
    };

    socket.on('new_message', handleNewMessage);
    socket.on('chat_updated', handleChatUpdated);
    socket.on('admin_chat_updated', handleChatUpdated);
    socket.on('user_typing', handleUserTyping);
    socket.on('user_stop_typing', handleUserStopTyping);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('chat_updated', handleChatUpdated);
      socket.off('admin_chat_updated', handleChatUpdated);
      socket.off('user_typing', handleUserTyping);
      socket.off('user_stop_typing', handleUserStopTyping);
    };
  }, [socket, selectedChat, admin.id, loadChats]);

  const selectChat = async (chat) => {
    // Leave previous chat room
    if (selectedChat && socket) {
      socket.emit('leave_chat_room', selectedChat.id);
    }

    setSelectedChat(chat);
    try {
      const chatMessages = await chatApi.getMessages(chat.id);
      setMessages(chatMessages);

      // Join new chat room
      if (socket) {
        socket.emit('join_chat_room', chat.id);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const handleTyping = () => {
    if (!socket || !selectedChat) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing_start', {
        chatRoomId: selectedChat.id,
        userId: admin.id,
      });
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit('typing_stop', {
        chatRoomId: selectedChat.id,
        userId: admin.id,
      });
    }, 1000);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || !socket) return;

    // Stop typing indicator
    if (isTyping && socket) {
      setIsTyping(false);
      socket.emit('typing_stop', {
        chatRoomId: selectedChat.id,
        userId: admin.id,
      });
    }

    try {
      // Send message via socket
      socket.emit('send_message', {
        chatRoomId: selectedChat.id,
        senderId: admin.id,
        content: newMessage,
        messageType: 'text'
      });

      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const getOtherUser = (chat) => {
    return chat.participants.find(p => p.user.id !== admin.id)?.user || chat.user;
  };

  const getLastMessage = (chat) => {
    return chat.messages[0]?.content || 'No messages yet';
  };

  const getTypingIndicator = () => {
    if (typingUsers.length === 0) return null;

    const typingUser = getOtherUser(selectedChat);
    return (
      <div className="text-xs text-gray-500 italic">
        {typingUser?.name} is typing...
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Admin Chat</h1>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
                title={isConnected ? 'Connected' : 'Disconnected'} />
              <span className="text-sm text-gray-500">
                {isConnected ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
          <div className="flex mt-4 space-x-2">
            <button
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${activeTab === 'users'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
                }`}
              onClick={() => setActiveTab('users')}
            >
              User Chats
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${activeTab === 'orders'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
                }`}
              onClick={() => setActiveTab('orders')}
            >
              Order Chats
            </button>
          </div>
        </div>

        <div className="overflow-y-auto h-full">
          {loading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : (
            (activeTab === 'users' ? userChats : orderChats).map(chat => (
              <div
                key={chat.id}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedChat?.id === chat.id ? 'bg-blue-50' : ''
                  }`}
                onClick={() => selectChat(chat)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    {getOtherUser(chat)?.image ? (
                      <img
                        src={getOtherUser(chat)?.image}
                        alt={getOtherUser(chat)?.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <span className="text-gray-600">
                        {getOtherUser(chat)?.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">
                        {getOtherUser(chat)?.name}
                      </h3>
                      {chat.order && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Order: {chat.order.orderId}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {getLastMessage(chat)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  {getOtherUser(selectedChat)?.image ? (
                    <img
                      src={getOtherUser(selectedChat)?.image}
                      alt={getOtherUser(selectedChat)?.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <span className="text-gray-600 text-sm">
                      {getOtherUser(selectedChat)?.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="ml-3">
                  <h2 className="font-semibold">{getOtherUser(selectedChat)?.name}</h2>
                  <p className="text-sm text-gray-500">{getOtherUser(selectedChat)?.email}</p>
                </div>
                {selectedChat.order && (
                  <div className="ml-auto">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Order: {selectedChat.order.orderId}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${message.sender.id === admin.id ? 'justify-end' : 'justify-start'
                    }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender.id === admin.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${message.sender.id === admin.id
                          ? 'text-blue-100'
                          : 'text-gray-500'
                        }`}
                    >
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {getTypingIndicator()}
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTyping();
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p>Select a chat to start messaging</p>
              <p className="text-sm text-gray-400 mt-2">
                Connection: {isConnected ? 'Connected' : 'Disconnected'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatDashboard;