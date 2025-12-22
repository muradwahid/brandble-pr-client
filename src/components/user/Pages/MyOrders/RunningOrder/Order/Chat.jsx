// import { LuCheckCheck } from "react-icons/lu";
// import "./chatStyle.css";
// import { GoPaperAirplane } from "react-icons/go";
// import { FcManager } from "react-icons/fc";
// import { useEffect, useRef, useState } from "react";
// import { getUserInfo } from "../../../../../../helpers/user/user";
// import { useGetAdminQuery } from "../../../../../../redux/api/authApi";
// // import { useSocket } from "../../../../../../contexts/SocketContext";
// import { chatApi } from "../../../../../../services/chatApi";
// import { formattedDate } from "../../../../../../utils/function";
// import { useSocket } from "../../../../../../contexts/useSocket";
// const Chat = ({orderId}) => {
//  const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   // eslint-disable-next-line no-unused-vars
//   const [initializing, setInitializing] = useState(false);
//   const [typingUsers, setTypingUsers] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const typingTimeoutRef = useRef();
//   const chatInitializedRef = useRef(false);

//   const user = getUserInfo();
//   const { data: admin, isLoading } = useGetAdminQuery();
//   const { socket, isConnected, connectSocket } = useSocket();

//   // Connect socket when component mounts
//   useEffect(() => {
//     if (user && !isConnected) {
//       connectSocket(user);
//     }
//   }, [connectSocket, isConnected]);

//   // Auto-initialize chat when user and admin are available
//   useEffect(() => {
//     const initializeChat = async () => {
//       if (chatInitializedRef.current || !user?.id || !admin?.id || selectedChat) {
//         return;
//       }

//       setInitializing(true);
//       chatInitializedRef.current = true;

//       try {
//         const chatRoom = await chatApi.getChatRoom(orderId, user.id, admin.id);


//         if (chatRoom && chatRoom.id) {
//           setSelectedChat(chatRoom);

//           // Load existing messages
//           const chatMessages = await chatApi.getMessages(chatRoom.id);
//           setMessages(chatMessages || []);

//           // Join chat room via socket
//           if (socket && isConnected) {
//             socket.emit('join_chat_room', chatRoom.id);
//           }
//         }
//       } catch (error) {
//         console.error('Failed to initialize chat:', error);
//         chatInitializedRef.current = false; // Allow retry on error
//       } finally {
//         setInitializing(false);
//       }
//     };

//     if (user?.id && admin?.id) {
//       initializeChat();
//     }
//   }, [isLoading, socket, isConnected, selectedChat]);
  

//   // Socket event listeners
//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (message) => {
//       if (selectedChat && message.chatRoomId === selectedChat.id) {
//         setMessages(prev => [...prev, message]);
//       }
//     };

//     const handleUserTyping = (data) => {
//       if (selectedChat && data.userId !== user.id) {
//         setTypingUsers(prev => [...new Set([...prev, data.userId])]);
//       }
//     };

//     const handleUserStopTyping = (data) => {
//       setTypingUsers(prev => prev.filter(id => id !== data.userId));
//     };

//     socket.on('new_message', handleNewMessage);
//     socket.on('user_typing', handleUserTyping);
//     socket.on('user_stop_typing', handleUserStopTyping);

//     return () => {
//       socket.off('new_message', handleNewMessage);
//       socket.off('user_typing', handleUserTyping);
//       socket.off('user_stop_typing', handleUserStopTyping);
//     };
//   }, [socket, selectedChat, user?.id]);

//   const handleTyping = () => {
//     if (!socket || !selectedChat) return;

//     if (!isTyping) {
//       setIsTyping(true);
//       socket.emit('typing_start', {
//         chatRoomId: selectedChat.id,
//         userId: user.id,
//       });
//     }

//     // Clear existing timeout
//     if (typingTimeoutRef.current) {
//       clearTimeout(typingTimeoutRef.current);
//     }

//     // Set new timeout to stop typing indicator
//     typingTimeoutRef.current = setTimeout(() => {
//       setIsTyping(false);
//       socket.emit('typing_stop', {
//         chatRoomId: selectedChat.id,
//         userId: user.id,
//       });
//     }, 1000);
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     // If no chat exists, create one automatically before sending
//     if (!selectedChat && admin?.id) {
//       try {
//         setLoading(true);
//         const chatRoom = await chatApi.getChatRoom(null, user.id, admin.id);
//         setSelectedChat(chatRoom);

//         if (socket) {
//           socket.emit('join_chat_room', chatRoom.id);
//         }

//         // Now send the message after chat is created
//         socket.emit('send_message', {
//           chatRoomId: chatRoom.id,
//           senderId: user.id,
//           content: newMessage,
//           messageType: 'text'
//         });

//         setNewMessage('');
//       } catch (error) {
//         console.error('Failed to create chat and send message:', error);
//       } finally {
//         setLoading(false);
//       }
//       return;
//     }

