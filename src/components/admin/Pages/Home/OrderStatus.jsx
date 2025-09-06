import { useState } from "react";
import {
  ArrowDown,
  TrendingDownIcon,
  TrendingUpIcon,
} from "../../../../utils/icons";
import HChart from "./HChart";

const OrderStatus = () => {
  const [filter, setFilter] = useState("today");
  const [toggle, setToggle] = useState(false);
  const newClient = 11;
  const repeated = 4;
  const totalOrders = newClient + repeated;
  const percent = parseInt((repeated / totalOrders) * 100);

  const totalMainOrder = 22;

  return (
    <div className="w-full">
      <div>
        <div className="relative w-fit" onClick={() => setToggle(!toggle)}>
          <p className="flex items-center gap-12 font-poppins text-[20px] font-medium text-[#36383A] cursor-pointer tracking-[0.1px] p-2 pr-3">
            {filter === "today" ? "Today" : "This Week"}
            <span>
              <ArrowDown />
            </span>
          </p>
          <div
            className={`rounded-[8px] w-fit absolute bg-white z-50 top-0 ${
              toggle ? "block shadow-xl" : "hidden"
            }`}
          >
            <p className="flex items-center gap-12 font-poppins text-[20px] font-medium text-[#36383A] cursor-pointer tracking-[0.1px] p-2 pr-3 border-b border-[#DCDEDF]">
              {filter === "today" ? "Today" : "This Week"}
              <span>
                <ArrowDown />
              </span>
            </p>
            <p
              onClick={() =>
                setFilter((prev) => (prev == "today" ? "week" : "today"))
              }
              className="flex items-center gap-12 font-poppins text-[20px] font-medium text-[#36383A] cursor-pointer tracking-[0.1px] p-2"
            >
              {filter === "today" ? "This Week" : "Today"}
            </p>
          </div>
        </div>
      </div>
      <div className="w-fill-available font-poppins border-y border-[#DCDEDF] py-8 ">
        <div className="flex flex-1 w-full lg:flex-row flex-col">
          <div className="grid md:grid-cols-2 grid-cols-1 w-full lg:border-0 md:border-b border-[#DCDEDF] lg:pb-0 md:pb-8 pb-0 ">
            {/* total orders */}
            <div className="md:border-r md:border-b-0 border-b border-[#DCDEDF] pr-6 flex-1 md:pb-0 pb-5">
              <div className="flex items-center mb-11 justify-between">
                <p className="text-[#5F6368]">Total Orders</p>
                <div className="flex items-center gap-3 text-[#de350b] bg-[rgba(255,143,115,0.5)] border border-[#FF8F73] rounded-[4px] px-2 py-1 ml-5 shadow-md shadow-[rgba(255,143,115,0.3)]">
                  <p className="text-xs font-medium">3.5 %</p>{" "}
                  <TrendingDownIcon />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-[31px] h-[126px] rounded-sm overflow-hidden relative">
                  <div
                    style={{ height: `${percent}%` }}
                    className={`w-full bottom-0 bg-[#ff991f] rounded-sm z-20 absolute`}
                  ></div>
                  <div className="w-full h-full bg-[#7900FA] rounded-sm z-10 absolute"></div>
                </div>
                <div className="grid content-between w-full">
                  <div>
                    <p className="text-xl text-[#171819] font-medium">
                      {totalOrders}
                    </p>
                    <p className="text-[#5F6368] text-sm mt-1.5">
                      Number of orders
                    </p>
                  </div>
                  <div className="lg:w-3/4 w-full">
                    <div className="w-full flex justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <p className="w-[16px] h-[16px] bg-[#7900FA] rounded-[6px]"></p>
                        <p className="text-[#5F6368] text-sm">New Client</p>
                      </div>
                      <p className="text-[#5F6368] text-sm">{newClient}</p>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <p className="w-[16px] h-[16px] bg-[#ff991f] rounded-[6px]"></p>
                        <p className="text-[#5F6368] text-sm">Repeat Client</p>
                      </div>
                      <p className="text-[#5F6368] text-sm">{repeated}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* order status */}
            <div className="md:border-r md:border-b-0 border-b border-[#DCDEDF] px-6 flex-1 md:pb-0 pb-5">
              <div className="flex items-center mb-11">
                <p className="text-[#5F6368]">Orders Status</p>
              </div>
              <div className="flex gap-5">
                <div className="w-[31px] h-[126px] rounded-sm overflow-hidden relative">
                  <div
                    style={{ height: `${percent}%` }}
                    className={`w-full bottom-0 bg-[#ff991f] rounded-sm z-20 absolute`}
                  ></div>
                  <div className="w-full h-full bg-[#7900FA] rounded-sm z-10 absolute"></div>
                </div>
                <div className="grid content-between w-full">
                  <div>
                    <p className="text-xl text-[#171819] font-medium">
                      {totalMainOrder}
                    </p>
                    <p className="text-[#5F6368] text-sm mt-1.5">
                      Number of orders
                    </p>
                  </div>
                  <div className="lg:w-3/4 w-full">
                    <div className="flex justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <p className="w-[16px] h-[16px] bg-[#7900FA] rounded-[6px]"></p>
                        <p className="text-[#5F6368] text-sm">Delivered</p>
                      </div>
                      <p className="text-[#5F6368] text-sm">{newClient}</p>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <p className="w-[16px] h-[16px] bg-[#ff991f] rounded-[6px]"></p>
                        <p className="text-[#5F6368] text-sm">In Progress</p>
                      </div>
                      <p className="text-[#5F6368] text-sm">{repeated}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* publication */}
          <div className="flex flex-1 w-full lg:flex-row flex-col justify-between gap-6 lg:mt-0 mt-5">
            <div className="pl-6 w-full">
              <div className="grid content-between h-full">
                <div className="flex items-center mb-11 justify-between">
                  <p className="text-[#5F6368]">Publication</p>
                  <div>
                    <p className="text-xl text-[#171819] font-medium">2024</p>
                    <p className="text-[#5F6368] text-sm mt-1.5">
                      Total publication
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 w-full">
                  <div className="grid content-between w-full">
                    <div className="w-full grid gap-1">
                      <div className="w-full flex items-center justify-between">
                        <p className="text-[#5F6368] text-sm">Hood Critic</p>
                        <p className="text-[#5F6368] text-sm">15</p>
                        <p className="text-[#36b37e] text-sm flex items-center gap-1">
                          7.5 % <TrendingUpIcon />
                        </p>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <p className="text-[#5F6368] text-sm">Hood Critic</p>
                        <p className="text-[#5F6368] text-sm">15</p>
                        <p className="text-[#36b37e] text-sm flex items-center gap-1">
                          7.5 % <TrendingUpIcon />
                        </p>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <p className="text-[#5F6368] text-sm">Hood Critic</p>
                        <p className="text-[#5F6368] text-sm">15</p>
                        <p className="text-[#36b37e] text-sm flex items-center gap-1">
                          7.5 % <TrendingUpIcon />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="home-publication-rechart-wrapper">
              <HChart />
              <p className="text-[#5F6368] text-sm text-end underline cursor-pointer">
                view all
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
