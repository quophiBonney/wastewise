// src/components/charts/RadiaBarChart.client.jsx
"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";

export default function RadiaBarChartClient({ options, series, height = 330 }) {
  return (
    <div className="px-4">
      {/* Title & subtitle */}
      <h3 className="text-2xl font-bold mb-1">Monthly Target</h3>
      <p className="text-gray-500 mb-4">Target you’ve set for each month</p>
      <div className="">
        <div className="">
          <ReactApexChart
            options={options}
            series={series}
            type="radialBar"
            height={height}
          />
        </div>
      </div>

      {/* Footer text */}
      <p className="mt-5 text-center text-gray-500">
        You earn $3287 today; it’s higher than last month. Keep up the good work!
      </p>
    </div>
  );
}
