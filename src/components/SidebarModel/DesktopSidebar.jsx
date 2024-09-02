import { useSidebar } from "./SidebarShared";
import { Pinned } from "../../../lib/data/Icons";
import { FaConnectdevelop, FaPlus } from "react-icons/fa";

export default function SidebarDesktop({ toggleForm }) {
  const { renderIcons, renderMenuButton } = useSidebar();

  return (
    <div className=" md:pt-3 md:pl-2 flex flex-col gap-20 relative dark:bg-black dark:text-white">
      <div className="hidden md:flex md:h-0 items-center justify-between md:justify-start pb-3 md:relative w-full fixed dark:bg-black dark:bg-opacity-90 bg-white md:dark:bg-black dark:text-white dark:border-neutral-700">
        <FaConnectdevelop
          size={35}
          className="md:fixed md:mt-3 md:ml-3 mx-auto"
        />
      </div>

      <div className="hidden md:flex md:flex-col md:gap-3">
        <div className="fixed md:flex md:flex-col md:gap-2 z-50">
          {renderIcons({ toggleForm })}
        </div>
      </div>

      <div className="md:flex hidden flex-col gap-5 mt-auto pl-4 fixed bottom-7 z-50">
        <Pinned size={30} />
        {renderMenuButton()}
      </div>

      <div className="hidden md:block bottom-16 right-4 md:bottom-6 fixed md:right-6 z-20">
        <FaPlus
          color="gray"
          size={27}
          onClick={toggleForm}
          className="border border-gray-300 shadow-md rounded-2xl w-20 h-16 p-5 cursor-pointer dark:border dark:border-neutral-700"
        />
      </div>
    </div>
  );
}
