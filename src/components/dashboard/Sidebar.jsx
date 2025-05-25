import React from "react";
import { MdDashboardCustomize } from "react-icons/md";

const Sidebar = ({ isOpen, selected, onSelect, setIsOpen }) => {
  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "bin requests", label: "Bin Requests" },
    { key: "pickup centres", label: "Pickup Centres" },
    { key: "users", label: "Users" },
    { key: "profile", label: "Profile" },
    { key: "settings", label: "Settings" },
    { key: "logout", label: "Logout" },
  ];

  const handleItemClick = (key) => {
    onSelect(key);

    // Collapse sidebar only on mobile view
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <aside
      className={`
        fixed top-16 lg:top-0 left-0 h-full bg-white text-gray-500 shadow-sm
        transform transition-all duration-300 z-20
        ${
          isOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full lg:translate-x-0 lg:w-20"
        }
      `}
    >
      <div className="flex items-center justify-center h-16 text-lg font-bold">
        <h3 className="text-2xl lg:text-3xl">
          {isOpen ? (
            "WasteWise"
          ) : (
            <MdDashboardCustomize size={25} color="blue" />
          )}
        </h3>
      </div>

      <nav className="mt-4 flex flex-col justify-center items-center w-full">
        <ul className="space-y-3 w-full px-5">
          {menuItems.map(({ key, label }) => (
            <li
              key={key}
              onClick={() => handleItemClick(key)}
              className={`
                w-full px-4 py-2 flex items-center cursor-pointer
                hover:bg-gray-100 rounded-lg
                ${selected === key ? "bg-gray-200 rounded-lg" : ""}
              `}
            >
              <MdDashboardCustomize size={20} className="text-gray-500" />
              {isOpen && <span className="ml-3">{label}</span>}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
