"use client";
import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchBinRequests } from "../../slice/requestBinSlice";
import { BiSolidPencil, BiSolidTrash } from "react-icons/bi";
import { Dialog } from "primereact/dialog";

const BinRequestTable = () => {
  const [visible, setVisible] = useState(false);
   // track where the dialog should appear
const [position, setPosition] = useState("bottom");
 const show = (newPosition) => {
   setPosition(newPosition);
setVisible(true);
  };
  const dispatch = useDispatch();
  const { items: customers, status, error } = useSelector((state) => state.request);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
  });
  const dt = useRef(null);

  const header = (
    <div className="space-y-3 flex flex-col md:flex-row justify-between items-center mb-2">
      <h2 className="m-0 text-xl font-bold">Bin Requests</h2>
      <input
        type="search"
        className="w-full md:w-1/3 rounded-lg bg-white p-3 shadow-sm"
        onInput={(e) =>
          setFilters({
            ...filters,
            global: { value: e.target.value, matchMode: "contains" },
          })
        }
        placeholder="Search by bin code, region, town, status..."
      />
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2 justify-center">
        <button
          className="p-2 rounded text-white bg-green-500"
          onClick={() => alert(`Update ${rowData._id}`)}
        >
          <BiSolidPencil />
        </button>
        <button
          className="p-2 rounded text-white bg-red-500"
          onClick={() => show("bottom-left")}
          // onClick={() => alert(`Delete ${rowData._id}`)}
        >
          <BiSolidTrash />
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBinRequests());
    }
  }, [dispatch, status]);

  return (
    <>
    <div className="card">
      {header}
      {error && <p className="text-red-600">Error: {error}</p>}
      <DataTable
        ref={dt}
        value={customers}
        paginator
        rows={10}
        dataKey="_id"
        filters={filters}
        loading={status === "loading"}
        globalFilterFields={["region", "binCode", "town", "status"]}
        emptyMessage="No bin request found."
        className="p-datatable-striped"
      >
        <Column
          field="binCode"
          header="Bin Code"
          headerClassName="text-center"
          bodyClassName="text-center"
          style={{ minWidth: "120px" }}
        />
        <Column
          field="houseAddress"
          header="House Address"
          headerClassName="text-center"
          bodyClassName="text-center"
          style={{ minWidth: "100px" }}
        />
        <Column
          field="region"
          header="Region"
          headerClassName="text-center"
          bodyClassName="text-center"
          style={{ minWidth: "150px" }}
        />
        <Column
          field="town"
          header="Town"
          headerClassName="text-center"
          bodyClassName="text-center"
          style={{ minWidth: "150px" }}
        />
        <Column
          field="houseHoldSize"
          header="Household Size"
          headerClassName="text-center"
          bodyClassName="text-center"
          style={{ minWidth: "70px" }}
        />
        <Column
          field="contact"
          header="Contact"
          headerClassName="text-center"
          bodyClassName="text-center"
          style={{ minWidth: "150px" }}
        />
        <Column
          field="status"
          header="Status"
          headerClassName="text-center"
          bodyClassName="text-center"
          style={{ minWidth: "120px" }}
        />
        <Column
          header="Action"
          body={actionBodyTemplate}
          headerClassName="text-center"
          bodyClassName="text-center"
          style={{ minWidth: "120px" }}
        />
      </DataTable>
    </div>
   <Dialog header="Header" visible={visible} position={position} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}  draggable={false} resizable={false}>
    <p className="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</Dialog>
</>
  );
};

export default BinRequestTable;
