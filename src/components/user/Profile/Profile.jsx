import { useState } from "react";
import profileImg from "../../../assets/profile2.png";
import { PenIcon } from "../../../utils/icons";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router";

const Profile = () => {
  const [general, setGeneral] = useState(true);
  const [security, setSecurity] = useState(true);
  return (
    <div className="w-[650px]">
      <div className="border-b-[1px] border-[#b2b5b8] pb-5">
        <h3 className="text-[#222425] text-2xl">Profile</h3>
      </div>
      <form className="mt-4">
        {/* profile image */}
        <div className="flex">
          <h4 className="text-[#36383A] text-[20px] flex-1">Image</h4>
          <div className="flex-[1.5] w-fit">
            <label
              className="w-fit flex relative cursor-pointer"
              htmlFor="profileImage"
            >
              <PenIcon className="absolute top-0 right-[0px] translate-x-[50%] translate-y-[-50%] bg-white rounded-full" />
              <img
                className="xl:w-[125px] xl:h-[125px] lg:w-[100px] lg:h-[100px] md:w-[80px] h-[80px] w-[80px]"
                src={profileImg}
                alt=""
              />
            </label>
            <input
              className="hidden"
              type="file"
              name="profileImage"
              id="profileImage"
            />
          </div>
        </div>
        {/* general Information */}
        <div className="flex items-start mt-16">
          <h4 className="text-[#36383A] text-[20px] flex-1">
            General Information
          </h4>
          <div className="flex-[1.5]">
            <div className="flex justify-end">
              <p
                onClick={() => setGeneral(!general)}
                className="text-[15px] text-[#5F6368] border-[1px] border-[#DCDEDF] px-1.5 py-0.5 cursor-pointer flex items-center gap-1"
              >
                Edit
                {!general ? <RxCross2 /> : null}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 mt-5">
              <label
                className="text-[#878C91] text-[14px]"
                htmlFor="profileName"
              >
                Profile Name
              </label>
              <input
                type="text"
                disabled={general}
                placeholder="Type here"
                name="profileName"
                id="profileName"
                className="w-full text-[#36383A] text-[15px] py-1.5 px-2 border-1 border-[#DCDEDF] focus:outline-2 focus:outline-[#004A87]"
                value="John Doe"
              />
            </div>
            <div className="flex flex-col gap-1.5 mt-5">
              <label className="text-[#878C91] text-[14px]" htmlFor="company">
                Company
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="company"
                disabled={general}
                id="company"
                className="w-full text-[#36383A] text-[15px] py-1.5 px-2 border-1 border-[#DCDEDF] focus:outline-2 focus:outline-[#004A87]"
                value="Shark Inc."
              />
            </div>
            <div className="flex flex-col gap-1.5 mt-5">
              <label
                className="text-[#878C91] text-[14px]"
                htmlFor="designation"
              >
                Designation
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="designation"
                disabled={general}
                id="designation"
                className="w-full text-[#36383A] text-[15px] py-1.5 px-2 border-1 border-[#DCDEDF] focus:outline-2 focus:outline-[#004A87]"
                value="CEO & Founder"
              />
            </div>
            <div className="flex flex-col gap-1.5 mt-5">
              <label
                className="text-[#878C91] text-[14px]"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Type here"
                name="phoneNumber"
                id="phoneNumber"
                disabled={general}
                className="w-full text-[#36383A] text-[15px] py-1.5 px-2 border-1 border-[#DCDEDF] focus:outline-2 focus:outline-[#004A87]"
                value="+88 00 11 22 55 44"
              />
            </div>
          </div>
        </div>
        {/* security Information */}
        <div className="flex items-start mt-16">
          <h4 className="text-[#36383A] text-[20px] flex-1">Security</h4>
          <div className="flex-[1.5]">
            <div className="flex justify-end">
              <p
                onClick={() => setSecurity(!security)}
                className="text-[15px] text-[#5F6368] border-[1px] border-[#DCDEDF] px-1.5 py-0.5 cursor-pointer flex items-center gap-1"
              >
                Edit
                {!security ? <RxCross2 /> : null}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 mt-5">
              <label
                className="text-[#878C91] text-[14px]"
                htmlFor="profileName"
              >
                Email
              </label>
              <input
                type="email"
                disabled={security}
                placeholder="Type here"
                name="profileName"
                id="profileName"
                className="w-full text-[#36383A] text-[15px] py-1.5 px-2 border-1 border-[#DCDEDF] focus:outline-2 focus:outline-[#004A87]"
                value="John Doe"
              />
            </div>
            <div className="flex flex-col gap-1.5 mt-5">
              <div className="flex justify-between">
                <label className="text-[#878C91] text-[14px]" htmlFor="company">
                  Password
                </label>
                <Link className="text-[#878C91] text-[14px] underline">
                  Change Password
                </Link>
              </div>
              <input
                type="password"
                placeholder="Type here"
                name="company"
                disabled={security}
                id="company"
                className="w-full text-[#36383A] text-[15px] py-1.5 px-2 border-1 border-[#DCDEDF] focus:outline-2 focus:outline-[#004A87]"
                value="Shark Inc."
              />
            </div>
            <div className="flex justify-end mt-5">
              <input
                type="submit"
                value="Save Changes"
                className="bg-[#171819] hover:shadow-xl transition-all ease-in-out duration-300 text-[15px] text-white py-1.5 px-5 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
