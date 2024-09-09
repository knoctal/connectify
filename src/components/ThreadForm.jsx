import { useApp } from "../AppContext";
import FilePicker from "./Picker/FilePicker";
import { useUploadPost } from "./UploadPost";
import { RenderProfilePic } from "./FeedItem";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import EmojiPickerComponent from "./Picker/EmojiPicker";
import DropdownPostButton from "./Picker/DropdownComponent";

export default function ThreadForm({ toggleForm }) {
  const [file, setFile] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { threadText, setThreadText, userDetails } = useApp();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const formRef = useRef(null);
  const textareaRef = useRef(null);
  const dropdownRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const uploadPost = useUploadPost(toggleForm);
  const userName = userDetails?.user_name;
  const [uploadStatus, setUploadStatus] = useState("");

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
    setUploadStatus("Uploading...");
    setShowUpload(true);

    if (!file) {
      setFile(null);
    }
    uploadPost.mutate(
      { file, threadText },

      {
        onSuccess: () => {
          setUploadStatus("Post uploaded successfully!");
          setTimeout(() => setUploadStatus(""), 9000); // Clear the status after 3 seconds
          setThreadText("");
          setFile(null);
        },
        onError: (error) => {
          console.error("Error during post creation:", error);
          setUploadStatus(`Error: ${error.message}`);
          setTimeout(() => setUploadStatus(""), 3000); // Clear the status after 3 seconds
        },
      }
    );
  };

  const handleEmojiClick = (emojiObject) => {
    setThreadText((prevText) => prevText + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleOutsideClick = (e) => {
    if (
      formRef.current &&
      !formRef.current.contains(e.target) &&
      (!emojiPickerRef.current || !emojiPickerRef.current.contains(e.target)) &&
      (!dropdownRef.current || !dropdownRef.current.contains(e.target))
    ) {
      setShowConfirmation(true); // Show confirmation when clicking outside
    } else if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(e.target)
    ) {
      setShowEmojiPicker(false);
    } else if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
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
      className={`fixed  inset-0 flex flex-col items-center justify-center md:bg-black md:bg-opacity-70 z-50  bg-neutral-900  ${"md:h-auto"}`}
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
        className={`bg-white p-6  md:rounded-2xl md:shadow-lg md:w-full md:max-w-[620px] dark:text-white dark:bg-neutral-900 dark:border dark:border-gray-800 ${"md:h-[250px]"}  w-full h-full md:h-fit flex flex-col `}
      >
        <div className="flex gap-2 mb-1  overflow-y-auto max-h-[400px]">
          {RenderProfilePic("w-10 h-10")}

          <div className="flex flex-col m-0 p-0 items-start flex-grow ">
            <h4 className="font-semibold">{userName}</h4>

            <div className="md:w-[500px] ">
              <textarea
                ref={textareaRef}
                className="w-full font-gray-500 rounded-lg overflow-hidden resize-none outline-none dark:text-white dark:bg-neutral-900"
                placeholder="Start a thread..."
                value={threadText}
                onChange={handleTextChange}
              />
            </div>
            <div className="flex items-center gap-2  ">
              <div className="flex gap-2 ">
                {imagePreviewUrl && (
                  <div className="relative  w-full flex justify-center ">
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className="w-full max-w-[450px] object-contain rounded-md"
                    />
                    <button
                      className="absolute right-0 bg-black/80  text-white rounded-full p-2"
                      onClick={() => setImagePreviewUrl(null)}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex mt-2 flex-row  items-center gap-2 ">
              <div>
                <EmojiPickerComponent
                  showEmojiPicker={showEmojiPicker}
                  handleEmojiClick={handleEmojiClick}
                  setShowEmojiPicker={setShowEmojiPicker}
                  emojiPickerRef={emojiPickerRef}
                />
              </div>
              <FilePicker handleFileChange={handleFileChange} />
              <div>
                <div className=" flex items-center gap-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center ml-1 mt-1">
          {RenderProfilePic("w-6 h-6")}

          <textarea
            className="w-300px font-gray-500 rounded-lg resize-none outline-none dark:text-white dark:bg-neutral-900"
            rows={1}
            placeholder="Add to thread..."
            onClick={handlePostClick}
          />
        </div>
        <div className="mt-2 relative flex flex-row items-center justify-between md:justify-between md:gap-4 md:top-0 md:bottom-0 ">
          <DropdownPostButton />
          <div className="flex  md:justify-between md:gap-4 ">
            <button
              className={`border border-gray-300 md:px-4 md:py-2 px-3 py-1  rounded-xl dark:border-neutral-700 mt-48 md:mt-0 ${
                !threadText || !file
                  ? "dark:text-white text-black "
                  : "text-gray-500 "
              }`}
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
      {uploadStatus && <div className="message">{uploadStatus}</div>}
    </div>
  );
}
