import { useApp } from "../AppContext";
import { CgProfile } from "react-icons/cg";

export default function ProfileInfo({ onEditClick }) {
  const { userName, fullName, bio, link, profilePic } = useApp();
  return (
    <div className="width-height mt-0 dark:bg-gray-950 dark:text-white">
      <div className="width-height mt-0">
        <div className="flex md:p-4 justify-between md:gap-x-80">
          <div className="flex flex-col items-start ">
        <div className="flex md:p-4 justify-between md:gap-x-80">
          <div className="flex flex-col items-start ">
            <h1 className="font-bold text-2xl">{fullName || "Loading ..."}</h1>
            <p>{userName || "Loading..."}</p>
          </div>
          <div className="md:flex w-20 h-20">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="rounded-full w-20 h-20"
              />
            ) : (
              <CgProfile size={30} className="rounded-full w-20 h-20" />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 w-fit items-start md:w-96 md:ml-4">
        <div className="flex flex-col gap-6 w-fit items-start md:w-96 md:ml-4">
          <p>{bio || "Loading..."}</p>
          <div className=" flex flex-wrap justify-evenly items-center text-gray-500 gap-4 md:w-[600px] w-72 md:justify-start md:flex-nowrap">
            <button className=" md:ml-6 outline-none  hover:border-b hover:border-gray-600">
              {0} followers
            </button>
            <button
              type="url"
              className="text-blue-500 dark:text-gray-500 hover:border-b hover:border-gray-600"
            >
          <div className=" flex flex-wrap justify-evenly items-center text-gray-500 gap-4 md:w-[600px] w-72 md:justify-start md:flex-nowrap">
            <button className=" md:ml-6 outline-none  hover:border-b hover:border-gray-600">
              {0} followers
            </button>
            <button
              type="url"
              className="text-blue-500 dark:text-gray-500 hover:border-b hover:border-gray-600"
            >
              {link || "Loading..."}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-5 text-black font-semibold ">
          <button
            className="border border-gray-300 text-black h-10 w-72 rounded-2xl md:h-10 md:w-[550px] md:rounded-2xl md:p-1 dark:text-white dark:border-neutral-700"
            type="button"
            onClick={onEditClick}
          >
            Edit Profile
          </button>
        </div>
        <div className="mt-4 p-3 font-semibold flex justify-between items-center md:justify-around text-x text-gray-500/80">
        <div className="mt-4 p-3 font-semibold flex justify-between items-center md:justify-around text-x text-gray-500/80">
          <div>Thread</div>
          <div>Replies</div>
          <div>Repost</div>
        </div>
        <hr className="border-t border-gray-300 w-full dark:border-neutral-700" />
        <div className="flex flex-col items-center justify-center mt-12">
          No Post Yet ...
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-90">
          {/* Close button positioned at the top-left corner of the screen */}
          <button
            className="absolute top-4 left-4 text-white"
            onClick={handleCloseModal}
          >
            <AiOutlineClose size={30} />
          </button>
          {/* Centered image */}
          <div className="relative">
            <img
              src={profilePic}
              alt="Profile"
              className="rounded-full w-60 h-60 object-cover"
            />
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-90">
          {/* Close button positioned at the top-left corner of the screen */}
          <button
            className="absolute top-4 left-4 text-white"
            onClick={handleCloseModal}
          >
            <AiOutlineClose size={30} />
          </button>
          {/* Centered image */}
          <div className="relative">
            <img
              src={profilePic}
              alt="Profile"
              className="rounded-full w-60 h-60 object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
