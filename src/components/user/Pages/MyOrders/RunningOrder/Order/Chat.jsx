import { LuCheckCheck } from "react-icons/lu";
import "./chatStyle.css";
import { GoPaperAirplane } from "react-icons/go";
import { FcManager } from "react-icons/fc";
const Chat = () => {
  const messages = []
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
              <div className="text-center text-xs text-gray-400 my-4">
                19 August
              </div>

              <div className="flex items-start mb-2">
                <div className="order-details-message-bubble order-details-message-received">
                  Hello my dear sir, I'm here do deliver the design requirement
                  document for our next projects.
                  <div className="text-right text-xs text-gray-500 mt-1 flex items-center gap-1 justify-end">
                    12:25 <LuCheckCheck />
                  </div>
                </div>
              </div>

              <div className="flex items-start mb-2">
                <div className="order-details-message-bubble order-details-message-received p-0">
                  <div className="order-details-file-attachment">
                    <svg
                      className="order-details-file-icon w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <div className="font-medium text-gray-800">
                        Design_project_2025.docx
                      </div>
                      <div className="text-xs text-gray-500">2.5gb • docx</div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500 mt-1 pr-3 pb-2 flex items-center gap-1 justify-end">
                    12:25
                    <LuCheckCheck />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mb-2">
                <div className="order-details-message-bubble order-details-message-sent shadow-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  labori
                  <div className="flex justify-end items-center text-xs text-white text-opacity-70 mt-1 gap-1">
                    11:25
                    <LuCheckCheck />
                  </div>
                </div>
              </div>

              <div className="text-center text-xs text-gray-400 my-4">
                Today
              </div>

              <div className="flex items-start mb-2">
                <div className="order-details-message-bubble order-details-message-received">
                  Do androids truly dream of electric sheeps?
                  <div className="text-right text-xs text-gray-500 mt-1 flex items-center gap-1 justify-end">
                    12:25 <LuCheckCheck />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mb-2">
                <div className="order-details-message-bubble order-details-message-sent shadow-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  labori
                  <div className="flex justify-end items-center text-xs text-white text-opacity-70 mt-1 gap-1">
                    11:25
                    <LuCheckCheck />
                  </div>
                </div>
              </div>
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
          />
          <button className="bg-[#008CFF] px-5 py-1.5 rounded-4xl flex items-center gap-2 text-white absolute right-4 bottom-4 font-normal cursor-pointer hover:bg-[#007de3] transition-all duration-200">
            <span>Send</span>
            <GoPaperAirplane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
