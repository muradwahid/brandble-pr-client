import { CiFilter } from "react-icons/ci";
import {
  AdultIcon,
  BitcoinIcon,
  CardiologyIcon,
  CartIcon,
  CasinoIcon,
  LeftArrowIcon,
  SpaIcon,
} from "../../../../utils/icons";
import FilterableSidebar from "./FilterableSidebar";
import { useState } from "react";
import Pagination from "../../../common/Pagination";
import { FaHeart } from "react-icons/fa";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { usePublicationsQuery } from '../../../../redux/api/publicationApi';
import SkeletonCard from '../../../common/SkeletonCard';
import { getFromLocalStorage, setToLocalStorage } from '../../../../utils/local-storage';
import toast from 'react-hot-toast';

const Publications = () => {

  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 90; // Example: total number of items
  const itemsPerPage = 10; // Example: items to display per page
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [toggle, setToggle] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);

  const { data, } = usePublicationsQuery()

  const isLoading = false;
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Here you would typically fetch new data based on the selected page
      console.log(`Fetching data for page: ${page}`);
    }
  };

const addToCard = (data) => {
  const existingData = JSON.parse(getFromLocalStorage("brandableCardData")) || [];
  
  // Check if item already exists in cart
  const isAlreadyInCart = existingData.some(item => item.id === data.id);
  
  if (isAlreadyInCart) {
    // Show error toast if item already exists
    toast.error("Item is already in your cart!");
    return false; 
  } else {
    // Add new item to cart
    const updatedData = [...existingData, data];
    setToLocalStorage("brandableCardData", JSON.stringify(updatedData));
    
    // Show success toast
    toast.success("Item added to cart successfully!");
    return true; 
  }
}

  const cmCls = "text-[#878C91] text-[12px] font-[12px] flex items-center";
  return (
    <div className="w-full">
      {/* back button */}
      <button
        className="text-[#002747] hover:text-[#075ca1] hover:fill-[#075ca1] text-[16px] flex items-center gap-2.5 cursor-pointer"
        onClick={() => window.navigation.back()}
      >
        <LeftArrowIcon />
        Back
      </button>
      <div className="my-8">
        <h2 className="text-[#002747] text-3xl font-medium font-glare">
          Explore All of Our Publications
        </h2>
      </div>
      <div className={`md:flex md:gap-6 ${toggle ? "flex gap-2.5" : ""}`}>
        {/* filterable sidebar */}
        <FilterableSidebar
          className={`md:ml-[0px] md:block ${toggle ? "block" : "hidden"}`}
        />

        {/* publication items*/}

        {
          isLoading ? <SkeletonCard /> : <div>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[#002747] text-[14px] mb-2">
                  Search Publication
                </p>
                <input
                  type="text"
                  placeholder="Search Here..."
                  className="w-full lg:w-[498px] md:w-[250px] border border-[#B2B5B8] py-1.5 px-3 text-[14px] focus:outline-2 focus:outline-[#004A87] text-[#5F6368] placeholder-[#5F6368] bg-[#F6F7F7]"
                />
              </div>
              <div className="md:hidden block">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setToggle(!toggle)}
                >
                  <p className="text-[#002747] text-[14px]">Filter</p>
                  <CiFilter className="text-[20px] text-[#002747]" />
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-4">
              {data?.data?.map((item, index) => (
                <div
                  key={index}
                  className="md:flex justify-between shadow-md p-3"
                >
                  <div className="md:flex gap-2.5 justify-between ">
                    <div className="bg-[#F6F6F6] relative md:max-w-[143px] w-full flex items-center justify-center">
                      <div className='min-w-24'>
                        <img src={item?.logo} alt={item?.title} />
                      </div>
                      <p className="bg-[#DCDEDF] text-[12px] text-[#878C91] font-medium absolute top-1 left-1 px-2 py-0.5">
                        {item?.genre}
                      </p>
                      <div
                        onClick={() => setActiveIdx(index)}
                        className="absolute top-1 right-1 cursor-pointer"
                      >
                        {index === activeIdx ? (
                          <IoMdHeart className="text-[#FF5630]" />
                        ) : (
                          <IoIosHeartEmpty />
                        )}
                      </div>
                      <div className="absolute flex bottom-2 bg-white p-0.5 shadow-sm gap-1.5 cursor-pointer">

                        {
                          item?.niches?.map((niche, i) => {
                            if (niche?.title?.toLowerCase() === "adult") return <AdultIcon key={i} />;
                            if (niche?.title?.toLowerCase() === "health") return <CardiologyIcon key={i} />;
                            if (niche?.title?.toLowerCase() === "cannabis") return <SpaIcon key={i} />;
                            if (niche?.title?.toLowerCase() === "crypto") return <BitcoinIcon key={i} />;
                            if (niche?.title?.toLowerCase() === "casino") return <CasinoIcon key={i} />;
                            return null;
                          })
                        }
                      </div>
                    </div>
                    <div className="grid content-between">
                      <h4 className="text-[#002747] text-[16px] mb-1">
                        {item?.title}
                      </h4>
                      <div>
                        <div className={cmCls}>
                          <p className="flex-1/3">Sponsored</p>
                          <p className="uppercase flex-1/2">: {item?.sponsore}</p>
                        </div>
                        <div className={cmCls}>
                          <p className="flex-1/3">Do Follow</p>
                          <p className="uppercase flex-1/2">: {item?.doFollow}</p>
                        </div>
                        <div className={cmCls}>
                          <p className="flex-1/3">Indexed</p>
                          <p className="uppercase flex-1/2">: {item?.index}</p>
                        </div>
                        <div className={cmCls}>
                          <p className="flex-1/3">Region</p>
                          <p className="flex-1/2">: {item?.region}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 md:flex-nowrap flex-wrap">
                        <p className="bg-[#F2F2F3] text-[11px] text-[#5F6368] font-medium py-0.5 px-1 whitespace-nowrap">
                          DA: {item?.da}
                        </p>
                        <p className="bg-[#F2F2F3] text-[11px] text-[#5F6368] font-medium py-0.5 px-1 whitespace-nowrap">
                          DR: {item?.dr}
                        </p>
                        <p className="bg-[#F2F2F3] text-[11px] text-[#5F6368] font-medium py-0.5 px-1 whitespace-nowrap">
                          TTP: {item?.ttp}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" flex md:grid md:content-between justify-between md:mt-0 mt-2">
                    <p className="md:text-[20px] text-[18px] text-[#36383A] font-glare">
                      <span>&#36;</span>
                      {item?.price}
                    </p>

                    <div className="flex justify-end cursor-pointer" onClick={() => addToCard(item)}>
                      <CartIcon className="md:h-[30px] md:w-[30px] h-[24px] w-[24px] fill-[#36383A]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="sm:flex items-center justify-end md:gap-28 sm:gap-10 my-8">
              <select
                defaultValue="10"
                className="text-[#878C91] text-[14px] border border-[#B2B5B8] px-2 py-[5.5px] focus:outline-2 focus:outline-[#004A87] md:mt-0 mt-1.5 sm:mb-0 mb-5 "
              >
                <option value="5" defaultValue="5">
                  5 Result
                </option>
                <option value="10">10 Result</option>
                <option value="15">15 Result</option>
                <option value="20">20 Result</option>
                <option value="30">30 Result</option>
              </select>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        }


      </div>
    </div>
  );
};

export default Publications;
