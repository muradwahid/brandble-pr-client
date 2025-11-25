import { TrendingDownIcon, TrendingUpIcon } from "../../../../utils/icons";

const PublicationStatistic = ({ publications, handleGrowthScale, publicationStatisticLoading, className, ref }) => {
  console.log(publications);
  return (
    <div
      className={`w-[450px] h-[378px] bg-[#F6F7F7] p-3 rounded-xl absolute -left-60 top-5 z-10 ${className} pr-0`}
      ref={ref}
    >
      <div className="overflow-y-scroll overflow-x-auto fillAvailableHeight ">
        <div className="w-full h-full bg-white rounded-md overflow-auto">
          {publicationStatisticLoading ? <div className="h-full w-full flex justify-center items-center">Loading...</div> : <table className="font-poppins w-full">
            <thead>
              <tr className="bg-[#DCDEDF] text-left">
                <th className="text-[#5F6368] font-normal px-1.5 py-1">
                  Publication
                </th>
                <th className="text-[#5F6368] font-normal px-1.5 py-1">
                  Orders
                </th>
                <th className="text-[#5F6368] font-normal px-1.5 py-1">
                  Order Statistics
                </th>
              </tr>
            </thead>
            <tbody className="text-left">
              {publications && publications?.map((publication) => (
                  <tr key={publication?.id} className="border-t border-[#DCDEDF]">
                    <td className="px-2 py-2 text-nowrap text-sm">
                    {publication?.title}
                    </td>
                  <td className="px-2 py-2 text-nowrap text-sm">{publication?.ordersThisMonth}</td>
                  <td className="px-2 py-2 text-nowrap text-sm">
                    {handleGrowthScale(publication?.growthRate) ? <span className="flex items-center gap-3">
                      {publication?.growthRate} <TrendingUpIcon />
                    </span> : <span className="text-[#de350b] text-sm flex items-center gap-3">
                      {publication?.growthRate}<TrendingDownIcon />
                    </span>}
                    
                      
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>}
           
        </div>
      </div>
    </div>
  );
};

export default PublicationStatistic;
