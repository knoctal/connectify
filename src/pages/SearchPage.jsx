import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import Sidebar from "../components/Sidebar";
import { supabase } from "../supabaseClient";
import { FaSpinner } from "react-icons/fa";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("usersDetails")
        .select("user_name, profile_url, user_bio")
        .ilike("user_name", `%${searchTerm}%`);

      if (error) {
        console.error("Error fetching usernames:", error);
      } else {
        setSearchResults(data);
      }
      setLoading(false);
    };

    fetchUsernames();
  }, [searchTerm]);

  return (
    <div className="relative min-h-screen dark:bg-black dark:text-white">
      <Sidebar />
      <div className="md:fixed inset-0 flex flex-col items-center justify-center">
        <h3 className="md:font-semibold md:mt-12 md:p-1 hidden md:block">
          Search
        </h3>
        <div className="centered-div mt-0">
          <div className="width-height mt-0">
            <div className="md:p-4 md:mt-6 p-2 mt-10 flex items-center">
              <div
                className={`p-3 border border-gray-300 bg-gray-100 rounded-2xl flex items-center gap-4 dark:bg-neutral-900 dark:border-neutral-700`}
              >
                <LuSearch size={25} />
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
              <button
                onClick={clearSearch}
                className="ml-4 text-gray-700 md:hidden dark:text-white"
              >
                Cancel
              </button>
            </div>

            {loading ? (
              <div className="mt-4 p-4 flex items-center justify-center">
                <FaSpinner
                  className="animate-spin dark:text-gray-500 "
                  size={22}
                />
              </div>
            ) : (
              <div className="md:p-4">
                {searchResults.length > 0
                  ? searchResults.map((user, index) => (
                      <div
                        key={index}
                        className="md:py-2 flex items-center justify-between p-2"
                      >
                        <div className="flex gap-3 md:w-48 p-1  ">
                          <img
                            src={user.profile_url}
                            alt={`${user.user_name}'s profile`}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <span className="font-semibold">
                              {user.user_name}
                            </span>
                            <p className="text-sm text-gray-500">
                              {user.user_bio}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="border border-gray-100 w-24 h-9   rounded-xl dark:border-neutral-700"
                        >
                          Follow
                        </button>
                      </div>
                    ))
                  : searchTerm && (
                      <div className="mt-4 p-4 flex items-center justify-center">
                        <p className="text-red-600">No user found</p>
                      </div>
                    )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
