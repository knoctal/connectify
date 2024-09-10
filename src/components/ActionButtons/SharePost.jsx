import React from "react";
import { Share, ActionButton } from "../../../lib/data/Icons";

export default function SharePost({ postUrl }) {
  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this post!",
          url: postUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(postUrl);
        alert("Link copied to clipboard");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <div
      onClick={handleShareClick}
      className="flex items-center w-fit hover:bg-stone-300 cursor-pointer dark:hover:bg-slate-900 rounded-full p-1"
    >
      <ActionButton Icon={Share} info={null} />
    </div>
  );
}
