// import { useState } from "react";
// import Sidebar from "../components/Sidebar";

// export default function ProfilePage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editSection, setEditSection] = useState("profile");

//   const handleEditClick = () => {
//     setIsEditing(true);
//     setEditSection("profile");
//   };

//   const handleSectionClick = (section) => {
//     setEditSection(section);
//   };

//   const closeForm = () => {
//     setIsEditing(false);
//     setEditSection("profile");
//   };

//   return (
//     <div className="relative min-h-screen">
//       <Sidebar />

//       <div className="absolute inset-0 flex flex-col items-center justify-center">
//         <h3 className="md:font-semibold  mt-4 md:p-2 hidden md:block">
//           Profile
//         </h3>
//         <div className="width-height mt-0">
//           <div className="flex p-4 justify-between  md:gap-x-96">
//             <div className="flex flex-col items-start">
//               <h1 className="font-bold text-2xl">Full name</h1>
//               <p>user_name</p>
//             </div>
//             <div className="md:flex w-20 h-20">
//               <img
//                 className="rounded-full w-20 h-20"
//                 src="/audii.jpg"
//                 alt="Profile"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col gap-6 w-60 ml-4 items-start md:w-96">
//             <p>This is user bio</p>
//             <div className="flex text-gray-500 gap-6">
//               <button className="ml-6 outline-none">{6} followers</button>
//               <span className="text-blue-500">youtube.com</span>
//             </div>
//           </div>
//           <div className="flex items-center justify-center mt-5 text-black font-semibold">
//             <button
//               className="border border-gray-300 text-black h-10 w-72 rounded-2xl md:h-10 md:w-[550px] md:rounded-2xl md:p-1"
//               type="button"
//               onClick={handleEditClick}
//             >
//               Edit Profile
//             </button>
//           </div>
//           <div className="p-3 font-semibold flex items-center justify-around text-x text-gray-500/80">
//             <div>Thread</div>
//             <div>Replies</div>
//             <div>Repost</div>
//           </div>
//           <hr className="border-t border-gray-300 w-full" />
//           <div className="flex flex-col items-center justify-center mt-12">
//             No Post Yet ...
//           </div>
//         </div>
//       </div>

//       {/* Overlay and Form */}
//       {isEditing && (
//         <div className="absolute inset-0 flex items-center justify-center md:bg-black md:bg-opacity-70 z-50">
//           <div className="w-full h-full md:h-auto md:max-w-lg md:w-full  rounded-lg shadow-lg relative ">
//             {editSection === "profile" && (
//               <form className="w-full md:p-4 rounded-2xl md:max-w-lg bg-white">
//                 <div className="flex items-center justify-between mb-4 top-0 right-0 left-0 border-b border-gray-400  md:mb-0 md:border-none ">
//                   <button
//                     className="text-gray-500 hover:text-gray-700 md:hidden"
//                     type="button"
//                     onClick={closeForm}
//                   >
//                     Cancel
//                   </button>
//                   <h2 className="text-center font-semibold text-lg md:hidden flex-1">
//                     Edit Profile
//                   </h2>
//                   <button
//                     className=" text-blue-600 p-2 rounded-lg md:hidden"
//                     type="submit"
//                   >
//                     Done
//                   </button>
//                 </div>

//                 <div className=" m-4 border rounded-3xl p-4 md:m-0 md:border-none md:rounded-none ">
//                   <div className="flex flex-row gap-14 md:flex-row ">
//                     <div className="flex flex-col gap-4 mb-4 md:mb-0 md:w-96">
//                       <label
//                         className="block text-gray-700 font-semibold mb-2"
//                         htmlFor="fullName"
//                       >
//                         Name
//                         <p>Full Name & user_name</p>
//                       </label>
//                       <hr className="md:hidden mt-4 border-t border-gray-600 w-[120px] md:w-[500px]" />
//                     </div>

//                     <img
//                       className="rounded-full w-14 h-14"
//                       src="/audii.jpg"
//                       alt="Profile"
//                     />
//                   </div>

