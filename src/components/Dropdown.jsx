import { useState, useRef, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Dropdown({ options }) {
  const [open, setOpen] = useState(false);
  const [selectOption, setSelectOption] = useState(options[0]);
  const option = options;

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
    <div className="dark:bg-black dark:text-white w-32 fixed hidden md:flex flex-col items-center justify-center top-0 left-[44%]  mt-4  z-50">
      <div className=" flex gap-5 items-center ">
        <h3 className="dark:text-white dark:bg-black text-black">
          {selectOption}
        </h3>

        <button
          ref={btnRef}
          onClick={() => setOpen((prev) => !prev)}
          className="bg-white dark:bg-black dark:text-white"
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
          className="border rounded-2xl bg-white border-stone-200 w-64 p-2 dark:bg-black dark:text-white dark:border dark:border-neutral-700"
          ref={dropdownRef}
        >
          {option.map((items) => (
            <button
              key={items}
              onClick={() => {
                setSelectOption(items);
                setOpen(false);
              }}
              className="block text-left w-60 p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-stone-900"
            >
              {items}
              {selectOption === items && <span className="ml-28">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
