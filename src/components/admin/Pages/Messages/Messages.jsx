import { useState } from "react";
import { chatList } from "../../../user/Pages/MyMessages/data";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { ShieldIcon } from "../../../../utils/icons";
import Chat from "./Chat";
import { getUserInfo } from "../../../../helpers/user/user";
import { useUserQuery } from "../../../../redux/api/authApi";


const Messages = () => {
  const [activeIdx, setActiveIdx] = useState("#653BSBE2-12");
  const [activeConversation, setActiveConversation] = useState('user');
  const activeCls = "bg-[#E6F4FF] border-l-[#008CFF] border-b-[#008CFF]";

      const { id } = getUserInfo();
    
      const { data } = useUserQuery(id);
  return (
    <div className="">
      <div className="h-full flex">
        {/* chat lists */}
        <div className="w-[220px] xl:w-[450px] lg:w-[280px] md:w-[220px] md:overflow-visible overflow-hidden h-full">
          <div className="px-3 mt-6 lg:block hidden">
            <div className="flex items-center border border-[#DCDEDF] p-1 rounded-4xl font-poppins">
              <p
                className={`text-[#B2B5B8] px-3 py-1.5 rounded-4xl whitespace-nowrap cursor-pointer ${
                  activeConversation === "user" ? "bg-[#222425] text-white" : ""
                }`}
                onClick={() => setActiveConversation("user")}
              >
                User Messages
              </p>
              <p
                className={`text-[#B2B5B8] px-3 py-1.5 rounded-4xl whitespace-nowrap cursor-pointer ${
                  activeConversation === "order"
                    ? "bg-[#222425] text-white"
                    : ""
                }`}
                onClick={() => setActiveConversation("order")}
              >
                Order Conversation
              </p>
            </div>
            <div className="text-[#5F6368] relative my-4">
              <input
                type="text"
                placeholder="Search..."
                className="border border-[#DCDEDF] py-1.5 px-2 pl-7 rounded-full w-full focus:outline-1 focus:outline-[#004A87] placeholder:text-[#5F6368]"
              />
              <PiMagnifyingGlassLight className="absolute text-[18px] left-1.5 top-1/2 transform -translate-y-2/4" />
            </div>
          </div>
          <div>
            {chatList.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveIdx(item.id)}
                className={`flex border-b border-[#D1DADB] py-2.5 px-3.5 border-l-2 border-l-[#0000] cursor-pointer gap-4 relative ${
                  activeIdx === item.id ? activeCls : ""
                }`}
              >
                {item.id === "#653BSBE2-12" && (
                  <div className="absolute right-2 top-1 bg-[#008CFF] font-semibold text-[11px] text-white px-1 py-[1px] rounded-full">
                    999
                  </div>
                )}
                <div className="w-[60%] max-w-[250px] flex items-center gap-2.5 cursor-pointer">
                  {activeConversation === "order" ? (
                    <div className="bg-[#DCDEDF] h-12 flex items-center px-3.5 rounded-full">
                      <ShieldIcon />
                    </div>
                  ) : (
                    <div className="h-[48px] w-[48px] bg-[#F6F7F7] rounded-full overflow-hidden">
                        <img className="h-[48px] w-[48px]" src={data.image} alt="" />
                    </div>
                  )}
                  <div className="w-[140px] hidden lg:block">
                    {activeConversation === "order" ? (
                      <p className="text-[#36383A] font-normal">#45964040534</p>
                    ) : (
                      <p className="text-[#36383A]">Murad Wahid</p>
                    )}
                    <div className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[#878C91] text-[14px]">
                      Enter your message description here...
                    </div>
                  </div>
                </div>
                <div className="w-[40%] hidden lg:block">
                  <div className="w-full grid justify-end gap-1.5">
                    <p className="text-[#94A3B8] text-[14px] text-end">12:25</p>
                    <p className="text-[#878C91] text-[14px]">17/04/2025</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* messages */}
        <div className="w-full">
          <Chat activeConversation={activeConversation} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
