import Sidebar from "../components/Sidebar";
import { useApp } from "../AppContext";
import Dropdown from "../components/DropDown";
import Feeds from "../components/Feeds";

export default function HomePage() {
  const { theme, setTheme } = useApp();

  return (
    <div className="relative min-h-screen ">
      <Sidebar />
      <div className="hidden md:flex md:flex-col items-center justify-center absolute top-0 left-0 right-0 mt-4">
        <Dropdown />
      </div>
      <div className="md:fixed md:flex md:flex-col items-center justify-center absolute top-10 left-0 right-0 mt-4">
        <Feeds />
      </div>
    </div>
  );
}
