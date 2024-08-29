import { useState } from "react";
import ThreadForm from "./ThreadForm";
import SidebarMobile from "./SidebarModel/MobileSidebar";
import SidebarDesktop from "./SidebarModel/DesktopSidebar";

export default function Sidebar() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    console.log("Plus button clicked, isFormVisible:", !isFormVisible);
  };

  return (
    <div className="md:pt-3 flex flex-col gap-24 relative dark:bg-black dark:text-white">
      <SidebarDesktop toggleForm={toggleForm} isFormVisible={isFormVisible} />
      <SidebarMobile toggleForm={toggleForm} isFormVisible={isFormVisible} />
      {isFormVisible && (
        <ThreadForm toggleForm={() => setIsFormVisible(false)} />
      )}
    </div>
  );
}
