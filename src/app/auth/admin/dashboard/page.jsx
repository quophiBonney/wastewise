// pages/auth/admin/dashboard/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import AppBar from "@/components/dashboard/AppBar";
import Sidebar from "@/components/dashboard/Sidebar";
import LandingPage from "../LandingPage/LandingPage";
import BinRequests from "../bin requests/page";
import PickupCentres from "../pickup centres/PickupCentres";
import UsersTable from "../users/page";

export default function Page() {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState("dashboard");

  const token = useSelector((state) => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/auth/signin");
    }
  }, [token, router]);

  const toggle = () => setIsOpen((o) => !o);
  const handleSelect = (key) => {
    setSelected(key);
    setIsOpen(false);
  };
  const renderContent = () => {
    switch (selected) {
      case "dashboard":
        return <LandingPage />;
      case "bin requests":
        return <BinRequests />;
      case "pickup centres":
        return <PickupCentres />;
      case "users":
        return <UsersTable />;
      default:
        return null;
    }
  };

  return (
    <>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selected={selected}
        onSelect={handleSelect}
      />
      {isOpen && (
        <div
          onClick={toggle}
          className="fixed inset-0 bg-gray-900/10 z-10 lg:hidden"
        />
      )}
      <div
        className={
          "flex-1 flex flex-col transition-all duration-300 " +
          (isOpen ? "lg:ml-64" : "lg:ml-20")
        }
      >
        <AppBar toggleSidebar={toggle} />
        <main className="bg-gray-100 px-5 pt-6 h-full">{renderContent()}</main>
      </div>
    </>
  );
}
