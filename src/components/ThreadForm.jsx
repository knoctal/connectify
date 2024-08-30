import { useApp } from "../AppContext";
import { CiFileOn } from "react-icons/ci";
import EmojiPicker from "emoji-picker-react";
import { BsFiletypeGif } from "react-icons/bs";
import { BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { useUploadPost } from "./UploadPost";
import { RenderProfilePic } from "./FeedItem";

export default function ThreadForm({ toggleForm }) {
  const [file, setFile] = useState(null);
  const [showPoll, setShowPoll] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { threadText, userName, setThreadText } = useApp();
  const [pollOptions, setPollOptions] = useState(["Yes", "No"]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dropdownOption, setDropdownOption] = useState(
    "Anyone can reply & quote"
  );
  const uploadPost = useUploadPost(toggleForm);

  const pollRef = useRef(null);
  const formRef = useRef(null);
  const textareaRef = useRef(null);
  const dropdownRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const handleTextChange = (e) => {
    setThreadText(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handlePostClick = async () => {
    setShowUpload(true);

    if (!file) {
      setFile(null);
    }

    uploadPost.mutate(
      { file, threadText },
      {
        onSuccess: () => {
          setThreadText("");
          setFile(null);
        },
        onError: (error) => {
          console.error("Error during post creation:", error);
          // Handle error if needed
        },
      }
    );
  };

  const handleEmojiClick = (emojiObject) => {
    setThreadText((prevText) => prevText + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleDropdownOptionSelect = (option) => {
    setDropdownOption(option);
    setDropdownOpen(false);
  };

  const handlePollToggle = () => {
    setShowPoll((prev) => !prev);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleOutsideClick = (e) => {
    if (
      formRef.current &&
      !formRef.current.contains(e.target) &&
      (!emojiPickerRef.current || !emojiPickerRef.current.contains(e.target)) &&
      (!dropdownRef.current || !dropdownRef.current.contains(e.target)) &&
      (!pollRef.current || !pollRef.current.contains(e.target))
    ) {
      setShowConfirmation(true); // Show confirmation when clicking outside
    } else if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(e.target)
    ) {
      setShowEmojiPicker(false);
    } else if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    } else if (pollRef.current && !pollRef.current.contains(e.target)) {
      setShowPoll(false);
    }
  };

  const handleDiscardClick = () => {
    setShowConfirmation(false);
    toggleForm();
    setThreadText("");
  };

  const handleConfirmationCancel = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        6 * 24
      )}px`;
    }
  }, [threadText]);

  return (
    <div
      className={`fixed  inset-0 flex flex-col items-center justify-center md:bg-black md:bg-opacity-70 z-50  bg-neutral-900  ${
        showPoll ? "md:h-auto" : "md:h-auto"
      }`}
    >
      <div className="flex items-center justify-between md:justify-center p-6 relative h-6 w-full ">
        <button
          className="md:hidden font-bold text-white"
          onClick={() => setShowConfirmation(true)}
        >
          Cancel
        </button>
        <h1 className="md:text-white text-white font-bold text-lg md:mb-4 ">
          New Thread
        </h1>
      </div>
      <div
        ref={formRef}
        className={`bg-white p-6  md:rounded-2xl md:shadow-lg md:w-full md:max-w-[620px] dark:text-white dark:bg-neutral-900 dark:border dark:border-gray-800 ${
          showPoll ? "md:h-[250px]" : "md:h-auto "
        } w-full h-full md:h-fit flex flex-col  `}
      >
        <div className="flex gap-2 mb-1  overflow-y-auto max-h-[400px]">
          {RenderProfilePic("w-10 h-10")}

          <div className="flex flex-col m-0 p-0 items-start flex-grow ">
            <h4 className="font-semibold">{userName}</h4>

            <div className="md:w-[500px] overflow-hidden">
              <textarea
                ref={textareaRef}
                className="w-full font-gray-500 rounded-lg resize-none outline-none dark:text-white dark:bg-neutral-900"
                placeholder="Start a thread..."
                value={threadText}
                onChange={handleTextChange}
              />
            </div>
            <div className="flex items-center gap-2  ">
              <div className="flex gap-2 ">
                {imagePreviewUrl && (
                  <div className="relative w-full flex justify-center mt-1">
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className="w-full max-w-[450px] object-contain rounded-md"
                    />
                    <button
                      className="absolute right-0 bg-black/80  text-white rounded-full p-2 "
                      onClick={() => setImagePreviewUrl(null)}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                )}
              </div>
            </div>
            {showPoll && (
              <div ref={pollRef} className="mt-2">
                {pollOptions.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={index === 0 ? "Yes" : "No"}
                    className="block mt-2 w-[500px] p-2 border rounded-2xl outline-none text-gray-500 dark:bg-neutral-900 dark:border-neutral-700"
                  />
                ))}
                <button
                  onClick={() => setPollOptions([...pollOptions, ""])}
                  className="mt-2 text-gray-500"
                >
                  Add another option
                </button>
              </div>
            )}

            <div className="flex mt-2  items-center gap-2">
              <div className="relative flex items-center gap-2 h-auto">
                <button
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  className="text-gray-400"
                >
                  <BsFiletypeGif size={20} />
                </button>
                {showEmojiPicker && (
                  <div
                    ref={emojiPickerRef}
                    className="absolute z-50 dark:bg-black "
                    style={{ width: "200px", height: "200px" }}
                  >
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer text-gray-400 flex items-center">
                  <CiFileOn size={22} />
                  <input
                    type="file"
                    className="hidden"
                    id="input-files"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="relative flex items-center gap-2">
                <button
                  onClick={handlePollToggle}
                  className="text-gray-400 dark:bg-neutral-900 "
                >
                  <BiMenuAltLeft size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center ml-1 mt-1">
          {RenderProfilePic("w-6 h-6")}

          <textarea
            className="w-full font-gray-500 rounded-lg resize-none outline-none dark:text-white dark:bg-neutral-900"
            rows={1}
            placeholder="Add to thread..."
            onClick={handlePostClick}
          />
        </div>
        <div className=" mt-2 relative flex flex-row gap-5 items-center justify-between md:justify-between md:gap-4 md:top-0 bottom-0 top-80  ">
          <div className="">
            <button
              onClick={handleDropdownToggle}
              className="text-gray-400 dark:bg-neutral-900"
            >
              {dropdownOption}
            </button>
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className={` md:top-[-300%] absolute md:left-0 md:mt-2 md:border md:w-64 md:p-2 top-10 left-0 mt-2 border rounded-2xl hover:bg-gray-300 bg-white border-stone-200 dark:bg-neutral-900 dark:border-gray-800`}
              >
                <button
                  onClick={() =>
                    handleDropdownOptionSelect("Anyone can reply & quote")
                  }
                  className="block text-left items-left w-full p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-stone-800"
                >
                  Anyone
                </button>
                <button
                  onClick={() =>
                    handleDropdownOptionSelect("Profiles you follow can reply")
                  }
                  className="block text-left items-left w-full p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-stone-800"
                >
                  Profiles you follow
                </button>
                <button
                  onClick={() =>
                    handleDropdownOptionSelect(
                      "Profiles you mentioned can reply"
                    )
                  }
                  className="block text-left w-full p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-stone-800"
                >
                  Mentioned Only
                </button>
              </div>
            )}
          </div>

          <div className="flex i md:justify-between md:gap-4 ">
            <button
              className="border border-gray-100  px-4 py-2 rounded-xl dark:border-neutral-700  "
              onClick={handlePostClick}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-60  ">
          <div className="bg-white p-4 rounded-2xl shadow-lg w-[400px] md:w-full max-w-[290px] h-28 text-center dark:bg-black dark:border  dark:border-gray-800">
            <h2 className="font-bold text-black dark:text-white">
              Discard thread ?
            </h2>
            <div className="mt-8 flex justify-around   ">
              <button
                onClick={handleConfirmationCancel}
                className="text-black dark:text-white "
              >
                Cancel
              </button>
              <button
                onClick={handleDiscardClick}
                className=" font-bold text-red-500 dark:text-red-600 "
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
