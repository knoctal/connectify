export default function Skeleton() {
  return (
    <div className="relative flex min-h-screen bg-white dark:bg-black dark:text-white">
      {/* Sidebar placeholder */}
      <div className="w-20 bg-gray-200 dark:bg-gray-800 p-4">
        {/* Sidebar content */}
        <div className="space-y-28">
          <div className="w-full h-8 rounded-xl bg-gray-600" />
          <div className="space-y-5">
            <div className="w-full h-8 rounded-xl bg-gray-700" />
            <div className="w-full h-8 rounded-xl bg-gray-700" />
            <div className="w-full h-8 rounded-xl bg-gray-700" />
            <div className="w-full h-8 rounded-xl bg-gray-700" />
          </div>
          <div className="space-y-4">
            <div className="w-full h-8 rounded-xl bg-gray-600" />
            <div className="w-full h-8 rounded-xl bg-gray-600" />
          </div>
        </div>
      </div>

      {/* Central div */}
      <div className="centered-div animate-pulse">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 max-w-xs">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 animate-pulse"></div>
        </div>
        <div className="width-height bg-gray-200 dark:bg-gray-800 animate-pulse "></div>
      </div>

      {/* Plus icon placeholder */}
      <div className="hidden md:block bottom-16 right-4 md:bottom-6 fixed md:right-6 z-20 animate-pulse">
        <div className=" border border-gray-300 shadow-md rounded-2xl w-20 h-16 p-5 cursor-pointer dark:border dark:border-neutral-700   "></div>
      </div>
    </div>
  );
}
