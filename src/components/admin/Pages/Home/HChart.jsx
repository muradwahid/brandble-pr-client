import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";

// const renderActiveChart = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   startAngle,
//   endAngle,
//   fill,
//   payload,
//   percent,
//   value,
// }) => {
//   const RADIAN = Math.PI / 180;
//   const sin = Math.sin(-RADIAN * (midAngle ?? 1));
//   const cos = Math.cos(-RADIAN * (midAngle ?? 1));
//   const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
//   const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
//   const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
//   const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? "start" : "end";

//   return (
//     <g>
//       <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
//         {payload.name}
//       </text>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />
//       <Sector
//         cx={cx}
//         cy={cy}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         innerRadius={(outerRadius ?? 0) + 6}
//         outerRadius={(outerRadius ?? 0) + 10}
//         fill={fill}
//       />
//       <path
//         d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
//         stroke={fill}
//         fill="none"
//       />
//       <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         textAnchor={textAnchor}
//         fill="#333"
//       >{`PV ${value}`}</text>
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         dy={18}
//         textAnchor={textAnchor}
//         fill="#999"
//       >
//         {`(Rate ${((percent ?? 1) * 100).toFixed(2)}%)`}
//       </text>
//     </g>
//   );
// };
const HChart = () => {
  const data = [
    { name: "Group A", value: 400, color: "#f00" },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const COLORS = ["#008CFF", "#EF873A", "#FFBB28", "#DCDEDF", "#006AC2"];
  return (
    <div className="-mt-9">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={100} height={100}>
          {/* <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          /> */}
          <Pie
            dataKey="value"
            data={data}
            cx={100}
            cy={100}
            height={100}
            width={100}
            innerRadius={40}
            outerRadius={60}
            fill="#82ca9d"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HChart;
