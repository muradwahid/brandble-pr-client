import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const Payment = () => {
  const [activeTab, setActiveTab] = useState("method");
  const [activePayment, setActivePayment] = useState("first");
  console.log(activePayment)
  return (
    <div className="w-full max-w-3xl md:mx-auto">
      <h2 className="md:text-2xl text-[20px] text-[#222425] font-glare border-b border-[#DCDEDF] pb-4">
        Payment
      </h2>
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
      <div className="bg-[#F6F7F7] md:flex gap-3.5 p-3.5 mt-10">
        <div className="flex-1 md:mb-0 mb-4">
          <div>
            <p className="text-[#5F6368] font-glare">Default Method</p>
          </div>
          <p className="text-[#878C91] text-sm">
            You'r paying through this method
          </p>
        </div>
        <div
          onClick={() => setActivePayment("first")}
          className={`bg-white p-1.5 flex items-center justify-between flex-1 border ${
            activePayment == "first" ? "border-[#008CFF]" : "border-[#DCDEDF]"
          }`}
        >
          <label className="w-full" htmlFor="visa_card_1">
            <div className="w-full">
              <label
                htmlFor="visa_card_1"
                className="flex items-center cursor-pointer gap-8 justify-start"
              >
                <input
                  type="radio"
                  name="payment_card"
                  id="visa_card_1"
                  className="cursor-pointer accent-[#008CFF]"
                  {...(activePayment == "first" && { checked: true })}
                />
                <p className="text-[#222425] text-sm">accountemail@gmail.com</p>
              </label>
              <div className="flex justify-between mt-1.5">
                <div className="flex items-center gap-2">
                  <img
                    src="https://shorturl.at/gHTiX"
                    alt="VISA"
                    className="w-10 h-auto mr-2"
                  />
                  <p className="text-[#5F6368] text-sm">******6615</p>
                </div>
                <button className="bg-[#36383A] text-sm font-medium text-white px-3 py-1 cursor-pointer hover:bg-[#222425] transition-all duration-200">
                  Change
                </button>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* cards */}
      <div className="bg-[#F6F7F7] md:flex p-3.5 mt-6">
        <div className="flex-1  md:mb-0 mb-4">
          <div>
            <p className="text-[#5F6368] font-glare">Cards</p>
          </div>
          <p className="text-[#878C91] text-sm">Your saved cards</p>
        </div>
        <div className="flex-1 w-full">
          <label
            onClick={() => setActivePayment("second")}
            htmlFor="visa_card_2"
            className="cursor-pointer"
          >
            <div
              className={`bg-white p-2.5 flex items-center justify-between border ${
                activePayment == "second"
                  ? "border-[#008CFF]"
                  : "border-[#DCDEDF]"
              }`}
            >
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex items-center cursor-pointer gap-3 justify-start">
                    <input
                      type="radio"
                      name="payment_card"
                      id="visa_card_2"
                      className="cursor-pointer accent-[#008CFF]"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                      alt="VISA"
                      className="w-10 h-auto mr-2"
                    />
                  </div>
                  <FaRegTrashAlt className="text-[#FF5630] cursor-pointer" />
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-[#222425] text-sm">Card</p>
                  <p className="text-[#5F6368] text-sm">******6615</p>
                </div>
              </div>
            </div>
          </label>
          <label
            onClick={() => setActivePayment("third")}
            htmlFor="visa_card_3"
            className="cursor-pointer"
          >
            <div
              className={`bg-white p-2.5 flex items-center justify-between mt-4 border ${
                activePayment == "third"
                  ? "border-[#008CFF]"
                  : "border-[#DCDEDF]"
              }`}
            >
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex items-center cursor-pointer gap-3 justify-start">
                    <input
                      type="radio"
                      name="payment_card"
                      id="visa_card_3"
                      className="cursor-pointer accent-[#008CFF]"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                      alt="VISA"
                      className="w-10 h-auto mr-2"
                    />
                  </div>
                  <FaRegTrashAlt className="text-[#FF5630] cursor-pointer" />
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-[#222425] text-sm">Card</p>
                  <p className="text-[#5F6368] text-sm">******6615</p>
                </div>
              </div>
            </div>
          </label>
          <label
            onClick={() => setActivePayment("fourth")}
            htmlFor="visa_card_4"
            className="cursor-pointer"
          >
            <div
              className={`bg-white p-2.5 flex items-center justify-between mt-4 border ${
                activePayment == "fourth"
                  ? "border-[#008CFF]"
                  : "border-[#DCDEDF]"
              }`}
            >
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex items-center cursor-pointer gap-3 justify-start">
                    <input
                      type="radio"
                      name="payment_card"
                      id="visa_card_4"
                      className="cursor-pointer accent-[#008CFF]"
                    />
                    <img
                      src="https://shorturl.at/8ZNrR"
                      alt="VISA"
                      className="w-10 h-auto mr-2"
                    />
                  </div>
                  <FaRegTrashAlt className="text-[#FF5630] cursor-pointer" />
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-[#222425] text-sm">Card</p>
                  <p className="text-[#5F6368] text-sm">******6615</p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
      {/* Bank Account */}
      <div className="bg-[#F6F7F7] md:flex p-3.5 mt-6">
        <div className="flex-1  md:mb-0 mb-4">
          <div>
            <p className="text-[#5F6368] font-glare">Bank Account</p>
          </div>
          <p className="text-[#878C91] text-sm">Your saved bank accounts</p>
        </div>
        <div className="flex-1 w-full">
          <label
            onClick={() => setActivePayment("five")}
            htmlFor="visa_card_5"
            className="cursor-pointer"
          >
            <div
              className={`bg-white p-2.5 flex items-center justify-between border ${
                activePayment == "five"
                  ? "border-[#008CFF]"
                  : "border-[#DCDEDF]"
              }`}
            >
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex items-center cursor-pointer gap-3 justify-start">
                    <input
                      type="radio"
                      name="payment_card"
                      id="visa_card_5"
                      className="cursor-pointer accent-[#008CFF]"
                    />
                    <p className="text-[#222425] text-sm">
                      Bangor Savings Bank
                    </p>
                  </div>
                  <FaRegTrashAlt className="text-[#FF5630] cursor-pointer" />
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-[#222425] text-sm">United States</p>
                  <p className="text-[#5F6368] text-sm">******6615</p>
                </div>
              </div>
            </div>
          </label>
          <label
            onClick={() => setActivePayment("six")}
            htmlFor="visa_card_6"
            className="cursor-pointer"
          >
            <div
              className={`bg-white p-2.5 flex items-center justify-between border mt-4 ${
                activePayment == "six"
                  ? "border-[#008CFF]"
                  : "border-[#DCDEDF]"
              }`}
            >
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex items-center cursor-pointer gap-3 justify-start">
                    <input
                      type="radio"
                      name="payment_card"
                      id="visa_card_6"
                      className="cursor-pointer accent-[#008CFF]"
                    />
                    <p className="text-[#222425] text-sm">
                      Bangor Savings Bank
                    </p>
                  </div>
                  <FaRegTrashAlt className="text-[#FF5630] cursor-pointer" />
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-[#222425] text-sm">United States</p>
                  <p className="text-[#5F6368] text-sm">******6615</p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="w-full flex justify-end mt-6">
        <button className="w-full md:w-1/2 bg-white cursor-pointer text-[#1D1F2C] border border-[#1D1F2C] hover:bg-[#1D1F2C] hover:text-white transition-all duration-200 py-1.5">
          Add New Method
        </button>
      </div>
    </div>
  );
};

export default Payment;
