import React, { useState, useEffect, useRef } from 'react';
import { chatApi } from '../../../services/chatApi';
import { useSocket } from '../../../contexts/SocketContext';


const UserChat= ({orderId }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [userChats, setUserChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef();

  const adminId = '355152b6-39ba-4538-8551-fc286a99fbfd'
  const user = {
    "id": "1d698a5d-8f3b-4e84-ac82-1447ffdaa0db",
    "userId": "hXRkWrAmDcCh2Ac",
    "stripeCustomerId": null,
    "name": "murad wahid",
    "email": "murad@gmail.com",
    "password": "$2b$10$hTVzT80/jITWTIHF5vn0/Ovxokg6ZVRe2HkPwtW.AX1Bco2Dhi9Xy",
    "role": "client",
    "image": null,
    "company": null,
    "designation": null,
    "phoneNumber": null,
    "paymentStatus": null,
    "createdAt": "2025-11-07T16:09:13.511Z",
    "updatedAt": "2025-11-07T16:09:13.511Z"
  }

  const { socket, isConnected, connectSocket } = useSocket();

  // Connect socket when component mounts
  useEffect(() => {
    if (user && !isConnected) {
      connectSocket(user);
    }
  }, [ connectSocket, isConnected]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (selectedChat && message.chatRoomId === selectedChat.id) {
        setMessages(prev => [...prev, message]);
      }
      // Refresh chat lists
      loadUserChats();
    };

    const handleChatUpdated = () => {
      // Update chat lists
      loadUserChats();
    };

    const handleUserTyping = (data) => {
      if (selectedChat && data.userId !== user.id) {
        setTypingUsers(prev => [...new Set([...prev, data.userId])]);
      }
    };

    const handleUserStopTyping = (data) => {
      setTypingUsers(prev => prev.filter(id => id !== data.userId));
    };

    socket.on('new_message', handleNewMessage);
    socket.on('chat_updated', handleChatUpdated);
    socket.on('user_typing', handleUserTyping);
    socket.on('user_stop_typing', handleUserStopTyping);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('chat_updated', handleChatUpdated);
      socket.off('user_typing', handleUserTyping);
      socket.off('user_stop_typing', handleUserStopTyping);
    };
  }, [socket, selectedChat, user.id]);

  useEffect(() => {
    loadUserChats();
  }, [user.id]);

  useEffect(() => {
    if (orderId) {
      initializeOrderChat();
    }
  }, [orderId, user.id, adminId]);

  const loadUserChats = async () => {
    setLoading(true);
    try {
      const chats = await chatApi.getUserChatRooms(user.id);
      setUserChats(chats);
    } catch (error) {
      console.error('Failed to load chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializeOrderChat = async () => {
    if (!orderId) return;

    setInitializing(true);
    try {
      const chatRoom = await chatApi.getChatRoom(orderId, user.id, adminId);
      setSelectedChat(chatRoom);

      const chatMessages = await chatApi.getMessages(chatRoom.id);
      setMessages(chatMessages);

      // Join chat room via socket
      if (socket) {
        socket.emit('join_chat_room', chatRoom.id);
      }
    } catch (error) {
      console.error('Failed to initialize order chat:', error);
    } finally {
      setInitializing(false);
    }
  };

  const startNewChat = async () => {
    setInitializing(true);
    try {
      const chatRoom = await chatApi.getChatRoom(null, user.id, adminId);
      setSelectedChat(chatRoom);
      setMessages([]);

      // Join chat room via socket
      if (socket) {
        socket.emit('join_chat_room', chatRoom.id);
      }

      loadUserChats();
    } catch (error) {
      console.error('Failed to start new chat:', error);
    } finally {
      setInitializing(false);
    }
  };

  const selectChat = async (chat) => {
    // Leave previous chat room
    if (selectedChat && socket) {
      socket.emit('leave_chat_room', selectedChat.id);
    }
    console.log({chat});

    setSelectedChat(chat);
    setLoading(true);
    try {
      const chatMessages = await chatApi.getMessages(chat.id);
      setMessages(chatMessages);

      // Join new chat room
      if (socket) {
        socket.emit('join_chat_room', chat.id);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTyping = () => {
    if (!socket || !selectedChat) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing_start', {
        chatRoomId: selectedChat.id,
        userId: user.id,
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
        userId: user.id,
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
        userId: user.id,
      });
    }

    try {
      socket.emit('send_message', {
        chatRoomId: selectedChat.id,
        senderId: user.id,
        content: newMessage,
        messageType: 'text'
      });

      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const getOtherUser = (chat) => {
    return chat.participants.find(p => p.user.id !== user.id)?.user || chat.admin;
  };

  const getChatTitle = (chat) => {
    const otherUser = getOtherUser(chat);
    if (chat.order) {
      return `Order ${chat.order.orderId} - ${otherUser?.name}`;
    }
    return otherUser?.name || 'Support Chat';
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
    <div className="flex h-96 bg-white border border-gray-200 rounded-lg">
      {/* Chat List Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Your Chats</h2>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <button
                onClick={startNewChat}
                disabled={initializing}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:bg-gray-400"
              >
                {initializing ? 'Starting...' : 'New Chat'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading chats...</div>
          ) : userChats.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>No chats yet</p>
              <p className="text-sm">Start a new chat to get help</p>
            </div>
          ) : (
            userChats.map(chat => (
              <div
                key={chat.id}
                className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedChat?.id === chat.id ? 'bg-blue-50' : ''
                  }`}
                onClick={() => selectChat(chat)}
              >
                <h3 className="font-medium text-sm">{getChatTitle(chat)}</h3>
                <p className="text-xs text-gray-500 truncate">
                  {chat.messages[0]?.content || 'No messages yet'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(chat.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {initializing ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Starting new chat...
          </div>
        ) : selectedChat ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{getChatTitle(selectedChat)}</h3>
                  {selectedChat.order && (
                    <p className="text-sm text-gray-500">
                      Order: {selectedChat.order.orderId}
                    </p>
                  )}
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {selectedChat.order ? 'Order Support' : 'General Support'}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <p>No messages yet</p>
                  <p className="text-sm">Start the conversation!</p>
                </div>
              ) : (
                messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex mb-3 ${message.sender.id === user.id ? 'justify-end' : 'justify-start'
                      }`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg ${message.sender.id === user.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                        }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${message.sender.id === user.id
                            ? 'text-blue-100'
                            : 'text-gray-500'
                          }`}
                      >
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
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
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p>Select a chat or start a new one</p>
              <button
                onClick={startNewChat}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Start New Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserChat;