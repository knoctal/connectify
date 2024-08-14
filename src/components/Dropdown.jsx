import { useState, useRef, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
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
    <div className=" fixed hidden md:flex md:flex-col items-center justify-center  top-0 left-0 right-0 mt-4 z-50">
      <div className="m flex gap-5 items-center ">
        <h3 className=" text-black">{selectOption}</h3>

        <button
          ref={btnRef}
          onClick={() => setOpen((prev) => !prev)}
          className="bg-white"
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
          className="border rounded-2xl bg-white border-stone-200 w-64 p-2"
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
  );
}
