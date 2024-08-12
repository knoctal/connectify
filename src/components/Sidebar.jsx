import { useState, useEffect, useContext } from "react";
import { GoHome } from "react-icons/go";
import { FaRegHeart, FaRegUser, FaRegEdit } from "react-icons/fa";
import { FaConnectdevelop } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { VscPinned } from "react-icons/vsc";
import { BiMenuAltLeft } from "react-icons/bi";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { IoMoonOutline } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";
// import AppContext from "../AppContext";
import { useApp } from "../AppContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenu, setSubmenu] = useState();
  const { theme, setTheme } = useApp();

  async function signOut() {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.log("error in logging out");
    } else {
      navigate("/");
    }
  }

  const menuOptions = ["Appearence", "Settings", "Report a problem", "Log out"];

  function handleMenuItems() {
    return (
      <div className="absolute bottom-0 left-16  w-64 h-60 rounded-lg font-bold flex flex-col gap-1 items-start justify-center p-2 border border-gray-100">
        {menuOptions.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleMenuItemClick(option)}
            className=" text-left h-16 w-60 p-2 rounded-md hover:bg-gray-400 "
          >
            {option}
          </button>
        ))}
      </div>
    );
  }
  function handleAppearence() {
    return (
      <div className="absolute bottom-0 left-16  w-96 h-32 rounded-xl font-bold flex flex-col gap-1 items-start justify-center p-2 border border-gray-200 bg-white dark:bg-gray-950 text-black dark:text-white ">
        <div className="flex items-start justify-between p-2 w-[220px] h-10 rounded-md ">
          <IoIosArrowRoundBack
            size={26}
            onClick={() => {
              setSubmenu(null);
            }}
          />
          <h3 className="text-l">Appearence</h3>
        </div>
        <div className="flex justify-between items-center w-[365px] h-[60px] rounded-lg  bg-gray-100/50">
          <div className=" appearence-btns" onClick={() => setTheme("light")}>
            <CiLight size={25} />
          </div>
          <div className="appearence-btns" onClick={() => setTheme("dark")}>
            <IoMoonOutline size={25} />
          </div>
          <div>
            <button
              type="button"
              className="appearence-btns"
              onClick={() => setTheme("auto")}
            >
              Auto
            </button>
          </div>
        </div>
      </div>
    );
  }

  function handleMenuItemClick(option) {
    console.log("Clicked menu option:", option);

    switch (option) {
      case "Appearence":
        console.log("Appearance py click krnay ka abhi koi faida nhi");
        setSubmenu("Appearence");
        break;
      case "Settings":
        console.log("Settings py click krnay ka abhi koi faida nhi");
        navigate("/Settings");
        break;
      case "Report a problem":
        navigate("/Report");
        break;
      case "Log out":
        signOut();
        break;
      default:
        break;
    }
    setMenuOpen(false);
  }

  return (
    <div className="mt-2 pl-2 flex flex-col gap-16 relative   bg-white dark:bg-gray-950 text-black dark:text-white">
      <div className="flex items-center justify-between mt-4 md:justify-start md:mt-2 md:pl-3 relative w-full">
        <FaConnectdevelop size={35} className="md:ml-0 mx-auto" />
        <div className="md:hidden">
          <BiMenuAltLeft size={35} />
        </div>
      </div>
      <div className="hidden md:flex md:flex-col md:gap-5 ">
        <div onClick={() => navigate("/Home")} className="hover-effect">
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
        <BiMenuAltLeft
          size={30}
          onClick={() => setMenuOpen(!menuOpen)}
          className="cursor-pointer"
        />
        {menuOpen && handleMenuItems()}
        {submenu && handleAppearence()}
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
