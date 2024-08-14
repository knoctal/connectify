import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { LuSearch } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative min-h-screen dark:bg-gray-950 dark:text-white">
      <Sidebar />
      <div className="md:fixed absolute left-24 inset-0 flex flex-col items-center justify-center">
        <h3 className="md:font-semibold md:mt-12 md:p-1 hidden md:block">
          Search
        </h3>
        <div className="centered-div mt-0">
          {/* Fixed height and scrollable content */}
          <div className="width-height mt-0 dark:bg-gray-950 dark:text-white">
            <div className="p-4 mt-4 ">
              <div className="ml-4 p-3 border border-gray-300 bg-gray-100 rounded-2xl flex items-center gap-4 relative dark:bg-gray-950 dark:text-white">
                <LuSearch className="ml-4" color="gray" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleChange}
                  className="outline-none bg-transparent flex-grow"
                />
                {searchTerm && (
                  <IoClose
                    onClick={clearSearch}
                    className="absolute right-4 cursor-pointer bg-gray-100 rounded-full"
                    color="gray"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
