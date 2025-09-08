import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  TrendingDownIcon,
  TrendingUpIcon,
} from "../../../../utils/icons";
import Tooltip from "../../../ui/Tooltip";
import HChart from "./HChart";
import PublicationStatistic from "./PublicationStatistic";

const OrderStatus = () => {
  const [filter, setFilter] = useState("today");
  const [toggle, setToggle] = useState(false);
  const [isStatistic, setIsStatistic] = useState(false);
  const statisticRef = useRef();
  const viewRef = useRef();

  const newClient = 11;
  const repeated = 4;
  const totalOrders = newClient + repeated;
  const percent = parseInt((repeated / totalOrders) * 100);

  const totalMainOrder = 22;
  useEffect(() => {
    function handleClick(event) {
      if (
        statisticRef.current &&
        !statisticRef.current.contains(event.target) &&
        viewRef.current &&
        !viewRef.current.contains(event.target)
      ) {
        setIsStatistic(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [viewRef]);
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
        <div className="flex w-full lg:flex-row flex-col">
          <div className="grid md:grid-cols-2 flex12 grid-cols-1 w-full lg:border-0 md:border-b border-[#DCDEDF] lg:pb-0 md:pb-8 pb-0 ">
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
          <div className="flex w-full flex1 lg:flex-row flex-col justify-between gap-6 lg:mt-0 mt-5">
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
                        <span className="text-[#5F6368] group text-sm relative transition-all duration-200">
                          15
                          <Tooltip
                            className={`absolute bg-white border w-[150px] border-[#F2F2F3] `}
                          >
                            15 Order placed this month
                          </Tooltip>
                        </span>
                        <p className="text-[#36b37e] text-sm flex items-center gap-1">
                          7.5 % <TrendingUpIcon />
                        </p>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <p className="text-[#5F6368] text-sm">Hood Critic</p>
                        <span className="text-[#5F6368] group text-sm relative transition-all duration-200">
                          15
                          <Tooltip
                            className={`absolute bg-white border w-[150px] border-[#F2F2F3] `}
                          >
                            15 Order placed this month
                          </Tooltip>
                        </span>
                        <p className="text-[#36b37e] text-sm flex items-center gap-1">
                          7.5 % <TrendingUpIcon />
                        </p>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <p className="text-[#5F6368] text-sm">Hood Critic</p>
                        <span className="text-[#5F6368] group text-sm relative transition-all duration-200">
                          15
                          <Tooltip
                            className={`absolute bg-white border w-[150px] border-[#F2F2F3] `}
                          >
                            15 Order placed this month
                          </Tooltip>
                        </span>
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
              <div
                className="text-[#5F6368] text-sm text-end underline cursor-pointer relative left-0"
                onClick={() => setIsStatistic(true)}
                ref={viewRef}
              >
                view all
                {isStatistic && <PublicationStatistic ref={statisticRef} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
