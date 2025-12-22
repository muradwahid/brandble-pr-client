// import { useCallback, useEffect, useRef, useState } from "react";
// import { PiMagnifyingGlassLight } from "react-icons/pi";
// import { ShieldIcon } from "../../../../utils/icons";
// import { getUserInfo } from "../../../../helpers/user/user";
// // import { useSocket } from "../../../../contexts/SocketContext";
// import { chatApi } from "../../../../services/chatApi";
// import { GoPaperAirplane } from "react-icons/go";
// import { LuCheckCheck } from "react-icons/lu";
// import { Link } from "react-router";
// import { useSocket } from "../../../../contexts/useSocket";
// import { SOCKET_EVENTS } from "../../../../contexts/socketEvents";


// const Messages = () => {
//   const user = getUserInfo();
  
//   const [search, setSearch] = useState();
//  const [activeTab, setActiveTab] = useState('users');
//     const [userChats, setUserChats] = useState([]);
//     const [orderChats, setOrderChats] = useState([]);
//     const [selectedChat, setSelectedChat] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     // eslint-disable-next-line no-unused-vars
//     const [loading, setLoading] = useState(false);
//     const [typingUsers, setTypingUsers] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [searchUserChats, setSearchUserChats] = useState([]);
//   // eslint-disable-next-line no-unused-vars
//   const [searchOrderChats, setSearchOrderChats] = useState([]);
//     const typingTimeoutRef = useRef();
  
//     const { socket, isConnected, connectSocket } = useSocket();
  
//     // Fixed: Use useCallback to prevent unnecessary re-renders
//     const loadChats = useCallback(async () => {
//       setLoading(true);
//       try {
//         if (activeTab === 'users') {
//           const chats = await chatApi.getUserChats(user.id);
//           setUserChats(chats);
//           setSearchUserChats(chats);
//         } else {
//           const chats = await chatApi.getOrderChats(user.id);
//           setOrderChats(chats);
//         }
//       } catch (error) {
//         console.error('Failed to load chats:', error);
//       } finally {
//         setLoading(false);
//       }
//     }, [user.id, activeTab]);
  
//     // Fixed: Only connect socket once when component mounts
//     useEffect(() => {
//       if (user && !isConnected) {
//         connectSocket(user);
//       }
//     }, []); // Empty dependency array - only run once
  
//     // Fixed: Proper dependency array for loadChats
//     useEffect(() => {
//       loadChats();
//     }, [loadChats]);
  
//     // Socket event listeners - fixed dependencies
//     useEffect(() => {
//       if (!socket) return;
  
//       const handleNewMessage = (message) => {
//         if (selectedChat && message.chatRoomId === selectedChat.id) {
//           setMessages(prev => [...prev, message]);
//         }
//         loadChats();
//       };
  
//       const handleChatUpdated = () => {
//         loadChats();
//       };
  
//       const handleUserTyping = (data) => {
//         if (selectedChat && data.userId !== user.id) {
//           setTypingUsers(prev => [...new Set([...prev, data.userId])]);
//         }
//       };
  
//       const handleUserStopTyping = (data) => {
//         setTypingUsers(prev => prev.filter(id => id !== data.userId));
//       };
  
//       socket.on(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
//       socket.on(SOCKET_EVENTS.CHAT_UPDATED, handleChatUpdated);
//       socket.on(SOCKET_EVENTS.ADMIN_CHAT_UPDATED, handleChatUpdated);
//       socket.on(SOCKET_EVENTS.USER_TYPING, handleUserTyping);
//       socket.on(SOCKET_EVENTS.USER_STOP_TYPING, handleUserStopTyping);
  
//       return () => {
//         socket.off(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
//         socket.off(SOCKET_EVENTS.CHAT_UPDATED, handleChatUpdated);
//         socket.off('admin_chat_updated', handleChatUpdated);
//         socket.off(SOCKET_EVENTS.USER_TYPING, handleUserTyping);
//         socket.off(SOCKET_EVENTS.USER_STOP_TYPING, handleUserStopTyping);
//       };
//     }, [socket, selectedChat, user.id, loadChats]);
  
//     const selectChat = async (chat) => {
//       // Leave previous chat room
//       if (selectedChat && socket) {
//         socket.emit('leave_chat_room', selectedChat.id);
//       }
  
