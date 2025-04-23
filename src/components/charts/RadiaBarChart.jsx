"use client";

import React from "react";
import dynamic from "next/dynamic";

// only load react-apexcharts in the browser
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const RadiaBarChart = () => {
  const series = [75.55];
  const options = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  return (
    <>
      <div className="px-4">
        <h3 className="text-2xl font-bold">Monthly Target</h3>
        <p className="text-gray-500">Target you’ve set for each month</p>
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height={330}
        />
        <div className="mt-5">
          <p className="text-center text-gray-500">
            You earn $3287 today, it's higher than last month. Keep up your good
            work!
          </p>
        </div>
      </div>
    </>
  );
};

export default RadiaBarChart;
