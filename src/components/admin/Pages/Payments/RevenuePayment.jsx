import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const RevenuePayment = ({filter, data = [], isLoading }) => {



  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (data, index) => {
    setActiveIndex(index);
  };

  const yAxisFormatter = (value) => {
    if (value >= 1000) {
      return `$${value / 1000}k`;
    }
    return `$${value}`;
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-[30dvh] w-full">Loading...</div>
  }


  return (
    <div className="revenue-statistic-barChart adminPayment-revenueStatistics">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart width={150} height={40} data={data||[]}>
          <Bar dataKey="uv" onMouseOver={handleClick}>
            {data?.map((entry, index) => (
              <Cell
                cursor="pointer"
                radius={[6, 6, 6, 6]}
                fill={
                  index === activeIndex
                    ? "#36B37E"
                    : "#F2F2F3"
                }
                key={`cell-${index}`}
              />
            ))}
          </Bar>
          <YAxis tickFormatter={yAxisFormatter} dataKey="uv"  />
          <CartesianGrid strokeDasharray="3" />
          <XAxis dataKey="name" angle={(filter === 'last7Days' || filter ==='thisYear') ? 0 :90} />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenuePayment;
