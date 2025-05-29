"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestBin } from "@/slice/requestBinSlice";
import bin from "@/assets/images/bin-illustration.png";
import Image from "next/image";
import Link from "next/link";
import regions from "@/app/utils/cities.json";
import { toast } from "react-hot-toast";
import { binRequestValidations } from "@/validations/binRequestValidations";

const HomeHero = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.request);

  // form
  const [formData, setFormData] = useState({
    houseAddress: "",
    contact: "",
    selectedRegion: "",
    selectedTown: "",
    houseHoldSize: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      ...(name === "region" ? { town: "" } : {}),
      [name]: value,
    }));
  };

  const [isOpen, setIsOpen] = useState(false);
  const info = Object.entries(regions).map(([regionName, cities]) => ({
    name: regionName,
    cityCount: cities.length,
  }));

  const towns = formData.selectedRegion ? regions[formData.selectedRegion] : [];

  // Close modal on successful submission and show toast messages
  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Request submitted successfully!");
      setIsOpen(false);
      // Reset form
      setFormData({
        houseAddress: "",
        contact: "",
        selectedRegion: "",
        selectedTown: "",
        houseHoldSize: "",
      });
    } else if (status === "failed") {
      if (error?.toLowerCase().includes("already requested")) {
        toast.error("You've already requested a bin.");
      } else {
        toast.error(error || "Failed to submit request.");
      }
    }
  }, [status, error]);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      binRequestValidations.parse({
        houseAddress: formData.houseAddress,
        contact: formData.contact,
        region: formData.selectedRegion,
        town: formData.selectedTown,
        houseHoldSize: formData.houseHoldSize,
      });
    } catch (validationError) {
      if (validationError.errors) {
        validationError.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error("Invalid input");
      }
      return;
    }

    // Dispatch requestBin thunk with form data
    dispatch(
      requestBin({
        houseAddress: formData.houseAddress,
        contact: formData.contact,
        region: formData.selectedRegion,
        town: formData.selectedTown,
        houseHoldSize: formData.houseHoldSize,
      })
    );
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex flex-col justify-center items-center space-y-6 md:space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-shadow-lg text-gray-900">
          WASTE WISE
        </h1>
        <p className="text-center">
          Making our communities clean and disease-free. Join millions of
          Ghanaians making our cities and towns a beautiful and safe place to
          live in.
        </p>
        <div className="flex flex-col md:flex-row md:w-auto gap-3">
          <button
            className="bg-green-600 text-white rounded-lg shadow-md px-3 p-3 w-52 hover:cursor-pointer 
            transition-colors duration-200 
             hover:opacity-90 hover:scale-105"
            onClick={() => setIsOpen(true)}
          >
            Request For Bin
          </button>
          <Link
            href="/bin/centres"
            className="flex justify-center border-2 border-green-600 text-green-500 rounded-lg shadow-md px-3 p-3 w-52 
            transition-colors duration-200 
            hover:scale-105"
          >
            Explore Bin Centres
          </Link>
        </div>
      </div>
      <div>
        <Image src={bin} alt="" width={600} height={600} />
      </div>
      {isOpen && (
        <div
          className="bg-gray-800/50 backdrop-blur-sm fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="relative inline-block px-4 pt-10 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm md:max-w-lg lg:max-w-xl sm:p-6 sm:align-middle"
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                className="text-3xl font-bold text-gray-800 capitalize dark:text-white"
                id="modal-title"
              >
                Register For Bin
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Fill in with valid information to secure your spot of getting a
                bin for your household.
              </p>

              <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <input
                      type="text"
                      placeholder="House Address"
                      className="w-full p-3 border border-gray-200 ring-0 focus:outline-0 rounded-lg"
                      name="houseAddress"
                      value={formData.houseAddress}
                      onChange={onInputChange}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      name="contact"
                      className="w-full p-3 border border-gray-200 ring-0 focus:outline-0 rounded-lg"
                      value={formData.contact}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <select
                      name="selectedRegion"
                      className="w-full p-3 border border-gray-200 ring-0 focus:outline-0 rounded-lg"
                      value={formData.selectedRegion}
                      onChange={onInputChange}
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
                      name="selectedTown"
                      className="w-full p-3 border border-gray-200 ring-0 focus:outline-0 rounded-lg"
                      disabled={!formData.selectedRegion}
                      value={formData.selectedTown}
                      onChange={onInputChange}
                    >
                      <option value="" disabled>
                        {formData.selectedRegion
                          ? "Select town"
                          : "Select a region first"}
                      </option>
                      {towns.map((town) => (
                        <option key={town} value={town}>
                          {town}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <select
                    value={formData.houseHoldSize}
                    name="houseHoldSize"
                    onChange={onInputChange}
                    className="w-full p-3 border border-gray-200 ring-0 focus:outline-0 rounded-lg"
                  >
                    <option value="" disabled>
                      Select Household Size
                    </option>
                    <option value="1-5">1-5</option>
                    <option value="5-10">5-10</option>
                    <option value="10-15">10-15</option>
                    <option value="15-20">15-20</option>
                  </select>
                </div>
                {status === "loading" && (
                  <p className="text-blue-600 text-center">
                    Sending request...
                  </p>
                )}
                <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-full px-4 p-3 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancel
                  </button>
                  <input
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full px-4 p-3 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors 
                    hover:cursor-pointer duration-300 transform bg-green-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-green-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 disabled:opacity-50 disabled:cursor-not-allowed"
                    value={status === "loading" ? "Sending..." : "Send Request"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeHero;
