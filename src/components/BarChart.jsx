/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { LineChart } from "./LineChart";

export function BarChart({ data }) {
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [selectedBarData, setSelectedBarData] = useState(null);

  const options = {
    title: "Title",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Time (hrs)",
      minValue: 0,
    },
    vAxis: {
      title: "Features",
    },
  };

  let filteredData = data;
  if (selectedAge) {
    filteredData = filteredData.filter((obj) => obj.Age === selectedAge);
  }
  if (selectedGender) {
    filteredData = filteredData.filter((obj) => obj.Gender === selectedGender);
  }
  if (startDay) {
    filteredData = filteredData.filter(
      (obj) => new Date(obj.Day) >= new Date(startDay)
    );
  }
  if (endDay) {
    filteredData = filteredData.filter(
      (obj) => new Date(obj.Day) <= new Date(endDay)
    );
  }

  const calculateTimeSpent = (feature) => {
    return filteredData?.reduce((acc, cur) => acc + cur[feature], 0);
  };

  const finalData = [
    ["Feature", "Time Spent"],
    ["A", calculateTimeSpent("A")],
    ["B", calculateTimeSpent("B")],
    ["C", calculateTimeSpent("C")],
    ["D", calculateTimeSpent("D")],
    ["E", calculateTimeSpent("E")],
    ["F", calculateTimeSpent("F")],
  ];

  useEffect(() => {
    console.log(startDay);
    console.log(endDay);
  }, [startDay, endDay]);

  const handleBarClick = (e) => {
    setSelectedBarData((prev) => !prev);
  };

  return (
    <>
      <div className="filters">
        <h3>Filter:</h3>
        <div className="dropdown">
          <select onChange={(e) => setSelectedAge(e.target.value)}>
            <option value="" disabled>
              --Age Group--
            </option>
            <option value="">All</option>
            <option value="15-25">15-25</option>
            <option value=">25">&gt;25</option>
          </select>
          <select onChange={(e) => setSelectedGender(e.target.value)}>
            <option value="" disabled>
              --Gender--
            </option>
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="date-input">
          <div>
            <label htmlFor="startDay">Start Day</label>{" "}
            <input
              type="date"
              name="startDay"
              id="startDay"
              max="2022-10-29"
              min="2022-10-04"
              onChange={(e) => setStartDay(e.target.value)}
              value={startDay}
            />
          </div>
          <div>
            <label htmlFor="endDay">End Day</label>{" "}
            <input
              type="date"
              name="endDay"
              id="endDay"
              max="2022-10-29"
              min={startDay}
              onChange={(e) => setEndDay(e.target.value)}
              value={endDay}
            />
          </div>
        </div>
      </div>
      {selectedBarData && <LineChart />}
      {filteredData.length !== 0 ? (
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={finalData}
          options={options}
          chartEvents={[
            {
              eventName: "select",
              callback: handleBarClick,
            },
          ]}
        />
      ) : (
        <h2>No Data Found for this filter</h2>
      )}
    </>
  );
}