//       setSelectedChat(chat);
//       try {
//         const chatMessages = await chatApi.getMessages(chat.id);
//         setMessages(chatMessages);
  
//         // Join new chat room
//         if (socket) {
//           socket.emit('join_chat_room', chat.id);
//         }
//       } catch (error) {
//         console.error('Failed to load messages:', error);
//       }
//     };
  
//     const handleTyping = () => {
//       if (!socket || !selectedChat) return;
  
//       if (!isTyping) {
//         setIsTyping(true);
//         socket.emit('typing_start', {
//           chatRoomId: selectedChat.id,
//           userId: user.id,
//         });
//       }
  
//       // Clear existing timeout
//       if (typingTimeoutRef.current) {
//         clearTimeout(typingTimeoutRef.current);
//       }
  
//       // Set new timeout to stop typing indicator
//       typingTimeoutRef.current = setTimeout(() => {
//         setIsTyping(false);
//         socket.emit('typing_stop', {
//           chatRoomId: selectedChat.id,
//           userId: user.id,
//         });
//       }, 1000);
//     };
  
//     const sendMessage = async () => {
//       if (!newMessage.trim() || !selectedChat || !socket) return;
  
//       // Stop typing indicator
//       if (isTyping && socket) {
//         setIsTyping(false);
//         socket.emit('typing_stop', {
//           chatRoomId: selectedChat.id,
//           userId: user.id,
//         });
//       }
  
//       try {
//         // Send message via socket
//         socket.emit('send_message', {
//           chatRoomId: selectedChat.id,
//           senderId: user.id,
//           content: newMessage,
//           messageType: 'text'
//         });
  
//         setNewMessage('');
//       } catch (error) {
//         console.error('Failed to send message:', error);
//       }
//     };
  
//     const getOtherUser = (chat) => {
//       return chat.participants.find(p => p.user.id !== user.id)?.user || chat.user;
//   };
  
//   const searchUser = (e) => {
//     const val = e.target.value;
//     const filteredUsers = userChats.map(chat => {
//       const chats = [];
//       const otherUser = getOtherUser(chat);
//       otherUser.name.toLowerCase().includes(val.toLowerCase()) && chats.push(chat);
//       return chats;
//     }).flat();
//     setSearchUserChats(filteredUsers || userChats);
//   }
  
// // const searchOrder = () => {
// //   const filteredOrders = orderChats.map(chat => {
// //     const chats = [];
// //     const otherUser = getOtherUser(chat);
// //     otherUser.id.toLowerCase().includes(search.toLowerCase()) && chats.push(chat);
// //     return chats;
// //   }).flat();
// //   setOrderChats(filteredOrders);
// // }
  
//     // eslint-disable-next-line no-unused-vars
//     const getLastMessage = (chat) => {
//       return chat.messages[0]?.content || 'No messages yet';
//     };
  
//     // eslint-disable-next-line no-unused-vars
//     const getTypingIndicator = () => {
//       if (typingUsers.length === 0) return null;
  
//       const typingUser = getOtherUser(selectedChat);
//       return (
//         <div className="text-xs text-gray-500 italic">
//           {typingUser?.name} is typing...
//         </div>
//       );
//   };
  
//   useEffect(() => {
//     async function loadInitialChat() {
//       try {
//         if (activeTab === 'users') {
//           if (userChats && userChats.length > 0) {
//             const chat = userChats[0];
//             setSelectedChat(chat);
//             selectChat(chat)
//             const chatMessages = await chatApi.getMessages(chat.id);
//             setMessages(chatMessages);
//           } else {
//             setSelectedChat(null);
//             setMessages([]);
//           }
//         } else if (activeTab === 'orders') {
//           if (orderChats && orderChats.length > 0) {
//             const chat = orderChats[0];
//             setSelectedChat(chat);
//             selectChat(chat)
//             const chatMessages = await chatApi.getMessages(chat.id);
//             setMessages(chatMessages);
//           } else {
//             setSelectedChat(null);
//             setMessages([]);
//           }
//         }
//       } catch (error) {
//         console.error('Failed to load initial chat messages:', error);
//       }
//     }

//     loadInitialChat();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userChats, orderChats, activeTab])
  
//   console.log('selectedChat', selectedChat?.order?.orderType);

//   const redirectToOrderDetails = () => {
//     if (selectedChat && selectedChat?.order?.orderType) {
//       const redirectOrder = selectedChat.order.orderType==="wonArticle";
//       return redirectOrder ? `/admin/orders/${selectedChat.order.id}` : `/admin/orders/${selectedChat.order.id}/details`;
//     }
//   };
  
