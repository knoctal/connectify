import { useNavigate } from "react-router-dom";
import { useSidebar } from "./SidebarShared";
import { FaConnectdevelop } from "react-icons/fa";
import {
  Home,
  Search,
  HeartOutline,
  Profile,
  Menu,
  Post,
} from "../../../lib/data/Icons";

export default function SidebarMobile({ toggleForm }) {
  const {
    menuOpen,
    submenu,
    handleAppearance,
    handleMenuItems,
    handleMenuItemClick,
    setMenuOpen,
  } = useSidebar();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex md:h-0 items-center justify-between md:justify-start pb-3 md:relative w-full fixed dark:bg-black dark:bg-opacity-90 bg-white md:dark:bg-black dark:text-white dark:border-neutral-700">
        <FaConnectdevelop
          size={35}
          className="md:fixed md:mt-7 md:ml-4 mx-auto md:hidden"
        />
        <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={35} />
          {menuOpen && (
            <div className="fixed top-4 left-10 w-full h-full z-50 md:bg-black/50 md:hidden">
              {handleMenuItems(handleMenuItemClick)}
            </div>
          )}
          {submenu === "Appearance" && (
            <div className="fixed top-10 left-4 z-50">{handleAppearance()}</div>
          )}
        </div>
      </div>
      <div className="fixed bottom-0 h-[40px]  left-0 right-0  flex justify-around items-center bg-white py-0 md:hidden z-50 border-t border-gray-200 dark:bg-black/60 md:dark:bg-black dark:text-white dark:border-neutral-700">
        <div
          onClick={() => navigate("/home")}
          className="mobile-hover  dark:hover:bg-stone-800"
        >
          <Home size={17} />
        </div>
        <div
          onClick={() => navigate("/search")}
          className="mobile-hover  dark:hover:bg-stone-800"
        >
          <Search size={17} />
        </div>
        <div
          onClick={toggleForm}
          className="mobile-hover md:hidden dark:hover:bg-stone-800"
        >
          <Post size={17} />
        </div>
        <div
          onClick={() => navigate("/notifications")}
          className="mobile-hover dark:hover:bg-stone-800"
        >
          <HeartOutline size={24} />
        </div>
        <div
          onClick={() => navigate("/profile")}
          className="mobile-hover dark:hover:bg-stone-800"
        >
          <Profile size={17} />
        </div>
      </div>
    </>
  );
}
