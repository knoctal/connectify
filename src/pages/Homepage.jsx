import Sidebar from "../components/Sidebar";
import { useApp } from "../AppContext";

export default function HomePage() {
  const { theme, setTheme } = useApp();

  return (
    <div className="relative min-h-screen dark:bg-gray-950 dark:text-white">
      <Sidebar />

      <div className="hidden md:flex md:flex-col items-center justify-center absolute top-0 left-0 right-0 mt-4">
        <div className="flex gap-5 items-center ">
          <h3 className="dark:text-white">{selectOption}</h3>

          <button
            ref={btnRef}
            onClick={() => setOpen((prev) => !prev)}
            className="dark:text-white"
          >
            {open ? (
              <FaAngleUp size={30} className="santru" />
            ) : (
              <FaAngleDown size={30} className="santru" />
            )}
          </button>
        </div>
        {open && (
          <div
            className="border rounded-2xl border-stone-200 w-64 p-2"
            ref={dropdownRef}
          >
            {options.map((items) => (
              <button
                key={items}
                onClick={() => {
                  setSelectOption(items);
                  setOpen(false);
                }}
                className="block text-left w-60 p-2  rounded-xl hover:bg-gray-200"
              >
                {items}
                {selectOption === items && <span className="ml-28">✓</span>}
              </button>
            ))}
          </div>
        )}
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