//                   <div className="my-4">
//                     <label
//                       className="block text-gray-700 font-semibold mb-2"
//                       htmlFor="bio"
//                     >
//                       Bio
//                     </label>
//                     <button
//                       type="button"
//                       onClick={() => handleSectionClick("bio")}
//                     >
//                       This is user bio
//                     </button>
//                     <hr className="mt-4 mr-2 border-t border-gray-600 w-full md:w-[480px]" />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       className="block text-gray-700 font-semibold mb-2"
//                       htmlFor="link"
//                     >
//                       Link
//                     </label>
//                     <button
//                       type="button"
//                       onClick={() => handleSectionClick("link")}
//                       className="text-blue-500"
//                     >
//                       youtube.com
//                     </button>
//                   </div>
//                 </div>
//                 <button
//                   className=" ml-2 bg-black text-white p-2 rounded-lg w-full md:block hidden"
//                   type="submit"
//                 >
//                   Done
//                 </button>
//                 <button
//                   className="ml-2 mt-4 text-gray-500 hover:text-gray-700 md:block hidden"
//                   type="button"
//                   onClick={closeForm}
//                 >
//                   Cancel
//                 </button>
//               </form>
//             )}

//             {editSection === "bio" && (
//               <div className="md:bg-transparent bg-white h-full w-full ">
//                 <div className="flex items-center justify-between mb-4">
//                   <button
//                     className="text-gray-500 hover:text-gray-700"
//                     type="button"
//                     onClick={() => handleSectionClick("profile")}
//                   >
//                     Cancel
//                   </button>
//                   <h2 className="text-xl text-black md:text-white font-bold">
//                     Edit Bio
//                   </h2>
//                   <button
//                     className="text-blue-500 hover:text-blue-700 font-semibold"
//                     type="submit"
//                   >
//                     Done
//                   </button>
//                 </div>
//                 <form>
//                   <div className="mb-4 pb-6 bg-white rounded-3xl ">
//                     <div className="rounded-3xl md:overflow-x-auto bg-white p-4 ">
//                       <input
//                         className=" md:w-[200%]  w-full outline-none"
//                         type="text"
//                         id="link"
//                         placeholder="Enter your bio"
//                       />
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             )}

//             {editSection === "link" && (
//               <div className="md:bg-transparent bg-white h-full w-full ">
//                 <div className="flex items-center justify-between md:mb-1 md:w-full md:h-20 ">
//                   <button
//                     className="text-gray-500 hover:text-gray-700 "
//                     type="button"
//                     onClick={() => handleSectionClick("profile")}
//                   >
//                     Cancel
//                   </button>
//                   <h2 className="text-xl text-black font-bold md:text-white ">
//                     Edit Link
//                   </h2>
//                   <button
//                     className="text-blue-500 hover:text-blue-700 font-semibold"
//                     type="submit"
//                   >
//                     Done
//                   </button>
//                 </div>
//                 <form>
//                   <div className="mb-4 pb-6 bg-white rounded-3xl ">
//                     <div className="rounded-3xl md:overflow-x-auto bg-white p-4 ">
//                       <input
//                         className=" md:w-[200%] w-full outline-none"
//                         type="url"
//                         id="link"
//                         placeholder="Enter your link"
//                       />
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProfileInfo from "../components/ProfileInfo";
import ProfileForm from "../components/ProfileForm";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState("profile");

  const handleEditClick = () => {
    setIsEditing(true);
    setEditSection("profile");
  };

  const handleSectionClick = (section) => {
    setEditSection(section);
  };

  const closeForm = () => {
    setIsEditing(false);
    setEditSection("profile");
  };

  return (
    <div className="relative min-h-screen">
      <Sidebar />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h3 className="md:font-semibold  mt-4 md:p-2 hidden md:block">
          Profile
        </h3>
        <ProfileInfo onEditClick={handleEditClick} />
        {isEditing && (
          <ProfileForm
            section={editSection}
            onClose={closeForm}
            onSectionChange={handleSectionClick}
          />
        )}
      </div>
    </div>
  );
}
