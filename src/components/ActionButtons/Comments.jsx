import Modal from "../Modal";
import { useApp } from "../../AppContext";
import { IoArrowBack } from "react-icons/io5";
import FilePicker from "../Picker/FilePicker";
import { RenderProfilePic } from "../FeedItem";
import { fetchPostDetails, supabase } from "../../supabaseClient";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useRef } from "react";
import DropdownPostButton from "../Picker/DropdownComponent";
import { Avatar, Comment, ActionButton } from "../../../lib/data/Icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const addComment = async (commentData) => {
  const {
    postId,
    commentText,
    user_id,
    profileUrl,
    userName,
    postAuthor,
    selectedFile,
  } = commentData;

  let fileUrl = null;

  if (selectedFile) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("Comment_pictures")
      .upload(`files/${selectedFile.name}`, selectedFile);

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from("Comment_pictures")
      .getPublicUrl(uploadData.path);

    fileUrl = publicUrlData.publicUrl;
  }

  const { error: commentError } = await supabase.from("Comments").insert({
    post_id: postId,
    comment_text: commentText,
    user_id: user_id,
    profile_pic: profileUrl || "",
    username: userName || "",
    reply_to_user: postAuthor,
    file_url: fileUrl,
  });
  if (commentError) throw commentError;

  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("comment_count")
    .eq("post_id", postId)
    .single();

  if (fetchError) throw fetchError;

  const newCommentCount = (post.comment_count || 0) + 1;

  const { error: postError } = await supabase
    .from("posts")
    .update({ comment_count: newCommentCount })
    .eq("post_id", postId);

  if (postError) throw postError;
};

export default function Comments({ postId }) {
  const { userDetails } = useApp();
  const [file, setFile] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const commentFormRef = useRef(null);
  const dropdownRef = useRef(null);

  const queryClient = useQueryClient();
  const { data: postDetails, isError } = useQuery({
    queryKey: ["postDetails", postId],
    queryFn: () => fetchPostDetails(postId),
    enabled: !!postId,
  });

  const { mutate: submitComment } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["postDetails", postId]);
      queryClient.invalidateQueries(["posts"]);

      setCommentText("");
      setSelectedFile(null);
      setImagePreviewUrl(null);
      setIsUploading(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setIsCommentFormVisible(false);
      }, 2000);
    },
    onError: (error) => {
      console.error("Error submitting comment:", error);
      setIsUploading(false);
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSelectedFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmitComment = () => {
    if (!userDetails) {
      console.error("User not logged in.");
      return;
    }

    if (!commentText.trim() && !selectedFile) {
      alert("Please enter a comment or select a file.");
      return;
    }

    setIsUploading(true);

    submitComment({
      postId,
      commentText,
      user_id: userDetails.user_id,
      profileUrl: userDetails.profile_url,
      userName: userDetails.user_name,
      postAuthor: postDetails?.post_author,
      selectedFile: selectedFile,
    });
  };

  const GoBack = () => {
    setCommentText("");
    setSelectedFile(null);
    setIsCommentFormVisible(false);
  };
  const toggleCommentForm = () => {
    setIsCommentFormVisible((prev) => !prev);
  };

  return (
    <div>
      <div
        className="flex items-center w-fit hover:bg-stone-300 cursor-pointer dark:hover:bg-slate-900 rounded-full p-1"
        onClick={toggleCommentForm}
      >
        <ActionButton
          Icon={Comment}
          info={postDetails?.comment_count || null}
        />
      </div>

      <Modal isOpen={isCommentFormVisible}>
        <div
          className="overflow-y-auto md:max-h-[360px] max-h-[400px]"
          ref={commentFormRef}
        >
          <div className="flex items-start gap-x-24 ">
            <button className="text-xl p-1">
              <IoArrowBack size={24} onClick={GoBack} />
            </button>
            <h1 className="md:hidden text-lg font-semibold ">Reply</h1>
          </div>
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
                <p>{userDetails?.user_name}</p>
                <textarea
                  className="dark:bg-neutral-900 bg-white text-black dark:text-white resize-none outline-none"
                  placeholder={`Reply to ${postDetails?.post_author || ""}`}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="ml-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-2 ml-8">
                {imagePreviewUrl && (
                  <div className="relative w-full flex justify-center">
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className="w-full max-w-[450px] object-contain rounded-md"
                    />
                    <button
                      className="absolute top-2 right-2 bg-black/80 text-white rounded-full p-2"
                      onClick={() => setImagePreviewUrl(null)}
                      aria-label="Remove preview"
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex mt-2 ml-8 flex-row items-center gap-2">
              <FilePicker handleFileChange={handleFileChange} />
            </div>
          </div>
        </div>

        <div className="flex flex-row md:gap-x-52 md:p-4 ">
          <DropdownPostButton />
          <div className="flex md:justify-between md:gap-4 ">
            <button
              onClick={handleSubmitComment}
              className={`border border-gray-300 md:px-4 md:py-2 px-3 py-1 rounded-xl dark:border-neutral-700 mt-14 md:mt-0 ${
                !commentText.trim() && !selectedFile
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={!commentText.trim() && !selectedFile}
            >
              Post
            </button>
          </div>
        </div>

        {isUploading && (
          <div className="message">Uploading your comment...</div>
        )}

        {isSuccess && (
          <div className="message">Comment successfully added!</div>
        )}
      </Modal>
    </div>
  );
}
