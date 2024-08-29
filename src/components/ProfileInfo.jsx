import { useState } from "react";
import { useApp } from "../AppContext";
import { AiOutlineClose } from "react-icons/ai";
import FeedItems, { RenderProfilePic } from "./FeedItem";

export default function ProfileInfo({ onEditClick }) {
  const [activeBtn, setActiveBtn] = useState("Thread");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userName, fullName, bio, link, profilePic } = useApp();

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="width-height mt-0 dark:text-white">
      <div className=" mt-0">
        <div className="flex md:p-4 justify-between md:gap-x-80">
          <div className="flex flex-col items-start ">
            <h1 className="font-bold text-2xl">{fullName || "Loading ..."}</h1>
            <p>{userName || "Loading..."}</p>
          </div>
          <div className="md:flex w-20 h-20">
            {RenderProfilePic("w-20 h-20", handleImageClick)}
          </div>
        </div>
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
        <div className="flex flex-col gap-2 w-full  p-3">
          <div className="h-14 flex justify-around items-center ">
            <button
              type="button"
              onClick={() => {
                setActiveBtn("Privacy");
              }}
              className={`setting-buttons ${
                activeBtn === "Thread"
                  ? "text-black border-b-black dark:text-white dark:border-b-white"
                  : ""
              } `}
            >
              Thread
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveBtn("Privacy");
              }}
              className={`setting-buttons ${
                activeBtn === "Replies"
                  ? "text-black border-b-black dark:text-white dark:border-b-white"
                  : ""
              } `}
            >
              Replies
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveBtn("Privacy");
              }}
              className={`setting-buttons ${
                activeBtn === "Repost"
                  ? "text-black border-b-black dark:text-white dark:border-b-white"
                  : ""
              } `}
            >
              Repost
            </button>
          </div>
        </div>
      </div>
      <FeedItems />

      {isModalOpen && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-90">
          <button
            className="absolute top-4 left-4 text-white"
            onClick={handleCloseModal}
          >
            <AiOutlineClose size={30} />
          </button>
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
