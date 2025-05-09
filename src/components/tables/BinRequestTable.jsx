"use client";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const BinRequestTable = () => {
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
  });
  const [loading, setLoading] = useState(true);
  const dt = useRef(null);

  // Header with global search
  const header = (
    <div className="flex justify-between items-center mb-2">
      <h2 className="m-0">Bin Requests</h2>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <input
          type="search"
          className="rounded-lg bg-white p-3"
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
    // Simulate fetch
    setTimeout(() => {
      setCustomers([
        {
          id: 1,
          name: "John Doe",
          binCode: "20345",
          houseAddress: "203 Main St",
          region: "Greater Accra",
          town: "Accra",
          houseHoldSize: 4,
          contact: "0201234567",
          status: "Pending",
        },
        {
          id: 2,
          name: "Quophi Bonney",
          binCode: "22345",
          houseAddress: "45 Asafo St",
          region: "Oti Region",
          town: "Jasikan",
          houseHoldSize: 10,
          contact: "0209876543",
          status: "Approved",
        },
        {
          id: 3,
          name: "John Doe",
          binCode: "20345",
          houseAddress: "203 Main St",
          region: "Greater Accra",
          town: "Accra",
          houseHoldSize: 4,
          contact: "0201234567",
          status: "Pending",
        },
        {
          id: 4,
          name: "Quophi Bonney",
          binCode: "22345",
          houseAddress: "45 Asafo St",
          region: "Oti Region",
          town: "Jasikan",
          houseHoldSize: 10,
          contact: "0209876543",
          status: "Approved",
        },
        {
          id: 5,
          name: "John Doe",
          binCode: "20345",
          houseAddress: "203 Main St",
          region: "Greater Accra",
          town: "Accra",
          houseHoldSize: 4,
          contact: "0201234567",
          status: "Pending",
        },
        {
          id: 6,
          name: "Quophi Bonney",
          binCode: "22345",
          houseAddress: "45 Asafo St",
          region: "Oti Region",
          town: "Jasikan",
          houseHoldSize: 10,
          contact: "0209876543",
          status: "Approved",
        },
        {
          id: 7,
          name: "John Doe",
          binCode: "20345",
          houseAddress: "203 Main St",
          region: "Greater Accra",
          town: "Accra",
          houseHoldSize: 4,
          contact: "0201234567",
          status: "Pending",
        },
        {
          id: 8,
          name: "Quophi Bonney",
          binCode: "22345",
          houseAddress: "45 Asafo St",
          region: "Oti Region",
          town: "Jasikan",
          houseHoldSize: 10,
          contact: "0209876543",
          status: "Approved",
        },
        {
          id: 9,
          name: "John Doe",
          binCode: "20345",
          houseAddress: "203 Main St",
          region: "Greater Accra",
          town: "Accra",
          houseHoldSize: 4,
          contact: "0201234567",
          status: "Pending",
        },
        {
          id: 10,
          name: "Quophi Bonney",
          binCode: "22345",
          houseAddress: "45 Asafo St",
          region: "Oti Region",
          town: "Jasikan",
          houseHoldSize: 10,
          contact: "0209876543",
          status: "Approved",
        },
        {
          id: 11,
          name: "John Doe",
          binCode: "20345",
          houseAddress: "203 Main St",
          region: "Greater Accra",
          town: "Accra",
          houseHoldSize: 4,
          contact: "0201234567",
          status: "Pending",
        },
        {
          id: 12,
          name: "Quophi Bonney",
          binCode: "22345",
          houseAddress: "45 Asafo St",
          region: "Oti Region",
          town: "Jasikan",
          houseHoldSize: 10,
          contact: "0209876543",
          status: "Approved",
        },
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
          style={{ minWidth: "150px", padding: "0.75rem" }}
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

export default BinRequestTable;
