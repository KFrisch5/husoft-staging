import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const LineGraph = (props) => {
  const data = [
    {name: "Jan", sales: 400, rev: 2400, amt: 2400},
    {name: "Feb", sales: 500, rev: 2200, amt: 2000},
    {name: "March", sales: 3500, rev: 2500, amt: 200},
  ]; //Generate a simple chart by using plain javascript data (usually an array of objects).

  // lineChartProps = {
  //   layout: (default: 'horizontal') | 'vertical',
  //   syncId: string - If any two categorical charts(LineChart, AreaChart, BarChart, ComposedChart) have the same syncId, these two charts can sync the position tooltip, and the startIndex, endIndex of Brush.
  //   width: Number,
  //   height: Number,
  //   data: Array,
  //   margin: object default: { top: 5, right: 5, bottom: 5, left: 5 }
  // }

  // linechartFunctions() {
  //   onClick
  //   onMouseEnter
  //   onMouseMove
  //   onMouseLeave
  // }

  return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              <Line type="monotone" dataKey="rev" stroke="red" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
            </LineChart>
          </ResponsiveContainer>
  );
};

export default LineGraph;
