import { useState } from "react";
import { GoCheckCircle } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";

const MakeDefaultModal = ({
  ref,
  onChange = () => {},
  setRemove = () => {},
}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="fixed inset-0 bg-[#22242580] flex justify-center items-center p-4 backdrop-blur-[2px]">
      <div
        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-xl relative"
        ref={ref}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none transition duration-200 ease-in-out cursor-pointer"
          onClick={() => onChange(false)}
        >
          {/* <RxCross2 className="text-2xl" /> */}
          <RxCrossCircled className="text-[20px]" />
        </button>

        <div className="flex justify-center mb-6 mt-4">
          <div
            className="bg-[#222425] p-4 rounded-full flex items-center justify-center makeDefault-icon-shadow"
            style={{ width: "70px", height: "70px" }}
          >
            <GoCheckCircle className="text-white text-3xl" />
            {/* <RiDeleteBin6Line className="text-[#DE350B] text-3xl" /> */}
          </div>
        </div>

        <div className="mb-4 relative w-3/4 mx-auto">
          <div
            onClick={() => setToggle(!toggle)}
            className=" bg-white flex p-1.5 default-payment-method-shadow gap-3"
          >
            <div className="max-w-20 grid content-center bg-[#F2F2F3] px-2.5 py-6">
              <img
                src="public/assets/paypallogo.png"
                alt="VISA"
                className="h-auto"
              />
            </div>
            <div className="grid cursor-pointer content-between py-1">
              <p className="text-[#222425] text-sm">accountemail@gmail.com</p>
              <p className="text-[#5F6368] text-sm">******6615</p>
            </div>
          </div>
          {toggle && (
            <div
              onClick={() => setToggle(!toggle)}
              className="default-payment-method-shadow absolute w-full -top-6"
            >
              {[1, 2, 3].map(() => (
                <div className="w-full bg-white hover:bg-[#F6F7F7] transition flex p-1.5 border-b border-[#F2F2F3]">
                  <div className="max-w-20 grid content-center bg-[#F2F2F3] px-2.5 py-6">
                    <img
                      src="public/assets/paypallogo.png"
                      alt="VISA"
                      className="h-auto"
                    />
                  </div>
                  <div className="grid cursor-pointer content-between py-1">
                    <p className="text-[#222425] text-sm">
                      accountemail@gmail.com
                    </p>
                    <p className="text-[#5F6368] text-sm">******6615</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-xl font-medium text-gray-800 leading-relaxed font-glare text-center mb-4 font-glare">
          Are you sure you want to make this default payment method?
        </p>

        <div className="flex justify-center space-x-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 transition font-medium py-2 px-6 rounded-sm cursor-pointer"
            onClick={() => onChange(false)}
          >
            Cancel
          </button>
          <button
            className="bg-[#222425] text-white font-medium py-2 px-6 rounded-sm transition t cursor-pointer hover:bg-[#36383A]"
            onClick={() => {
              setRemove("remove");
              onChange(false);
            }}
          >
            Yes, Make it Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeDefaultModal;