//   console.log(redirectToOrderDetails(), selectChat?.order?.orderType);

//   const activeCls = "bg-[#E6F4FF] border-l-[#008CFF] border-b-[#008CFF]";
//   return (
//     <div className="">
//       <div className="h-full flex">
//         {/* chat lists */}
//         <div className="w-[220px] xl:w-[450px] lg:w-[280px] md:w-[220px] md:overflow-visible overflow-hidden h-full">
//           <div className="px-3 mt-6 lg:block hidden">
//             <div className="flex items-center border border-[#DCDEDF] p-1 rounded-4xl font-poppins">
//               <p
//                 className={`text-[#B2B5B8] px-3 py-1.5 rounded-4xl whitespace-nowrap cursor-pointer ${
//                   activeTab === "users" ? "bg-[#222425] text-white" : ""
//                 }`}
//                 onClick={() => setActiveTab("users")}
//               >
//                 User Messages
//               </p>
//               <p
//                 className={`text-[#B2B5B8] px-3 py-1.5 rounded-4xl whitespace-nowrap cursor-pointer ${
//                   activeTab === "orders"
//                     ? "bg-[#222425] text-white"
//                     : ""
//                 }`}
//                 onClick={() => setActiveTab("orders")}
//               >
//                 Order Conversation
//               </p>
//             </div>
//             <div className="text-[#5F6368] relative my-4">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 onChange={(e) => {
//                   setSearch(e.target.value)
//                   searchUser(e)
//                 }}
//                 value={search}
//                 className="border border-[#DCDEDF] py-1.5 px-2 pl-7 rounded-full w-full focus:outline-1 focus:outline-[#004A87] placeholder:text-[#5F6368]"
//               />
//               <PiMagnifyingGlassLight className="absolute text-[18px] left-1.5 top-1/2 transform -translate-y-2/4" />
//             </div>
//           </div>
//           <div>
//             {activeTab === 'users' && searchUserChats.map(chat => <div
//               key={chat.id}
//               onClick={() => selectChat(chat)}
//               className={`flex border-b border-[#D1DADB] py-2.5 px-3.5 border-l-2 border-l-[#0000] cursor-pointer gap-4 relative ${selectedChat?.id === chat?.id ? activeCls : ""
//                 }`}
//             >


//               {/* {item.id === "#653BSBE2-12" && (
//                 <div className="absolute right-2 top-1 bg-[#008CFF] font-semibold text-[11px] text-white px-1 py-[1px] rounded-full">
//                   999
//                 </div>
//               )} */}
//               <div className="w-[60%] max-w-[250px] flex items-center gap-2.5 cursor-pointer">
//                   <div className="h-[48px] w-[48px] bg-[#F6F7F7] rounded-full overflow-hidden">
//                   <img className="h-[48px] w-[48px]" src={getOtherUser(chat)?.image} alt="" />
//                   </div>
//                 <div className="w-[140px] hidden lg:block">
//                   <p className="text-[#36383A]">{getOtherUser(chat)?.name }</p>
//                   <div className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[#878C91] text-[14px]">
//                     Enter your message description here...
//                   </div>
//                 </div>
//               </div>
//               {/* <div className="w-[40%] hidden lg:block">
//                 <div className="w-full grid justify-end gap-1.5">
//                   <p className="text-[#94A3B8] text-[14px] text-end">12:25</p>
//                   <p className="text-[#878C91] text-[14px]">17/04/2025</p>
//                 </div>
//               </div> */}
//             </div>)}

//             {
//               activeTab === 'orders' && orderChats.map(chat => <div
//                 key={chat.id}
//                 onClick={() => selectChat(chat)}
//                 className={`flex border-b border-[#D1DADB] py-2.5 px-3.5 border-l-2 border-l-[#0000] cursor-pointer gap-4 relative ${selectedChat?.id === chat?.id ? activeCls : ""
//                   }`}
//               >


