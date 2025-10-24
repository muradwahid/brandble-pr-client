import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  AdultIcon,
  ArrowDownIcon,
  ArrowUploadCircleIcon,
  BitcoinIcon,
  CampaignIcon,
  CardiologyIcon,
  CasinoIcon,
  ClearAllIcon,
  CurrencyIcon,
  DownloadDownIcon,
  GenreIcon,
  OrderIconCalender,
  PublicationBadgeIcon,
  ServicesIcon,
  SpaIcon,
  UserIcon,
} from "../../../../utils/icons";
import AdminPagination from "../../../common/AdminPagination";
import { publicationData } from "../../../user/Pages/Publications/data";
import Dropdown from "./Dropdown";

const TotalOrders = () => {
  const [queryParams, setQueryParams] = useState({});
  const [activeFilter, setActiveFilter] = useState({
    publication: false,
    genre: false,
    price: false,
    sponsored: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = 1; // Example: total number of items
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const targetRef = useRef(null);
  const buttonRef = useRef(null);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Here you would typically fetch new data based on the selected page
      console.log(`Fetching data for page: ${page}`);
    }
  };

  useEffect(() => {
    function handleClick(event) {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setActiveFilter({
          publication: false,
          genre: false,
          price: false,
          sponsored: false,
        });
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [targetRef]);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3">
          <div
            className="flex gap-2 items-center border border-[#DCDEDF] py-1 px-2.5 rounded-sm cursor-pointer h-8 relative"
            ref={buttonRef}
            onClick={() =>
              setActiveFilter({
                ...activeFilter,
                publication: !activeFilter.publication,
              })
            }
            // ref={sortBtnRef}
          >
            <PublicationBadgeIcon />
            <p className="text-[#878C91] text-sm">
              Publication{" "}
              <span className="capitalize">{queryParams?.publication}</span>
            </p>
            <ArrowDownIcon className="ml-2.5" />
            {activeFilter?.publication && (
              <Dropdown
                ref={targetRef}
                onClick={(val) =>
                  setQueryParams({ ...queryParams, publication: val })
                }
                active={queryParams?.publication}
              />
            )}
          </div>
          <div
            className="flex gap-2 items-center border border-[#DCDEDF] py-1 px-2.5 rounded-sm cursor-pointer h-8 relative"
            onClick={() =>
              setActiveFilter({
                ...activeFilter,
                genre: !activeFilter.genre,
              })
            }
            // ref={sortBtnRef}
          >
            <GenreIcon />
            <p className="text-[#878C91] text-sm">
              Genre <span className="capitalize">{queryParams?.genre}</span>
            </p>
            <ArrowDownIcon className="ml-2.5" />
            {activeFilter?.genre && (
              <Dropdown
                ref={targetRef}
                onClick={(val) =>
                  setQueryParams({ ...queryParams, genre: val })
                }
                active={queryParams?.genre}
              />
            )}
          </div>
          <div
            className="flex gap-2 items-center border border-[#DCDEDF] py-1 px-2.5 rounded-sm cursor-pointer h-8 relative"
            onClick={() =>
              setActiveFilter({ ...activeFilter, price: !activeFilter.price })
            }
            // ref={sortBtnRef}
          >
            <CurrencyIcon />
            <p className="text-[#878C91] text-sm">
              Price <span className="capitalize">{queryParams?.price}</span>
            </p>
            <ArrowDownIcon className="ml-2.5" />
            {activeFilter?.price && (
              <Dropdown
                ref={targetRef}
                onClick={(val) =>
                  setQueryParams({ ...queryParams, price: val })
                }
                active={queryParams?.price}
              />
            )}
          </div>
          <div
            className="flex gap-2 items-center border border-[#DCDEDF] py-1 px-2.5 rounded-sm cursor-pointer h-8 relative"
            onClick={() =>
              setActiveFilter({
                ...activeFilter,
                sponsored: !activeFilter.sponsored,
              })
            }
            // ref={sortBtnRef}
          >
            <CampaignIcon />
            <p className="text-[#878C91] text-sm">
              Sponsored{" "}
              <span className="capitalize">{queryParams?.sponsored}</span>
            </p>
            <ArrowDownIcon className="ml-2.5" />
            {activeFilter?.sponsored && (
              <Dropdown
                ref={targetRef}
                onClick={(val) =>
                  setQueryParams({ ...queryParams, sponsored: val })
                }
                active={queryParams?.sponsored}
              />
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <div
            className="flex gap-3 items-center py-2 px-2.5 pl-4 rounded-[8px] cursor-pointer bg-[#36B37E]  h-9"
            // onClick={() => setToggle(!toggle)}
            // ref={sortBtnRef}
          >
            <DownloadDownIcon />
            <p className="text-white font-normal text-sm">Excel</p>
          </div>
        </div>
      </div>
      <div className=" w-full overflow-x-auto pb-3">
        <div className="rounded-md  border border-[#DCDEDF] w-fit">
          <table className="min-w-[1055px] text-sm font-normal overflow-x-scroll table-fixed overflow-hidden">
            <thead className="bg-[#F6F7F7]">
              <tr className="text-left py-2">
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    SL
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <ClearAllIcon /> Order ID
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <UserIcon />
                    User Name
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <ServicesIcon /> Services
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <PublicationBadgeIcon />
                    Publication
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <GenreIcon /> Genre
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <CurrencyIcon /> Amount
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <OrderIconCalender /> Order Date
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <ArrowUploadCircleIcon />
                    Status
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className=" text-[#5F6368] text-sm">
              {publicationData.slice(0, 1).map((item, index) => (
                <tr key={index} className="border-t border-[#DCDEDF]">
                  <td className="px-3 py-3 text-nowrap">{index + 1}</td>
                  <td>
                    <Link to={`/admin/orders/${item?.id}`} className="px-3 py-3 text-nowrap">90987657</Link>
                  </td>
                  <td>
                    <Link to={`/admin/orders/${item?.id}`} className="px-3 py-3 text-nowrap">Lee</Link>
                  </td>
                  <td>
                    <Link to={`/admin/orders/${item?.id}`} className="px-3 py-3 text-nowrap text-[#222425]">
                      Publish my own article
                    </Link>
                  </td>
                  <td>
                    <Link to={`/admin/orders/${item?.id}`} className="px-3 py-3 text-nowrap">Hood Critic</Link>
                  </td>
                  <td>
                    <Link to={`/admin/orders/${item?.id}`} className="px-3 py-3 text-nowrap overflow-hidden whitespace-nowrap text-ellipsis w-[92px]">
                      Health & Fitness
                    </Link>
                  </td>
                  <td>
                    <Link to={`/admin/orders/${item?.id}`} className="px-3 py-3 text-nowrap">{item.price || "1500"}</Link>$
                  </td>
                  <td className="px-3 py-3 text-nowrap">03/03/2025</td>
                  <td className="px-3 py-3 text-nowrap">
                    <button className="bg-[#FFAB00] rounded-sm px-3 py-1 text-white">
                      Pending
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="sm:flex items-center justify-end gap-2 mt-6">
        <AdminPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <select
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          defaultValue="10"
          className="text-[#878C91] text-sm border border-[#DCDEDF] px-0.5 py-[3.5px] focus:outline-2 focus:outline-[#004A87] rounded-md "
        >
          <option value="5">5 Result</option>
          <option value="10">10 Result</option>
          <option value="15">15 Result</option>
          <option value="20">20 Result</option>
          <option value="30">30 Result</option>
        </select>
      </div>
    </div>
  );
};

export default TotalOrders;
