// import { useState } from "react";
// import { GoHome } from "react-icons/go";
// import { FaRegHeart, FaRegUser } from "react-icons/fa";
// import { FaConnectdevelop } from "react-icons/fa";
// import { FiSearch } from "react-icons/fi";
// import { BiMenuAltLeft } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../supabaseClient";

// export default function Sidebar() {
//   const [selected, setSelected] = useState("");

//   const navigate = useNavigate();

//   async function handleOut() {
//     try {
//       let { error } = await supabase.auth.signOut();

//       if (error) {
//         console.error("error occuring in logout:", error);
//       } else {
//         navigate("/");
//         console.log(selected);
//       }
//     } catch (error) {
//       console.error("cathed", error);
//     }
//   }

//   return (
//     <div className="mt-2 pl-2 flex flex-col gap-16">
//       <div className="flex mt-2 pl-3">
//         <FaConnectdevelop size={35} />
//       </div>
//       <div className="flex flex-col gap-7">
//         <div onClick={() => setSelected("home")} className="hover-effect">
//           <GoHome size={30} />
//         </div>
//         <div onClick={() => setSelected("search")} className="hover-effect">
//           <FiSearch size={30} />
//         </div>
//         <div onClick={() => setSelected("heart")} className="hover-effect">
//           <FaRegHeart size={28} />
//         </div>
//         <div onClick={() => setSelected("account")} className="hover-effect">
//           <FaRegUser size={28} />
//         </div>
//         <div
//           onClick={() => {
//             setSelected("log outed waqti toor par");
//             handleOut();
//           }}
//           className="hover-effect"
//         >
//           <BiMenuAltLeft size={30} />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { GoHome } from "react-icons/go";
import { FaRegHeart, FaRegUser, FaRegEdit } from "react-icons/fa";
import { FaConnectdevelop } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { VscPinned } from "react-icons/vsc";
import { BiMenuAltLeft } from "react-icons/bi";

export default function Sidebar() {
  const [selected, setSelected] = useState("");

  return (
    <div className="mt-2 pl-2 flex flex-col gap-16 relative">
      <div className="flex items-center justify-between mt-4 md:justify-start md:mt-2 md:pl-3 relative w-full">
        <FaConnectdevelop size={35} className="md:ml-0 mx-auto" />
        <div className="md:hidden">
          <BiMenuAltLeft size={35} />
        </div>
      </div>
      <div className="hidden md:flex md:flex-col md:gap-5 ">
        <div onClick={() => setSelected("home")} className="hover-effect">
          <GoHome size={30} />
        </div>
        <div onClick={() => setSelected("search")} className="hover-effect">
          <FiSearch size={30} />
        </div>
        <div onClick={() => setSelected("heart")} className="hover-effect">
          <FaRegHeart size={28} />
        </div>
        <div onClick={() => setSelected("account")} className="hover-effect">
          <FaRegUser size={28} />
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-5 mt-2 pl-4">
        <VscPinned size={30} />
        <BiMenuAltLeft size={30} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white py-3 md:hidden">
        <div onClick={() => setSelected("home")} className="hover-effect">
          <GoHome size={30} />
        </div>
        <div onClick={() => setSelected("search")} className="hover-effect">
          <FiSearch size={30} />
        </div>

        <div onClick={() => setSelected("post")} className="hover-effect">
          <FaRegEdit size={30} />
        </div>
        <div onClick={() => setSelected("heart")} className="hover-effect">
          <FaRegHeart size={28} />
        </div>
        <div onClick={() => setSelected("account")} className="hover-effect">
          <FaRegUser size={28} />
        </div>
      </div>
    </div>
  );
}
