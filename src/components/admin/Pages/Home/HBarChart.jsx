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
const HBarChart = ({ data = {}, isLoading }) => {


  const revenueData = data?.week || []
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
    return;
  }

  return (
    <div className="revenue-statistic-barChart">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart width={150} height={40} data={revenueData}>
          <Bar dataKey="uv" onMouseOver={handleClick}>
            {revenueData?.map((entry, index) => (
              <Cell
                cursor="pointer"
                radius={[4, 4, 4, 4]}
                fill={
                  index === activeIndex
                    ? "#36B37E"
                    : index === revenueData?.length - 1
                    ? "#222425" // Color for last index
                    : "#F2F2F3"
                }
                key={`cell-${index}`}
              />
            ))}
          </Bar>
          <YAxis tickFormatter={yAxisFormatter} dataKey="uv" />
          <CartesianGrid strokeDasharray="3" />
          <XAxis dataKey="name" />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HBarChart;
