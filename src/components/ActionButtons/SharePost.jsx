import React from "react";
import { Share, ActionButton } from "../../../lib/data/Icons";

export default function SharePost({ postUrl }) {
  const handleShareClick = async () => {
    console.log("Sharing the post...");

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this post!",
          url: postUrl,
        });
        console.log("Post shared successfully");
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
    <div onClick={handleShareClick} style={{ cursor: "pointer" }}>
      <ActionButton Icon={Share} info={null} />
    </div>
  );
}
