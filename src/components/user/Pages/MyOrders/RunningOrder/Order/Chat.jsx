import { LuCheckCheck } from "react-icons/lu";
import "./chatStyle.css";
import { GoPaperAirplane } from "react-icons/go";
import { FcManager } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import { getUserInfo } from "../../../../../../helpers/user/user";
import { useGetAdminQuery } from "../../../../../../redux/api/authApi";
import { useSocket } from "../../../../../../contexts/SocketContext";
import { chatApi } from "../../../../../../services/chatApi";
import { formattedDate } from "../../../../../../utils/function";
const Chat = ({orderId}) => {
 const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef();
  const chatInitializedRef = useRef(false);

  const user = getUserInfo();
  const { data: admin, isLoading } = useGetAdminQuery();
  const { socket, isConnected, connectSocket } = useSocket();

  // Connect socket when component mounts
  useEffect(() => {
    if (user && !isConnected) {
      connectSocket(user);
    }
  }, [connectSocket, isConnected]);

  // Auto-initialize chat when user and admin are available
  useEffect(() => {
    const initializeChat = async () => {
      if (chatInitializedRef.current || !user?.id || !admin?.id || selectedChat) {
        return;
      }

      setInitializing(true);
      chatInitializedRef.current = true;

      try {
        console.log('Auto-creating chat with admin:', admin.id);
        const chatRoom = await chatApi.getChatRoom(orderId, user.id, admin.id);
        console.log('Chat room created:', chatRoom);

        if (chatRoom && chatRoom.id) {
          setSelectedChat(chatRoom);

          // Load existing messages
          const chatMessages = await chatApi.getMessages(chatRoom.id);
          setMessages(chatMessages || []);

          // Join chat room via socket
          if (socket && isConnected) {
            socket.emit('join_chat_room', chatRoom.id);
            console.log('Joined chat room:', chatRoom.id);
          }
        }
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        chatInitializedRef.current = false; // Allow retry on error
      } finally {
        setInitializing(false);
      }
    };

    if (user?.id && admin?.id) {
      initializeChat();
    }
  }, [isLoading, socket, isConnected, selectedChat]);
  

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      console.log('New message received:', message);
      if (selectedChat && message.chatRoomId === selectedChat.id) {
        setMessages(prev => [...prev, message]);
      }
    };

    const handleUserTyping = (data) => {
      console.log('User typing:', data);
      if (selectedChat && data.userId !== user.id) {
        setTypingUsers(prev => [...new Set([...prev, data.userId])]);
      }
    };

    const handleUserStopTyping = (data) => {
      console.log('User stopped typing:', data);
      setTypingUsers(prev => prev.filter(id => id !== data.userId));
    };

    socket.on('new_message', handleNewMessage);
    socket.on('user_typing', handleUserTyping);
    socket.on('user_stop_typing', handleUserStopTyping);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('user_typing', handleUserTyping);
      socket.off('user_stop_typing', handleUserStopTyping);
    };
  }, [socket, selectedChat, user?.id]);

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
    if (!newMessage.trim()) return;

    // If no chat exists, create one automatically before sending
    if (!selectedChat && admin?.id) {
      try {
        setLoading(true);
        const chatRoom = await chatApi.getChatRoom(null, user.id, admin.id);
        setSelectedChat(chatRoom);

        if (socket) {
          socket.emit('join_chat_room', chatRoom.id);
        }

        // Now send the message after chat is created
        socket.emit('send_message', {
          chatRoomId: chatRoom.id,
          senderId: user.id,
          content: newMessage,
          messageType: 'text'
        });

        setNewMessage('');
      } catch (error) {
        console.error('Failed to create chat and send message:', error);
      } finally {
        setLoading(false);
      }
      return;
    }

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

  const getTypingIndicator = () => {
    if (typingUsers.length === 0) return null;

    return (
      <div className="text-xs text-gray-500 italic">
        Admin is typing...
      </div>
    );
  }

  useEffect(() => {
    console.log(messages);

   },[messages])
  return (
    <div className="w-full">
      <h2 className="text-[#222425] text-2xl font-glare mb-4">
        Order Messages
      </h2>
      <div className="order-details-chat-container">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#F6F7F7] ">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <FcManager />
            </div>
            <span className="font-semibold text-lg text-gray-800">Admin</span>
          </div>
          {/* <span className="text-sm text-gray-500">Unread</span> */}
        </div>

        <div className="order-details-chat-messages flex flex-col bg-[#F6F7F7]">
          {messages.length > 0 ? (
            <>
              {
                messages.map(message => <div className={`flex ${message.sender.id === user.id ? 'justify-end' :'items-start'} mb-2`}>
                  <div className={`order-details-message-bubble ${message.sender.id === user.id ? 'order-details-message-sent shadow-md' : 'order-details-message-received'}  `}>
                    {message.content}
                    <div className={`text-right text-xs mt-1 flex items-center gap-1 justify-end ${message.sender.id === user.id ? 'text-white' :'text-gray-500'}`}>
                      {formattedDate(message.createdAt)} <LuCheckCheck />
                    </div>
                  </div>
                </div>)
              }
            </>
          ) : (
            <div className="grid place-items-center h-full">
              <p className="text-[#878C91] text-2xl font-glare">
                Start Chatting
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 relative mt-2 w-full rounded-4xl border border-[#DCDEDF] overflow-hidden mb-5 order-details-chat-input-container">
          <textarea
            className="order-details-input-field outline-none py-4 px-4 w-full bg-white flex-1"
            type="text"
            placeholder="Send a message..."
            // className="input-field"
            cols={30}
            rows={4}
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || loading}
            className="bg-[#008CFF] px-5 py-1.5 rounded-4xl flex items-center gap-2 text-white absolute right-4 bottom-4 font-normal cursor-pointer hover:bg-[#007de3] transition-all duration-200">
            <span>Send</span>
            <GoPaperAirplane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;


