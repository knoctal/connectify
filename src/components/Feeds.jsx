import { useState, useRef, useEffect } from "react";
import { MdOutlineModeComment } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { GoPaperAirplane } from "react-icons/go";
import ThreadForm from "./ThreadForm";
import { useApp } from "../AppContext";
import { CgProfile } from "react-icons/cg";
import Dropdown from "../components/Dropdown";

export default function Feeds() {
  const [showForm, setShowForm] = useState(false);
  const { userName, profilePic } = useApp();

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
      <div className="width-height  ">
        {/* Hidden on mobile */}
        <div className="hidden  md:flex flex-row p-4 items-start justify-start gap-x-96 dark:bg-neutral-900 dark:text-white ">
          <div className="flex gap-4">
            <div>
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="rounded-full w-10 h-10"
                />
              ) : (
                <CgProfile size={30} className="rounded-full w-10 h-10" />
              )}
            </div>

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
        <div className="setting-buttons w-full flex justify-around items-center  md:hidden mt-10">
          <button className="text-black dark:text-white font-semibold ">
            For You
          </button>
          <button className="text-black dark:text-white font-semibold">
            Following
          </button>
        </div>

        {/* Feed items */}
        <div className="mt-4 flex flex-col gap-4 md:p-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div>
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="rounded-full w-12 h-12"
                    />
                  ) : (
                    <CgProfile size={30} className="rounded-full w-12 h-12" />
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <h3>{userName}</h3>
                  <p>Chin tapak dam dam</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <img
                  src="/IMG_0850.JPG"
                  alt="Bio Image"
                  className="border rounded-md w-full"
                />
                <div className="flex gap-8 mt-4">
                  <FaRegHeart size={20} />
                  <MdOutlineModeComment size={20} />
                  <AiOutlineRetweet size={20} />
                  <GoPaperAirplane size={20} />
                </div>
              </div>
              <hr className="border-t border-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
