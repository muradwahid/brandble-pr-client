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
import { usePublicationsQuery } from '../../../../redux/api/publicationApi';

const AdminPublication = () => {
  const sortBtnRef = useRef(null);
  const [queryParams, setQueryParams] = useState({});
  const query = { ...queryParams }
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


  query["limit"] = itemsPerPage;
  query["page"] = currentPage;
  // query["sortBy"] = sortBy;
  // query["sortOrder"] = sortOrder;

  const searchTerms = new URLSearchParams(queryParams).toString();

  const { data, isLoading } = usePublicationsQuery({ ...query });
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

  console.log(data.publications.meta.total)


    const handleSort = (val) => {
      const ascendingOrder = val === 'asc';


    const tableBody = sortBtnRef.current;
    const rowsArray = Array.from(tableBody.rows);
    const sortedRows = rowsArray.sort((a, b) => {
      const aValue = a.cells[0].textContent.trim();
      const bValue = b.cells[0].textContent.trim();
      const comparison = aValue.localeCompare(bValue);
      return ascendingOrder ? comparison : comparison * -1;
    });
    tableBody.innerHTML = '';
    sortedRows.forEach((row) => {
      tableBody.appendChild(row);
    });
  };

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
              <span className="capitalize">{queryParams?.sortBy === 'title' ? queryParams?.sortOrder : ''}</span>
            </p>
            <ArrowDownIcon className="ml-2.5" />
            {activeFilter?.publication && (
              <Dropdown
                ref={targetRef}
                onClick={(val) =>
                  setQueryParams({ sortBy: 'title', sortOrder: val })
                }
                active={queryParams?.sortBy === 'title' ? queryParams?.sortOrder : ''}
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
              Genre <span className="capitalize">{queryParams?.sortBy === 'genre' ? queryParams?.sortOrder : ''}</span>
            </p>
            <ArrowDownIcon className="ml-2.5" />
            {activeFilter?.genre && (
              <Dropdown
                ref={targetRef}
                onClick={(val) =>
                  setQueryParams({ sortBy: 'genre', sortOrder: val  })
                }
                active={queryParams?.sortBy === 'genre' ? queryParams?.sortOrder : ''}
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
              Price <span className="capitalize">{queryParams?.sortBy === 'price' ? queryParams?.sortOrder : ''}</span>
            </p>
            <ArrowDownIcon className="ml-2.5" />
            {activeFilter?.price && (
              <Dropdown
                ref={targetRef}
                onClick={(val) =>
                  setQueryParams({ sortBy: 'title', sortOrder: val })
                }
                active={queryParams?.sortBy === 'price' ? queryParams?.sortOrder : ''}
              />
            )}
          </div>
          <div
            className="flex gap-2 items-center border border-[#DCDEDF] py-1 px-2.5 rounded-sm cursor-pointer h-8 relative"
            onClick={() =>
              setActiveFilter({
                sponsored: !activeFilter.sponsored,
              })
            }
          // ref={sortBtnRef}
          >
            <CampaignIcon />
            <p className="text-[#878C91] text-sm">
              Sponsored{" "}
              <span className="capitalize">{queryParams?.sortBy === 'sponsored' ? queryParams?.sortOrder : ''}</span>
            </p>
            <ArrowDownIcon className="ml-2.5" />
            {activeFilter?.sponsored && (
              <Dropdown
                ref={targetRef}
                onClick={(val) =>{
                  handleSort(val)
                  setQueryParams({ sortBy: 'sponsored', sortOrder: val  })}
                }
                active={queryParams?.sortBy === 'sponsored' ? queryParams?.sortOrder : ''}
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
            <tbody className=" text-[#36383A]" ref={sortBtnRef}>
              {data?.publications?.data && data?.publications?.data.map((item, index) => (
                <tr key={index} className="border-t border-[#DCDEDF]">
                  <td className="px-3 py-3 text-nowrap">{index + 1}</td>
                  <td className="px-3 py-3 text-nowrap">{item?.title}</td>
                  <td className="px-3 py-3 text-nowrap">{item?.genre.title}</td>
                  <td className="px-3 py-3 text-nowrap">{item?.da}</td>
                  <td className="px-3 py-3 text-nowrap">{item?.dr}</td>
                  <td className="px-3 py-3 text-nowrap">
                    {item?.ttp}
                  </td>
                  <td className="px-3 py-3 text-nowrap">
                    ${item.price}
                  </td>
                  <td className="px-3 py-3 text-nowrap">{item?.sponsored?.title}</td>
                  <td className="px-3 py-3 text-nowrap text-center capitalize">
                    {item?.index?.title}
                  </td>
                  <td className="px-3 py-3 text-nowrap text-center capitalize">
                    {item?.doFollow?.title}
                  </td>
                  <td className="px-3 py-3 text-nowrap">{item?.region}</td>
                  <td className="pr-2.5">
                    <span className="flex items-center gap-1">
                      {
                        item?.niches?.map((title, i) => {
                          if (title === "adult") return <AdultIcon key={i} />;
                          if (title === "health") return <CardiologyIcon key={i} />;
                          if (title === "cannabis") return <SpaIcon key={i} />;
                          if (title === "crypto") return <BitcoinIcon key={i} />;
                          if (title === "casino") return <CasinoIcon key={i} />;
                          return null;
                        })
                      }

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
