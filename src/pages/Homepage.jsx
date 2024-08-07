// import React from "react";
// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import { FaAngleUp, FaAngleDown } from "react-icons/fa";

// export default function Homepage() {
//   const options = ["For you", "Following", "Liked", "Save"];

//   const [open, setopen] = useState(false);
//   const [selectOption, setSelectOption] = useState("For you");

//   return (
//     <>
//       <div>
//         <Sidebar />
//         <div>
//           <h3>{selectOption}</h3>
//           <button
//             onClick={() => setopen((prev) => !prev)}
//             className="bg-blue-500
//           text-white
//           py-2
//           px-4
//           m-2
//           rounded
//           "
//           >
//             {open ? <FaAngleUp /> : <FaAngleDown />}
//           </button>
//           {open && (
//             <div>
//               {options.map((items) => (
//                 <button
//                   key={items}
//                   onClick={() => {
//                     setSelectOption(items);
//                     setopen(false);
//                   }}
//                   className="block text-left w-full py-2 px-4 hover:bg-gray-200"
//                 >
//                   {items}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import Sidebar from "../components/Sidebar";
import { useRef, useState, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [selectOption, setSelectOption] = useState("For you");
  const options = ["For you", "Following", "Liked", "Saved"];
  // const menuRef = useRef();
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
  // useEffect(() => {
  //   function handleClickOutside(e) {
  //     if (btnRef.current !== e.target) {
  //       setOpen(false);
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="relative min-h-screen">
      <Sidebar />

      <div className="hidden md:flex md:flex-col items-center justify-center absolute top-0 left-0 right-0 mt-4">
        <div className="flex gap-5 items-center ">
          <h3>{selectOption}</h3>

          <button
            ref={btnRef}
            onClick={() => setOpen((prev) => !prev)}
            className="
          "
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
