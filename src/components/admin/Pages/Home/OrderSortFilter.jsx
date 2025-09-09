import { useState } from "react";
import DayPicker from "./DayPicker";

const sortList = [
  { name: "Status", value: "status" },
  { name: "Service", value: "service" },
  { name: "Publication", value: "publication" },
  { name: "OrderDate", value: "date" },
];
const service = [
  { name: "Publish My Own Article", value: "ownArticle" },
  { name: "Write & Publish Article For Me", value: "writeArticle" },
];
const status = [
  { name: "Pending", value: "pending" },
  { name: "Accepted", value: "accepted" },
  { name: "Rejected", value: "rejected" },
  { name: "Refining", value: "refining" },
  { name: "Writing", value: "writing" },
  { name: "Publishing", value: "publishing" },
  { name: "Published", value: "published" },
];

const publication = [{ name: "Hood Critic", value: "hood critic" }];

const OrderSortFilter = ({ className, ref, setToggle }) => {
  const [sortby, setSortby] = useState("status");
  const [sortByValue, setSortbyValue] = useState({});
  const sortItems = {
    status,
    service,
    publication,
  };

  const handleDateChange = (date) => {
    setSortbyValue({
      ...sortByValue,
      date: date,
    });
  };
  return (
    <div
      className={`absolute ${
        sortby === "date" ? "w-[500px]" : "w-[350px]"
      } min-h-[276px] rounded-md bg-white steperform-publish-formshadow ${className}`}
      ref={ref}
    >
      <div className="w-full p-3 font-poppins flex fillAvailableHeight">
        <div className="border-r border-[#F2F2F3] pr-[15px] ">
          {sortList.map((item, index) => (
            <p
              key={index}
              className={`text-[#878C91] text-sm px-2 py-0.5 mb-[5px] rounded-sm cursor-pointer ${
                sortby === item.value ? "bg-[#F2F2F3]" : ""
              }`}
              onClick={() => setSortby(item.value)}
            >
              {item.name}
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
                {item.name}
              </p>
            ))}
          {sortby === "date" && <DayPicker onChange={handleDateChange} setToggle={setToggle} />}
        </div>
      </div>
    </div>
  );
};

export default OrderSortFilter;
