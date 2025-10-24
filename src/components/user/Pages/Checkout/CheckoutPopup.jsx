import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Link } from "react-router";

const CheckoutPopup = ({ setCheckoutPopup }) => {
  return (
    <div className="fixed inset-0 bg-[#22242580] flex justify-center items-center p-4 backdrop-blur-[2px]">
      <div className="bg-white shadow-2xl px-20 pt-20 pb-7 w-full max-w-2xl relative">
        <div className="flex justify-center mb-6 mt-4">
          <div
            className={`bg-white p-4 rounded-full flex items-center justify-center bg-[url(/public/assets/successfulbg.png)] bg-no-repeat bg-center bg-cover`}
            style={{ width: "120px", height: "120px" }}
          >
            <div className="flex items-center justify-center bg-[#002747] rounded-full p-4">
              <IoCheckmarkCircleOutline className="text-white text-4xl" />
            </div>
          </div>
        </div>

        <div className="text-center mb-5">
          <p className="text-3xl font-medium text-gray-800  font-glare leading-[140%]">
            You’re Order Has Been Submitted Successfully!
          </p>
          <p className="text-[18px] text-[#222425] mt-16 px-3 font-poppins">
            Please Submit the Required Information to Complete The Order.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            onClick={() => setCheckoutPopup(false)}
            to="/user/checkout/order-submit"
            className="bg-[#002747] text-[18px] text-white py-2 px-8 hover:bg-[#002747]/90 transition cursor-pointer w-full inline-block text-center"
          >
            Submit Information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPopup;
