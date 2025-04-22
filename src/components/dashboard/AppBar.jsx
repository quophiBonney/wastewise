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
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mx-3 text-gray-400 dark:text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="search"
                placeholder="Search or type your query ...."
                className="block w-full py-2 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
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
