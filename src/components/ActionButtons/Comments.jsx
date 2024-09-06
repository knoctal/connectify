import Modal from "../Modal";
import { useApp } from "../../AppContext";
import PollComponent from "../Picker/Poll";
import { IoArrowBack } from "react-icons/io5";
import FilePicker from "../Picker/FilePicker";
import { RenderProfilePic } from "../FeedItem";
import { BiMenuAltLeft } from "react-icons/bi";
import { supabase } from "../../supabaseClient";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import EmojiPickerComponent from "../Picker/EmojiPicker";
import DropdownPostButton from "../Picker/DropdownComponent";
import { Avatar, Comment, ActionButton } from "../../../lib/data/Icons";

export default function Comments({ postId }) {
  const { userDetails } = useApp();
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [pollData, setPollData] = useState(null);
  const [showPoll, setShowPoll] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [postDetails, setPostDetails] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dropdownValue, setDropdownValue] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pollOptions, setPollOptions] = useState(["Yes", "No"]);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  const pollRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const userName = userDetails?.user_name;

  const handlePollToggle = () => setShowPoll((prev) => !prev);
  const handleEmojiClick = (emoji) => setCommentText((prev) => prev + emoji);
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

  const fetchUserAndPostDetails = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      setUser(user);

      const { data: postData, error: postError } = await supabase
        .from("posts")
        .select("*")
        .eq("post_id", postId)
        .single();

      if (postError) throw postError;

      if (!postData) {
        console.error("No post found for the provided postId:", postId);
      } else {
        setPostDetails(postData);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const handleSubmitComment = async () => {
    if (!user) {
      console.error("User not logged in.");
      return;
    }

    try {
      const { error } = await supabase.from("comments").insert({
        post_id: postId,
        comment_text: commentText,
        user_id: user.id,
        profile_pic: user.user_metadata?.profile_url || "",
        username: user.user_metadata?.user_name || "",
        reply_to_user: postDetails?.post_author,
        file_url: selectedFile,
        poll: pollData,
      });
      if (error) throw error;

      // Reset fields after successful comment submission
      setCommentText("");
      setSelectedFile(null);
      setPollData(null);
      setDropdownValue("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const toggleCommentForm = () => {
    setIsCommentFormVisible((prev) => !prev);
    if (!postDetails) {
      fetchUserAndPostDetails();
    }
  };

  return (
    <div>
      <div
        className="flex items-center w-fit hover:bg-stone-300 cursor-pointer dark:hover:bg-slate-900 rounded-full p-1"
        onClick={toggleCommentForm}
      >
        <ActionButton Icon={Comment} info={null} />
      </div>

      <Modal isOpen={isCommentFormVisible}>
        <div className="overflow-y-auto max-h-[370px]">
          <button className="text-xl p-1">
            <IoArrowBack
              size={24}
              onClick={() => setIsCommentFormVisible(false)}
            />
          </button>
          <div className="flex flex-row p-2">
            {postDetails && (
              <>
                {postDetails.profile_author ? (
                  <img
                    src={postDetails.profile_author}
                    alt="Profile"
                    className="rounded-full w-10 h-10 object-cover"
                  />
                ) : (
                  <Avatar size={30} className="rounded-full w-10 h-10" />
                )}
                <div className="flex flex-col gap-1 ml-2">
                  <h4>{postDetails.post_author}</h4>
                  <p>{postDetails.post_text}</p>
                </div>
              </>
            )}
          </div>
          <div className="relative mt-1 w-full flex justify-center ">
            {postDetails?.post_image && (
              <img
                src={postDetails?.post_image}
                className="w-full max-w-[450px] object-contain rounded-md"
                alt="Post"
              />
            )}
          </div>
          <div className="flex items-center">
            <div className="flex gap-2 items-center p-0 m-0">
              {RenderProfilePic("w-10 h-10")}
              <div className="flex flex-col mt-5">
                <p>{userName}</p>
                <textarea
                  className="bg-neutral-900 text-white resize-none outline-none"
                  placeholder={`Reply to ${postDetails?.post_author || ""}`}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="ml-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                {imagePreviewUrl && (
                  <div className="relative w-full flex justify-center">
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className="w-full max-w-[450px] object-contain rounded-md"
                    />
                    <button
                      className="absolute right-0 bg-black/80 text-white rounded-full p-2"
                      onClick={() => setImagePreviewUrl(null)}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {showPoll && (
              <PollComponent
                pollOptions={pollOptions}
                setPollOptions={setPollOptions}
                pollRef={pollRef}
              />
            )}

            <div className="flex mt-2 ml-8 flex-row items-center gap-2">
              <EmojiPickerComponent
                showEmojiPicker={showEmojiPicker}
                handleEmojiClick={handleEmojiClick}
                setShowEmojiPicker={setShowEmojiPicker}
                emojiPickerRef={emojiPickerRef}
              />
              <FilePicker handleFileChange={handleFileChange} />
              <button
                onClick={handlePollToggle}
                className="text-gray-400 dark:bg-neutral-900"
              >
                <BiMenuAltLeft size={22} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-x-52 p-4 ">
          <DropdownPostButton />
          <div className="flex  md:justify-between md:gap-4 ">
            <button
              className={`border border-gray-300 md:px-4 md:py-2 px-3 py-1  rounded-xl dark:border-neutral-700 mt-48 md:mt-0
                `}
            >
              Post
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
