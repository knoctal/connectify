import { useApp } from "../AppContext";
import { useNavigate } from "react-router";
import { Avatar } from "../../lib/data/Icons";
import Like from "./ActionButtons/Like";
import Comments from "./ActionButtons/Comments";
import SharePost from "./ActionButtons/SharePost";

export const RenderProfilePic = (
  size = "w-10 h-10",
  handleImageClick = null
) => {
  const { userDetails } = useApp();

  const profilePic = userDetails?.profile_url;
  return profilePic ? (
    <img
      src={profilePic}
      alt="Profile"
      onClick={handleImageClick}
      className={`rounded-full object-cover ${size}`}
    />
  ) : (
    <Avatar
      size={30}
      onClick={handleImageClick}
      className={`rounded-full object-cover ${size}`}
    />
  );
};

export default function FeedItems({ filterByUser = false, userId = null }) {
  const { userPosts, userDetails } = useApp();
  const navigate = useNavigate();

  const currentUserId = userDetails?.user_id;
  const PostClicked = (postId) => {
    navigate(`/feed/${postId}`);
  };

  // Filter posts if `filterByUser` is true
  const displayedPosts = filterByUser
    ? userPosts.filter((post) => post.user_id === currentUserId)
    : userPosts;

  return (
    <div>
      <div className="mt-4 flex flex-col gap-4 md:p-4">
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => (
            <div key={post.post_id} className="flex flex-col gap-4">
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
                    onClick={() => PostClicked(post.post_id)}
                  >
                    {post.post_text}
                  </p>
                </div>
              </div>
              <div className="flex ml-10 flex-col gap-1">
                {post.post_image && (
                  <img
                    src={post.post_image}
                    alt="Post Image"
                    className="rounded-md w-full"
                    onClick={() => PostClicked(post.post_id)}
                  />
                )}
                <div className="flex items-center gap-1 mt-2">
                  <Like postId={post.post_id} />
                  <Comments postId={post.post_id} />

                  <SharePost
                    postUrl={`https://connectifi.netlify.app/post/${post.post_id}`}
                  />
                </div>
              </div>
              <hr className="border-t border-gray-300 dark:border-t-neutral-800" />
            </div>
          ))
        ) : (
          <div aria-hidden className="grid gap-3 animate-pulse">
            <div className="space-y-2">
              <div className="w-24 h-8 rounded-xl bg-gray-600" />
              <div className="w-full h-8 rounded-xl bg-gray-700" />
            </div>
            <div className="w-full h-[500px] bg-gray-800 rounded-xl" />
          </div>
        )}
      </div>
    </div>
  );
}
