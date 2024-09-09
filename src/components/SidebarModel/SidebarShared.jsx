import { useApp } from "../../AppContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  Light,
  Dark,
  Home,
  Search,
  HeartOutline,
  Profile,
  Menu,
  Post,
} from "../../../lib/data/Icons";

export function useSidebar() {
  const navigate = useNavigate();
  const { theme, setTheme } = useApp();
  const [submenu, setSubmenu] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Create refs
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const menuOptions = ["Appearance", "Settings", "Report a problem", "Log out"];

  async function signOut() {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error in logging out");
    } else {
      navigate("/");
    }
  }

  function handleMenuItems(handleMenuItemClick) {
    return (
      <div
        ref={dropdownRef} // Attach ref to dropdown
        className="w-64 h-60 rounded-lg font-semibold flex flex-col gap-1 items-start justify-center p-2 border border-gray-100 bg-white text-black dark:bg-black dark:text-white dark:border dark:border-neutral-700"
      >
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
      <div className="md:w-96 h-32 w-64 rounded-xl font-semibold flex flex-col gap-1 items-start justify-center p-1 border border-gray-200 bg-white text-black dark:bg-black dark:text-white dark:border-neutral-700">
        <div className="flex items-start justify-between p-2 w-[220px] h-10 rounded-md">
          <IoIosArrowRoundBack
            size={26}
            onClick={() => {
              setSubmenu(null);
            }}
          />
          <h3 className=" dark:bg-black dark:text-white">Appearance</h3>
        </div>
        <div className="flex justify-around items-center md:w-[365px] h-[60px] w-[15rem] rounded-lg bg-gray-100/50 dark:bg-black dark:text-white">
          <div className="appearence-btns" onClick={() => setTheme("light")}>
            <Light />
          </div>
          <div className="appearence-btns" onClick={() => setTheme("dark")}>
            <Dark />
          </div>
          <div>
            <button
              type="button"
              className="appearence-btns text-gray-600 dark:text-white"
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

  function renderIcons({ toggleForm }) {
    return (
      <>
        <div
          onClick={() => navigate("/home")}
          className="hover-effect dark:hover:bg-stone-800"
        >
          <Home />
        </div>
        <div
          onClick={() => navigate("/search")}
          className="hover-effect dark:hover:bg-stone-800"
        >
          <Search />
        </div>
        <div
          onClick={toggleForm}
          className="hover-effect md:hidden dark:hover:bg-stone-800"
        >
          <Post size={26} />
        </div>
        <div
          onClick={() => navigate("/notifications")}
          className="hover-effect dark:hover:bg-stone-800"
        >
          <HeartOutline size={24} />
        </div>
        <div
          onClick={() => navigate("/profile")}
          className="hover-effect dark:hover:bg-stone-800"
        >
          <Profile size={24} />
        </div>
      </>
    );
  }

  function renderMenuButton() {
    useEffect(() => {
      // Close menu if clicked outside
      function handleClickOutside(event) {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setMenuOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    return (
      <div ref={menuRef} className="relative">
        <div onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
          <Menu />
        </div>
        {menuOpen && (
          <div className="absolute bottom-12 right-0 left-0 z-50">
            {handleMenuItems(handleMenuItemClick)}
          </div>
        )}
        {submenu === "Appearance" && (
          <div className="absolute bottom-12 right-0 left-0 z-50">
            {handleAppearance()}
          </div>
        )}
      </div>
    );
  }

  return {
    menuOpen,
    submenu,
    setMenuOpen,
    setSubmenu,
    handleMenuItems,
    handleAppearance,
    handleMenuItemClick,
    renderIcons,
    renderMenuButton,
  };
}