//                 {/* {item.id === "#653BSBE2-12" && (
//                 <div className="absolute right-2 top-1 bg-[#008CFF] font-semibold text-[11px] text-white px-1 py-[1px] rounded-full">
//                   999
//                 </div>
//               )} */}
//                 <div className="w-[60%] max-w-[250px] flex items-center gap-2.5 cursor-pointer">
//                     <div className="bg-[#DCDEDF] h-12 flex items-center px-3.5 rounded-full">
//                       <ShieldIcon />
//                     </div>
//                   <div className="w-[140px] hidden lg:block">
//                     <p className="text-[#36383A] font-normal truncate">{selectedChat && getOtherUser(selectedChat)?.id}</p>
//                     <div className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[#878C91] text-[14px]">
//                       Enter your message description here...
//                     </div>
//                   </div>
//                 </div>
//                 {/* <div className="w-[40%] hidden lg:block">
//                   <div className="w-full grid justify-end gap-1.5">
//                     <p className="text-[#94A3B8] text-[14px] text-end">12:25</p>
//                     <p className="text-[#878C91] text-[14px]">17/04/2025</p>
//                   </div>
//                 </div> */}
//               </div>)
//             }
//           </div>
//         </div>

//         {/* messages */}
//         <div className="w-full">
//               <div className="message-chat-container border-l-1 border-[#D1DADB]">
//                   <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
//                     {activeTab === "users" ? (
//                       <div className="flex items-center gap-3">
//                         <div className=" bg-blue-100 rounded-full h-[48px] w-[48px] overflow-hidden">
//                     <img src={selectedChat ?getOtherUser(selectedChat)?.image :''} className="h-[48px] w-[48px]" alt="" />
//                         </div>
//                         <span className="font-medium text-[#222425] font-poppins">
//                         {selectedChat && getOtherUser(selectedChat)?.name }
//                         </span>
//                       </div>
//                     ) : (
//                       <div>
//                     <p className="text-[#222425] font-medium">Order ID: {selectedChat && getOtherUser(selectedChat)?.id}</p>
//                       </div>
//                     )}
//                     {activeTab === "orders" && (
//                 <Link to={redirectToOrderDetails()} className=" text-[#B2B5B8] underline cursor-pointer">
//                         See Order Details
//                       </Link>
//                     )}
//                   </div>
          
//             <div className="chat-messages flex flex-col w-full h-[60dvh]">
//               {
//                 selectedChat ? messages.map((message,idx) => <div key={idx} className={`flex items-start mb-2 ${message.sender.id === user.id ? 'justify-end' : 'justify-start'}`}>
//                   <div className={`${message.sender.id === user.id ? 'message-bubble message-sent shadow-md' : 'message-bubble message-received'}`}>
//                     {message.content}
//                     <div className="text-right text-xs text-gray-500 mt-1 flex items-center gap-1 justify-end">
//                       {new Date(message.createdAt).toLocaleTimeString()} <LuCheckCheck />
//                     </div>
//                   </div>

//                 </div>)
                
//                   : <div className="grid h-[50dvh] place-items-center">
//                     <p className="text-[#878C91] text-2xl font-glare">
//                       No messages yet
//                     </p>
//                   </div>

//               }
                  
//                   </div>
          
//                   <div className="bg-transparent flex items-center gap-3 px-6 pb-4 relative">
//                     <textarea
//                       className=" border border-[#DCDEDF] outline-none py-3 px-5 rounded-3xl w-full bg-white flex-1"
//                       type="text"
//                       placeholder="Send a message..."
//                       cols={30}
//                 rows={4}
//                 value={newMessage}
//                 onChange={(e) => {
//                   setNewMessage(e.target.value);
//                   handleTyping();
//                 }}
//                 onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//                     />
//               <button onClick={sendMessage}
//                 disabled={!newMessage.trim()} className="bg-[#006AC2] px-5 py-1.5 rounded-4xl flex items-center gap-2 text-white absolute right-[40px] bottom-[30px] cursor-pointer hover:bg-[#033f70] transition-all duration-200">
//                       <span>Send</span>
//                       <GoPaperAirplane />
//                     </button>
//                   </div>
//                 </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;


import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { ShieldIcon } from "../../../../utils/icons";
import { getUserInfo } from "../../../../helpers/user/user";
import { chatApi } from "../../../../services/chatApi";
import { GoPaperAirplane } from "react-icons/go";
import { LuCheckCheck } from "react-icons/lu";
import { Link } from "react-router";
import { useSocket } from "../../../../contexts/useSocket";
import { SOCKET_EVENTS } from "../../../../contexts/socketEvents";