//     // Stop typing indicator
//     if (isTyping && socket) {
//       setIsTyping(false);
//       socket.emit('typing_stop', {
//         chatRoomId: selectedChat.id,
//         userId: user.id,
//       });
//     }

//     try {
//       socket.emit('send_message', {
//         chatRoomId: selectedChat.id,
//         senderId: user.id,
//         content: newMessage,
//         messageType: 'text'
//       });

//       setNewMessage('');
//     } catch (error) {
//       console.error('Failed to send message:', error);
//     }
//   };

//   // eslint-disable-next-line no-unused-vars
//   const getTypingIndicator = () => {
//     if (typingUsers.length === 0) return null;

//     return (
//       <div className="text-xs text-gray-500 italic">
//         Admin is typing...
//       </div>
//     );
//   }
//   return (
//     <div className="w-full">
//       <h2 className="text-[#222425] text-2xl font-glare mb-4">
//         Order Messages
//       </h2>
//       <div className="order-details-chat-container">
//         <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#F6F7F7] ">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-100 rounded-full">
//               <FcManager />
//             </div>
//             <span className="font-semibold text-lg text-gray-800">Admin</span>
//           </div>
//           {/* <span className="text-sm text-gray-500">Unread</span> */}
//         </div>

//         <div className="order-details-chat-messages flex flex-col bg-[#F6F7F7]">
//           {messages.length > 0 ? (
//             <>
//               {
//                 messages.map(message => <div className={`flex ${message.sender.id === user.id ? 'justify-end' :'items-start'} mb-2`}>
//                   <div className={`order-details-message-bubble ${message.sender.id === user.id ? 'order-details-message-sent shadow-md' : 'order-details-message-received'}  `}>
//                     {message.content}
//                     <div className={`text-right text-xs mt-1 flex items-center gap-1 justify-end ${message.sender.id === user.id ? 'text-white' :'text-gray-500'}`}>
//                       {formattedDate(message.createdAt)} <LuCheckCheck />
//                     </div>
//                   </div>
//                 </div>)
//               }
//             </>
//           ) : (
//             <div className="grid place-items-center h-full">
//               <p className="text-[#878C91] text-2xl font-glare">
//                 Start Chatting
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="flex items-center gap-3 relative mt-2 w-full rounded-4xl border border-[#DCDEDF] overflow-hidden mb-5 order-details-chat-input-container">
//           <textarea
//             className="order-details-input-field outline-none py-4 px-4 w-full bg-white flex-1"
//             type="text"
//             placeholder="Send a message..."
//             // className="input-field"
//             cols={30}
//             rows={4}
//             value={newMessage}
//             onChange={(e) => {
//               setNewMessage(e.target.value);
//               handleTyping();
//             }}
//             onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//           />
//           <button
//             onClick={sendMessage}
//             disabled={!newMessage.trim() || loading}
//             className="bg-[#008CFF] px-5 py-1.5 rounded-4xl flex items-center gap-2 text-white absolute right-4 bottom-4 font-normal cursor-pointer hover:bg-[#007de3] transition-all duration-200">
//             <span>Send</span>
//             <GoPaperAirplane />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;



import { LuCheckCheck } from "react-icons/lu";
import "./chatStyle.css";
import { GoPaperAirplane } from "react-icons/go";
import { FcManager } from "react-icons/fc";
import { useEffect, useRef, useState, useCallback } from "react";
import { getUserInfo } from "../../../../../../helpers/user/user";
import { useGetAdminQuery } from "../../../../../../redux/api/authApi";
import { chatApi } from "../../../../../../services/chatApi";
import { formattedDate } from "../../../../../../utils/function";
import { useSocket } from "../../../../../../contexts/useSocket";

