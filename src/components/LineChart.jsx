/* eslint-disable react-refresh/only-export-components */
import { Chart } from "react-google-charts";

export const data = [
  ["x", "Time Spent"],
  [new Date().toDateString(), 0],
  [new Date().toDateString(), 5],
  [new Date().toDateString(), 15],
  [new Date().toDateString(), 9],
  [new Date().toDateString(), 10],
  [new Date().toDateString(), 5],
  [new Date().toDateString(), 3],
  [new Date().toDateString(), 19],
];

export const options = {
  hAxis: {
    title: "Day",
  },
  vAxis: {
    title: "Time Spent",
  },
  series: {
    1: { curveType: "function" },
  },
};

export function LineChart() {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
