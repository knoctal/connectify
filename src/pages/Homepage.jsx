import Sidebar from "../components/Sidebar";
import Feeds from "../components/Feeds";

export default function HomePage() {
  return (
    <div className="overflow-y-auto  dark:bg-black">
      <div className=" relative min-h-screen dark:bg-black dark:text-white">
        <Sidebar />
        <div className="md:fixed md:flex md:flex-col items-center justify-center top-10 left-0 right-0 mt-4  dark:text-white">
          <Feeds />
        </div>
      </div>
    </div>
  );
}
