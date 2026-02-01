import { RxMagnifyingGlass } from "react-icons/rx";
import { AdultIcon, BitcoinIcon, CardiologyIcon, CasinoIcon, SpaIcon } from "../../../../utils/icons";
import PriceRangeSlider from "../../../common/PriceRangeSlider";

import "./style.css";
import LocationFilter from "../../../common/LocationFilter";
import { useState } from "react";
import { useCommonQuery } from "../../../../redux/api/commonApi";
const FilterableSidebar = ({ className, setSearch, sortBy, setSortBy, publication, setPublication, domainAuthority, setDomainAuthority, domainRating, setDomainRating, location, setLocation, genre, setGenre, doFollow, setDoFollow, indexed, setIndexed, niche, setNiche, range, setRange, setScope }) => {

  const [isLocationShow, setIsLocationShow] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  
  const { data, isLoading } = useCommonQuery()


  const handleReset = () => { 
    setSearch('');
    setSortBy('');
    setPublication('')
    setDomainAuthority('')
    setDomainRating('')
    setLocation('')
    setGenre('')
    setDoFollow('')
    setIndexed('')
    setNiche('')
    setIsLocationShow(false);
    setScope({});
  }

  const commonCls = "w-full px-4 py-2 border border-[#DCDEDF] text-[14px]  text-[#878C91] placeholder-[#878C91] bg-[#F6F7F7] focus:outline outline-[#004A87]";
  const labelCls = "block text-[#002747] text-[14px] mb-1";

  return (
    <div className={className}>
      <div className="bg-white h-full w-full md:w-60 max-w-60 border-r border-[#DCDEDF] pr-6">
        <div className="mb-3">
          <PriceRangeSlider
            min={0}
            max={5000}
            step={100}
            valueMin={range.min || 0}
            valueMax={range.max|| 5000}
            onChange={({ min, max }) => setRange({ min, max })} />
        </div>

        <div className="mb-3">
          <label htmlFor="publication-search" className={labelCls}>
            Publication
          </label>
          <div className="relative">
            <input
              type="text"
              id="publication-search"
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Publication Here..."
              className={`pl-8 ${commonCls}`}
            />
            <RxMagnifyingGlass className="absolute left-1.5 top-[50%] translate-y-[-50%] text-[20px] text-[#878C91] " />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="sort-by" className={labelCls}>
            Sort by
          </label>
          <div className="relative">
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)} id="sort-by" className={`appearance-none ${commonCls}`}>
              <option value="">Price (Asc)</option>
              <option value="priceDesc">Price (Desc)</option>
              <option value="dateAsc">Date (Asc)</option>
              <option value="dateDesc">Date (Desc)</option>
            </select>
            <div className="custom-dropdown-arrow">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="publication-dropdown" className={labelCls}>
            Publication
          </label>
          <div className="relative">
            <select
              value={publication}
              onChange={e=>setPublication(e.target.value)}
              id="publication-dropdown"
              className={`appearance-none ${commonCls}`}
            >
              <option value=''>Publication (Asc)</option>
              <option value='desc' >Publication (Desc)</option>
            </select>
            <div className="custom-dropdown-arrow">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="domain-authority" className={labelCls}>
            Domain Authority
          </label>
          <div className="relative">
            <select
              id="domain-authority"
              className={`appearance-none ${commonCls}`}
              value={domainAuthority}
              onChange={e=>setDomainAuthority(e.target.value)}
            >
              <option value={''}>Domain Authority (Asc)</option>
              <option value={'desc'}>Domain Authority (Desc)</option>
            </select>
            <div className="custom-dropdown-arrow">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="domain-rating" className={labelCls}>
            Domain Rating
          </label>
          <div className="relative">
            <select
              id="domain-rating"
              value={domainRating}
              className={`appearance-none ${commonCls}`}
              onChange={e=>setDomainRating(e.target.value)}
            >
              <option value={''}>Domain Rating (Asc)</option>
              <option value={'desc'}>Domain Rating (Desc)</option>
            </select>
            <div className="custom-dropdown-arrow">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="location" className={labelCls}>
            Location
          </label>
          <div className="relative">
            <select onClick={() => setIsLocationShow(true)} value={location} onChange={e => {
              setLocation(e.target.value)
              setLocationSearch('');
            }} id="location" className={`appearance-none ${commonCls}`}>
              <option defaultChecked value=''>Select Location</option>
              <option value='local'>Local</option>
              <option value='state'>State</option>
              <option value='national'>National</option>
              <option value='global'>Global</option>
            
            </select>
            <div className="custom-dropdown-arrow">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
            {(location && location!=='global' && isLocationShow) && <LocationFilter data={data} isLoading={isLoading} onChange={val => setScope(val)} setIsLocationShow={setIsLocationShow} scope={location} {...{ setLocationSearch, locationSearch }} />}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="genre" className={labelCls}>
            Genre
          </label>
          <div className="relative">
            <select value={genre} onChange={e=>setGenre(e.target.value)} id="genre" className={`appearance-none ${commonCls}`}>
              <option defaultChecked>Select Genre</option>
              {
                data?.genre?.map((item,index)=>(
                  <option key={index} value={item.title}>{item.title}</option>
                ))
              }
            </select>
            <div className="custom-dropdown-arrow">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="do-follow" className={labelCls}>
            Do Follow
          </label>
          <div className="relative">
            <select value={doFollow} onChange={e=>setDoFollow(e.target.value)} id="do-follow" className={`appearance-none ${commonCls}`}>
              <option value={'yes'}>Yes</option>
              <option value={'no'}>No</option>
            </select>
            <div className="custom-dropdown-arrow">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="indexed" className={labelCls}>
            Indexed
          </label>
          <div className="relative">
            <select value={indexed} onChange={e=>setIndexed(e.target.value)} id="indexed" className={`appearance-none ${commonCls}`}>
              <option value={'yes'}>Yes</option>
              <option value={'no'}>No</option>
            </select>
            <div className="custom-dropdown-arrow">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label className={labelCls}>Niche</label>
          <div className="flex flex-wrap gap-2">
            {data?.niche?.map((nicheData, i) => {
              const title = nicheData?.title;
              const iconMap = {
                adult: <AdultIcon />,
                health: <CardiologyIcon />,
                cannabis: <SpaIcon />,
                crypto: <BitcoinIcon />,
                casino: <CasinoIcon />,
              };

              const Icon = iconMap[title?.toLowerCase()];

              return (
                <div
                  key={i}
                  onClick={() => setNiche(title)}
                  className={`border border-[#B2B5B8] py-1.5 px-2 flex items-center gap-2 cursor-pointer ${title === niche ? "bg-[#eeeeee]" : ""
                    }`}
                >
                  {Icon}
                  <span className="text-[#878C91] text-[12px] m-0 p-0 capitalize">
                    {title}
                  </span>
                </div>
              );
            })}
            {/* {ninche.map((item, index) => (
              <div
                key={index}
                onClick={()=>setNiche(item.title)}
                className={`border border-[#B2B5B8] py-1.5 px-2 flex items-center gap-2 cursor-pointer ${item.title === niche ?'bg-[#eeeeee]':''}`}
              >
                {item.icon}
                <span className="text-[#878C91] text-[12px] m-0 p-0">
                  {item.title}
                </span>
              </div>
            ))} */}
          </div>
        </div>

        <div className="text-right">
          <button onClick={()=>handleReset()} className="bg-[#171819] hover:bg-gray-700 py-1.5 px-6 text-[#F2F2F3] transition duration-300 ease-in-out cursor-pointer rounded-sm">
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterableSidebar;
