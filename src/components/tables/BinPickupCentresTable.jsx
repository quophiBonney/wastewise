"use client";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { useSelector, useDispatch } from "react-redux";
import {
  createBinPickupCentre,
  getBinPickupCentres,
  deleteBinPickupCentre,
} from "@/slice/binPickupsSlice";
// Use authSlice for drivers
import { getDrivers } from "@/slice/authSlice";
import { BiSolidPencil, BiSolidTrash } from "react-icons/bi";
import { Dialog } from "primereact/dialog";
import regions from "@/app/utils/cities.json";
import { toast } from "react-hot-toast";

const BinPickupCentresTable = () => {
  const dispatch = useDispatch();
  const {
    items: centres,
    message,
    status: centresStatus,
    error: centresError,
  } = useSelector((state) => state.pickups);
  // Map drivers from auth slice
  const {
    items: drivers,
    status: driversStatus,
    error: driversError,
  } = useSelector((state) => state.drivers);

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

  // form
  const [formData, setFormData] = useState({
    name: "",
    driver: "",
    region: "",
    town: "",
    lat: "",
    lon: "",
  });
  const towns = formData.region ? regions[formData.region] : [];

  // Fetch centres and drivers
  useEffect(() => {
    if (centresStatus === "idle") {
      dispatch(getBinPickupCentres());
    }
    if (driversStatus === "idle") {
      dispatch(getDrivers());
    }
  }, [dispatch, centresStatus, driversStatus]);

  // Show feedback
  useEffect(() => {
    if (centresStatus === "succeeded") toast.success(message);
    if (centresStatus === "failed") toast.error(centresError);
    if (driversStatus === "failed") toast.error(driversError);
  }, [centresStatus, message, centresError, driversStatus, driversError]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      ...(name === "region" ? { town: "" } : {}),
      [name]: value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const required = ["name", "driver", "region", "town", "lat", "lon"];
    const missing = required.filter((f) => !formData[f]);
    if (missing.length) return toast.error("Please fill all fields");

    dispatch(createBinPickupCentre({ ...formData }));
    setShowAdd(false);
    // Reset form
    setFormData({
      name: "",
      driver: "",
      region: "",
      town: "",
      lat: "",
      lon: "",
    });
  };

  const confirmDelete = (centre) => {
    setDeleteTarget(centre);
    setPopupPos("bottom-left");
    setShowConfirmDelete(true);
  };

  const handleDelete = () => {
    dispatch(deleteBinPickupCentre(deleteTarget._id));
    setShowConfirmDelete(false);
  };

  const openMap = (lat, lon) => {
    setMapCoords({ lat, lon });
    setShowMap(true);
  };

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

  const header = (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Pickup Centres</h2>
      <div className="flex gap-2">
        <input
          type="search"
          placeholder="Search..."
          className="p-2 border rounded"
          onInput={(e) =>
            setFilters({
              global: { value: e.target.value, matchMode: "contains" },
            })
          }
        />
        <button
          className="p-2 bg-green-600 text-white rounded"
          onClick={() => setShowAdd(true)}
        >
          Add Centre
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="card">
        {header}
        {centresError && <p className="text-red-600">{centresError}</p>}
        <DataTable
          ref={dt}
          value={centres}
          paginator
          rows={10}
          dataKey="_id"
          filters={filters}
          loading={centresStatus === "loading" || driversStatus === "loading"}
          globalFilterFields={["name", "region", "town"]}
          className="p-datatable-striped"
        >
          <Column field="name" header="Centre" className="text-center" />
          <Column
            field="driver.fullName"
            header="Driver"
            className="text-center"
          />
          <Column field="region" header="Region" className="text-center" />
          <Column field="town" header="Town" className="text-center" />
          <Column
            header="Location"
            body={(row) => (
              <button
                className="underline"
                onClick={() => openMap(row.lat, row.lon)}
              >
                View
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
        header="Add Pickup Centre"
        visible={showAdd}
        modal
        draggable={false}
        resizable={false}
        className="w-full md:w-1/2 lg:w-1/3"
        onHide={() => setShowAdd(false)}
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={onInputChange}
            placeholder="Centre Name"
            className="w-full p-2 border rounded"
          />
          <select
            name="driver"
            value={formData.driver}
            onChange={onInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              {driversStatus === "loading"
                ? "Loading drivers..."
                : "Select Driver"}
            </option>
            {drivers.map((d) => (
              <option key={d._id} value={d._id}>
                {d.fullName}
              </option>
            ))}
          </select>
          <select
            name="region"
            value={formData.region}
            onChange={onInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select Region
            </option>
            {Object.keys(regions).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            name="town"
            value={formData.town}
            onChange={onInputChange}
            disabled={!formData.region}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              {formData.region ? "Select Town" : "Select region first"}
            </option>
            {towns.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <input
              name="lat"
              value={formData.lat}
              onChange={onInputChange}
              placeholder="Latitude"
              className="p-2 border rounded"
            />
            <input
              name="lon"
              value={formData.lon}
              onChange={onInputChange}
              placeholder="Longitude"
              className="p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-green-600 text-white rounded"
          >
            Save
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
        header="Location"
        visible={showMap}
        onHide={() => setShowMap(false)}
        modal
        draggable={false}
        resizable={false}
        style={{ width: "60vw", height: "60vh" }}
      >
        <iframe
          title="Map"
          width="100%"
          height="100%"
          frameBorder="0"
          src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${mapCoords.lat},${mapCoords.lon}&zoom=15`}
          allowFullScreen
        />
      </Dialog>
    </>
  );
};

export default BinPickupCentresTable;