const Chat = ({ orderId }) => {
  const user = getUserInfo();
  const { data: admin, isLoading } = useGetAdminQuery();
  const { socket, isConnected, connectSocket } = useSocket();

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(false);

  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const typingTimeoutRef = useRef(null);
  const chatInitializedRef = useRef(false);

  const canEmit = !!socket?.connected;

  useEffect(() => {
    if (user?.id && !isConnected) connectSocket(user);
  }, [user?.id, isConnected, connectSocket, user]);

  useEffect(() => {
    setSelectedChat(null);
    setMessages([]);
    setNewMessage("");
    setTypingUsers([]);
    setIsTyping(false);
    chatInitializedRef.current = false;
  }, [orderId]);

  const joinRoom = useCallback(
    (roomId) => {
      if (!roomId) return;
      if (!canEmit) return;
      socket.emit("join_chat_room", roomId);
    },
    [socket, canEmit]
  );

  const loadMessages = useCallback(async (chatRoomId) => {
    try {
      const chatMessages = await chatApi.getMessages(chatRoomId);
      setMessages(chatMessages || []);
    } catch (e) {
      console.error("Failed to load messages:", e);
      setMessages([]);
    }
  }, []);

  useEffect(() => {
    const initializeChat = async () => {
      if (chatInitializedRef.current) return;
      if (!orderId) return;
      if (!user?.id || !admin?.id) return;
      if (selectedChat?.id) return;

      setInitializing(true);
      chatInitializedRef.current = true;

      try {
        const chatRoom = await chatApi.getChatRoom(orderId, user.id, admin.id);

        if (chatRoom?.id) {
          setSelectedChat(chatRoom);
          await loadMessages(chatRoom.id);
          joinRoom(chatRoom.id);
        }
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        chatInitializedRef.current = false; // retry allow
      } finally {
        setInitializing(false);
      }
    };

    if (!isLoading) initializeChat();
  }, [isLoading, orderId, user?.id, admin?.id, selectedChat?.id, loadMessages, joinRoom]);

  useEffect(() => {
    if (selectedChat?.id && canEmit) joinRoom(selectedChat.id);
  }, [selectedChat?.id, canEmit, joinRoom]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (selectedChat?.id && message?.chatRoomId === selectedChat.id) {
        setMessages((prev) => [...prev, message]);
      }
    };

    const handleUserTyping = (data) => {
      if (!data?.userId) return;
      if (data.userId === user.id) return;

      if (data.chatRoomId && selectedChat?.id && data.chatRoomId !== selectedChat.id) return;

      setTypingUsers((prev) => (prev.includes(data.userId) ? prev : [...prev, data.userId]));
    };

    const handleUserStopTyping = (data) => {
      if (!data?.userId) return;

      if (data.chatRoomId && selectedChat?.id && data.chatRoomId !== selectedChat.id) return;

      setTypingUsers((prev) => prev.filter((id) => id !== data.userId));
    };

    socket.on("new_message", handleNewMessage);
    socket.on("user_typing", handleUserTyping);
    socket.on("user_stop_typing", handleUserStopTyping);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("user_typing", handleUserTyping);
      socket.off("user_stop_typing", handleUserStopTyping);
    };
  }, [socket, selectedChat?.id, user.id]);

  // typing timeout cleanup
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  const handleTyping = () => {
    if (!selectedChat?.id) return;
    if (!canEmit) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing_start", { chatRoomId: selectedChat.id, userId: user.id });
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("typing_stop", { chatRoomId: selectedChat.id, userId: user.id });
    }, 1000);
  };

  const sendMessage = async () => {
    const content = newMessage.trim();
    if (!content) return;
    if (!user?.id || !admin?.id) return;
    if (!canEmit) return;

    try {
      setLoading(true);

      // stop typing
      if (isTyping && selectedChat?.id) {
        setIsTyping(false);
        socket.emit("typing_stop", { chatRoomId: selectedChat.id, userId: user.id });
      }

      let chatRoomId = selectedChat?.id;

      // No chat yet? create for this orderId
      if (!chatRoomId) {
        const chatRoom = await chatApi.getChatRoom(orderId, user.id, admin.id);
        if (!chatRoom?.id) return;

        setSelectedChat(chatRoom);
        chatRoomId = chatRoom.id;
        joinRoom(chatRoomId);
      }

      socket.emit("send_message", {
        chatRoomId,
        senderId: user.id,
        content,
        messageType: "text",
      });

      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  const showTyping = typingUsers.length > 0;

  if (isLoading || initializing) {
    return <div>Loading chat...</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-[#222425] text-2xl font-glare mb-4">Order Messages</h2>

      <div className="order-details-chat-container">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#F6F7F7] ">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <FcManager />
            </div>
            <span className="font-semibold text-lg text-gray-800">Admin</span>
          </div>
        </div>

        <div className="order-details-chat-messages flex flex-col bg-[#F6F7F7]">
          {messages.length > 0 ? (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender.id === user.id ? "justify-end" : "items-start"} mb-2`}
                >
                  <div
                    className={`order-details-message-bubble ${message.sender.id === user.id
                        ? "order-details-message-sent shadow-md"
                        : "order-details-message-received"
                      }`}
                  >
                    {message.content}
                    <div
                      className={`text-right text-xs mt-1 flex items-center gap-1 justify-end ${message.sender.id === user.id ? "text-white" : "text-gray-500"
                        }`}
                    >
                      {formattedDate(message.createdAt)} <LuCheckCheck />
                    </div>
                  </div>
                </div>
              ))}

              {showTyping && (
                <div className="text-xs text-gray-500 italic px-2 pb-2">
                  Admin is typing...
                </div>
              )}
            </>
          ) : (
            <div className="grid place-items-center h-full">
              <p className="text-[#878C91] text-2xl font-glare">Start Chatting</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 relative mt-2 w-full rounded-4xl border border-[#DCDEDF] overflow-hidden mb-5 order-details-chat-input-container">
          <textarea
            className="order-details-input-field outline-none py-4 px-4 w-full bg-white flex-1"
            placeholder="Send a message..."
            cols={30}
            rows={4}
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || loading || !canEmit}
            className="bg-[#008CFF] px-5 py-1.5 rounded-4xl flex items-center gap-2 text-white absolute right-4 bottom-4 font-normal cursor-pointer hover:bg-[#007de3] transition-all duration-200"
          >
            <span>Send</span>
            <GoPaperAirplane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

