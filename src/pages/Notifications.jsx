import Sidebar from "../components/Sidebar";

export default function Notifications() {
  return (
    <div>
      <div className="relative min-h-screen dark:bg-gray-950 dark:text-white ">
        <Sidebar />
        <div className="md:fixed w-[1000px]  absolute left-24  inset-0 flex flex-col items-center justify-center">
          <h3 className="md:font-semibold mt-12 md:p-1 hidden md:block ">
            Activity
          </h3>
          <div className="centered-div mt-0">
            {/* Fixed height and scrollable content */}
            <div className="width-height mt-0 p-5 dark:bg-gray-950 dark:text-white">
              <p>NOTHING TO SHOW</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
