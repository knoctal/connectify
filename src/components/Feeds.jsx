import ThreadForm from "./ThreadForm";
import Dropdown from "../components/Dropdown";
import { useState, useRef, useEffect } from "react";
import FeedItems, { RenderProfilePic } from "./FeedItem";

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

  const dropdownOptions = ["For you", "Following", "Liked", "Saved"];

  return (
    <div className="centered-div bg-white dark:bg-black dark:text-white ">
      {/* Fixed height and scrollable content */}
      <Dropdown options={dropdownOptions} />
      <div className="width-height mt-0 ">
        {/* Hidden on mobile */}
        <div
          className="hidden  md:flex flex-row p-4 items-start justify-start gap-x-96 dark:bg-neutral-900 dark:text-white "
          onClick={toggleForm}
        >
          <div className="flex gap-4">
            {RenderProfilePic("w-10 h-10")}
            <button className="outline-none w-full text-gray-500">
              Start a thread...
            </button>
          </div>
          <div className="flex items-end justify-end">
            <button
              className="text-black font-semibold bg-white h-10 w-fit rounded-xl px-4 py-2 border border-gray-300 flex items-center justify-center dark:bg-neutral-900 dark:text-white dark:border-neutral-700"
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
        <FeedItems />
      </div>
    </div>
  );
}
