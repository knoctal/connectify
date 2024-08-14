import { useState, useRef, useEffect } from "react";
import { MdOutlineModeComment } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { GoPaperAirplane } from "react-icons/go";
import ThreadForm from "./ThreadForm";
import Dropdown from "../components/DropDown";

export default function Feeds() {
  const [showForm, setShowForm] = useState(false);

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

  return (
    <div className="centered-div bg-white dark:bg-black dark:text-white ">
      {/* Fixed height and scrollable content */}
      <Dropdown />
      <div className="width-height mt-0 ">
        {/* Hidden on mobile */}
        <div className="hidden  md:flex flex-row p-4 items-start justify-start gap-x-96 dark:bg-neutral-900 dark:text-white ">
          <div className="flex gap-4">
            <img
              className="rounded-full w-10 h-10"
              src="/audii.jpg"
              alt="Profile"
            />
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
        <div className="w-full flex justify-between items-center p-4 md:hidden">
          <button className="text-gray-300 font-semibold ">For You</button>
          <button className="text-gray-300 font-semibold">Following</button>
        </div>

        {/* Feed items */}
        <div className="flex flex-col gap-4 p-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <img
                  className="rounded-full w-10 h-10"
                  src="/audii.jpg"
                  alt="Profile"
                />
                <h3>profile_name</h3>
              </div>
              <div className="flex flex-col gap-2">
                <p>Chin tapak dam dam</p>
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