const Messages = () => {
  const user = getUserInfo();

  const [activeTab, setActiveTab] = useState("users"); // 'users' | 'orders'
  const [search, setSearch] = useState("");

  const [userChats, setUserChats] = useState([]);
  const [orderChats, setOrderChats] = useState([]);

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [loading, setLoading] = useState(false);

  // typing
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  // scroll
  const listRef = useRef(null);
  const isAtBottomRef = useRef(true);

  // prevent double send
  const sendingRef = useRef(false);

  const { socket, isConnected, connectSocket, emit } = useSocket();
  const canEmit = !!socket?.connected;

  // ---------------- helpers ----------------
  const safeArray = (v) => (Array.isArray(v) ? v : []);

  const getOtherUser = useCallback(
    (chat) => {
      if (!chat) return null;
      // user chat
      if (Array.isArray(chat.participants)) {
        return chat.participants.find((p) => p?.user?.id !== user?.id)?.user || chat.user;
      }
      // order chat
      return chat.user || null;
    },
    [user?.id]
  );

  const activeChats = useMemo(() => {
    const list = activeTab === "users" ? safeArray(userChats) : safeArray(orderChats);
    if (!search.trim()) return list;

    const q = search.toLowerCase();
    if (activeTab === "users") {
      return list.filter((chat) => (getOtherUser(chat)?.name || "").toLowerCase().includes(q));
    }
    // orders tab search by orderId (fallback id)
    return list.filter((chat) => ((chat?.order?.id || chat?.orderId || "").toString().toLowerCase().includes(q)));
  }, [activeTab, userChats, orderChats, search, getOtherUser]);

  const redirectToOrderDetails = useCallback(() => {
    if (!selectedChat?.order?.id) return "#";
    const isWonArticle = selectedChat?.order?.orderType === "wonArticle";
    return isWonArticle
      ? `/admin/orders/${selectedChat.order.id}`
      : `/admin/orders/${selectedChat.order.id}/details`;
  }, [selectedChat]);

  const onMessagesScroll = useCallback(() => {
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

  // update chat list locally (no full refetch -> less UI jumping)
  const updateChatPreview = useCallback(
    (chatRoomId, message) => {
      if (!chatRoomId || !message) return;

      const updater = (prev) => {
        const arr = safeArray(prev);
        const idx = arr.findIndex((c) => c?.id === chatRoomId);
        if (idx === -1) return arr;

        const copy = [...arr];
        const current = copy[idx];

        const lastMsg = { ...message, createdAt: message.createdAt || new Date().toISOString() };
        const newMsgs = Array.isArray(current.messages) ? [...current.messages] : [];
        newMsgs.push(lastMsg);

        copy[idx] = { ...current, messages: newMsgs, updatedAt: lastMsg.createdAt };

        // move to top
        const [item] = copy.splice(idx, 1);
        return [item, ...copy];
      };

      if (activeTab === "users") {
        setUserChats(updater);
      } else {
        setOrderChats(updater);
      }
    },
    [activeTab]
  );

  // ---------------- connect socket ----------------
  useEffect(() => {
    if (!user?.id) return;
    if (!isConnected) connectSocket(user);
  }, [user?.id, isConnected, connectSocket, user]);

  // ---------------- load chats ----------------
  const loadChats = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const [uChats, oChats] = await Promise.all([
        chatApi.getUserChats(user.id),
        chatApi.getOrderChats(user.id),
      ]);
      setUserChats(safeArray(uChats));
      setOrderChats(safeArray(oChats));
    } catch (e) {
      console.error("Failed to load chats:", e);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  // ---------------- select chat ----------------
  const selectChat = useCallback(
    async (chat) => {
      if (!chat?.id) return;

      // leave previous room
      if (selectedChat?.id) emit(SOCKET_EVENTS.LEAVE_CHAT_ROOM, selectedChat.id);

      setSelectedChat(chat);
      setTypingUsers([]);

      try {
        const chatMessages = await chatApi.getMessages(chat.id);
        setMessages(safeArray(chatMessages));

        emit(SOCKET_EVENTS.JOIN_CHAT_ROOM, chat.id);

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

  // auto-select first chat on tab switch if no selected chat in that tab
  useEffect(() => {
    const list = activeTab === "users" ? safeArray(userChats) : safeArray(orderChats);
    if (!list.length) {
      setSelectedChat(null);
      setMessages([]);
      return;
    }

    // if selected chat not from this tab, select first
    const existsInTab = selectedChat?.id && list.some((c) => c.id === selectedChat.id);
    if (!existsInTab) {
      selectChat(list[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, userChats, orderChats]);

  // ---------------- socket listeners ----------------
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (!message?.chatRoomId) return;

      // update sidebar locally (no loadChats)
      updateChatPreview(message.chatRoomId, message);

      // push into open chat only if same room
      if (selectedChat?.id && message.chatRoomId === selectedChat.id) {
        setMessages((prev) => [...prev, message]);
        requestAnimationFrame(() => scrollToBottomIfNeeded("smooth"));
      }
    };

    const handleChatUpdated = (chatRoom) => {
      // optional: if your server emits full chatRoom, merge locally
      if (!chatRoom?.id) return;
      const merge = (prev) => {
        const arr = safeArray(prev);
        const idx = arr.findIndex((c) => c.id === chatRoom.id);
        if (idx === -1) return arr;
        const copy = [...arr];
        copy[idx] = { ...copy[idx], ...chatRoom };
        return copy;
      };
      setUserChats(merge);
      setOrderChats(merge);
    };

    const handleUserTyping = (data) => {
      if (!selectedChat?.id) return;
      if (data?.chatRoomId && data.chatRoomId !== selectedChat.id) return;
      if (data?.userId === user?.id) return;

      setTypingUsers((prev) => (prev.includes(data.userId) ? prev : [...prev, data.userId]));
    };

    const handleUserStopTyping = (data) => {
      if (!selectedChat?.id) return;
      if (data?.chatRoomId && data.chatRoomId !== selectedChat.id) return;
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
  }, [socket, selectedChat?.id, user?.id, updateChatPreview, scrollToBottomIfNeeded]);

  // scroll after messages change (only if user at bottom)
  useEffect(() => {
    scrollToBottomIfNeeded("smooth");
  }, [messages.length, selectedChat?.id, scrollToBottomIfNeeded]);

  // ---------------- typing ----------------
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
  }, [emit, isTyping, selectedChat?.id, canEmit, user?.id]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  // ---------------- send message ----------------
  const sendMessage = useCallback(() => {
    if (sendingRef.current) return;

    const content = (newMessage || "").trim();
    if (!content) return;
    if (!selectedChat?.id) return;
    if (!canEmit) return;

    sendingRef.current = true;

    try {
      if (isTyping) {
        setIsTyping(false);
        emit(SOCKET_EVENTS.TYPING_STOP, { chatRoomId: selectedChat.id, userId: user.id });
      }

      emit(SOCKET_EVENTS.SEND_MESSAGE, {
        chatRoomId: selectedChat.id,
        senderId: user.id,
        content,
        messageType: "text",
      });

      setNewMessage("");
      requestAnimationFrame(() => scrollToBottomIfNeeded("smooth"));
    } catch (e) {
      console.error("Failed to send message:", e);
    } finally {
      setTimeout(() => {
        sendingRef.current = false;
      }, 200);
    }
  }, [newMessage, selectedChat?.id, canEmit, isTyping, emit, user?.id, scrollToBottomIfNeeded]);

  // ---------------- UI ----------------
  const activeCls = "bg-[#E6F4FF] border-l-[#008CFF] border-b-[#008CFF]";

  return (
    <div className="">
      <div className="h-full flex">
        {/* left list */}
        <div className="w-[220px] xl:w-[450px] lg:w-[280px] md:w-[220px] md:overflow-visible overflow-hidden h-full">
          <div className="px-3 mt-6 lg:block hidden">
            <div className="flex items-center border border-[#DCDEDF] p-1 rounded-4xl font-poppins">
              <p
                className={`text-[#B2B5B8] px-3 py-1.5 rounded-4xl whitespace-nowrap cursor-pointer ${activeTab === "users" ? "bg-[#222425] text-white" : ""
                  }`}
                onClick={() => setActiveTab("users")}
              >
                User Messages
              </p>
              <p
                className={`text-[#B2B5B8] px-3 py-1.5 rounded-4xl whitespace-nowrap cursor-pointer ${activeTab === "orders" ? "bg-[#222425] text-white" : ""
                  }`}
                onClick={() => setActiveTab("orders")}
              >
                Order Conversation
              </p>
            </div>

            <div className="text-[#5F6368] relative my-4">
              <input
                type="text"
                placeholder={activeTab === "users" ? "Search user..." : "Search orderId..."}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="border border-[#DCDEDF] py-1.5 px-2 pl-7 rounded-full w-full focus:outline-1 focus:outline-[#004A87] placeholder:text-[#5F6368]"
              />
              <PiMagnifyingGlassLight className="absolute text-[18px] left-1.5 top-1/2 transform -translate-y-2/4" />
            </div>

            {loading && <p className="text-xs text-gray-500">Loading chats...</p>}
          </div>

          <div>
            {activeChats.map((chat) => {
              const other = getOtherUser(chat);
              const isActive = selectedChat?.id === chat?.id;

              return (
                <div
                  key={chat.id}
                  onClick={() => selectChat(chat)}
                  className={`flex border-b border-[#D1DADB] py-2.5 px-3.5 border-l-2 border-l-[#0000] cursor-pointer gap-4 relative ${isActive ? activeCls : ""
                    }`}
                >
                  <div className="w-[60%] max-w-[250px] flex items-center gap-2.5 cursor-pointer">
                    {activeTab === "users" ? (
                      <div className="h-[48px] w-[48px] bg-[#F6F7F7] rounded-full overflow-hidden">
                        <img className="h-[48px] w-[48px]" src={other?.image} alt="" />
                      </div>
                    ) : (
                      <div className="bg-[#DCDEDF] h-12 flex items-center px-3.5 rounded-full">
                        <ShieldIcon />
                      </div>
                    )}

                    <div className="w-[160px] hidden lg:block">
                      <p className="text-[#36383A] font-normal truncate">
                        {activeTab === "users" ? other?.name : `Order ID: ${chat?.order?.id || chat?.orderId || ""}`}
                      </p>
                      <div className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[#878C91] text-[14px]">
                        {chat?.messages?.at?.(-1)?.content || "No messages yet"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* right messages */}
        <div className="w-full">
          <div className="message-chat-container border-l-1 border-[#D1DADB]">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              {activeTab === "users" ? (
                <div className="flex items-center gap-3">
                  <div className=" bg-blue-100 rounded-full h-[48px] w-[48px] overflow-hidden">
                    <img src={selectedChat ? getOtherUser(selectedChat)?.image : ""} className="h-[48px] w-[48px]" alt="" />
                  </div>
                  <span className="font-medium text-[#222425] font-poppins">
                    {selectedChat ? getOtherUser(selectedChat)?.name : "Select a chat"}
                  </span>
                </div>
              ) : (
                <div>
                  <p className="text-[#222425] font-medium">
                    Order ID: {selectedChat ? (selectedChat?.order?.id || selectedChat?.orderId || "") : "—"}
                  </p>
                </div>
              )}

              {activeTab === "orders" && selectedChat?.order?.id && (
                <Link to={redirectToOrderDetails()} className=" text-[#B2B5B8] underline cursor-pointer">
                  See Order Details
                </Link>
              )}
            </div>

            <div
              ref={listRef}
              onScroll={onMessagesScroll}
              className="chat-messages flex flex-col w-full h-[60dvh] overflow-y-auto"
            >
              {selectedChat ? (
                <>
                  {messages.map((message, idx) => {
                    const mine = message?.sender?.id === user?.id;
                    return (
                      <div
                        key={message?.id || idx}
                        className={`flex items-start mb-2 ${mine ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`${mine ? "message-bubble message-sent shadow-md" : "message-bubble message-received"}`}>
                          {message.content}
                          <div className={`text-right text-xs ${mine ?'text-white':'text-gray-500'}  mt-1 flex items-center gap-1 justify-end`}>
                            {new Date(message.createdAt).toLocaleTimeString()} <LuCheckCheck />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {typingUsers.length > 0 && (
                    <div className="text-xs text-gray-500 italic px-4 py-2">
                      Someone is typing...
                    </div>
                  )}
                </>
              ) : (
                <div className="grid h-[50dvh] place-items-center">
                  <p className="text-[#878C91] text-2xl font-glare">No messages yet</p>
                </div>
              )}
            </div>

            <div className="bg-transparent flex items-center gap-3 px-6 pb-4 relative">
              <textarea
                className=" border border-[#DCDEDF] outline-none py-3 px-5 rounded-3xl w-full bg-white flex-1"
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
                disabled={!newMessage.trim() || !selectedChat?.id}
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

export default Messages;
