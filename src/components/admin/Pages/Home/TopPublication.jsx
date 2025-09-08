import { publicationData } from "../../../user/Pages/Publications/data";

import {
  AmericaIcon,
  AVTimer,
  CampaignIcon,
  CurrencyIcon,
  FollowHumanIcon,
  GenreIcon,
  HolidayVillageIcon,
  ListIcon,
  PublicationBadgeIcon,
  StarHalf,
  StartCircleIcon,
} from "../../../../utils/icons";

const TopPublication = () => {
  return (
    <div>
      <div className="mb-5 mt-11 flex justify-between items-center border-t border-[#DCDEDF] pt-11">
        <p className="font-poppins text-[#5F6368] font-poppins ">
          Today’s Orders
        </p>
        <p className="text-[#5F6368] text-sm underline cursor-pointer">
          view all
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm font-normal overflow-y-scroll table-fixed border border-[#DCDEDF] border-l-0 overflow-hidden">
          <thead className="bg-[#F6F7F7]">
            <tr className="text-left py-2">
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5 text-nowrap">
                  <PublicationBadgeIcon />
                  Publication
                </span>
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5 text-nowrap">
                  <GenreIcon /> Genre
                </span>
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5 text-nowrap">
                  <StartCircleIcon /> DA
                </span>
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5 text-nowrap">
                  <StarHalf /> DR
                </span>
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5 text-nowrap">
                  <AVTimer /> TAT
                </span>
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5 text-nowrap">
                  <CurrencyIcon /> Price
                </span>
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5 text-nowrap">
                  <CampaignIcon /> Sponsored
                </span>
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5 text-nowrap">
                  <ListIcon /> Indexed
                </span>
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5 text-nowrap">
                  <FollowHumanIcon /> Do Follow
                </span>
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5 text-nowrap">
                  <AmericaIcon /> Region
                </span>
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5 text-nowrap">
                  <HolidayVillageIcon /> Niche
                </span>
              </th>
            </tr>
          </thead>
          <tbody className=" text-[#36383A]">
            {publicationData.slice(0, 10).map((item, index) => (
              <tr key={index} className="border-t border-[#DCDEDF]">
                <td className="px-3 py-3 text-nowrap">{item.title}</td>
                <td className="px-3 py-3 text-nowrap">{item.genre}</td>
                <td className="px-3 py-3 text-nowrap">{item.da}</td>
                <td className="px-3 py-3 text-nowrap">{item.dr}</td>
                <td className="px-3 py-3 text-nowrap">
                  {item.tat || "1-3 days"}
                </td>
                <td className="px-3 py-3 text-nowrap">
                  ${item.price || "1500"}
                </td>
                <td className="px-3 py-3 text-nowrap">{item.title}</td>
                <td className="px-3 py-3 text-nowrap">{item.title}</td>
                <td className="px-3 py-3 text-nowrap">{item.doFollow}</td>
                <td className="px-3 py-3 text-nowrap">{item.region}</td>
                <td className="pr-2.5">
                  <button
                    className={` text-white cursor-pointer px-1 py-1 rounded-sm capitalize font-normal w-28 bg-[#FFAB00]`}
                  >
                    Pending
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPublication;
