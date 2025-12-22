// import "./chatStyle.css";
// import { GoPaperAirplane } from "react-icons/go";
// import { FcManager } from "react-icons/fc";
// import { getUserInfo } from "../../../../helpers/user/user";
// import { LuCheckCheck } from "react-icons/lu";
// import { useEffect, useRef, useState } from "react";
// // import { useSocket } from "../../../../contexts/SocketContext";
// import { chatApi } from "../../../../services/chatApi";
// import { useGetAdminQuery } from "../../../../redux/api/authApi";
// import { formatDateSmart } from "../../../../utils/function";
// import { useSocket } from "../../../../contexts/useSocket";

// const Chat = () => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(false);
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
//         const chatRoom = await chatApi.getChatRoom(null, user.id, admin.id);

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
//   }, [isLoading,socket, isConnected, selectedChat]);

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

//   const getTypingIndicator = () => {
//     if (typingUsers.length === 0) return null;

//     return (
//       <div className="text-xs text-gray-500 italic">
//         Admin is typing...
//       </div>
//     );
//   };


//   if (isLoading || initializing) {
//     return <div>Loading chat...</div>;
//   }

//   return (
//     <div className="p-4">
//       <div className="chat-container">
//         <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white rounded-t-xl md:rounded-t-lg">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-100 rounded-full">
//               <FcManager />
//             </div>
//             <span className="font-semibold text-lg text-gray-800">Admin</span>
//           </div>
//           {/* <span className="text-sm text-gray-500">Unread</span> */}
//         </div>
//         <div className="chat-messages flex flex-col">
//           {
//             messages.length === 0 ? <p>No messages yet</p> : messages.map(message => (
//               <div
//                 key={message.id}
//                 className={`flex ${message.sender.id === user.id ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div className={`${message.sender.id === user.id ? 'message-bubble message-sent shadow-md' : 'message-bubble message-received'}`}>
//                   {message.content}
//                   <div className={`text-right text-xs  mt-1 flex items-center gap-1 justify-end ${message.sender.id === user.id ?'text-white' :'text-gray-400'}`}>
//                     {formatDateSmart(message.createdAt)} <LuCheckCheck />
//                   </div>
//                 </div>
//               </div>
//             ))
//           }
//           {getTypingIndicator()}
//         </div>

//         <div className="bg-transparent flex items-center gap-3 px-6 pb-6 relative">
//           <textarea
//             className=" border border-[#DCDEDF] outline-none py-3 px-5 rounded-3xl w-full bg-white flex-1"
//             type="text"
//             placeholder="Send a message..."
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
//             className="bg-[#006AC2] px-5 py-1.5 rounded-4xl flex items-center gap-2 text-white absolute right-[40px] bottom-[37px] cursor-pointer hover:bg-[#033f70] transition-all duration-200"
//           >
//             <span>Send</span>
//             <GoPaperAirplane />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;


import "./chatStyle.css";
import { GoPaperAirplane } from "react-icons/go";
import { FcManager } from "react-icons/fc";
import { LuCheckCheck } from "react-icons/lu";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";

import { getUserInfo } from "../../../../helpers/user/user";
import { chatApi } from "../../../../services/chatApi";
import { useGetAdminQuery } from "../../../../redux/api/authApi";
import { formatDateSmart } from "../../../../utils/function";
import { useSocket } from "../../../../contexts/useSocket";
import { SOCKET_EVENTS } from "../../../../contexts/socketEvents";

