import React from "react";
import {PieChart, Pie, ResponsiveContainer, Cell} from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props) => {
  const radius =
    props.innerRadius + (props.outerRadius - props.innerRadius) * 0.5;
  const x = props.cx + radius * Math.cos(-props.midAngle * RADIAN);
  const y = props.cy + radius * Math.sin(-props.midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > props.cx ? "start" : "end"}
      dominantBaseline="central"
      style={{fontSize:"larger"}}
    >
      {props.name === "booked" ? `${(props.percent * 100).toFixed(0)}%` : ""}
    </text>
  );
};
const HalfPieChart = (props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey={"value"}
          startAngle={180}
          endAngle={0}
          data={props.data}
          cx="50%"
          cy="70%"
          outerRadius={150}
          fill="#8884d8"
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.name === "booked" ? '#00C49F' : '#B3AEAD'} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
export default HalfPieChart;
