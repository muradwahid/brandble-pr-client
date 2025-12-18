import { RxMagnifyingGlass } from "react-icons/rx";
import { Link, useMatch } from "react-router";
import { BellIcon, CirclePlusIcon } from "../../../utils/icons";
import { getUserInfo } from "../../../helpers/user/user";
import { useUserQuery } from "../../../redux/api/authApi";
import PublicationPopup from "../../common/PublicationPopup";
import { useAdminSearchPublicationsQuery } from "../../../redux/api/publicationApi";
import { useState } from "react";

const AdminHeader = () => {
  const [search,setSearch]=useState('')
  const publicationSingle = useMatch("/admin/publications/:id");
  const addPublication = useMatch("/admin/publications/add-new-publication");
  const isShowButton = publicationSingle?.pathname && !addPublication?.pathname;

  const query = {
    ...(search && { searchTerm: search })
  }
  
  const { data:publications,isLoading, isFetching } = useAdminSearchPublicationsQuery(query);

  const { id } = getUserInfo();

  const { data } = useUserQuery(id);
  return (
    <div className="flex w-full justify-between mb-9 mt-5 ">
      <div className="relative">
        <RxMagnifyingGlass className="text-[#878C91] absolute top-1/2 -translate-y-1/2 left-2" />
        <input
          className="bg-[#F2F2F3] placeholder:text-[#878C91] p-2 pl-8 rounded-sm lg:w-[500px] w-full text-sm outline-[#004A87]"
          type="search"
          name="search"
          placeholder="Search publication"
          id="adminSearch"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        {search.length >2&&<PublicationPopup publications={publications} isLoading={isLoading} isFetching={isFetching} setSearch={setSearch} />}
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
          {/* <BellIcon /> */}
          <Link to="/admin/profile" className="flex">
            <div className="w-[40px] h-[40px] rounded-[8px] overflow-hidden">
              <img className="w-full h-full" src={data?.image} alt="" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