const Chat = () => {
  const user = getUserInfo();
  const { data: admin, isLoading } = useGetAdminQuery();
  const { socket, isConnected, connectSocket } = useSocket();

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [initializing, setInitializing] = useState(false);
  const [loading, setLoading] = useState(false);

  // typing
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  // init guard + prevent double send
  const chatInitializedRef = useRef(false);
  const sendingRef = useRef(false);

  // scroll
  const listRef = useRef(null);
  const isAtBottomRef = useRef(true);

  const canEmit = useMemo(() => !!socket?.connected, [socket?.connected]);

  // -------------------------
  // Scroll helpers
  // -------------------------
  const onScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const threshold = 80;
    isAtBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
  }, []);

  const scrollToBottomIfNeeded = useCallback((behavior = "smooth") => {
    const el = listRef.current;
    if (!el) return;
    if (!isAtBottomRef.current) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  useEffect(() => {
    // new message এ bottom এ থাকলে নিচে নামাবে
    scrollToBottomIfNeeded("smooth");
  }, [messages.length, scrollToBottomIfNeeded]);

  // -------------------------
  // Socket connect (only once)
  // -------------------------
  useEffect(() => {
    if (!user?.id) return;
    if (!isConnected) connectSocket(user);
  }, [user?.id, isConnected, connectSocket, user]);

  // -------------------------
  // API: load messages
  // -------------------------
  const loadMessages = useCallback(async (chatRoomId) => {
    try {
      const chatMessages = await chatApi.getMessages(chatRoomId);
      setMessages(Array.isArray(chatMessages) ? chatMessages : []);
      // open করলে bottom এ রাখি
      requestAnimationFrame(() => {
        isAtBottomRef.current = true;
        scrollToBottomIfNeeded("auto");
      });
    } catch (error) {
      console.error("Failed to load messages:", error);
      setMessages([]);
    }
  }, [scrollToBottomIfNeeded]);

  // -------------------------
  // Room join helper
  // -------------------------
  const joinRoom = useCallback(
    (roomId) => {
      if (!roomId || !canEmit) return;
      socket.emit(SOCKET_EVENTS.JOIN_CHAT_ROOM, roomId);
    },
    [socket, canEmit]
  );

  // -------------------------
  // Typing stop helper
  // -------------------------
  const emitTypingStop = useCallback(
    (roomId) => {
      if (!roomId || !canEmit) return;
      socket.emit(SOCKET_EVENTS.TYPING_STOP, { chatRoomId: roomId, userId: user.id });
    },
    [socket, canEmit, user.id]
  );

  // -------------------------
  // Initialize chat (1 time)
  // -------------------------
  useEffect(() => {
    const initializeChat = async () => {
      if (chatInitializedRef.current) return;
      if (!user?.id || !admin?.id) return;
      if (selectedChat?.id) return;

      setInitializing(true);
      chatInitializedRef.current = true;

      try {
        const chatRoom = await chatApi.getChatRoom(null, user.id, admin.id);
        if (chatRoom?.id) {
          setSelectedChat(chatRoom);
          await loadMessages(chatRoom.id);
          joinRoom(chatRoom.id);
        }
      } catch (e) {
        console.error("Failed to initialize chat:", e);
        chatInitializedRef.current = false; // retry possible
      } finally {
        setInitializing(false);
      }
    };

    if (!isLoading) initializeChat();
  }, [isLoading, user?.id, admin?.id, selectedChat?.id, loadMessages, joinRoom]);

  // socket late connect হলে room join
  useEffect(() => {
    if (!selectedChat?.id) return;
    if (canEmit) joinRoom(selectedChat.id);
  }, [selectedChat?.id, canEmit, joinRoom]);

  // -------------------------
  // Socket listeners (single place)
  // -------------------------
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (!message) return;
      if (selectedChat?.id && message.chatRoomId === selectedChat.id) {
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

    socket.on(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
    socket.on(SOCKET_EVENTS.USER_TYPING, handleUserTyping);
    socket.on(SOCKET_EVENTS.USER_STOP_TYPING, handleUserStopTyping);

    return () => {
      socket.off(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
      socket.off(SOCKET_EVENTS.USER_TYPING, handleUserTyping);
      socket.off(SOCKET_EVENTS.USER_STOP_TYPING, handleUserStopTyping);
    };
  }, [socket, selectedChat?.id, user.id]);

  // cleanup typing timeout
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  // -------------------------
  // Typing handler (debounce)
  // -------------------------
  const handleTyping = useCallback(() => {
    if (!selectedChat?.id || !canEmit) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit(SOCKET_EVENTS.TYPING_START, { chatRoomId: selectedChat.id, userId: user.id });
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      emitTypingStop(selectedChat.id);
    }, 800);
  }, [selectedChat?.id, canEmit, isTyping, socket, user.id, emitTypingStop]);

  // -------------------------
  // Send message (prevent double)
  // -------------------------
  const sendMessage = useCallback(async () => {
    if (sendingRef.current) return;

    const content = newMessage.trim();
    if (!content) return;
    if (!user?.id || !admin?.id) return;
    if (!canEmit) return;

    sendingRef.current = true;

    try {
      setLoading(true);

      // stop typing
      if (isTyping && selectedChat?.id) {
        setIsTyping(false);
        emitTypingStop(selectedChat.id);
      }

      let chatRoomId = selectedChat?.id;

      // create chat if missing
      if (!chatRoomId) {
        const chatRoom = await chatApi.getChatRoom(null, user.id, admin.id);
        if (!chatRoom?.id) return;

        setSelectedChat(chatRoom);
        chatRoomId = chatRoom.id;
        joinRoom(chatRoomId);
      }

      socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
        chatRoomId,
        senderId: user.id,
        content,
        messageType: "text",
      });

      setNewMessage("");
      requestAnimationFrame(() => scrollToBottomIfNeeded("smooth"));
    } catch (e) {
      console.error("Failed to send message:", e);
    } finally {
      setLoading(false);
      // ছোট delay রাখলে keydown+click race কমে
      setTimeout(() => (sendingRef.current = false), 150);
    }
  }, [
    newMessage,
    user?.id,
    admin?.id,
    canEmit,
    isTyping,
    selectedChat?.id,
    emitTypingStop,
    joinRoom,
    socket,
    scrollToBottomIfNeeded,
  ]);

  const typingIndicator = typingUsers.length > 0 ? (
    <div className="text-xs text-gray-500 italic">Admin is typing...</div>
  ) : null;

  if (isLoading || initializing) return <div>Loading chat...</div>;

  return (
    <div className="p-4">
      <div className="chat-container">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white rounded-t-xl md:rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <FcManager />
            </div>
            <span className="font-semibold text-lg text-gray-800">Admin</span>
          </div>
        </div>

        {/* ✅ scroll container fixed */}
        <div
          ref={listRef}
          onScroll={onScroll}
          className="chat-messages flex flex-col overflow-y-auto h-[60dvh]"
        >
          {messages.length === 0 ? (
            <p>No messages yet</p>
          ) : (
            messages.map((message) => {
              const mine = message?.sender?.id === user.id;
              return (
                <div
                  key={message.id}
                  className={`flex ${mine ? "justify-end" : "justify-start"}`}
                >
                  <div className={`${mine ? "message-bubble message-sent shadow-md" : "message-bubble message-received"}`}>
                    {message.content}
                    <div className={`text-right text-xs mt-1 flex items-center gap-1 justify-end ${mine ? "text-white" : "text-gray-400"}`}>
                      {formatDateSmart(message.createdAt)} <LuCheckCheck />
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {typingIndicator}
        </div>

        <div className="bg-transparent flex items-center gap-3 px-6 pb-6 relative">
          <textarea
            className="border border-[#DCDEDF] outline-none py-3 px-5 rounded-3xl w-full bg-white flex-1"
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
            className={`bg-[#006AC2] px-5 py-1.5 rounded-4xl flex items-center gap-2 text-white absolute right-[40px] bottom-[37px] cursor-pointer hover:bg-[#033f70] transition-all duration-200 ${loading ?'opacity-50':''} `}
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
