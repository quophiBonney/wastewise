"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const RadiaBarChartClient = React.memo(() => {
  // Memoize the options to prevent unnecessary re-renders
  const options = useMemo(
    () => ({
      colors: ["#465fff"],
      chart: {
        fontFamily: "Outfit, sans-serif",
        type: "radialBar",
        height: 250,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        radialBar: {
          track: {
            background: "#e0e0e0",
            strokeWidth: "97%",
          },
          dataLabels: {
            name: {
              fontSize: "16px",
              color: "#333",
              offsetY: -10,
            },
            value: {
              fontSize: "22px",
              fontWeight: "bold",
              color: "#465fff",
              offsetY: 5,
              formatter: (val) => `${val}%`,
            },
          },
        },
      },
      labels: ["Sales Target"],
      stroke: {
        lineCap: "round",
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          gradientToColors: ["#77B6EA"],
          stops: [0, 100],
        },
      },
    }),
    []
  );
  const series = useMemo(() => [67], []);

  return (
    <div className="px-4">
      {/* Title & subtitle */}
      <h3 className="text-2xl font-bold mb-1">Monthly Target</h3>
      <p className="text-gray-500 mb-4">
        Target completion percentage for the month
      </p>

      <div className="flex justify-center">
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height={250}
          width={250}
        />
      </div>

      {/* Footer text */}
      <p className="mt-5 text-center text-gray-500">
        You have achieved 67% of the sales target this month. Keep pushing!
      </p>
    </div>
  );
});

export default RadiaBarChartClient;
