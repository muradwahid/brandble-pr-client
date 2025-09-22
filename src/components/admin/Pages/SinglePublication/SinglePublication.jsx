import { useState } from "react";
import { Link, useParams } from "react-router";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import {
  AdultIcon,
  BitcoinIcon,
  CardiologyIcon,
  CasinoIcon,
  DeleteIcon,
  SpaIcon,
} from "../../../../utils/icons";
import RemoveModal from "./RemoveModal";
import { usePublicationQuery } from '../../../../redux/api/publicationApi';

const SinglePublication = () => {
  const { id } = useParams();
  const [remove, setRemove] = useState(false);
  const { data, isLoading } = usePublicationQuery(id);


  const ref = useOutsideClick(() => {
    setRemove(false);
  });

  if (isLoading) {
    return <div className="animate-pulse border border-[#F2F2F3] p-6 w-4/5 mx-auto singlePublicationAdmin ">
      {/* Image placeholder */}
      <div className="w-32 h-32 bg-gray-300 rounded-md mb-6"></div>


      {/* Title placeholder */}
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>


      {/* Tags placeholder */}
      <div className="flex gap-2 mb-6">
        <div className="h-5 w-16 bg-gray-300 rounded"></div>
        <div className="h-5 w-16 bg-gray-300 rounded"></div>
        <div className="h-5 w-20 bg-gray-300 rounded"></div>
      </div>


      {/* Details */}
      <div className="space-y-4">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
            <div className="h-4 flex-1 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  }

  return (
    <div>
      <div className="border border-[#F2F2F3] p-6 w-4/5 mx-auto singlePublicationAdmin">
        {remove && <RemoveModal onChange={setRemove} ref={ref} id={data?.id} />}
        <div className="relative border-b border-[#DCDEDF] pb-5">
          <div className="flex md:gap-8 gap-3 absolute right-0">
            <div
              className="bg-[rgba(255,143,115,0.2)] px-4 py-2.5 rounded-3xl w-[52px] h-9 flex items-center justify-center cursor-pointer"
              onClick={() => setRemove(true)}
            >
              <DeleteIcon />
            </div>
            <Link
              to={`/admin/publications/edit/${id}`}
              className="bg-[#F6F7F7] px-4 py-2.5 rounded-3xl text-[#5F6368] text-sm w-[52px] h-9 flex items-center justify-center cursor-pointer"
            >
              Edit
            </Link>
          </div>
          <div className="flex gap-5 items-end">
            <div className="bg-[#E6E6E6] h-[150px] w-[150px]">
              <img className='w-full h-full object-cover'  src={data?.logo} alt="" />
            </div>
            <div className="">
              <h2 className="text-[#36383A] font-glare md:text-[32px] text-2xl mb-5 leading-[140%]">
                {data?.title}
              </h2>
              <div className="flex flex-wrap md:gap-10 gap-2.5">
                <div className="flex gap-2">
                  <p className="p-1 bg-[#F2F2F3] text-[#5F6368] font-popping font-medium text-[11px] flex items-center ">
                    DA: {data?.da}
                  </p>
                  <p className="p-1 bg-[#F2F2F3] text-[#5F6368] font-popping font-medium text-[11px] flex items-center ">
                    DR: {data?.dr}
                  </p>
                  <p className="p-1 bg-[#F2F2F3] text-[#5F6368] font-popping font-medium text-[11px] flex items-center ">
                    TTP: 1-3 Days
                  </p>
                </div>
                {data?.niches?.length > 0 && <div className="p-1 bg-[#F2F2F3] text-[#5F6368] font-popping font-medium flex items-center gap-3 rounded-sm">
                  <p className="text-sm">Niche</p>
                  <span className="flex items-center gap-1">
                    {
                      data?.niches?.map((title, i) => {
                        if (title === "adult") return <AdultIcon key={i} />;
                        if (title === "health") return <CardiologyIcon key={i} />;
                        if (title === "cannabis") return <SpaIcon key={i} />;
                        if (title === "crypto") return <BitcoinIcon key={i} />;
                        if (title === "casino") return <CasinoIcon key={i} />;
                        return null;
                      })
                    }
                  </span>
                </div>}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-5 pt-6">
          <div className="flex items-center gap-4">
            <div className="text-[#5F6368] font-glare font-normal flex items-center w-24 justify-between">
              <p>Genre</p>
              <p>:</p>
            </div>
            <p className="text-[#5F6368] font-glare font-normal">
              {data?.genre?.title}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#5F6368] font-glare font-normal flex items-center w-24 justify-between">
              <p>Price</p>
              <p>:</p>
            </div>
            {data?.price && <p className="text-[#5F6368] font-glare font-normal">
              $ {data?.price}
            </p>}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#5F6368] font-glare font-normal flex items-center w-24 justify-between">
              <p>Sponsored</p>
              <p>:</p>
            </div>
            <p className="text-[#5F6368] font-glare font-normal">{data?.sponsored?.title}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#5F6368] font-glare font-normal flex items-center w-24 justify-between">
              <p>Indexed</p>
              <p>:</p>
            </div>
            <p className="text-[#5F6368] font-glare font-normal capitalize">
              {data?.index?.title}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#5F6368] font-glare font-normal flex items-center w-24 justify-between">
              <p>Do Follow</p>
              <p>:</p>
            </div>
            <p className="text-[#5F6368] font-glare font-normal capitalize">
              {data?.doFollow?.title}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#5F6368] font-glare font-normal flex items-center w-24 justify-between">
              <p>Region</p>
              <p>:</p>
            </div>
            <p className="text-[#5F6368] font-glare font-normal">
              {data?.region}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePublication;
