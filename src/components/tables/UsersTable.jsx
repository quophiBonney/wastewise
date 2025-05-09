"use client";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const UsersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
  });
  const [loading, setLoading] = useState(true);
  const dt = useRef(null);

  // Header with global search
  const header = (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 px-2 sm:px-0">
      <h2 className="text-xl font-semibold m-0">Users</h2>
      <span clasName="p-input-icon-left w-full sm:w-auto">
        <i className="pi pi-search" />
        <input
          type="search"
          className="rounded-lg bg-white p-2 sm:p-3 w-full sm:w-64"
          onInput={(e) =>
            setFilters({
              ...filters,
              global: { value: e.target.value, matchMode: "contains" },
            })
          }
          placeholder="Search by name, bin code..."
        />
      </span>
    </div>
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCustomers([
        // ... your mock data ...
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="card">
      {header}

      <DataTable
        ref={dt}
        value={customers}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        loading={loading}
        globalFilterFields={["name", "region", "binCode", "town", "status"]}
        emptyMessage="No bin request found."
        className="p-datatable-striped"
        responsiveLayout="scroll"
      >
        <Column
          field="name"
          header="Name"
          style={{ minWidth: "150px", padding: "0.75rem" }}
        />
        <Column
          field="binCode"
          header="Bin Code"
          style={{ minWidth: "120px", padding: "0.75rem" }}
        />
        <Column
          field="houseAddress"
          header="House Address"
          style={{ minWidth: "200px", padding: "0.75rem" }}
        />
        <Column
          field="region"
          header="Region"
          style={{ minWidth: "150px", padding: "0.75rem" }}
        />
        <Column
          field="town"
          header="Town"
          style={{ minWidth: "150px", padding: "0.75rem" }}
        />
        <Column
          field="houseHoldSize"
          header="Household Size"
          style={{ minWidth: "130px", padding: "0.75rem" }}
        />
        <Column
          field="contact"
          header="Contact"
          style={{ minWidth: "150px", padding: "0.75rem" }}
        />
        <Column
          field="status"
          header="Status"
          style={{ minWidth: "120px", padding: "0.75rem" }}
        />
      </DataTable>
    </div>
  );
};

export default UsersTable;
