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
import Dropdown from "./Dropdown";
import { useAdminOrdersQuery } from "../../../../redux/api/orderApi";
import { formattedDate } from "../../../../utils/function";

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


  const {data, isLoading,} = useAdminOrdersQuery({
    page: currentPage,
    limit: itemsPerPage,
    ...queryParams,
  });
  const ordersData = data?.orders?.data || [];
  const meta = data?.orders?.meta || { page: 1, limit: 10, total: 0 };
  const totalPages = Math.ceil((meta.total || 0) / itemsPerPage);

  const targetRef = useRef(null);
  const buttonRef = useRef(null);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      // window.scrollTo(0, 0);
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

  const getOrderType = (type,id) => { 
    return type === 'wonArticle' ? `/admin/orders/${id}` : `/admin/orders/${id}/details`;
  }



  if (isLoading) {
    return <div className="text-[#5F6368] flex items-center justify-center h-[60dvh] w-full">Loading...</div>
  }

  return (<>
    {
      meta?.total >0?
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
              <span className="capitalize">{queryParams?.sponsor}</span>
            </p>
            <ArrowDownIcon className="ml-2.5" />
            {activeFilter?.sponsored && (
              <Dropdown
                ref={targetRef}
                onClick={(val) =>
                  setQueryParams({ ...queryParams, sponsor: val })
                }
                active={queryParams?.sponsor}
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
              {ordersData && ordersData?.map((order, index) => (
                <tr key={index} className="border-t border-[#DCDEDF]">
                  <td className="px-3 py-3 text-nowrap">{index + 1 + (Number(currentPage) - 1) * Number(currentPage)}</td>
                  <td>
                    <Link to={getOrderType(order?.orderType,order?.id)} className="px-3 py-3 text-nowrap"><div className="max-w-60 truncate">{order?.id}</div></Link>
                  </td>
                  <td>
                    <Link to={getOrderType(order?.orderType,order?.id)} className="px-3 py-3 text-nowrap">{order?.user?.name}</Link>
                  </td>
                  <td>
                    <Link to={getOrderType(order?.orderType,order?.id)} className="px-3 py-3 text-nowrap text-[#222425]">
                      {order?.orderType === "wonArticle" ? "Publish my own article" : "Write & Publish Article For Me"}
                    </Link>
                  </td>
                  <td>
                    <Link to={getOrderType(order?.orderType,order?.id)} className="px-3 py-3 text-nowrap">{order?.publication?.title}</Link>
                  </td>
                  <td>
                    <Link to={getOrderType(order?.orderType,order?.id)} className="px-3 py-3 text-nowrap overflow-hidden whitespace-nowrap text-ellipsis w-[92px]">
                      {order?.publication?.genre}
                    </Link>
                  </td>
                  <td>
                    <Link to={getOrderType(order?.orderType,order?.id)} className="px-3 py-3 text-nowrap">{order?.amount}$</Link>
                  </td>
                  <td className="px-3 py-3 text-nowrap">{formattedDate(order?.createdAt)}</td>
                  <td className="px-3 py-3 text-nowrap">
                    <button className={`rounded-sm px-3 py-1 text-white ${order?.status == 'processing'?'bg-[#36b37E]':order?.status=='published'?'bg-[#008cff]':'bg-[#FFAB00]'}`}>
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
    </div >: <div className="flex items-center justify-center h-[60dvh] w-full">
    <p className="text-[#5F6368] font-medium capitalize text-2xl">No orders found</p>
  </div>
    }
  </>
  );
};

export default TotalOrders;
