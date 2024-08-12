import Sidebar from "../components/Sidebar";
import { useRef, useState, useEffect, useContext } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
// import AppContext from "../AppContext";
import { useApp } from "../AppContext";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useApp();
  const [selectOption, setSelectOption] = useState("For you");
  const options = ["For you", "Following", "Liked", "Saved"];

  const btnRef = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative min-h-screen dark:bg-gray-950 dark:text-white">
      <Sidebar />

      <div className="hidden md:flex md:flex-col items-center justify-center absolute top-0 left-0 right-0 mt-4">
        <div className="flex gap-5 items-center ">
          <h3 className="dark:text-white">{selectOption}</h3>

          <button
            ref={btnRef}
            onClick={() => setOpen((prev) => !prev)}
            className="dark:text-white"
          >
            {open ? (
              <FaAngleUp size={30} className="santru" />
            ) : (
              <FaAngleDown size={30} className="santru" />
            )}
          </button>
        </div>
        {open && (
          <div
            className="border rounded-2xl border-stone-200 w-64 p-2"
            ref={dropdownRef}
          >
            {options.map((items) => (
              <button
                key={items}
                onClick={() => {
                  setSelectOption(items);
                  setOpen(false);
                }}
                className="block text-left w-60 p-2  rounded-xl hover:bg-gray-200"
              >
                {items}
                {selectOption === items && <span className="ml-28">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
