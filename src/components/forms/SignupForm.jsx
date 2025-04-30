"use client";

import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
import regions from "@/app/utils/cities.json";
import { signupUser } from "@/slice/authSlice";
import { useDispatch } from "react-redux";

const SignupForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    region: "",
    town: "",
    password: "",
    role: "user",
    location: "", // you can store a string or object here
  });

  // Derive the list of towns when a region is selected
  const towns = formData.region ? regions[formData.region] : [];

  // Unified change handler for all inputs/selects
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      // if the region changed, reset town to empty
      ...(name === "region" ? { town: "" } : {}),
      [name]: value,
    }));
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the signupUser thunk/action with the entire payload
    dispatch(signupUser(formData));
  };

  // --- Geolocation logic (if you still want to capture coords) ---
  const [locationCoords, setLocationCoords] = useState({
    lat: null,
    lon: null,
  });

  const onGeoSuccess = (position) => {
    const { latitude: lat, longitude: lon } = position.coords;
    setLocationCoords({ lat, lon });
    // Optionally store in formData.location:
    setFormData((prev) => ({
      ...prev,
      location: `${lat},${lon}`,
    }));
  };

  const onGeoError = (error) => {
    console.error("Geolocation error:", error);
    // handle errors as you see fit
  };

  const requestUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, {
        enableHighAccuracy: true,
        timeout: 10_000,
        maximumAge: 0,
      });
    }
  };

  useEffect(() => {
    requestUserLocation();
  }, []);
  // --------------------------------------------------------------

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-screen">
      {/* Left: Form */}
      <div className="flex flex-col justify-center items-center px-5 lg:px-16">
        <div className="w-full px-5 md:px-16 lg:px-0">
          <form
            className="space-y-3 md:space-y-5 w-full"
            onSubmit={handleSubmit}
          >
            <div className="text-gray-800 mt-5 lg:mb-10">
              <Link
                href="/auth/signin"
                className="flex flex-row items-center w-full text-gray-600 font-semibold"
              >
                <MdOutlineKeyboardArrowLeft size={25} /> Go back to login page
              </Link>
              <h2 className="mt-3 text-3xl font-bold">Register</h2>
              <p>Enter your details to complete your registration!</p>
            </div>

            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500/20"
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500/20"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+2332XXXXXXXX"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500/20"
                required
              />
            </div>

            {/* Region + Town */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="region">Region</label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500/20"
                  required
                >
                  <option value="" disabled>
                    Select region
                  </option>
                  {Object.keys(regions).map((regionName) => (
                    <option key={regionName} value={regionName}>
                      {regionName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="town">City/Town</label>
                <select
                  id="town"
                  name="town"
                  value={formData.town}
                  onChange={handleInputChange}
                  disabled={!formData.region}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500/20"
                  required
                >
                  <option value="" disabled>
                    {formData.region
                      ? "Select city/town"
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

            {/* Password */}
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500/20"
                required
              />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                required
                className="h-6"
              />
              <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>

            {/* Submit */}
            <div>
              <input
                type="submit"
                value="Sign Up"
                className="w-full p-3 bg-green-600 hover:bg-green-500 text-white rounded-md cursor-pointer"
              />
            </div>
          </form>

          <div className="text-gray-800 mb-5 mt-5 lg:text-center">
            <p>
              Already have an account? <Link href="/auth/signin">Login</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right: Branding */}
      <div className="hidden bg-green-600 lg:flex flex-col justify-center items-center text-gray-300">
        <h3 className="text-5xl font-bold uppercase">WasteWise</h3>
        <p>Complete your registration in a seamless way.</p>
      </div>
    </section>
  );
};

export default SignupForm;
