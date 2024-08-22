import { useState } from "react";
import ThreadForm from "./ThreadForm";
import { useApp } from "../AppContext";
import { GoHome } from "react-icons/go";
import { CiLight } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { VscPinned } from "react-icons/vsc";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoMoonOutline } from "react-icons/io5";
import { FaConnectdevelop } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegHeart, FaRegUser, FaPlus, FaRegEdit } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const { theme, setTheme } = useApp();
  const [submenu, setSubmenu] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  async function signOut() {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error in logging out");
    } else {
      navigate("/");
    }
  }

  const menuOptions = ["Appearance", "Settings", "Report a problem", "Log out"];

  function handleMenuItems() {
    return (
      <div className="w-64 h-60 rounded-lg font-semibold flex flex-col gap-1 items-start justify-center p-2 border border-gray-100 bg-white text-black dark:bg-black dark:text-white dark:border dark:border-neutral-700">
        {menuOptions.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleMenuItemClick(option)}
            className="text-left h-16 w-60 p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-stone-900"
          >
            {option}
          </button>
        ))}
      </div>
    );
  }

  function handleAppearance() {
    return (
      <div className="md:w-96 h-32 w-64 rounded-xl font-semibold flex flex-col gap-1 items-start justify-center p-1 border border-gray-200 bg-white text-black dark:bg-black dark:text-white dark:border-neutral-700 ">
        <div className="flex items-start justify-between p-2 w-[220px] h-10 rounded-md">
          <IoIosArrowRoundBack
            size={26}
            onClick={() => {
              setSubmenu(null);
            }}
          />
          <h3 className="text-l dark:bg-black dark:text-white">Appearance</h3>
        </div>
        <div className="flex justify-around items-center md:w-[365px] h-[60px] w-54 rounded-lg bg-gray-100/50 dark:bg-black dark:text-white">
          <div className="appearence-btns" onClick={() => setTheme("light")}>
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
    switch (option) {
      case "Appearance":
        setSubmenu("Appearance");
        break;
      case "Settings":
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

  const handlePlusClick = () => {
    setIsFormVisible(!isFormVisible);
    console.log("Plus button clicked, isFormVisible:", !isFormVisible);
  };

  return (
    <div className="md:pt-3 pl-2 flex flex-col gap-20 relative dark:bg-black dark:text-white ">
      <div className="flex md:h-0 items-center justify-between md:justify-start p-2 md:relative w-full fixed dark:bg-black dark:bg-opacity-90  bg-white  md:dark:bg-black dark:text-white dark:border-neutral-700">
        <FaConnectdevelop
          size={35}
          className="md:fixed md:mt-6 md:ml-1 mx-auto "
        />
        <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <BiMenuAltLeft size={35} />
        </div>
      </div>

      {/* Sidebar content for larger screens */}
      <div className="hidden md:flex md:flex-col md:gap-5 ">
        <div className="fixed md:flex md:flex-col md:gap-3 py-3 z-50">
          <div
            onClick={() => navigate("/home")}
            className="hover-effect dark:hover:bg-stone-900"
          >
            <GoHome size={30} />
          </div>
          <div
            onClick={() => navigate("/search")}
            className="hover-effect dark:hover:bg-stone-900"
          >
            <FiSearch size={30} />
          </div>
          <div
            onClick={() => navigate("/notifications")}
            className="hover-effect dark:hover:bg-stone-900"
          >
            <FaRegHeart size={28} />
          </div>
          <div
            onClick={() => navigate("/profile")}
            className="hover-effect dark:hover:bg-stone-900"
          >
            <FaRegUser size={24} />
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col gap-5 mt-auto pl-4 fixed bottom-6 z-50">
        <VscPinned size={30} />
        <div className="relative">
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer"
          >
            <BiMenuAltLeft size={35} />
          </div>
          {/* Render the menu items when menuOpen is true */}
          {menuOpen && (
            <div className="absolute bottom-12 right-0 left-0 z-50">
              {handleMenuItems()}
            </div>
          )}
          {/* Render the appearance submenu if submenu state is "Appearance" */}
          {submenu === "Appearance" && (
            <div className="absolute bottom-12 right-0 left-0 z-50 ">
              {handleAppearance()}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-0 left-4 w-full h-full z-50 md:bg-black/50 md:hidden">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-xl font-bold mb-6"
          >
            &times;
          </button>
          {handleMenuItems()}
          {submenu && handleAppearance()}
        </div>
      )}

      {/* Fixed bottom  for mobile */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white py-0  md:hidden z-50 border-t border-gray-200 dark:bg-black dark:bg-opacity-90 md:dark:bg-black dark:text-white dark:border-neutral-700">
        <div
          onClick={() => navigate("/home")}
          className="hover-effect dark:hover:bg-stone-900"
        >
          <GoHome size={26} />
        </div>
        <div
          onClick={() => navigate("/search")}
          className="hover-effect dark:hover:bg-stone-900"
        >
          <FiSearch size={26} />
        </div>
        <div
          onClick={handlePlusClick}
          className="hover-effect dark:hover:bg-stone-900"
        >
          <FaRegEdit size={26} />
        </div>
        <div
          onClick={() => navigate("/notifications")}
          className="hover-effect dark:hover:bg-stone-900"
        >
          <FaRegHeart size={24} />
        </div>
        <div
          onClick={() => navigate("/profile")}
          className="hover-effect dark:hover:bg-stone-900"
        >
          <FaRegUser size={24} />
        </div>
      </div>

      {/* FaPlus icon positioned at bottom-right */}
      <div className="hidden md:block bottom-16 right-4 md:bottom-6 fixed md:right-6 z-20">
        <FaPlus
          size={27}
          onClick={handlePlusClick}
          className="border border-gray-300 shadow-md rounded-2xl w-20 h-16 p-5 cursor-pointer dark:border dark:border-neutral-700"
        />
      </div>

      {/* Conditionally render ThreadForm */}
      {isFormVisible && (
        <ThreadForm toggleForm={() => setIsFormVisible(false)} />
      )}
    </div>
  );
}
