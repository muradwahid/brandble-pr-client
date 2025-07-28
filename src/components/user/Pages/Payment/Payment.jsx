import { useState } from "react";

import PaymentHistory from "./PaymentHistory";
import PaymentMethod from "./PaymentMethod";

import "./style.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import RemoveModal from "./RemoveModal";
const Payment = () => {
  const [activeTab, setActiveTab] = useState("method");
  const [activePayment, setActivePayment] = useState("first");
  const [remove,setRemove] = useState(false);
  return (
    <div className="w-full max-w-[850px] md:mx-auto">
      {remove && <RemoveModal onChange={setRemove} />}
      <div className="w-full border-b border-[#DCDEDF] pb-4 flex items-center justify-between">
        <h2 className="md:text-2xl text-[20px] text-[#222425] font-glare">
          Payment
        </h2>
        {activeTab === "history" && (
          <div className="flex gap-1.5">
            <input
              type="text"
              id="orderSearch"
              placeholder="Search Here..."
              className=" border border-[#DCDEDF] py-1 px-3 text-[14px] focus:outline-2 focus:outline-[#004A87] text-[#5F6368] placeholder-[#B2B5B8] bg-white rounded-sm"
            />
            <button className="border border-[#DCDEDF] px-2 rounded-sm cursor-pointer">
              <label htmlFor="orderSearch">
                <FaMagnifyingGlass className="cursor-pointer text-[#B2B5B8]" />
              </label>
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-5 font-glare font-normal mt-4">
        <button
          onClick={() => setActiveTab("method")}
          className={`font-normal cursor-pointer border-b border-[#0000] pb-0.5 ${
            activeTab == "method"
              ? "border-[#222425] text-[#222425]"
              : "text-[#878C91]"
          }`}
        >
          Payment Method
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`font-normal cursor-pointer border-b border-[#0000]  pb-0.5 ${
            activeTab == "history"
              ? "border-[#222425] text-[#222425]"
              : "text-[#878C91]"
          }`}
        >
          Payment History
        </button>
      </div>

      {/* accounts */}

      {/* default method */}
      {activeTab == "method" && (
        <PaymentMethod {...{ activePayment, setActivePayment, setRemove }} />
      )}
      {/* payment history */}
      {activeTab == "history" && <PaymentHistory />}
    </div>
  );
};

export default Payment;
