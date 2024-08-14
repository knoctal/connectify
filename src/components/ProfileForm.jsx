import { useRef, useEffect } from "react";

export default function ProfileForm({ section, onClose, onSectionChange }) {
  const formRef = useRef(null);

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderFormContent = () => {
    switch (section) {
      case "profile":
        return (
          <form
            ref={formRef}
            className="w-full md:p-4 rounded-2xl md:max-w-lg bg-white dark:bg-neutral-900 dark:text-white"
          >
            <div className="flex items-center justify-between mb-4 border-b border-gray-400 md:mb-0 md:border-none">
              <button
                className="text-gray-500 hover:text-gray-700 md:hidden"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <h2 className="text-center font-semibold text-lg md:hidden flex-1">
                Edit Profile
              </h2>
              <button
                className="text-blue-600 p-2 rounded-lg md:hidden"
                type="submit"
              >
                Done
              </button>
            </div>
            <div className="m-4 border rounded-3xl p-4 md:m-0 md:border-none md:rounded-none">
              <div className="flex flex-row gap-14 md:flex-row ">
                <div className="flex flex-col gap-4 mb-4 md:mb-0 md:w-96 ">
                  <label
                    className="block text-gray-700 font-semibold mb-2 dark:text-white"
                    htmlFor="fullName"
                  >
                    Name
                    <p>Full Name & user_name</p>
                  </label>
                  <hr className="md:hidden mt-4 border-t border-gray-600 w-[120px] md:w-[500px]" />
                </div>
                <img
                  className="rounded-full w-14 h-14"
                  src="/audii.jpg"
                  alt="Profile"
                />
              </div>
              <div className="my-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <button
                  type="button"
                  className="text-black dark:text-white"
                  onClick={() => onSectionChange("bio")}
                >
                  This is user bio
                </button>
                <hr className="mt-4 mr-2 border-t border-gray-600 w-full md:w-[480px]" />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="link"
                >
                  Link
                </label>
                <button
                  type="button"
                  onClick={() => onSectionChange("link")}
                  className="text-blue-500"
                >
                  youtube.com
                </button>
              </div>
            </div>
            <button
              className="ml-2 bg-black text-white p-3 rounded-lg w-full md:block hidden dark:bg-white dark:text-black"
              type="submit"
            >
              Done
            </button>
          </form>
        );
      case "bio":
        return (
          <div className="md:bg-transparent bg-white h-full w-full">
            <div className="flex items-center justify-between mb-4">
              <button
                className="text-gray-500 hover:text-gray-700"
                type="button"
                onClick={() => onSectionChange("profile")}
              >
                Cancel
              </button>
              <h2 className="text-xl text-black md:text-white font-bold">
                Edit Bio
              </h2>
              <button
                className="text-blue-500 hover:text-blue-700 font-semibold"
                type="submit"
              >
                Done
              </button>
            </div>
            <form>
              <div className="mb-4 pb-6 bg-white rounded-3xl dark:bg-neutral-900 dark:border dark:border-neutral-700">
                <div className="rounded-3xl md:overflow-x-auto bg-white p-4 dark:bg-neutral-900">
                  <input
                    className="md:w-[200%] w-full outline-none dark:bg-neutral-900"
                    type="text"
                    id="bio"
                    placeholder="Enter your bio"
                  />
                </div>
              </div>
            </form>
          </div>
        );
      case "link":
        return (
          <div className="md:bg-transparent bg-white h-full w-full ">
            <div className="flex items-center justify-between md:mb-1 md:w-full md:h-20 ">
              <button
                className="text-gray-500 hover:text-gray-700"
                type="button"
                onClick={() => onSectionChange("profile")}
              >
                Cancel
              </button>
              <h2 className="text-xl text-black font-bold md:text-white">
                Edit Link
              </h2>
              <button
                className="text-blue-500 hover:text-blue-700 font-semibold"
                type="submit"
              >
                Done
              </button>
            </div>
            <form>
              <div className="mb-4 pb-6 bg-white rounded-3xl dark:bg-neutral-900 dark:border dark:border-neutral-700 ">
                <div className="rounded-3xl md:overflow-x-auto bg-white p-4 dark:bg-neutral-900">
                  <input
                    className="md:w-[200%] w-full outline-none dark:bg-neutral-900"
                    type="url"
                    id="link"
                    placeholder="Enter your link"
                  />
                </div>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center md:bg-black md:bg-opacity-70 z-50">
      <div className="w-full h-full md:h-auto md:max-w-lg md:w-full rounded-lg shadow-lg relative">
        {renderFormContent()}
      </div>
    </div>
  );
}
