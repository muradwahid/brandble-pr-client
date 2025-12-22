// /* eslint-disable no-unused-vars */
// import { useCallback, useEffect, useRef, useState } from "react";
// import { PiMagnifyingGlassLight } from "react-icons/pi";
// import { ShieldIcon } from "../../../../utils/icons";
// import { getUserInfo } from "../../../../helpers/user/user";
// import { useGetAdminQuery } from "../../../../redux/api/authApi";
// import { useSocket } from "../../../../contexts/SocketContext";
// import { chatApi } from "../../../../services/chatApi";
// import { FcManager } from "react-icons/fc";
// import { GoPaperAirplane } from "react-icons/go";
// import { LuCheckCheck } from "react-icons/lu";
// import { formattedDate, formattedTime } from "../../../../utils/function";

// const MyMessages = () => {

//   const user = getUserInfo();

//   const { data: admin } = useGetAdminQuery();

//   const [orderChats, setOrderChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [typingUsers, setTypingUsers] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [searchUserChats, setSearchUserChats] = useState([]);
//   const typingTimeoutRef = useRef();

//   const { socket, isConnected, connectSocket } = useSocket();

//   // Fixed: Use useCallback to prevent unnecessary re-renders
//   const loadChats = useCallback(async () => {
//     setLoading(true);
//     try {
//         const chats = await chatApi.getUserOrderChats(user.id);
//       setOrderChats(chats);
//       setSearchUserChats(chats);

//       if (chats?.length) {
//         await selectChat(chats[0]);
//       } else {
//         setSelectedChat(null);
//         setMessages([]);
//       }
//       // selectChat(chats[0])
//     } catch (error) {
//       console.error("Failed to load chats:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [selectChat, user.id]);

//   // Fixed: Only connect socket once when component mounts
//   // useEffect(() => {
//   //   if (user && !isConnected) {
//   //     connectSocket(user);
//   //   }
//   // }, []); // Empty dependency array - only run once

//   useEffect(() => {
//     if (!user) return;
//     if (!isConnected) connectSocket(user);
//   }, [user, isConnected, connectSocket]);

//   // Fixed: Proper dependency array for loadChats
//   useEffect(() => {
//     loadChats();
//   }, [loadChats]);

//   // Socket event listeners - fixed dependencies
//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (message) => {
//       if (selectedChat && message.chatRoomId === selectedChat.id) {
//         setMessages((prev) => [...prev, message]);
//       }
//       loadChats();
//     };

//     const handleChatUpdated = () => {
//       loadChats();
//     };

//     const handleUserTyping = (data) => {
//       if (selectedChat && data.userId !== user.id) {
//         setTypingUsers((prev) => [...new Set([...prev, data.userId])]);
//       }
//     };

//     const handleUserStopTyping = (data) => {
//       setTypingUsers((prev) => prev.filter((id) => id !== data.userId));
//     };

//     socket.on("new_message", handleNewMessage);
//     socket.on("chat_updated", handleChatUpdated);
//     socket.on("admin_chat_updated", handleChatUpdated);
//     socket.on("user_typing", handleUserTyping);
//     socket.on("user_stop_typing", handleUserStopTyping);

//     return () => {
//       socket.off("new_message", handleNewMessage);
//       socket.off("chat_updated", handleChatUpdated);
//       socket.off("admin_chat_updated", handleChatUpdated);
//       socket.off("user_typing", handleUserTyping);
//       socket.off("user_stop_typing", handleUserStopTyping);
//     };
//   }, [socket, selectedChat, user.id, loadChats]);

//   const selectChat = useCallback(async (chat) => {
//     // Leave previous chat room
//     if (selectedChat && socket) {
//       socket.emit("leave_chat_room", selectedChat.id);
//     }

//     setSelectedChat(chat);
//     try {
//       const chatMessages = await chatApi.getMessages(chat.id);
//       setMessages(chatMessages);

//       // Join new chat room
//       if (socket?.connected) {
//         socket.emit("join_chat_room", chat.id);
//       }
//     } catch (error) {
//       console.error("Failed to load messages:", error);
//     }
//   });

