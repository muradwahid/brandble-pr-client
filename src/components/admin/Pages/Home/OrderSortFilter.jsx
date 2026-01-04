import { useState } from "react";
import DayPicker from "./DayPicker";
import { usePublicationsQuery } from "../../../../redux/api/publicationApi";

const sortList = [
  { title: "Status", value: "status" },
  { title: "Service", value: "orderType" },
  { title: "Publication", value: "title" },
  { title: "Order Date", value: "date" },
];
const orderType = [
  { title: "Publish My Own Article", value: "ownArticle" },
  { title: "Write & Publish Article For Me", value: "writeArticle" },
];
const status = [
  { title: "Pending", value: "pending" },
  { title: "Accepted", value: "accepted" },
  { title: "Rejected", value: "rejected" },
  { title: "Refining", value: "refining" },
  { title: "Writing", value: "writing" },
  { title: "Publishing", value: "publishing" },
  { title: "Published", value: "published" },
];


const OrderSortFilter = ({ className, ref, setToggle }) => {
  const [sortby, setSortby] = useState("status");
  const [sortByValue, setSortbyValue] = useState({});

  const { data, isLoading} = usePublicationsQuery();

  const sortItems = {
    status,
    orderType,
    title:data?.data||[]
  };

  const handleDateChange = (date) => {
    setSortbyValue({
      ...sortByValue,
      date: date,
    });
  };

  if (isLoading) {
    return <div className="text-center my-3.5 mx-3.5 text-[#5F6368]">Loading...</div>;
  }
  return (
    <div
      className={`absolute ${
        sortby === "date" ? "w-[500px]" : "w-[350px]"
      }  rounded-md bg-white steperform-publish-formshadow ${className}`}
      ref={ref}
    >
      <div className="w-full p-3 font-poppins flex fillAvailableHeight">
        <div className="border-r border-[#F2F2F3] pr-[15px] ">
          {sortList.map((item, index) => (
            <p
              key={index}
              className={`text-[#878C91] text-sm px-2 py-0.5 mb-[5px] rounded-sm cursor-pointer ${
                sortby === item?.value ? "bg-[#F2F2F3]" : ""
              }`}
              onClick={() => setSortby(item?.value || item?.title)}
            >
              {item?.title}
            </p>
          ))}
        </div>
        <div className="pl-3">
          {sortby !== "date" &&
            sortItems[sortby].map((item, index) => (
              <p
                className={`text-[#878C91] text-sm px-2 py-0.5 mb-[5px] cursor-pointer ${
                  sortByValue?.[sortby] === item.value ? "bg-[#F2F2F3]" : ""
                }`}
                key={index}
                onClick={() =>
                  setSortbyValue({
                    ...sortByValue,
                    [sortby]: item.value,
                  })
                }
              >
                {item?.title}
              </p>
            ))}
          {sortby === "date" && <DayPicker onChange={handleDateChange} setToggle={setToggle} />}
        </div>
      </div>
    </div>
  );
};

export default OrderSortFilter;
