import { useState } from "react";
import { GoShieldLock } from "react-icons/go";
import "./style.css";

const CheckoutForm = () => {
  const inputCls = ` px-3 py-2 bg-[#F6F7F7] border border-[#DCDEDF] outline-none text-[#5F6368] placeholder-[#B2B5B8] placeholder:font-normal w-full`;
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("visa_card_1");

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.id);
  };

  return (
    <div className="w-full flex-1">
      <div className="bg-white w-full">
        <div className="space-y-7">
          {/* personal information */}
          <div className="border border-[#F2F2F3] p-3.5">
            <div className="border-b border-[#DCDEDF] pb-3">
              <h3 className="text-[20px] text-[#222425] font-glare">
                Personal Information
              </h3>
            </div>
            {/* Full Name */}
            <div className="flex flex-col w-full mt-4">
              <label htmlFor="fullName" className="text-sm text-[#5F6368] mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className={`${inputCls}`}
                value="John Doe"
                readOnly
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col w-full my-3.5">
              <label htmlFor="email" className="text-sm text-[#5F6368] mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`${inputCls}`}
                value="john.doe@example.com"
                readOnly
              />
            </div>

            {/* Company Name */}
            <div className="flex flex-col w-full">
              <label htmlFor="address1" className="text-sm text-[#5F6368] mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className={`${inputCls}`}
                value="Brandable PR Inc."
                readOnly
              />
            </div>
          </div>

          {/* billing address */}
          <div className="border border-[#F2F2F3] p-3.5">
            <div className="border-b border-[#DCDEDF] pb-3">
              <h3 className="text-[20px] text-[#222425] font-glare">
                Billing Address
              </h3>
            </div>
            {/* address */}
            <div className="flex flex-col w-full mt-4">
              <label htmlFor="fullName" className="text-sm text-[#5F6368] mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                className={`${inputCls}`}
                value="123 Main St, Anytown, USA"
                readOnly
              />
            </div>

            <div className="w-full flex justify-between">
              <div className="flex flex-col mt-4 w-[48%]">
                <label
                  htmlFor="country"
                  className="text-sm text-[#5F6368] mb-1"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  className={`${inputCls}`}
                  value="United States"
                  readOnly
                />
              </div>
              <div className="flex flex-col mt-4 w-[48%]">
                <label htmlFor="state" className="text-sm text-[#5F6368] mb-1">
                  State/ Province/ Region
                </label>
                <input
                  type="text"
                  id="state"
                  className={`${inputCls}`}
                  value="California"
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col w-[48%] mt-4">
              <label htmlFor="zipCode" className="text-sm text-[#5F6368] mb-1">
                Postal/ Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                className={`${inputCls}`}
                value="12345"
                readOnly
              />
            </div>
          </div>

          {/* payment method */}
          <div className="border border-[#F2F2F3] p-3.5">
            <div className="border-b border-[#DCDEDF] pb-3">
              <h3 className="text-[20px] text-[#222425] font-glare">
                Payment Method
              </h3>
            </div>
            {/* payment method */}
            <div className="flex items-center justify-between gap-1 mt-4">
              <p className="text-[#5F6368] font-glare font-normal">
                Default Method
              </p>
              <GoShieldLock className="text-[#5F6368] text-sm" />
            </div>
            <div className="flex flex-col w-full mt-4 border-b border-[#DCDEDF] pb-1.5">
              <div className="w-full grid gap-2.5">
                <label
                  htmlFor="visa_card_1"
                  className="flex items-center cursor-pointer gap-12 justify-start"
                >
                  <input
                    type="radio"
                    name="payment_card"
                    id="visa_card_1"
                    checked={selectedPaymentMethod === "visa_card_1"}
                    onChange={handlePaymentMethodChange}
                    className="cursor-pointer accent-[#008CFF]"
                  />
                  <p className="text-[#222425] text-sm">
                    accountemail@gmail.com
                  </p>
                </label>
                <div className="flex justify-between mt-1.5">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://shorturl.at/gHTiX"
                      alt="VISA"
                      className="w-14 h-auto mr-2"
                    />
                    <p className="text-[#5F6368] text-sm">******6615</p>
                  </div>
                </div>
              </div>
            </div>

            {/* other payment methods */}
            <div className="w-full space-y-7 mt-4">
              <div className="w-1/2">
                <div className="flex justify-between">
                  <div className="flex items-center cursor-pointer gap-3 justify-start">
                    <input
                      type="radio"
                      name="payment_card"
                      id="visa_card_3"
                      checked={selectedPaymentMethod === "visa_card_3"}
                      onChange={handlePaymentMethodChange}
                      className="cursor-pointer accent-[#008CFF]"
                    />
                    <img
                      src="/public/assets/visalogo.png"
                      alt="VISA"
                      className="w-10 h-auto mr-2"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-[#222425] text-sm">Card</p>
                  <p className="text-[#5F6368] text-sm">******6615</p>
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex justify-between">
                  <div className="flex items-center cursor-pointer gap-3 justify-start">
                    <input
                      type="radio"
                      name="payment_card"
                      id="visa_card_4"
                      checked={selectedPaymentMethod === "visa_card_4"}
                      onChange={handlePaymentMethodChange}
                      className="cursor-pointer accent-[#008CFF]"
                    />
                    <img
                      src="/public/assets/visalogo.png"
                      alt="VISA"
                      className="w-10 h-auto mr-2"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-[#222425] text-sm">Card</p>
                  <p className="text-[#5F6368] text-sm">******6615</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="text-sm text-[#36383A] bg-[#DCDEDF] px-8 py-2.5 cursor-pointer hover:bg-[#bebfc0] transition-all duration-200">
                  New Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
