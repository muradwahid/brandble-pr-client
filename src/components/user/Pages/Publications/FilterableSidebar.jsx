import { RxMagnifyingGlass } from "react-icons/rx";
import "./style.css";
import { AdultIcon, BitcoinIcon, CardiologyIcon, CasinoIcon, SpaIcon } from "../../../../utils/icons";
const FilterableSidebar = ({className}) => {


  const ninche = [
    {
      title: "Adult",
      icon: <AdultIcon />,
      value:"adult"
    },
    {
      title: "CBD",
      icon: <SpaIcon />,
      value:"cbd"
    },
    {
      title: "Crypto",
      icon: <BitcoinIcon />,
      value:"crypto"
    },
    {
      title: "Gambling",
      icon: <CasinoIcon />,
      value:"gambling"
    },
    {
      title: "Health",
      icon: <CardiologyIcon />,
      value:"health"
    },
  ]

  const commonCls = "w-full px-4 py-2 border border-[#DCDEDF] text-[14px]  text-[#878C91] placeholder-[#878C91] bg-[#F6F7F7] focus:outline outline-[#004A87]";
  const labelCls = "block text-[#002747] text-[14px] mb-1";
  return (
    <div className={className}>
      <div className="bg-white h-full w-full md:w-60 max-w-60 border-r border-[#DCDEDF] pr-6">
        <div className="mb-3">
          <label className="block text-gray-700 text-lg font-medium mb-3">
            Price Range
          </label>
          <div className="flex justify-between items-center text-gray-600 text-sm mb-2">
            <span>$0</span>
            <span>$1000</span>
          </div>
          <div className="relative custom-slider-track">
            <div
              className="custom-slider-thumb left"
              style={{ left: "0%" }}
            ></div>

            <div
              className="custom-slider-thumb right"
              style={{ left: "100%" }}
            ></div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="publication-search" className={labelCls}>
            Publication
          </label>
          <div className="relative">
            <input
              type="text"
              id="publication-search"
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
            <select id="sort-by" className={`appearance-none ${commonCls}`}>
              <option>Price (Asc)</option>
              <option>Price (Desc)</option>
              <option>Date (Asc)</option>
              <option>Date (Desc)</option>
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
              id="publication-dropdown"
              className={`appearance-none ${commonCls}`}
            >
              <option>Publication (Asc)</option>
              <option>Publication (Desc)</option>
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
            >
              <option>Domain Authority (Asc)</option>
              <option>Domain Authority (Desc)</option>
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
              className={`appearance-none ${commonCls}`}
            >
              <option>Domain Rating (Asc)</option>
              <option>Domain Rating (Desc)</option>
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
            <select id="location" className={`appearance-none ${commonCls}`}>
              <option>Select Location</option>
              <option>USA</option>
              <option>Europe</option>
              <option>Asia</option>
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
          <label htmlFor="genre" className={labelCls}>
            Genre
          </label>
          <div className="relative">
            <select id="genre" className={`appearance-none ${commonCls}`}>
              <option>Genre</option>
              <option>News</option>
              <option>Sports</option>
              <option>Technology</option>
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
            <select id="do-follow" className={`appearance-none ${commonCls}`}>
              <option>Yes</option>
              <option>No</option>
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
            <select id="indexed" className={`appearance-none ${commonCls}`}>
              <option>Yes</option>
              <option>No</option>
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
            {ninche.map((item, index) => (
              <div
                key={index}
                className="border border-[#B2B5B8] py-1.5 px-2 flex items-center gap-2 cursor-pointer"
              >
                {item.icon}
                <span className="text-[#878C91] text-[12px] m-0 p-0">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-right">
          <button className="bg-[#171819] hover:bg-gray-700 py-1.5 px-6 text-[#F2F2F3] transition duration-300 ease-in-out cursor-pointer rounded-sm">
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterableSidebar;
