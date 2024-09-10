import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import Sidebar from "../components/Sidebar";
import Like from "../components/ActionButtons/Like";
import Comments from "../components/ActionButtons/Comments";
import SharePost from "../components/ActionButtons/SharePost";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { Avatar, ActionButton } from "../../lib/data/Icons";
import { useApp } from "../AppContext";
import { fetchComments } from "../supabaseClient";

export default function FeedPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userPosts, userDetails } = useApp(); // Get current user from context
  const [post, setPost] = useState(null);

  const { data: comments, refetch } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  });

  const deleteMutation = useMutation({
    mutationFn: async (commentId) => {
      // Start a transaction to ensure atomicity
      const { data: post, error: fetchError } = await supabase
        .from("posts")
        .select("comment_count")
        .eq("post_id", postId)
        .single();

      if (fetchError) throw fetchError;

      const newCommentCount = Math.max((post.comment_count || 0) - 1, 0); // Prevent negative count

      const { error: deleteError } = await supabase
        .from("Comments")
        .delete()
        .eq("comment_id", commentId);

      if (deleteError) throw deleteError;

      const { error: updateError } = await supabase
        .from("posts")
        .update({ comment_count: newCommentCount })
        .eq("post_id", postId);

      if (updateError) throw updateError;
    },
    onSuccess: () => {
      // Refetch comments and post details after deletion
      queryClient.invalidateQueries(["comments", postId]);
      queryClient.invalidateQueries(["postDetails", postId]);
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });

  useEffect(() => {
    const fetchPost = () => {
      const foundPost = userPosts.find(
        (post) => parseInt(post.post_id) === parseInt(postId)
      );
      setPost(foundPost);
    };

    fetchPost();
  }, [postId, userPosts]);

  return (
    <div className="relative min-h-screen dark:bg-black dark:text-white">
      <Sidebar />
      <div className="centered-div mt-0 bg-white dark:bg-black dark:text-white">
        <div className="md:fixed md:flex md:flex-col items-center justify-center top-8 left-0 right-0 mt-4 dark:bg-black dark:text-white">
          <div className="flex mt-8 justify-between gap-x-24 w-fit items-start md:mt-0  md:gap-x-64 md:mr-72">
            <div>
              <IoIosArrowRoundBack
                size={25}
                onClick={() => navigate("/home")}
              />
            </div>
            <h2 className=" md:mt-0 text-black dark:text-white font-semibold">
              Thread
            </h2>
          </div>
          <div className="width-height mt-0 p-5">
            {post && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  {post.profile_author ? (
                    <img
                      src={post.profile_author}
                      alt="Profile"
                      className="rounded-full w-10 h-10 object-cover"
                    />
                  ) : (
                    <Avatar size={30} className="rounded-full w-10 h-10" />
                  )}

                  <div className="flex flex-col">
                    <h3>{post.post_author}</h3>
                    <p
                      className="whitespace-pre-wrap"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {post.post_text}
                    </p>
                  </div>
                </div>
                <div className="md:ml-8 ml-5 flex w-full">
                  {post.post_image && (
                    <img
                      src={post.post_image}
                      alt="Post Image"
                      className="rounded-md w-full"
                    />
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Like postId={post.post_id} />
                  <Comments postId={post.post_id} />
                  <SharePost
                    postUrl={`https://connectifi.netlify.app/post/${post.post_id}`}
                  />
                </div>
              </div>
            )}
            <div className="mt-5">
              <h3 className="font-semibold">Comments</h3>
              <hr className="mt-2 border-t border-gray-300 dark:border-t-neutral-800" />
              <div className="flex flex-col gap-4 mt-2">
                {comments &&
                  comments.map((comment) => (
                    <div
                      key={comment.comment_id}
                      className="flex flex-col gap-2 p-1 rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        {comment.profile_pic ? (
                          <img
                            src={comment.profile_pic}
                            alt="Profile"
                            className="rounded-full w-8 h-8 object-cover"
                          />
                        ) : (
                          <Avatar size={24} className="rounded-full w-8 h-8" />
                        )}
                        <div className="flex flex-col">
                          <h4 className="font-semibold">{comment.username}</h4>
                          <p>{comment.comment_text}</p>
                        </div>
                      </div>
                      <div className="ml-8">
                        {comment.file_url && (
                          <img
                            src={comment.file_url}
                            alt="Comment Image"
                            className="rounded-md w-full"
                          />
                        )}
                      </div>
                      {comment.user_id === userDetails.user_id && (
                        <button
                          onClick={() =>
                            deleteMutation.mutate(comment.comment_id)
                          }
                          className="text-white-500 ml-auto"
                        >
                          <MdDeleteForever color="gray" size={20} />
                        </button>
                      )}

                      <hr className="mt-2 border-t border-gray-300 dark:border-t-neutral-800" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
