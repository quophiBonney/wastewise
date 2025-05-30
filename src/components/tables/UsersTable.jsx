"use client";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, signupUser } from "@/slice/authSlice";
import { BiSolidPencil, BiSolidTrash } from "react-icons/bi";
import { Dialog } from "primereact/dialog";
import regions from "@/app/utils/cities.json";
import { toast } from "react-hot-toast";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { status, error, user, message } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
  });
  const dt = useRef(null);

  // dialogs
  const [showAdd, setShowAdd] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [mapCoords, setMapCoords] = useState({ lat: 0, lon: 0 });
  const [popupPos, setPopupPos] = useState("bottom");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    region: "",
    town: "",
    password: "",
    role: "user",
    location: { lat: null, lng: null },
  });

  const towns = formData.region ? regions[formData.region] : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      ...(name === "region" ? { town: "" } : {}),
      [name]: value,
    }));
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["fullName", "email", "region", "town", "password"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      toast.error("All fields are required");
      return;
    }
    dispatch(signupUser(formData));
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const [locationCoords, setLocationCoords] = useState({
    lat: null,
    lon: null,
  });

  const onGeoSuccess = (position) => {
    const { latitude: lat, longitude: lon } = position.coords;
    setLocationCoords({ lat, lon });
    setFormData((prev) => ({
      ...prev,
      location: { lat, lng: lon },
    }));
  };

  const onGeoError = (error) => {
    console.error("Geolocation error:", error.message || error);
    toast.error("Failed to get your location.");
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

  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (status === "failed" && error) {
      if (error.fieldErrors) {
        Object.entries(error.fieldErrors).forEach(([field, messages]) => {
          messages.forEach((msg) => {
            toast.error(
              `${field.charAt(0).toUpperCase() + field.slice(1)}: ${msg}`
            );
          });
        });
      } else {
        toast.error(error);
      }
    }
    requestUserLocation();
  }, [status, error, user, message]);

  const confirmDelete = (centre) => {
    setDeleteTarget(centre);
    setPopupPos("bottom-left");
    setShowConfirmDelete(true);
  };
  const handleDelete = () => {
    setShowConfirmDelete(false);
  };

  const openMap = (lat, lon) => {
    setMapCoords({ lat, lon });
    setShowMap(true);
  };

  // Column action buttons
  const actionTemplate = (row) => (
    <div className="flex gap-2 justify-center">
      <button className="p-2 rounded text-white bg-green-500">
        <BiSolidPencil />
      </button>
      <button
        className="p-2 rounded text-white bg-red-500"
        onClick={() => confirmDelete(row)}
      >
        <BiSolidTrash />
      </button>
    </div>
  );

  // Table header
  const header = (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Users</h2>
      <div className="flex gap-2">
        <input
          type="search"
          placeholder="Search by region, name..."
          className="w-full bg-white text-black md:w-56 px-2 p-2 border border-gray-300 rounded focus:outline-0"
          onInput={(e) =>
            setFilters({
              global: { value: e.target.value, matchMode: "contains" },
            })
          }
        />
        <button
          className="w-full px-5 text-white p-2 bg-green-500 rounded hover:cursor-pointer"
          onClick={() => setShowAdd(true)}
        >
          Add User
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="card">
        {header}
        {error && <p className="text-red-600">Error: {error}</p>}
        <DataTable
          ref={dt}
          value={user}
          paginator
          rows={10}
          dataKey="_id"
          filters={filters}
          loading={status === "loading"}
          globalFilterFields={["fullName", "region", "town", "email"]}
          className="p-datatable-striped"
        >
          <Column field="fullName" header="Full Name" />
          <Column field="email" header="Email" />
          <Column field="role" header="Role" />
          <Column field="region" header="Region" className="text-center" />
          <Column field="town" header="Town" className="text-center" />
          <Column
            header="Location"
            body={(row) => (
              <button
                className="underline hover:cursor-pointer"
                onClick={() => openMap(row.location.lat, row.location.lng)}
              >
                View Location
              </button>
            )}
            className="text-center"
          />
          <Column
            header="Actions"
            body={actionTemplate}
            className="text-center"
          />
        </DataTable>
      </div>

      {/* Add Dialog */}
      <Dialog
        header="Add New User"
        visible={showAdd}
        modal
        draggable={false}
        resizable={false}
        className="w-full md:w-1/2"
        onHide={() => setShowAdd(false)}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              />
            </div>
            <div>
              <label htmlFor="role">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500/20"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="supervisor">Supervisor</option>
                <option value="driver">Driver</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="region">Region</label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500/20"
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
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 hover:cursor-pointer bg-green-600 text-white rounded"
          >
            Save User
          </button>
        </form>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog
        header="Confirm Delete"
        visible={showConfirmDelete}
        position={popupPos}
        onHide={() => setShowConfirmDelete(false)}
        modal
        draggable={false}
        resizable={false}
        style={{ width: "300px" }}
      >
        <p>
          Are you sure you want to delete <strong>{deleteTarget?.name}</strong>?
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="p-2 border rounded"
            onClick={() => setShowConfirmDelete(false)}
          >
            Cancel
          </button>
          <button
            className="p-2 bg-red-600 text-white rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Dialog>

      {/* Map Dialog */}
      <Dialog
        header="User Location"
        visible={showMap}
        onHide={() => setShowMap(false)}
        modal
        draggable={false}
        resizable={false}
        style={{ width: "100vw", height: "100vh" }}
      >
        <iframe
          title="Directions"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&origin=Current+Location&destination=${mapCoords.lat},${mapCoords.lon}`}
        ></iframe>
      </Dialog>
    </>
  );
};

export default UsersTable;
