import { useEffect, useState } from "react";
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

const SinglePublication = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const publicationDetails = data.find((publication) => publication.id === id);
  const [remove, setRemove] = useState(false);

  const ref = useOutsideClick(() => {
    setRemove(false);
  });
  console.log(publicationDetails);
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
        console.log(data.data.data);
        // setLoading(false);
      } catch (err) {
        // setError(err.message);
        // setLoading(false);
        console.log(err);
      }
    };

    fetchPublications();
  }, []);
  return (
    <div>
      <div className="border border-[#F2F2F3] p-6 w-4/5 mx-auto singlePublicationAdmin">
        {remove && <RemoveModal onChange={setRemove} ref={ref} />}
        <div className="relative border-b border-[#DCDEDF] pb-5">
          <div className="flex md:gap-8 gap-3 absolute right-0">
            <div
              className="bg-[rgba(255,143,115,0.2)] px-4 py-2.5 rounded-3xl w-[52px] h-9 flex items-center justify-center cursor-pointer"
              onClick={() => setRemove(true)}
            >
              <DeleteIcon />
            </div>
            <Link
              to="/admin/publications/:id/edit"
              className="bg-[#F6F7F7] px-4 py-2.5 rounded-3xl text-[#5F6368] text-sm w-[52px] h-9 flex items-center justify-center cursor-pointer"
            >
              Edit
            </Link>
          </div>
          <div className="flex gap-5 items-end">
            <div className="bg-[#E6E6E6] h-[150px] w-[150px]">
              <img src="" alt="" />
            </div>
            <div className="">
              <h2 className="text-[#36383A] font-glare md:text-[32px] text-2xl mb-5 leading-[140%]">
                {publicationDetails?.title}
              </h2>
              <div className="flex flex-wrap md:gap-10 gap-2.5">
                <div className="flex gap-2">
                  <p className="p-1 bg-[#F2F2F3] text-[#5F6368] font-popping font-medium text-[11px] flex items-center ">
                    DA: {publicationDetails?.da}
                  </p>
                  <p className="p-1 bg-[#F2F2F3] text-[#5F6368] font-popping font-medium text-[11px] flex items-center ">
                    DR: {publicationDetails?.dr}
                  </p>
                  <p className="p-1 bg-[#F2F2F3] text-[#5F6368] font-popping font-medium text-[11px] flex items-center ">
                    TTP: 1-3 Days
                  </p>
                </div>
                <div className="p-1 bg-[#F2F2F3] text-[#5F6368] font-popping font-medium flex items-center gap-3 rounded-sm">
                  <p className="text-sm">Niche</p>
                  <span className="flex items-center gap-1">
                    {publicationDetails?.niche?.title == "adult" && <AdultIcon />}
                    {publicationDetails?.niche?.title == "health" && <CardiologyIcon />}
                    {publicationDetails?.niche?.title == "cannabis" && <SpaIcon />}
                    {publicationDetails?.niche?.title == "crypto" && <BitcoinIcon />}
                  </span>
                </div>
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
              {publicationDetails?.genre?.title}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#5F6368] font-glare font-normal flex items-center w-24 justify-between">
              <p>Price</p>
              <p>:</p>
            </div>
            <p className="text-[#5F6368] font-glare font-normal">
              $ {publicationDetails?.price}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#5F6368] font-glare font-normal flex items-center w-24 justify-between">
              <p>Sponsored</p>
              <p>:</p>
            </div>
            <p className="text-[#5F6368] font-glare font-normal">Yes</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#5F6368] font-glare font-normal flex items-center w-24 justify-between">
              <p>Indexed</p>
              <p>:</p>
            </div>
            <p className="text-[#5F6368] font-glare font-normal capitalize">
              {publicationDetails?.indexed}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#5F6368] font-glare font-normal flex items-center w-24 justify-between">
              <p>Do Follow</p>
              <p>:</p>
            </div>
            <p className="text-[#5F6368] font-glare font-normal capitalize">
              {publicationDetails?.doFollow}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#5F6368] font-glare font-normal flex items-center w-24 justify-between">
              <p>Region</p>
              <p>:</p>
            </div>
            <p className="text-[#5F6368] font-glare font-normal">
              {publicationDetails?.region}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePublication;
