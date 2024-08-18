// import Sidebar from "../components/Sidebar";

// export default function Notifications() {
//   return (
//     <div>
//       <div className="relative min-h-screen dark:bg-black dark:text-white">
//         <Sidebar />
//         <div className="md:fixed absolute top-0 left-20 inset-0 flex flex-col items-center justify-center">
//           <h3 className="md:font-semibold mt-12 md:p-1 hidden md:block">
//             Activity
//           </h3>
//           <div className="centered-div mt-0">
//             {/* Fixed height and scrollable content */}
//             <div className="width-height mt-0 p-4">
//               <p>NOTHING TO SHOW</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
              {/* Hidden on mobile */}
              {/* Fixed height and scrollable content */}
              <p>NOTHING TO SHOW</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
