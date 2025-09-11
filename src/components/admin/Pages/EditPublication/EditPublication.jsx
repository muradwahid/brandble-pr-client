import { useState } from "react";
import countries from "../../../../assets/countries.json";
import { ArrowDownIcon } from "../../../../utils/icons";
import MultiSelectToken from "../../../ui/MultiSelectToken/MultiSelectToken";
const EditPublication = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  return (
    <div className="border border-[#F2F2F3] p-6 w-4/5 mx-auto singlePublicationAdmin">
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="font-glare text-[#5F6368] text-[20px] tracking-[-0.1px]">
            Publication Logo
          </p>
          <p className="bg-[#F6F7F7] px-4 py-2.5 rounded-3xl text-[#5F6368] text-sm w-[52px] h-9 flex items-center justify-center cursor-pointer">
            Edit
          </p>
        </div>
        {/* Logo */}
        <div className="h-[150px] w-[150px] bg-[#5F6368]">
          <img src="" alt="" />
        </div>
      </div>
      <div className="mt-10">
        <form>
          <label htmlFor="">
            <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
              Publication Name
            </p>
            <input
              type="text"
              className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] w-full px-3 py-2 font-poppins text-[#171819]"
              name="name"
              value="Hood Critic"
            />
          </label>
          <div className="grid grid-cols-2 gap-x-5 gap-y-6 mt-5  w-full">
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Domain Authority (DA)
              </p>
              <input
                type="text"
                className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full"
                name="da"
                value="90"
              />
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Domain Rating (DR)
              </p>
              <input
                type="text"
                className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full"
                name="dr"
                value="95"
              />
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Niche
              </p>
              <MultiSelectToken
                options={["Adult", "Health", "Cannabis", "Crypto", "Gambling"]}
                value={["Adult", "Health"]}
                onChange={(value) => console.log(value)}
              />
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                TTP
              </p>
              <input
                type="text"
                className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full"
                name="ttp"
                value="5-10 days"
              />
            </label>
            <label htmlFor="genre">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Genre
              </p>
              <div className="relative">
                <select
                  name="genre"
                  id="genre"
                  className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full appearance-none"
                >
                  <option value="business">Business</option>
                  <option value="business2">Business2</option>
                  <option value="business3">Business3</option>
                </select>
                <ArrowDownIcon className="ml-2.5 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Price
              </p>
              <input
                type="text"
                className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full"
                name="genre"
                value="150"
              />
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Sponsored
              </p>
              <div className="relative">
                <select
                  name="genre"
                  id="genre"
                  className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full appearance-none"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <ArrowDownIcon className="ml-2.5 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Index
              </p>
              <div className="relative">
                <select
                  name="genre"
                  id="genre"
                  className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full appearance-none"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <ArrowDownIcon className="ml-2.5 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Do follow
              </p>
              <div className="relative">
                <select
                  name="genre"
                  id="genre"
                  className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full appearance-none"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <ArrowDownIcon className="ml-2.5 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Region
              </p>
              <div className="relative">
                <select
                  name="genre"
                  id="genre"
                  defaultChecked="US"
                  className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full appearance-none"
                >
                  {countries.map((country) => (
                    <option value={country.code}>{country.name}</option>
                  ))}
                </select>
                <ArrowDownIcon className="ml-2.5 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Location
              </p>
              <input
                type="text"
                className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full"
                name="Indexed"
                value="1234 Mockingbird Lane, Austin, TX 78701, USA"
              />
            </label>
          </div>
          <div className="flex justify-end">
            <input
              type="submit"
              value="Update"
              className="font-poppins text-white bg-[#002747] px-11 py-3 mt-9 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPublication;
