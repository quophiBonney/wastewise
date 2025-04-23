"use client"
import React from 'react'
import { FaArrowDown, FaArrowUp, FaUserGroup } from "react-icons/fa6";
import DashboarLineChart from '../charts/DashboarLineChart';
import RadiaBarChart from '../charts/RadiaBarChart';
const DashboardCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-2 lg:grid-cols-2 gap-5">
      <div className="grid grid-cols-1 gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
          <div className="border border-gray-200 rounded-lg bg-white p-5 space-y-7">
            <div className="bg-gray-100 p-3 w-14 flex justify-center items-center rounded-lg">
              <FaUserGroup size={25} className="text-gray-500" />
            </div>
            <div>
              <p className="text-gray-600 mb-3">Bins</p>
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">3,782</h2>
                <p className="bg-green-200/60 text-green-700 p-2 px-3 rounded-xl">
                  10.15%
                </p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg bg-white p-5 space-y-7">
            <div className="bg-gray-100 p-3 w-14 flex justify-center items-center rounded-lg">
              <FaUserGroup size={25} className="text-gray-500" />
            </div>
            <div>
              <p className="text-gray-600 mb-3">Users</p>
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">3,782</h2>
                <p className="bg-red-200/60 text-red-700 p-2 px-3 rounded-xl">
                  10.15%
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-hidden shadow-lg rounded-lg bg-white p-4 col-span-2">
          <DashboarLineChart />
        </div>
      </div>
      <div className="shadow-lg rounded-lg pb-0 mb-0  flex flex-col items-center justify-center">
        <div className="bg-white p-4 rounded-b-2xl w-full">
          <RadiaBarChart />
        </div>
        <div className="mb-10 w-full mt-10 md:mt-5 md:mb-5">
          <div className="mt-3 rounded-b-2xl h-auto lg:h-32 flex justify-between items-center px-5 flex-row gap-3 w-full">
            <div>
              <p className="text-gray-600">Target</p>
              <h3 className="text-xl font-bold flex items-center">
                $20K <FaArrowDown color="red" size={18} />
              </h3>
            </div>
            <div>
              <p className="text-gray-600">Revenue</p>
              <h3 className="text-xl font-bold flex items-center">
                $20K <FaArrowDown color="red" size={18} />
              </h3>
            </div>
            <div>
              <p className="text-gray-600">Today</p>
              <h3 className="text-xl font-bold flex items-center">
                $20K <FaArrowUp color="green" size={18} />
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard