"use client";
import React from "react";
import { FaArrowDown, FaArrowUp, FaUserGroup } from "react-icons/fa6";
import DashboarLineChart from "../charts/DashboarLineChart";
import RadiaBarChart from "../charts/RadiaBarChart";

const DashboardCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
      <div className="grid grid-cols-1 gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* first two “small” cards */}
          {["Bins", "Users"].map((title, index) => (
            <div
              key={index}
              className="w-full border border-gray-200 rounded-lg bg-white p-5 space-y-5"
            >
              <div className="bg-gray-100 p-3 w-14 flex justify-center items-center rounded-lg">
                <FaUserGroup size={25} className="text-gray-500" />
              </div>
              <div>
                <p className="text-gray-600 mb-2">{title}</p>
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold">3,782</h2>
                  <p
                    className={`p-2 px-3 rounded-xl ${
                      index === 0
                        ? "bg-green-200/60 text-green-700"
                        : "bg-red-200/60 text-red-700"
                    }`}
                  >
                    10.15%
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* single card beneath spans both columns */}
          <div className="w-full col-span-1 md:col-span-2 border border-gray-200 rounded-lg bg-white p-5 space-y-5">
            <div className="bg-gray-100 p-3 w-14 flex justify-center items-center rounded-lg">
              <FaUserGroup size={25} className="text-gray-500" />
            </div>
            <div>
              <p className="text-gray-600 mb-2">Overall</p>
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">7,564</h2>
                <p className="p-2 px-3 rounded-xl bg-blue-200/60 text-blue-700">
                  8.23%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-hidden shadow-lg rounded-lg bg-white p-4 col-span-2">
          <DashboarLineChart />
        </div>
      </div>
      <div className="shadow-lg rounded-lg bg-white p-4 flex flex-col items-center">
        <RadiaBarChart />
        <div className="mt-5 w-full flex justify-around gap-5">
          {[
            {
              label: "Target",
              value: "$20K",
              icon: <FaArrowDown color="red" size={18} />,
            },
            {
              label: "Revenue",
              value: "$20K",
              icon: <FaArrowDown color="red" size={18} />,
            },
            {
              label: "Today",
              value: "$20K",
              icon: <FaArrowUp color="green" size={18} />,
            },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <p className="text-gray-600">{item.label}</p>
              <h3 className="text-xl font-bold flex items-center justify-center gap-1">
                {item.value} {item.icon}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
