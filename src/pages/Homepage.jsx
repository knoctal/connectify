import Sidebar from "../components/Sidebar";
import Feeds from "../components/Feeds";

export default function HomePage() {
  return (
    <div className="md:relative md:flex md:gap-10 md:min-h-screen dark:bg-black dark:text-white">
      <Sidebar />
      <div className="md:fixed md:flex md:flex-col items-center justify-center top-0 left-24 right-0  dark:bg-black dark:text-white">
        <Feeds />
      </div>
      <div></div>
    </div>
  );
}
