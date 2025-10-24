import React from "react";
import { GoPaperAirplane } from "react-icons/go";
import { ForumIcon, TelephoneIcon } from "../../../utils/icons";
import amex from "../../../assets/brand-logo/am-ex.png";
import pay from "../../../assets/brand-logo/pay.png";
import dlogo from "../../../assets/brand-logo/d-logo.png";
import discover from "../../../assets/brand-logo/discover.png";
import gpay from "../../../assets/brand-logo/g-pay.png";
import cartlogo from "../../../assets/brand-logo/card-logo.png";
import mastercard from "../../../assets/brand-logo/marter-cart-logo.png";
import shop from "../../../assets/brand-logo/shop.png";
import visa from "../../../assets/brand-logo/visa.png";


const Footer = () => {
  return (
    <div className="w-full">
      <div className="bg-[#004A87]">
        <div className="xl:w-[1400px] lg:w-4/5 md:w-5/6 w-[90%] mx-auto flex items-center justify-between py-[60px] flex-wrap">
          <div className="space-y-3">
            <h2 className="text-white font-glare text-2xl">Austin, Texas</h2>
            <p className="flex items-center gap-2 text-white">
              <TelephoneIcon /> (512) 698-7373
            </p>
            <p className="flex items-center gap-2 text-white">
              <GoPaperAirplane /> hello@brandable-pr.com
            </p>
          </div>
          <div className="bg-[#E09357] p-4 footer-icon-container">
            <ForumIcon />
          </div>
        </div>
        <div className="bg-white py-5">
          <div className="xl:w-[1400px] lg:w-4/5 md:w-5/6 w-[90%] mx-auto flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center md:gap-10 gap-5 flex-wrap">
              <p className="text-[##878C91] text-sm">Privacy Policy</p>
              <p className="text-[##878C91] text-sm">
                &#169; All Rights Reserved 2025
              </p>
            </div>
            {/* brand logo */}
            <div className="flex items-center gap-3 flex-wrap">
              <img src={amex} alt="" />
              <img src={pay} alt="" />
              <img src={dlogo} alt="" />
              <img src={discover} alt="" />
              <img src={gpay} alt="" />
              <img src={cartlogo} alt="" />
              <img src={mastercard} alt="" />
              <img src={shop} alt="" />
              <img src={visa} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
