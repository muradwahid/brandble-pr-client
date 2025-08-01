import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Link } from "react-router";

const PublishPopup = ({ setPublishPopup }) => {
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

        <div className="text-center mt-16">
          <p className="text-3xl font-medium text-gray-800  font-glare leading-[140%]">
            You’re Order Information Has Been Submitted Successfully!
          </p>
        </div>

        <div className="flex justify-center space-x-4 mt-32">
          <Link
            onClick={() => {
              window.location.reload();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              setPublishPopup(false);
            }}
            to="/user/checkout/order-submit"
            className="bg-[#002747] text-[18px] text-white py-2 px-8 hover:bg-[#002747]/90 transition cursor-pointer w-full inline-block text-center"
          >
            Done
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublishPopup;
