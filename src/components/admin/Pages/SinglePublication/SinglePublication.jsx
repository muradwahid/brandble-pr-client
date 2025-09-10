import { Link } from "react-router";
import {
  AdultIcon,
  BitcoinIcon,
  CardiologyIcon,
  CasinoIcon,
  DeleteIcon,
  SpaIcon,
} from "../../../../utils/icons";

const SinglePublication = () => {
  return (
    <div>
      <div>
        <div className="relative">
          <div className="flex gap-8 absolute right-0">
            <div className="bg-[rgba(255,143,115,0.2)] px-4 py-2.5 rounded-3xl w-[52px] h-9 flex items-center justify-center cursor-pointer">
              <DeleteIcon />
            </div>
            <Link className="bg-[#F6F7F7] px-4 py-2.5 rounded-3xl text-[#5F6368] text-sm w-[52px] h-9 flex items-center justify-center cursor-pointer">
              Edit
            </Link>
          </div>
          <div className="flex gap-5 items-end">
            <div className="bg-[#E6E6E6] h-[150px] w-[150px]">
              <img src="" alt="" />
            </div>
            <div className="">
              <h2 className="text-[#36383A] font-glare text-[32px] mb-5">
                New York Times
              </h2>
              <div className="flex flex-wrap gap-10">
                <div className="flex gap-2">
                  <p className="p-1 bg-[#F2F2F3] text-[#5F6368] font-popping font-medium text-[11px] flex items-center ">
                    DA: 95
                  </p>
                  <p className="p-1 bg-[#F2F2F3] text-[#5F6368] font-popping font-medium text-[11px] flex items-center ">
                    DR: 95
                  </p>
                  <p className="p-1 bg-[#F2F2F3] text-[#5F6368] font-popping font-medium text-[11px] flex items-center ">
                    TTP: 1-3 Days
                  </p>
                </div>
                <div className="p-1 bg-[#F2F2F3] text-[#5F6368] font-popping font-medium flex items-center gap-3 rounded-sm">
                  <p className="text-sm">Niche</p>
                  <span className="flex items-center gap-1">
                    <AdultIcon />
                    <CardiologyIcon />
                    <SpaIcon />
                    <BitcoinIcon />
                    <CasinoIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SinglePublication;
