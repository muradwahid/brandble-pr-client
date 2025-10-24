import { FcManager } from "react-icons/fc";
import { GoPaperAirplane } from "react-icons/go";
import { LuCheckCheck } from "react-icons/lu";
import "./style.css"

const Chat = () => {
  return (
    <div>
      <div className="message-chat-container border-l-2 border-[#D1DADB]">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <FcManager />
            </div>
            <span className="font-semibold text-lg text-gray-800">Admin</span>
          </div>
          <span className="text-sm text-gray-500">#653BSBE2-11</span>
        </div>

        <div className="chat-messages flex flex-col">
          {/* <div className="text-center text-xs text-gray-400 my-4">
            19 August
          </div>

          <div className="flex items-start mb-2">
            <div className="message-bubble message-received">
              Hello my dear sir, I'm here do deliver the design requirement
              document for our next projects.
              <div className="text-right text-xs text-gray-500 mt-1 flex items-center gap-1 justify-end">
                12:25 <LuCheckCheck />
              </div>
            </div>
          </div>

          <div className="flex items-start mb-2">
            <div className="message-bubble message-received p-0">
              <div className="file-attachment">
                <svg
                  className="file-icon w-6 h-6"
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
            <div className="message-bubble message-sent shadow-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco labori
              <div className="flex justify-end items-center text-xs text-white text-opacity-70 mt-1 gap-1">
                11:25
                <LuCheckCheck />
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-400 my-4">Today</div>

          <div className="flex items-start mb-2">
            <div className="message-bubble message-received">
              Do androids truly dream of electric sheeps?
              <div className="text-right text-xs text-gray-500 mt-1 flex items-center gap-1 justify-end">
                12:25 <LuCheckCheck />
              </div>
            </div>
          </div>

          <div className="flex justify-end mb-2">
            <div className="message-bubble message-sent shadow-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco labori
              <div className="flex justify-end items-center text-xs text-white text-opacity-70 mt-1 gap-1">
                11:25
                <LuCheckCheck />
              </div>
            </div>
          </div> */}
        </div>

        <div className="bg-transparent flex items-center gap-3 px-6 pb-4 relative">
          <textarea
            className=" border border-[#DCDEDF] outline-none py-3 px-5 rounded-3xl w-full bg-white flex-1"
            type="text"
            placeholder="Send a message..."
            // className="input-field"
            cols={30}
            rows={4}
          />
          <button className="bg-[#006AC2] px-5 py-1.5 rounded-4xl flex items-center gap-2 text-white absolute right-[40px] bottom-[30px] cursor-pointer hover:bg-[#033f70] transition-all duration-200">
            <span>Send</span>
            <GoPaperAirplane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
