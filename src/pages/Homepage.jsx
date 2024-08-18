import Sidebar from "../components/Sidebar";
import Feeds from "../components/Feeds";

export default function HomePage() {
  return (
<<<<<<< HEAD
    <div className="md:relative md:flex md:gap-10 md:min-h-screen dark:bg-black dark:text-white">
      <Sidebar />

      <div className="md:fixed md:flex md:flex-col items-center justify-center top-0 left-24 right-0  dark:bg-black dark:text-white">
=======
    <div className="relative min-h-screen dark:bg-black dark:text-white">
      <Sidebar />
      <div className="md:fixed md:flex md:flex-col items-center justify-center top-10 left-0 right-0 mt-4 dark:bg-black dark:text-white">
>>>>>>> 8ff739b6af1d6162c3986123a37764aac0612fd4
        <Feeds />
      </div>
      <div></div>
    </div>
  );
}
