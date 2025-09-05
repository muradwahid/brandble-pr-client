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
const HBarChart = () => {
  const [data] = useState([
    {
      name: "Sat",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Sun",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mon",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Tues",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Wed",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Thu",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Fri",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]);
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

  return (
    <div>
      <ResponsiveContainer width="100%" height={100}>
        <BarChart width={150} height={40} data={data}>
          <Bar dataKey="uv" onMouseOver={handleClick} >
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={index === activeIndex ? "#36B37E" : "#F2F2F3"}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
          <YAxis tickFormatter={500000} />
          <CartesianGrid strokeDasharray="3" />
          <XAxis dataKey="name" />
          {/* <Tooltip /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HBarChart;
