import EmojiPicker from "emoji-picker-react";
import { BsFiletypeGif } from "react-icons/bs";

export default function EmojiPickerComponent({
  showEmojiPicker,
  handleEmojiClick,
  setShowEmojiPicker,
  emojiPickerRef,
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center gap-2 h-auto">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-gray-400"
        >
          <BsFiletypeGif size={19} />
        </button>
        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            className="absolute   dark:bg-black "
            style={{ bottom: "100%", left: 0, width: "200px", height: "200px" }}
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
}
