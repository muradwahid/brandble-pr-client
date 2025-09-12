import { RxMagnifyingGlass } from "react-icons/rx";
import { Link, useMatch } from "react-router";
import profileImg from "../../../assets/adminprofile.png";
import { BellIcon, CirclePlusIcon } from "../../../utils/icons";

const AdminHeader = () => {
  const publicationSingle = useMatch("/admin/publications/:id");
  const addPublication = useMatch("/admin/publications/add-new-publication");
  const isShowButton = publicationSingle?.pathname && !addPublication?.pathname;
  return (
    <div className="flex w-full justify-between mb-9 mt-5 ">
      <div className="relative">
        <RxMagnifyingGlass className="text-[#878C91] absolute top-1/2 -translate-y-1/2 left-2" />
        <input
          className="bg-[#F2F2F3] placeholder:text-[#878C91] p-2 pl-8 rounded-sm lg:w-[500px] w-full text-sm outline-[#004A87]"
          type="search"
          name="search"
          placeholder="Search"
          id="adminSearch"
        />
      </div>
      <div className="flex items-center">
        {isShowButton && (
          <Link to="/admin/publications/add-new-publication">
            <div
              className="flex gap-2 items-center border border-[#878C91] py-2 px-2.5 pl-4 rounded-[8px] cursor-pointer h-9 mr-11"
              // ref={sortBtnRef}
            >
              <CirclePlusIcon />
              <p className="text-[#5F6368] text-sm">Publication</p>
            </div>
          </Link>
        )}
        <div className="flex items-center gap-5">
          <BellIcon />
          <div className="w-[40px] h-[40px] rounded-[8px] overflow-hidden">
            <img className="w-full h-full" src={profileImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
