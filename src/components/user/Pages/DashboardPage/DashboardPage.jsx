import { PiMagnifyingGlassLight } from "react-icons/pi";
import Table from "./Table";

const DashboardPage = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between border-b border-[#DCDEDF] pb-4">
        <div className="flex gap-8">
          <h3 className="text-2xl font-semibold text-[#222425]">Dashboard</h3>
          <select className="text-[#878C91] text-[14px] border border-[#B2B5B8] lg:w-[180px] lg:h-[34px] w-[120px] h-[26px] px-2 rounded-[4px] focus:outline-2 focus:outline-[#004A87]">
            <option className="text-[#878C91]" disabled selected value="status">
              Status
            </option>
            <option value="published">Published</option>
            <option value="processing">Processing</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="flex gap-0.5">
          <input
            type="text"
            id="tableSearch"
            placeholder="Search Here..."
            className="border border-[#B2B5B8] py-1.5 text-[14px] lg:w-[180px] lg:h-[34px] w-[120px] h-[26px] px-2 rounded-[4px] focus:outline-2 focus:outline-[#004A87]"
          />
          <label
            htmlFor="tableSearch"
            className="border border-[#B2B5B8] py-1.5 flex items-center justify-center px-2 rounded-[4px] cursor-pointer"
          >
            <PiMagnifyingGlassLight />
          </label>
        </div>
      </div>
      <Table/>
    </div>
  );
};

export default DashboardPage;
