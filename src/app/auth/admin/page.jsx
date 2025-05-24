"use client"
import AppBar from '@/components/dashboard/AppBar'
import Sidebar from '@/components/dashboard/Sidebar'
import LandingPage from './LandingPage/LandingPage'
import { useState } from 'react'
import BinRequests from './bin requests/page'
import PickupCentres from './pickup centres/PickupCentres'


const page = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen((o) => !o);
  const [selected, setSelected] = useState("dashboard");

  const renderContent = () => {
    switch (selected) {
      case "dashboard":
        return <LandingPage />;
      case "bin requests":
        return <BinRequests />;
      case "pickup centres":
        return <PickupCentres/>
    }
  };
  return (
    <>
      <Sidebar isOpen={isOpen} selected={selected} onSelect={setSelected} />
      {isOpen && (
        <div
          onClick={toggle}
          className="fixed inset-0 bg-gray-900/10 z-10 lg:hidden"
        />
      )}
      <div
        className={`
            flex-1 flex flex-col
            transition-all duration-300
            ${isOpen ? "lg:ml-64" : "lg:ml-20"}
          `}
      >
        <AppBar toggleSidebar={toggle} />
        <main className="bg-gray-100 px-5 pt-6 h-full"> {renderContent()}</main>
      </div>
    </>
  );
};
export default page;