//   const handleTyping = () => {
//     if (!socket || !selectedChat) return;

//     if (!isTyping) {
//       setIsTyping(true);
//       socket.emit("typing_start", {
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
//       socket.emit("typing_stop", {
//         chatRoomId: selectedChat.id,
//         userId: user.id,
//       });
//     }, 1000);
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim() || !selectedChat || !socket) return;

//     // Stop typing indicator
//     if (isTyping && socket) {
//       setIsTyping(false);
//       socket.emit("typing_stop", {
//         chatRoomId: selectedChat.id,
//         userId: user.id,
//       });
//     }

//     try {
//       // Send message via socket
//       socket.emit("send_message", {
//         chatRoomId: selectedChat.id,
//         senderId: user.id,
//         content: newMessage,
//         messageType: "text",
//       });

//       setNewMessage("");
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   const getOtherUser = (chat) => {
//     return (
//       chat.participants.find((p) => p.user.id !== user.id)?.order || chat.order
//     );
//   };

//   const searchUser = (e) => {
//     const val = e.target.value;
//     const filteredUsers = orderChats
//       .map((chat) => {
//         const chats = [];
//         const otherUser = getOtherUser(chat);
//         otherUser.id.toLowerCase().includes(val.toLowerCase()) &&
//           chats.push(chat);
//         return chats;
//       })
//       .flat();
//     setSearchUserChats(filteredUsers || orderChats);
//   };

//   if (loading) {
//     return <div className="w-full h-[70dvh] flex items-center justify-center text-gray-500">Loading...</div>;
//   }

//   const activeCls = "bg-[#E6F4FF] border-l-[#008CFF] border-b-[#008CFF]";

//   return (
//     <div className="xl:ml-[8%] lg:ml-[6%] md:ml-[4%] ml-[2%] ">
//       <div className="h-full flex user-message-chat-shadow">
//         {/* chat lists */}
//         <div className="w-[220px] xl:w-[350px] lg:w-[280px] md:w-[220px] md:overflow-visible overflow-hidden h-full">
//           <div className="px-3 mt-6 lg:block hidden">
//             <h2 className="text-[#1E293B] text-2xl font-glare">Messages</h2>
//             <div className="text-[#5F6368] relative my-4">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 onChange={(e) => {
//                   searchUser(e);
//                 }}
//                 className="border border-[#DCDEDF] py-1.5 px-2 pl-7 rounded-full w-full focus:outline-1 focus:outline-[#004A87]"
//               />
//               <PiMagnifyingGlassLight className="absolute text-[18px] left-1.5 top-1/2 transform -translate-y-2/4" />
//             </div>
//           </div>
//           <div>
//             {searchUserChats?.map((chat,i) => (
//               <div
//                 key={chat.id+i}
//                 onClick={() => selectChat(chat)}
//                 className={`flex border-b border-[#D1DADB] py-2.5 px-3.5 border-l-2 border-l-[#0000] cursor-pointer relative ${
//                   selectedChat?.id === chat?.id ? activeCls : ""
//                 }`}
//               >
//                 {/* {chat.id === "#653BSBE2-1" && (
//                   <div className="absolute right-2 top-1 bg-[#008CFF] font-semibold text-[11px] text-white px-1 py-[1px] rounded-full">
//                     999
//                   </div>
//                 )} */}
//                 <div className="w-[60%] max-w-[250px] flex items-center gap-2.5 cursor-pointer">
//                   <div className="bg-[#DCDEDF] h-12 flex items-center px-3.5 rounded-full">
//                     <ShieldIcon />
//                   </div>
//                   <div className="w-[140px] hidden lg:block">
//                     <p className="text-[#36383A] text-[16px] font-medium truncate">
//                       {chat.orderId}
//                     </p>
//                     <div className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[#878C91] text-[14px]">
//                       Enter your message description here...
//                     </div>
//                   </div>
//                 </div>
//                 <div className="w-[40%] hidden lg:block">
//                   <div className="w-full grid justify-end">
//                     <p className="text-[#94A3B8] text-[14px]">{formattedTime(chat.messages?.at(-1)?.createdAt)}</p>
//                     <p className="text-[#878C91] text-[14px]">{formattedDate(chat.messages?.at(-1)?.createdAt)}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
            
//           </div>
//         </div>

//         {/* messages */}
//         <div className="w-full">
//           <div>
//             <div className="message-chat-container border-l-2 border-[#D1DADB]">
//               <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-100 rounded-full">
//                     <FcManager />
//                   </div>
//                   <span className="font-semibold text-lg text-gray-800">
//                     Admin
//                   </span>
//                 </div>
//                 {selectedChat && <span className="text-sm text-gray-500">{selectedChat?.order.id}</span>}
//               </div>

//               <div className="chat-messages flex flex-col h-[60dvh]">
//                 {selectedChat ? (
//                   messages.map((message) => (
//                     <div
//                       key={message.id}
//                       className={`flex items-start mb-2 ${
//                         message.sender.id === user.id
//                           ? "justify-end"
//                           : "justify-start"
//                       }`}
//                     >
//                       <div
//                         className={`${
//                           message.sender.id === user.id
//                             ? "message-bubble message-sent shadow-md"
//                             : "message-bubble message-received"
//                         }`}
//                       >
//                         {message.content}
//                         <div className={`text-right text-xs text-gray-500 mt-1 flex items-center gap-1 justify-end ${message.sender.id === user.id ? 'text-white':''} `}>
//                           {new Date(message.createdAt).toLocaleTimeString()}
//                           <LuCheckCheck />
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="grid h-[50dvh] place-items-center">
//                     <p className="text-[#878C91] text-2xl font-glare">
//                       Start Chatting
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <div className="bg-transparent flex items-center gap-3 px-6 pb-4 relative">
//                 <textarea
//                   className=" border border-[#DCDEDF] outline-none py-3 px-5 rounded-3xl w-full bg-white flex-1"
//                   type="text"
//                   placeholder="Send a message..."
//                   // className="input-field"
//                   cols={30}
//                   rows={4}
//                   value={newMessage}
//                   onChange={(e) => {
//                     setNewMessage(e.target.value);
//                     handleTyping();
//                   }}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault();
//                       sendMessage();
//                     }
//                   }}
//                   // onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//                 />
//                 <button
//                   onClick={sendMessage}
//                   disabled={!newMessage.trim()}
//                   className="bg-[#006AC2] px-5 py-1.5 rounded-4xl flex items-center gap-2 text-white absolute right-[40px] bottom-[30px] cursor-pointer hover:bg-[#033f70] transition-all duration-200"
//                 >
//                   <span>Send</span>
//                   <GoPaperAirplane />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyMessages;


import { useCallback, useEffect, useRef, useState } from "react";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { ShieldIcon } from "../../../../utils/icons";
import { getUserInfo } from "../../../../helpers/user/user";
import { useGetAdminQuery } from "../../../../redux/api/authApi";
import { chatApi } from "../../../../services/chatApi";
import { FcManager } from "react-icons/fc";
import { GoPaperAirplane } from "react-icons/go";
import { LuCheckCheck } from "react-icons/lu";
import { formattedDate, formattedTime } from "../../../../utils/function";
import { SOCKET_EVENTS } from "../../../../contexts/socketEvents";
import { useSocket } from "../../../../contexts/useSocket";

const MyMessages = () => {
  const user = getUserInfo();
  // eslint-disable-next-line no-unused-vars
  const { data: admin } = useGetAdminQuery();
  const { socket, isConnected, connectSocket, emit } = useSocket();

  const [orderChats, setOrderChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const [searchUserChats, setSearchUserChats] = useState([]);

  const typingTimeoutRef = useRef(null);

  // message list container ref (scroll container)
  const messageListRef = useRef(null);
  const isAtBottomRef = useRef(true);

  // prevent double send
  const sendingRef = useRef(false);

  const canEmit = !!socket?.connected;

  // ---------- helpers ----------
  const onMessagesScroll = useCallback(() => {
    const el = messageListRef.current;
    if (!el) return;
    const threshold = 80; // px
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    isAtBottomRef.current = atBottom;
  }, []);

  const scrollToBottomIfNeeded = useCallback((behavior = "auto") => {
    const el = messageListRef.current;
    if (!el) return;
    if (!isAtBottomRef.current) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  // Update only one chat item locally (no refetch -> no UI jump)
  const updateChatPreview = useCallback((chatRoomId, message) => {
    if (!chatRoomId || !message) return;

    const updater = (prev) => {
      const arr = Array.isArray(prev) ? prev : [];
      const idx = arr.findIndex((c) => c?.id === chatRoomId);
      if (idx === -1) return arr;

      const copy = [...arr];
      const current = copy[idx];

      // keep only last message for preview (optional)
      const lastMsg = {
        ...(message || {}),
        createdAt: message.createdAt || new Date().toISOString(),
      };

      const newMessagesArr = Array.isArray(current.messages) ? [...current.messages] : [];
      newMessagesArr.push(lastMsg);

      copy[idx] = {
        ...current,
        messages: newMessagesArr,
        updatedAt: lastMsg.createdAt,
      };

      // move updated chat to top (better UX)
      const [item] = copy.splice(idx, 1);
      return [item, ...copy];
    };

    setOrderChats(updater);
    setSearchUserChats(updater);
  }, []);

  const selectChat = useCallback(
    async (chat) => {
      if (!chat?.id) return;

      // leave previous room
      if (selectedChat?.id) {
        emit(SOCKET_EVENTS.LEAVE_CHAT_ROOM, selectedChat.id);
      }

      setSelectedChat(chat);
      setTypingUsers([]);

      try {
        const chatMessages = await chatApi.getMessages(chat.id);
        setMessages(Array.isArray(chatMessages) ? chatMessages : []);

        // join new room
        emit(SOCKET_EVENTS.JOIN_CHAT_ROOM, chat.id);

        // after switching chat, jump to bottom
        requestAnimationFrame(() => {
          isAtBottomRef.current = true;
          scrollToBottomIfNeeded("auto");
        });
      } catch (error) {
        console.error("Failed to load messages:", error);
        setMessages([]);
      }
    },
    [emit, selectedChat?.id, scrollToBottomIfNeeded]
  );

  const loadChats = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const chats = await chatApi.getUserOrderChats(user.id);
      const safeChats = Array.isArray(chats) ? chats : [];

      setOrderChats(safeChats);
      setSearchUserChats(safeChats);

      // auto select first chat only if none selected
      if (!selectedChat && safeChats.length) {
        await selectChat(safeChats[0]);
      }

      if (!safeChats.length) {
        setSelectedChat(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to load chats:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.id, selectedChat, selectChat]);

  // ---------- connect socket ----------
  useEffect(() => {
    if (!user?.id) return;
    if (!isConnected) connectSocket(user);
  }, [user?.id, isConnected, connectSocket, user]);

  // ---------- initial load ----------
  useEffect(() => {
    loadChats();
  }, [loadChats]);

  // ---------- socket listeners ----------
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (!message?.chatRoomId) return;

      // update preview (sidebar) locally (NO refetch)
      updateChatPreview(message.chatRoomId, message);

      // only push message if it's current room
      if (selectedChat?.id && message.chatRoomId === selectedChat.id) {
        setMessages((prev) => [...prev, message]);

        // autoscroll only if user already at bottom
        requestAnimationFrame(() => scrollToBottomIfNeeded("smooth"));
      }
    };

    const handleChatUpdated = (chatRoom) => {
      // OPTIONAL: local merge if server sends full updated chat
      // if not, do nothing (avoid refetch/jump)
      if (!chatRoom?.id) return;

      setOrderChats((prev) => {
        const idx = prev.findIndex((c) => c.id === chatRoom.id);
        if (idx === -1) return prev;
        const copy = [...prev];
        copy[idx] = { ...copy[idx], ...chatRoom };
        return copy;
      });

      setSearchUserChats((prev) => {
        const idx = prev.findIndex((c) => c.id === chatRoom.id);
        if (idx === -1) return prev;
        const copy = [...prev];
        copy[idx] = { ...copy[idx], ...chatRoom };
        return copy;
      });
    };

    const handleUserTyping = (data) => {
      if (!selectedChat?.id) return;
      if (data?.chatRoomId !== selectedChat.id) return;
      if (data?.userId === user.id) return;

      setTypingUsers((prev) => (prev.includes(data.userId) ? prev : [...prev, data.userId]));
    };

    const handleUserStopTyping = (data) => {
      if (!selectedChat?.id) return;
      if (data?.chatRoomId !== selectedChat.id) return;

      setTypingUsers((prev) => prev.filter((id) => id !== data.userId));
    };

    socket.on(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
    socket.on(SOCKET_EVENTS.CHAT_UPDATED, handleChatUpdated);
    socket.on(SOCKET_EVENTS.ADMIN_CHAT_UPDATED, handleChatUpdated);
    socket.on(SOCKET_EVENTS.USER_TYPING, handleUserTyping);
    socket.on(SOCKET_EVENTS.USER_STOP_TYPING, handleUserStopTyping);

    return () => {
      socket.off(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
      socket.off(SOCKET_EVENTS.CHAT_UPDATED, handleChatUpdated);
      socket.off(SOCKET_EVENTS.ADMIN_CHAT_UPDATED, handleChatUpdated);
      socket.off(SOCKET_EVENTS.USER_TYPING, handleUserTyping);
      socket.off(SOCKET_EVENTS.USER_STOP_TYPING, handleUserStopTyping);
    };
  }, [socket, selectedChat?.id, user.id, updateChatPreview, scrollToBottomIfNeeded]);

  // ---------- typing emit with debounce ----------
  const handleTyping = useCallback(() => {
    if (!selectedChat?.id) return;
    if (!canEmit) return;

    if (!isTyping) {
      setIsTyping(true);
      emit(SOCKET_EVENTS.TYPING_START, { chatRoomId: selectedChat.id, userId: user.id });
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      emit(SOCKET_EVENTS.TYPING_STOP, { chatRoomId: selectedChat.id, userId: user.id });
    }, 800);
  }, [emit, isTyping, selectedChat?.id, canEmit, user.id]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  // ---------- send message (no full rerender/jump) ----------
  const sendMessage = useCallback(() => {
    if (sendingRef.current) return;

    const content = newMessage.trim();
    if (!content) return;
    if (!selectedChat?.id) return;
    if (!canEmit) return;

    sendingRef.current = true;

    try {
      // stop typing
      if (isTyping) {
        setIsTyping(false);
        emit(SOCKET_EVENTS.TYPING_STOP, { chatRoomId: selectedChat.id, userId: user.id });
      }

      // emit message
      emit(SOCKET_EVENTS.SEND_MESSAGE, {
        chatRoomId: selectedChat.id,
        senderId: user.id,
        content,
        messageType: "text",
      });

      setNewMessage("");

      // keep bottom if user already at bottom
      requestAnimationFrame(() => scrollToBottomIfNeeded("smooth"));
    } finally {
      // unlock quickly; server ack-based unlock is better but this prevents double-fire
      setTimeout(() => {
        sendingRef.current = false;
      }, 200);
    }
  }, [newMessage, selectedChat?.id, isTyping, emit, user.id, canEmit, scrollToBottomIfNeeded]);

  // ---------- search ----------
  const searchUser = (e) => {
    const val = e.target.value?.toLowerCase() || "";
    if (!val) {
      setSearchUserChats(orderChats);
      return;
    }

    const filtered = orderChats.filter((chat) =>
      (chat?.orderId || "").toLowerCase().includes(val)
    );
    setSearchUserChats(filtered);
  };

  if (loading) {
    return (
      <div className="w-full h-[70dvh] flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  const activeCls = "bg-[#E6F4FF] border-l-[#008CFF] border-b-[#008CFF]";

  return (
    <div className="xl:ml-[8%] lg:ml-[6%] md:ml-[4%] ml-[2%] ">
      <div className="h-full flex user-message-chat-shadow">
        {/* chat lists */}
        <div className="w-[220px] xl:w-[350px] lg:w-[280px] md:w-[220px] md:overflow-visible overflow-hidden h-full">
          <div className="px-3 mt-6 lg:block hidden">
            <h2 className="text-[#1E293B] text-2xl font-glare">Messages</h2>

            <div className="text-[#5F6368] relative my-4">
              <input
                type="text"
                placeholder="Search by orderId..."
                onChange={searchUser}
                className="border border-[#DCDEDF] py-1.5 px-2 pl-7 rounded-full w-full focus:outline-1 focus:outline-[#004A87]"
              />
              <PiMagnifyingGlassLight className="absolute text-[18px] left-1.5 top-1/2 transform -translate-y-2/4" />
            </div>
          </div>

          <div>
            {searchUserChats?.map((chat, i) => (
              <div
                key={`${chat.id}-${i}`}
                onClick={() => selectChat(chat)}
                className={`flex border-b border-[#D1DADB] py-2.5 px-3.5 border-l-2 border-l-[#0000] cursor-pointer relative ${selectedChat?.id === chat?.id ? activeCls : ""
                  }`}
              >
                <div className="w-[60%] max-w-[250px] flex items-center gap-2.5 cursor-pointer">
                  <div className="bg-[#DCDEDF] h-12 flex items-center px-3.5 rounded-full">
                    <ShieldIcon />
                  </div>

                  <div className="w-[140px] hidden lg:block">
                    <p className="text-[#36383A] text-[16px] font-medium truncate">
                      {chat.orderId}
                    </p>
                    <div className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[#878C91] text-[14px]">
                      {chat?.messages?.at(-1)?.content || "No messages yet"}
                    </div>
                  </div>
                </div>

                <div className="w-[40%] hidden lg:block">
                  <div className="w-full grid justify-end">
                    <p className="text-[#94A3B8] text-[14px]">
                      {formattedTime(chat.messages?.at(-1)?.createdAt)}
                    </p>
                    <p className="text-[#878C91] text-[14px]">
                      {formattedDate(chat.messages?.at(-1)?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* messages */}
        <div className="w-full">
          <div className="message-chat-container border-l-2 border-[#D1DADB]">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <FcManager />
                </div>
                <span className="font-semibold text-lg text-gray-800">Admin</span>
              </div>
              {selectedChat && (
                <span className="text-sm text-gray-500">{selectedChat?.order?.id}</span>
              )}
            </div>

            <div
              className="chat-messages flex flex-col h-[60dvh] overflow-y-auto"
              ref={messageListRef}
              onScroll={onMessagesScroll}
            >
              {selectedChat ? (
                <>
                  {messages.map((message) => {
                    const isMine = message?.sender?.id === user.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex items-start mb-2 ${isMine ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`${isMine
                              ? "message-bubble message-sent shadow-md"
                              : "message-bubble message-received"
                            }`}
                        >
                          {message.content}

                          <div
                            className={`text-right text-xs mt-1 flex items-center gap-1 justify-end ${isMine ? "text-white" : "text-gray-500"
                              }`}
                          >
                            {formattedTime(message.createdAt)}
                            <LuCheckCheck />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {typingUsers.length > 0 && (
                    <div className="text-sm text-gray-500 px-4 py-2">Admin typing...</div>
                  )}
                </>
              ) : (
                <div className="grid h-[50dvh] place-items-center">
                  <p className="text-[#878C91] text-2xl font-glare">Start Chatting</p>
                </div>
              )}
            </div>

            <div className="bg-transparent flex items-center gap-3 px-6 pb-4 relative">
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
                disabled={!newMessage.trim()}
                className="bg-[#006AC2] px-5 py-1.5 rounded-4xl flex items-center gap-2 text-white absolute right-[40px] bottom-[30px] cursor-pointer hover:bg-[#033f70] transition-all duration-200"
              >
                <span>Send</span>
                <GoPaperAirplane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMessages;

