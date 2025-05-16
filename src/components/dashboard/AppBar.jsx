// AppBar.jsx
import { RiMenu2Fill } from "react-icons/ri";
import { GoBellFill } from "react-icons/go";
import { MdOutlineDarkMode } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
const AppBar = ({ toggleSidebar }) => {
  return (
    <header className="px-5 sticky top-0 z-20 bg-white p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center">
          <button
            onClick={toggleSidebar}
            className="mr-5 text-lg font-bold border border-gray-200 rounded px-3 py-2 hover:cursor-pointer"
          >
            <RiMenu2Fill size={20} />
          </button>
          <div>
            <div className="hidden relative lg:flex items-center">
              <h3 className="text-2xl font-bold">Dashboard</h3>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <button className="border border-gray-200 text-white p-2 rounded-full">
            <MdOutlineDarkMode
              size={20}
              className="text-gray-500"
            //   onClick={themeToggler}
            />
          </button>
          <button className="border border-gray-200 text-white p-2 rounded-full">
            <GoBellFill size={20} className="text-gray-500" />
          </button>
          <button className="border border-gray-200 text-white p-2 rounded-full">
            <RiLogoutCircleRLine size={20} className="text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
