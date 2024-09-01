import { useRef, useEffect, useState } from "react";
import { useApp } from "../AppContext";
import { supabase } from "../supabaseClient";
import UpdateProfile from "../components/UpdateProfile";

export default function ProfileForm({ section, onClose, onSectionChange }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [bio, setBioState] = useState("");
  const [link, setLinkState] = useState("");

  const { userDetails, setBio: updateBio, setLink: updateLink } = useApp();
  const userName = userDetails?.user_name || "Loading";
  const fullName = userDetails?.full_name || "Loading";
  const initialBio = userDetails?.user_bio || "Loading";
  const initialLink = userDetails?.user_link || "Loading";

  useEffect(() => {
    setBioState(initialBio);
    setLinkState(initialLink);
  }, [initialBio, initialLink]);

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
  }, [section]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const updatedBio = formData.get("bio") || bio;
    const updatedLink = formData.get("link") || link;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const updates = {};
      if (section === "bio") {
        updates.user_bio = updatedBio;
        setBioState(updatedBio);
        updateBio(updatedBio);
      } else if (section === "link") {
        updates.user_link = updatedLink;
        setLinkState(updatedLink);
        updateLink(updatedLink);
      }

      const { error } = await supabase
        .from("usersDetails")
        .update(updates)
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      if (section === "bio" || section === "link") {
        onSectionChange("profile");
      }
      if (section === "profile") {
        onSectionChange("profile");
        onClose();
      }
    } catch (error) {
      console.error("Error updating user details:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFormContent = () => {
    switch (section) {
      case "profile":
        return (
          <form
            ref={formRef}
            className="w-full h-full md:p-4 rounded-2xl md:max-w-lg bg-white dark:bg-neutral-900 dark:text-white"
            onSubmit={handleSubmit}
          >
            <div className="p-2 flex items-center justify-between mb-4 border-b border-gray-400 md:mb-0 md:border-none">
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
                {loading ? "Saving..." : "Done"}
              </button>
            </div>
            <div className="m-8 w-fit border rounded-3xl p-4 md:m-0 md:border-none md:rounded-none dark:border-neutral-700">
              <div className="flex flex-row gap-14 md:flex-row">
                <div className="flex flex-col gap-4 mb-4 md:mb-0 md:w-80">
                  <label
                    className="block text-gray-700 font-semibold mb-2 dark:text-white"
                    htmlFor="fullName"
                  >
                    Name
                    <p>
                      {fullName || "Loading ..."} & {userName || "Loading..."}
                    </p>
                  </label>
                  <hr className="md:hidden mt-4 border-t border-gray-600 w-[120px] md:w-[500px]" />
                </div>
                <UpdateProfile className="rounded-full w-10 h-10 object-cover" />
              </div>
              <div className="my-4">
                <label
                  className="block text-gray-700 font-semibold mb-2 dark:text-white"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <button
                  type="button"
                  className="text-black dark:text-white"
                  onClick={() => onSectionChange("bio")}
                >
                  {bio || "Loading ..."}
                </button>
                <hr className="mt-4 mr-2 border-t border-gray-600 w-full md:w-[480px]" />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2 dark:text-white"
                  htmlFor="link"
                >
                  Link
                </label>
                <button
                  type="button"
                  onClick={() => onSectionChange("link")}
                  className="text-blue-500"
                >
                  {link || "Loading ..."}
                </button>
              </div>
            </div>
            <button
              className="ml-2 bg-black text-white p-3 rounded-lg w-full md:block hidden dark:bg-white dark:text-black"
              type="submit"
            >
              {loading ? "Saving..." : "Done"}
            </button>
          </form>
        );
      case "bio":
        return (
          <div className="md:bg-transparent bg-white h-full w-full dark:bg-black dark:text-white">
            <div className="flex items-center justify-between mb-4 border-b border-gray-400 p-2 md:border-none">
              <button
                className="text-gray-500 hover:text-gray-700"
                type="button"
                onClick={() => onSectionChange("profile")}
              >
                Cancel
              </button>
              <h2 className="text-xl text-black md:text-white font-bold dark:text-white">
                Edit Bio
              </h2>
              <button
                className="text-blue-500 hover:text-blue-700 font-semibold"
                type="submit"
                form="bioForm"
              >
                {loading ? "Saving..." : "Done"}
              </button>
            </div>
            <form id="bioForm" onSubmit={handleSubmit}>
              <div className="mb-4 pb-6 bg-white md:rounded-3xl dark:bg-black">
                <div className="rounded-3xl md:overflow-x-auto bg-white p-4 dark:bg-black">
                  <input
                    className="md:w-[200%] w-full h-full outline-none dark:bg-black"
                    type="text"
                    name="bio"
                    value={bio}
                    onChange={(e) => setBioState(e.target.value)}
                    placeholder="Enter your bio"
                  />
                </div>
              </div>
            </form>
          </div>
        );
      case "link":
        return (
          <div className="md:bg-transparent bg-white h-full w-full dark:bg-black dark:text-white">
            <div className="flex items-center justify-between md:mb-1 md:w-full md:h-20 border-b border-gray-400 p-2 md:border-none">
              <button
                className="text-gray-500 hover:text-gray-700"
                type="button"
                onClick={() => onSectionChange("profile")}
              >
                Cancel
              </button>
              <h2 className="text-xl text-black font-bold md:text-white dark:text-white">
                Edit Link
              </h2>
              <button
                className="text-blue-500 hover:text-blue-700 font-semibold"
                type="submit"
                form="linkForm"
              >
                {loading ? "Saving..." : "Done"}
              </button>
            </div>
            <form id="linkForm" onSubmit={handleSubmit}>
              <div className="mb-4 pb-6 bg-white md:rounded-3xl dark:bg-black">
                <div className="rounded-3xl md:overflow-x-auto bg-white p-4 dark:bg-black">
                  <input
                    className="md:w-[200%] w-full h-full outline-none dark:bg-black"
                    type="url"
                    name="link"
                    value={link}
                    onChange={(e) => setLinkState(e.target.value)}
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
