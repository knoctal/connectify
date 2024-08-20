import Sidebar from "../components/Sidebar";
import Dropdown from "../components/Dropdown";

export default function Notifications() {
  const dropdownOptions = [
    "Activity",
    "All",
    "Follows",
    "Replies",
    "Mentions",
    "Quotes",
    "Reposts",
    "Verified",
  ];
  return (
    <div>
      <div className="relative min-h-screen dark:bg-black dark:text-white">
        <Sidebar />
        <div className=" centered-div mt-0  bg-white dark:bg-black dark:text-white ">
          <Dropdown options={dropdownOptions} />
          <div className="md:fixed md:flex md:flex-col items-center justify-center top-10 left-0 right-0 mt-4 dark:bg-black dark:text-white">
            <div className="width-height mt-0 p-5 ">
              <p>NOTHING TO SHOW</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
