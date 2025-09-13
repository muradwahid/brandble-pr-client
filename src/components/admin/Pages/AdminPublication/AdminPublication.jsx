import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  AdultIcon,
  AmericaIcon,
  ArrowDownIcon,
  AVTimer,
  BitcoinIcon,
  CampaignIcon,
  CardiologyIcon,
  CasinoIcon,
  CirclePlusIcon,
  CurrencyIcon,
  DownloadDownIcon,
  FollowHumanIcon,
  GenreIcon,
  HolidayVillageIcon,
  ListIcon,
  PublicationBadgeIcon,
  SpaIcon,
  StarHalf,
  StartCircleIcon,
} from "../../../../utils/icons";
import AdminPagination from "../../../common/AdminPagination";
import Dropdown from "./Dropdown";

const AdminPublication = () => {
  const [data,setData] = useState([])
  const [queryParams, setQueryParams] = useState({});
  const [activeFilter, setActiveFilter] = useState({
    publication: false,
    genre: false,
    price: false,
    sponsored: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = 90; // Example: total number of items
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


  useEffect(() => {
    const fetchPublications = async () => {
      try {
        // setLoading(true);
        const response = await fetch(
          "http://localhost:5000/api/v1/publication/all-publications"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setData(data.data.data); // Assuming your API returns { data: [], meta: {} }
        console.log(data)
        // setLoading(false);
      } catch (err) {
        // setError(err.message);
        // setLoading(false);
        console.log(err)
      }
    };

    fetchPublications();
  }, []);

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
          <Link to="/admin/publications/add-new-publication">
            <div
              className="flex gap-2 items-center border border-[#DCDEDF] py-2 px-2.5 pl-4 rounded-[8px] cursor-pointer h-9"
              onClick={() => setActiveFilter(!activeFilter)}
              // ref={sortBtnRef}
            >
              <CirclePlusIcon />
              <p className="text-[#878C91] text-sm">Publication</p>
            </div>
          </Link>
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
          <table className="min-w-max text-sm font-normal overflow-x-scroll table-fixed overflow-hidden">
            <thead className="bg-[#F6F7F7]">
              <tr className="text-left py-2">
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    SL
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
                    <StartCircleIcon /> DA
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <StarHalf /> DR
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <AVTimer /> TAT
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <CurrencyIcon /> Price
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <CampaignIcon /> Sponsored
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <ListIcon /> Indexed
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <FollowHumanIcon /> Do Follow
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <AmericaIcon /> Region
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <HolidayVillageIcon /> Niche
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    Edit
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className=" text-[#36383A]">
              {data.map((item, index) => (
                <tr key={index} className="border-t border-[#DCDEDF]">
                  <td className="px-3 py-3 text-nowrap">{index + 1}</td>
                  <td className="px-3 py-3 text-nowrap">{item.title}</td>
                  <td className="px-3 py-3 text-nowrap">{item.genre.title}</td>
                  <td className="px-3 py-3 text-nowrap">{item.da}</td>
                  <td className="px-3 py-3 text-nowrap">{item.dr}</td>
                  <td className="px-3 py-3 text-nowrap">
                    {item.tat || "1-3 days"}
                  </td>
                  <td className="px-3 py-3 text-nowrap">
                    ${item.price || "1500"}
                  </td>
                  <td className="px-3 py-3 text-nowrap">{item.title}</td>
                  <td className="px-3 py-3 text-nowrap text-center capitalize">
                    {item?.indexed}
                  </td>
                  <td className="px-3 py-3 text-nowrap text-center capitalize">
                    {item.doFollow}
                  </td>
                  <td className="px-3 py-3 text-nowrap">{item.region}</td>
                  <td className="pr-2.5">
                    <span className="flex items-center gap-1">
                      {item?.niche?.title == "adult" && <AdultIcon />}
                      {item?.niche?.title == "health" && <CardiologyIcon />}
                      {item?.niche?.title == "cannabis" && <SpaIcon />}
                      {item?.niche?.title == "crypto" && <BitcoinIcon/>}

                      {/* <CardiologyIcon />
                      <SpaIcon />
                      <BitcoinIcon />
                      <CasinoIcon /> */}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-nowrap cursor-pointer text-center [writing-mode:vertical-rl] ">
                    <Link to={`/admin/publications/${item.id}`}>...</Link>
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

export default AdminPublication;
