import { useState, useRef, useEffect } from "react";

export default function DropdownPostButton({}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOption, setDropdownOption] = useState(
    "Anyone can reply & quote"
  );
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleDropdownOptionSelect = (option) => {
    setDropdownOption(option); // Update the selected option
    setDropdownOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative flex flex-row items-center md:gap-x-64 md:mt-0  mt-14 ">
      <button
        onClick={handleDropdownToggle}
        className="dark:text-gray-500 w-56 md:w-[250px] text-black "
      >
        {dropdownOption}
      </button>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute md:-top-32 left-0 mt-2 border rounded-2xl bg-white p-4 border-stone-200 dark:bg-neutral-900 dark:border-gray-800"
        >
          <button
            onClick={() =>
              handleDropdownOptionSelect("Anyone can reply & quote")
            }
            className="block text-left w-full p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-stone-800"
          >
            Anyone
          </button>
          <button
            onClick={() =>
              handleDropdownOptionSelect("Profiles you follow can reply")
            }
            className="block text-left w-full p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-stone-800"
          >
            Profiles you follow
          </button>
          <button
            onClick={() =>
              handleDropdownOptionSelect("Profiles you mentioned can reply")
            }
            className="block text-left w-full p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-stone-800"
          >
            Mentioned Only
          </button>
        </div>
      )}
    </div>
  );
}
