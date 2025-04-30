"use client";
import { useState } from "react";
import regions from "@/app/utils/cities.json";

const BinCentresHero = () => {
  const info = Object.entries(regions).map(([regionName, cities]) => ({
    name: regionName,
    cityCount: cities.length,
  }));

  const [selectedRegion, setSelectedRegion] = useState("");
  const towns = selectedRegion ? regions[selectedRegion] : [];

  return (
    <section className="mt-10 mb-10">
      <div className="mb-10 flex justify-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
          Find A Bin Centre Near You
        </h2>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
        <div>
          <select
            className="w-full p-3 text-black bg-white border border-gray-50 rounded-lg ring-0 focus:outline-0"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="" disabled>
              Select region
            </option>
            {info.map((region) => (
              <option key={region.name} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            id="town"
            className="w-full p-3 bg-white text-black border border-gray-50 rounded-lg ring-0 focus:outline-0"
            disabled={!selectedRegion}
            defaultValue=""
          >
            <option value="" disabled>
              {selectedRegion ? "Select city/town" : "Select a region first"}
            </option>
            {towns.map((town) => (
              <option key={town} value={town}>
                {town}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="submit"
            value="Find Nearest Bin Centre"
            className="w-full p-3 bg-green-600 rounded-lg text-white"
          />
        </div>
      </form>
    </section>
  );
};

export default BinCentresHero;
