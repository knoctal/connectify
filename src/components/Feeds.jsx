import ThreadForm from "./ThreadForm";
import { useApp } from "../AppContext";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import Dropdown from "../components/Dropdown";
import { GoPaperAirplane } from "react-icons/go";
import { AiOutlineRetweet } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { MdOutlineModeComment } from "react-icons/md";

export default function Feeds() {
  const [showForm, setShowForm] = useState(false);
  const { userName, profilePic, threadText, postPic, userPosts } = useApp();

  const formContainerRef = useRef(null);

  const toggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleOutsideClick = (e) => {
    if (
      formContainerRef.current &&
      !formContainerRef.current.contains(e.target)
    ) {
      setShowForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const dropdownOptions = ["For you", "Following", "Liked", "Saved"];

  return (
    <div className="centered-div bg-white dark:bg-black dark:text-white ">
      {/* Fixed height and scrollable content */}
      <Dropdown options={dropdownOptions} />
      <div className="width-height mt-0 ">
        {/* Hidden on mobile */}
        <div className="hidden  md:flex flex-row p-4 items-start justify-start gap-x-96 dark:bg-neutral-900 dark:text-white ">
          <div className="flex gap-4">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="rounded-full w-10 h-10 object-cover"
              />
            ) : (
              <CgProfile
                size={30}
                className="rounded-full w-10 h-10 object-cover"
              />
            )}
            <button
              onClick={toggleForm}
              className="outline-none w-full text-gray-500"
            >
              Start a thread...
            </button>
          </div>
          <div className="flex items-end justify-end">
            <button
              onClick={toggleForm}
              className="text-black font-semibold bg-white h-10 w-fit rounded-xl px-4 py-2 border border-gray-300 flex items-center justify-center dark:bg-black dark:text-white dark:border-neutral-700"
              type="submit"
            >
              Post
            </button>
          </div>
        </div>

        {/* Conditional rendering of the ThreadForm component */}
        {showForm && (
          <div ref={formContainerRef}>
            <ThreadForm toggleForm={toggleForm} />
          </div>
        )}

        <hr className="hidden md:block border-t border-gray-300 dark:border-neutral-700" />

        {/* Show on mobile: For You and Following options */}
        <div className="setting-buttons w-full flex justify-around items-center  md:hidden mt-4">
          <button className="text-black dark:text-white font-semibold ">
            For You
          </button>
          <button className="text-black dark:text-white font-semibold">
            Following
          </button>
        </div>

        {/* Feed items */}
        <div className="mt-4 flex flex-col gap-4 md:p-4">
          {userPosts.length > 0 ? (
            userPosts.map((post, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="rounded-full w-10 h-10 object-cover"
                    />
                  ) : (
                    <CgProfile size={30} className="rounded-full w-10 h-10" />
                  )}
                  <h3>{userName}</h3>
                </div>
                <div className="flex flex-col gap-2">
                  <p>{post.post_text}</p>
                  {post.post_image && (
                    <img
                      src={post.post_image}
                      alt="Post Image"
                      className="border rounded-md w-full"
                    />
                  )}
                  <div className="flex gap-8 mt-4">
                    <FaRegHeart size={20} />
                    <MdOutlineModeComment size={20} />
                    <AiOutlineRetweet size={20} />
                    <GoPaperAirplane size={20} />
                  </div>
                </div>
                <hr className="border-t border-gray-300" />
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
}
