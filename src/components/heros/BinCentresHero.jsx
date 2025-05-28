"use client";
import { Dialog } from "primereact/dialog";
import { useState, useEffect } from "react";
import regions from "@/app/utils/cities.json";
import { GrDirections } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import { getBinPickupAreas } from "@/slice/binPickupsSlice";
const BinMap = dynamic(() => import("@/components/maps/BinMap"), { ssr: false });
const BinCentresHero = () => {
  const [userLocation, setUserLocation] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [mapCoords, setMapCoords] = useState({ lat: 0, lon: 0 });
  const dispatch = useDispatch();
  const pickupAreas = useSelector((state) => state.pickups.pickupAreas);

  const [formData, setFormData] = useState({
    region: "",
    town: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { region, town } = formData;

    if (!region || !town) {
      alert("Please select both region and town.");
      return;
    }

    // Dispatch Redux action with query params
    dispatch(getBinPickupAreas({ region, town }));
  };

  const handleGetDirection = (location) => {
    // Replace this with actual navigation/map logic if needed
    console.log("Getting direction to:", location);
  };

  const info = Object.entries(regions).map(([regionName, cities]) => ({
    name: regionName,
    cityCount: cities.length,
  }));

  const towns = formData.region ? regions[formData.region] : [];
  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);
  return (
    <>
      <section className="mt-10 mb-10">
        <div className="mb-10 flex justify-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Find A Bin Centre Near You
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5 mb-10"
        >
          <div>
            <select
              className="w-full p-3 text-black bg-white border border-gray-50 rounded-lg ring-0 focus:outline-0"
              name="region"
              value={formData.region}
              onChange={handleInputChange}
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
              className="w-full p-3 bg-white text-black border border-gray-50 rounded-lg ring-0 focus:outline-0"
              name="town"
              value={formData.town}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                {formData.region ? "Select city/town" : "Select a region first"}
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
              className="w-full p-3 bg-green-600 rounded-lg text-white cursor-pointer"
            />
          </div>
        </form>

        {pickupAreas && pickupAreas.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pickupAreas.map((area) => (
              <div
                key={area._id}
                className="border border-green-500/10 rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {area.name}
                </h3>
                <p className="text-gray-600">{area.region}</p>
                <p className="text-gray-600">{area.town}</p>
                <button
                  onClick={() => {
                    setShowMap(true);
                    setMapCoords({
                      lat: area.lat,
                      lon: area.lon,
                    });
                  }}
                  className="mt-2 flex items-center text-blue-600 hover:underline"
                >
                  <GrDirections className="mr-2" /> Get Directions
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      <Dialog
        header="Bin Centre Directions"
        visible={showMap}
        onHide={() => setShowMap(false)}
        modal
        draggable={false}
        resizable={false}
        className="bg-white rounded-lg p-3 w-full h-[500px]"
      >
        <BinMap
          userLocation={userLocation}
          binLocation={[mapCoords.lat, mapCoords.lon]}
        />
      </Dialog>
    </>
  );
};

export default BinCentresHero;
