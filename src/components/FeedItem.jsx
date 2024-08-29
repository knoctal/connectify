import { useApp } from "../AppContext";
import {
  Avatar,
  Comment,
  HeartOutline,
  Repost,
  Share,
  ActionButton,
} from "../../lib/data/Icons";

export const RenderProfilePic = (
  size = "w-10 h-10",
  handleImageClick = null
) => {
  const { profilePic } = useApp();

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

export default function FeedItems() {
  const { userName, profilePic, userPosts } = useApp();

  return (
    <div>
      {/* Feed items */}
      <div className="mt-4 flex flex-col gap-4 md:p-4">
        {userPosts.length > 0 ? (
          userPosts.map((post, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="rounded-full w-10 h-10 object-cover"
                  />
                ) : (
                  <Avatar size={30} className="rounded-full w-10 h-10" />
                )}
                <h3>{userName}</h3>
              </div>
              <div className="flex flex-col gap-2">
                <p>{post.post_text}</p>
                {post.post_image && (
                  <img
                    src={post.post_image}
                    alt="Post Image"
                    className=" rounded-md w-full"
                  />
                )}
                <div className="flex gap-1 mt-4">
                  <ActionButton Icon={HeartOutline} info={20} />
                  <ActionButton Icon={Comment} info={24} />
                  <ActionButton Icon={Repost} info={24} />
                  <ActionButton Icon={Share} info={null} />
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
