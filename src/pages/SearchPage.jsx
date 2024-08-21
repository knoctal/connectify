import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import Sidebar from "../components/Sidebar";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative min-h-screen dark:bg-black dark:text-white">
      <Sidebar />
      <div className=" md:fixed inset-0 flex flex-col items-center justify-center">
        <h3 className="md:font-semibold md:mt-12 md:p-1 hidden md:block">
          Search
        </h3>
        <div className="centered-div mt-0">
          <div className="width-height mt-0">
            <div className="md:p-4 md:mt-6 p-2 mt-10 flex items-center">
              <div
                className={` p-3 border border-gray-300 bg-gray-100 rounded-2xl flex items-center gap-4 dark:bg-neutral-900 dark:border-neutral-700 `}
              >
                <LuSearch size={25} color="black" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleChange}
                  className="outline-none bg-transparent md:w-[530px] w-full"
                />
                {searchTerm && (
                  <IoClose
                    onClick={clearSearch}
                    className="cursor-pointer rounded-full dark:text-white"
                    color="gray"
                    size={20}
                  />
                )}
              </div>
              {/* Always show the Cancel button on mobile */}
              <button
                onClick={clearSearch}
                className="ml-4 text-gray-700 md:hidden dark:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
