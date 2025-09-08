import { TrendingUpIcon } from "../../../../utils/icons";

const PublicationStatistic = ({className,ref}) => {
  return (
    <div
      className={`w-[450px] h-[378px] bg-[#F6F7F7] p-3 rounded-xl absolute -left-60 top-5 z-10 ${className} `}
      ref={ref}
    >
      <div className="overflow-y-scroll overflow-x-auto fillAvailableHeight pr-3">
        <div className="w-full bg-white rounded-md overflow-hidden mr-5">
          <table className="font-poppins w-full h-full">
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
              {Array(30)
                .fill(null)
                .map((_, index) => (
                  <tr key={index} className="border-t border-[#DCDEDF]">
                    <td className="px-2 py-2 text-nowrap text-sm">
                      Hood Critics
                    </td>
                    <td className="px-2 py-2 text-nowrap text-sm">15</td>
                    <td className="px-2 py-2 text-nowrap text-sm">
                      <span className="flex items-center gap-3">
                        7.5 % <TrendingUpIcon />
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PublicationStatistic;
