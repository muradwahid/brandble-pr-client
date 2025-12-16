import { useCallback, useEffect, useRef, useState } from "react";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { ShieldIcon } from "../../../../utils/icons";
import { getUserInfo } from "../../../../helpers/user/user";
import { useSocket } from "../../../../contexts/SocketContext";
import { chatApi } from "../../../../services/chatApi";
import { GoPaperAirplane } from "react-icons/go";
import { LuCheckCheck } from "react-icons/lu";
import { Link } from "react-router";


const Messages = () => {
  const user = getUserInfo();
  
  const [search, setSearch] = useState();
 const [activeTab, setActiveTab] = useState('users');
    const [userChats, setUserChats] = useState([]);
    const [orderChats, setOrderChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchUserChats, setSearchUserChats] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [searchOrderChats, setSearchOrderChats] = useState([]);
    const typingTimeoutRef = useRef();
  
    const { socket, isConnected, connectSocket } = useSocket();
  
    // Fixed: Use useCallback to prevent unnecessary re-renders
    const loadChats = useCallback(async () => {
      setLoading(true);
      try {
        if (activeTab === 'users') {
          const chats = await chatApi.getUserChats(user.id);
          setUserChats(chats);
          setSearchUserChats(chats);
        } else {
          const chats = await chatApi.getOrderChats(user.id);
          setOrderChats(chats);
        }
      } catch (error) {
        console.error('Failed to load chats:', error);
      } finally {
        setLoading(false);
      }
    }, [user.id, activeTab]);
  
    // Fixed: Only connect socket once when component mounts
    useEffect(() => {
      if (user && !isConnected) {
        connectSocket(user);
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
        if (selectedChat && data.userId !== user.id) {
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
    }, [socket, selectedChat, user.id, loadChats]);
  
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
        // Send message via socket
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
      return chat.participants.find(p => p.user.id !== user.id)?.user || chat.user;
  };
  
  const searchUser = (e) => { 
    const val = e.target.value;
    const filteredUsers = userChats.map(chat => {
      const chats = [];
      const otherUser = getOtherUser(chat);
      otherUser.name.toLowerCase().includes(val.toLowerCase()) && chats.push(chat);
      return chats;
    }).flat();
    setSearchUserChats(filteredUsers || userChats);
  }
  
// const searchOrder = () => {
//   const filteredOrders = orderChats.map(chat => {
//     const chats = [];
//     const otherUser = getOtherUser(chat);
//     otherUser.id.toLowerCase().includes(search.toLowerCase()) && chats.push(chat);
//     return chats;
//   }).flat();
//   setOrderChats(filteredOrders);
// }
  
    // eslint-disable-next-line no-unused-vars
    const getLastMessage = (chat) => {
      return chat.messages[0]?.content || 'No messages yet';
    };
  
    // eslint-disable-next-line no-unused-vars
    const getTypingIndicator = () => {
      if (typingUsers.length === 0) return null;
  
      const typingUser = getOtherUser(selectedChat);
      return (
        <div className="text-xs text-gray-500 italic">
          {typingUser?.name} is typing...
        </div>
      );
  };
  
  useEffect(() => {
    async function loadInitialChat() {
      try {
        if (activeTab === 'users') {
          if (userChats && userChats.length > 0) {
            const chat = userChats[0];
            setSelectedChat(chat);
            selectChat(chat)
            const chatMessages = await chatApi.getMessages(chat.id);
            setMessages(chatMessages);
          } else {
            setSelectedChat(null);
            setMessages([]);
          }
        } else if (activeTab === 'orders') {
          if (orderChats && orderChats.length > 0) {
            const chat = orderChats[0];
            setSelectedChat(chat);
            selectChat(chat)
            const chatMessages = await chatApi.getMessages(chat.id);
            setMessages(chatMessages);
          } else {
            setSelectedChat(null);
            setMessages([]);
          }
        }
      } catch (error) {
        console.error('Failed to load initial chat messages:', error);
      }
    }

    loadInitialChat();
  }, [userChats, orderChats, activeTab])
  
  console.log('selectedChat', selectedChat?.order?.orderType);

  const redirectToOrderDetails = () => {
    if (selectedChat && selectedChat?.order?.orderType) {
      const redirectOrder = selectedChat.order.orderType==="wonArticle";
      return redirectOrder ? `/admin/orders/${selectedChat.order.id}` : `/admin/orders/${selectedChat.order.id}/details`;
    }
  };
  
  console.log(redirectToOrderDetails(), selectChat?.order?.orderType);

  const activeCls = "bg-[#E6F4FF] border-l-[#008CFF] border-b-[#008CFF]";
  return (
    <div className="">
      <div className="h-full flex">
        {/* chat lists */}
        <div className="w-[220px] xl:w-[450px] lg:w-[280px] md:w-[220px] md:overflow-visible overflow-hidden h-full">
          <div className="px-3 mt-6 lg:block hidden">
            <div className="flex items-center border border-[#DCDEDF] p-1 rounded-4xl font-poppins">
              <p
                className={`text-[#B2B5B8] px-3 py-1.5 rounded-4xl whitespace-nowrap cursor-pointer ${
                  activeTab === "users" ? "bg-[#222425] text-white" : ""
                }`}
                onClick={() => setActiveTab("users")}
              >
                User Messages
              </p>
              <p
                className={`text-[#B2B5B8] px-3 py-1.5 rounded-4xl whitespace-nowrap cursor-pointer ${
                  activeTab === "orders"
                    ? "bg-[#222425] text-white"
                    : ""
                }`}
                onClick={() => setActiveTab("orders")}
              >
                Order Conversation
              </p>
            </div>
            <div className="text-[#5F6368] relative my-4">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                  setSearch(e.target.value)
                  searchUser(e)
                }}
                value={search}
                className="border border-[#DCDEDF] py-1.5 px-2 pl-7 rounded-full w-full focus:outline-1 focus:outline-[#004A87] placeholder:text-[#5F6368]"
              />
              <PiMagnifyingGlassLight className="absolute text-[18px] left-1.5 top-1/2 transform -translate-y-2/4" />
            </div>
          </div>
          <div>
            {activeTab === 'users' && searchUserChats.map(chat => <div
              key={chat.id}
              onClick={() => selectChat(chat)}
              className={`flex border-b border-[#D1DADB] py-2.5 px-3.5 border-l-2 border-l-[#0000] cursor-pointer gap-4 relative ${selectedChat?.id === chat?.id ? activeCls : ""
                }`}
            >


              {/* {item.id === "#653BSBE2-12" && (
                <div className="absolute right-2 top-1 bg-[#008CFF] font-semibold text-[11px] text-white px-1 py-[1px] rounded-full">
                  999
                </div>
              )} */}
              <div className="w-[60%] max-w-[250px] flex items-center gap-2.5 cursor-pointer">
                  <div className="h-[48px] w-[48px] bg-[#F6F7F7] rounded-full overflow-hidden">
                  <img className="h-[48px] w-[48px]" src={getOtherUser(chat)?.image} alt="" />
                  </div>
                <div className="w-[140px] hidden lg:block">
                  <p className="text-[#36383A]">{getOtherUser(chat)?.name }</p>
                  <div className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[#878C91] text-[14px]">
                    Enter your message description here...
                  </div>
                </div>
              </div>
              {/* <div className="w-[40%] hidden lg:block">
                <div className="w-full grid justify-end gap-1.5">
                  <p className="text-[#94A3B8] text-[14px] text-end">12:25</p>
                  <p className="text-[#878C91] text-[14px]">17/04/2025</p>
                </div>
              </div> */}
            </div>)}

            {
              activeTab === 'orders' && orderChats.map(chat => <div
                key={chat.id}
                onClick={() => selectChat(chat)}
                className={`flex border-b border-[#D1DADB] py-2.5 px-3.5 border-l-2 border-l-[#0000] cursor-pointer gap-4 relative ${selectedChat?.id === chat?.id ? activeCls : ""
                  }`}
              >


                {/* {item.id === "#653BSBE2-12" && (
                <div className="absolute right-2 top-1 bg-[#008CFF] font-semibold text-[11px] text-white px-1 py-[1px] rounded-full">
                  999
                </div>
              )} */}
                <div className="w-[60%] max-w-[250px] flex items-center gap-2.5 cursor-pointer">
                    <div className="bg-[#DCDEDF] h-12 flex items-center px-3.5 rounded-full">
                      <ShieldIcon />
                    </div>
                  <div className="w-[140px] hidden lg:block">
                    <p className="text-[#36383A] font-normal truncate">{selectedChat && getOtherUser(selectedChat)?.id}</p>
                    <div className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[#878C91] text-[14px]">
                      Enter your message description here...
                    </div>
                  </div>
                </div>
                {/* <div className="w-[40%] hidden lg:block">
                  <div className="w-full grid justify-end gap-1.5">
                    <p className="text-[#94A3B8] text-[14px] text-end">12:25</p>
                    <p className="text-[#878C91] text-[14px]">17/04/2025</p>
                  </div>
                </div> */}
              </div>)
            }
          </div>
        </div>

        {/* messages */}
        <div className="w-full">
              <div className="message-chat-container border-l-1 border-[#D1DADB]">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                    {activeTab === "users" ? (
                      <div className="flex items-center gap-3">
                        <div className=" bg-blue-100 rounded-full h-[48px] w-[48px] overflow-hidden">
                    <img src={selectedChat ?getOtherUser(selectedChat)?.image :''} className="h-[48px] w-[48px]" alt="" />
                        </div>
                        <span className="font-medium text-[#222425] font-poppins">
                        {selectedChat && getOtherUser(selectedChat)?.name }
                        </span>
                      </div>
                    ) : (
                      <div>
                    <p className="text-[#222425] font-medium">Order ID: {selectedChat && getOtherUser(selectedChat)?.id}</p>
                      </div>
                    )}
                    {activeTab === "orders" && (
                <Link to={redirectToOrderDetails()} className=" text-[#B2B5B8] underline cursor-pointer">
                        See Order Details
                      </Link>
                    )}
                  </div>
          
            <div className="chat-messages flex flex-col w-full max-h-[60dvh]">
              {
                selectedChat ? messages.map((message,idx) => <div key={idx} className={`flex items-start mb-2 ${message.sender.id === user.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${message.sender.id === user.id ? 'message-bubble message-sent shadow-md' : 'message-bubble message-received'}`}>
                    {message.content}
                    <div className="text-right text-xs text-gray-500 mt-1 flex items-center gap-1 justify-end">
                      {new Date(message.createdAt).toLocaleTimeString()} <LuCheckCheck />
                    </div>
                  </div>

                </div>)
                
                  : <div className="grid h-[50dvh] place-items-center">
                    <p className="text-[#878C91] text-2xl font-glare">
                      No messages yet
                    </p>
                  </div>

              }
                  
                  </div>
          
                  <div className="bg-transparent flex items-center gap-3 px-6 pb-4 relative">
                    <textarea
                      className=" border border-[#DCDEDF] outline-none py-3 px-5 rounded-3xl w-full bg-white flex-1"
                      type="text"
                      placeholder="Send a message..."
                      cols={30}
                rows={4}
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  handleTyping();
                }}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
              <button onClick={sendMessage}
                disabled={!newMessage.trim()} className="bg-[#006AC2] px-5 py-1.5 rounded-4xl flex items-center gap-2 text-white absolute right-[40px] bottom-[30px] cursor-pointer hover:bg-[#033f70] transition-all duration-200">
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
