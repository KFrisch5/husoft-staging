import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const BarGraph = (props) => {
  const data = [
    {name: "Jan", sales: 400, rev: 2400, amt: 2400},
    {name: "Feb", sales: 500, rev: 2200, amt: 2000},
    {name: "March", sales: 3500, rev: 2500, amt: 200},
  ]; 

  // barChartProps = {
  //   layout: (default: 'horizontal') | 'vertical',
  //   syncId: string - If any two categorical charts(LineChart, AreaChart, BarChart, ComposedChart) have the same syncId, these two charts can sync the position tooltip, and the startIndex, endIndex of Brush.
  //   width: Number,
  //   height: Number,
  //   data: Array,
  //   margin: object default: { top: 5, right: 5, bottom: 5, left: 5 }
  //     ---
  //   barCategoryGap: % | number = The gap between two bar categories, which can be a percent value or a fixed value  DEFAULT: '10%'
  //   barGap: % | number = The gap between two bars in the same category. DEFAULT: 4
  //   barSize: number = The width or height of each bar. If the barSize is not specified, the size of the bar will be calculated by the barCategoryGap, barGap and the quantity of bar groups.
  //   maxBarSize: number = The maximum width of all the bars in a horizontal BarChart, or maximum height in a vertical BarChart.
  //   stackOffset: 'expand' | 'none' | 'wiggle' | 'silhouette' | 'sign' = The type of offset function used to generate the lower and upper values in the series array. The four types are built-in offsets in d3-shape. DEFAULT: 'none'
  //   reverseStackOrder: boolean = If false set, stacked items will be rendered left to right. If true set, stacked items will be rendered right to left. (Render direction affects SVG layering, not x position.) DEFAULT: false
  // }

  // barchartFunctions() {
  //   onClick
  //   onMouseEnter
  //   onMouseMove
  //   onMouseLeave
  // }

  return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar type="monotone" dataKey="sales" stroke="#8884d8" fill="blue" />
              <Bar type="monotone" dataKey="rev" stroke="red" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
            </BarChart>
          </ResponsiveContainer>
  );
};

export default BarGraph;
