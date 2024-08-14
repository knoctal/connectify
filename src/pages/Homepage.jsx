import Sidebar from "../components/Sidebar";
import { useApp } from "../AppContext";
import Dropdown from "../components/Dropdown";
import Feeds from "../components/Feeds";

export default function HomePage() {
  const { theme, setTheme } = useApp();

  return (
    <div className="relative min-h-screen min-w-full flex gap-36 dark:bg-gray-950  dark:text-white ">
      <Sidebar />
      <div>
        <div className="md:fixed md:flex md:flex-col items-center justify-center ">
          <Feeds />
        </div>
      </div>
    </div>

    // <div className="relative min-h-screen dark:bg-gray-950 dark:text-white  ">
    //   <Sidebar />
    //   <div className="hidden md:flex md:flex-col items-center justify-center absolute top-0 left-0 right-0 mt-4 z-10 ">
    //     <Dropdown />
    //   </div>
    //   <div className="md:fixed md:flex md:flex-col items-center justify-center absolute top-10 left-0 right-0 mt-4 z-0">
    //     <Feeds />
    //   </div>
    // </div>
  );
}
