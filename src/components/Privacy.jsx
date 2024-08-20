import { useState } from "react";
import { CiLock } from "react-icons/ci";
import { BiHide } from "react-icons/bi";
import { GoMention } from "react-icons/go";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { MdKeyboardArrowRight, MdOutlineBlock } from "react-icons/md";

export default function Privacy() {
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="settings-pah-m-styles">
        <div className="flex gap-3 items-center">
          <CiLock size={22} />
          <h2>Private profile</h2>
        </div>
        <button
          className="h-8 w-14 border-none shadow-lg "
          onClick={() => {
            setIsPrivate(!isPrivate);
          }}
        >
          {isPrivate ? "ON" : "OFF"}
        </button>
      </div>
      <div className="settings-pah-m-styles">
        <div className="flex gap-3 items-center">
          <GoMention size={22} />
          <h2>Mentions</h2>
        </div>
        <MdKeyboardArrowRight />
      </div>
      <div className="settings-pah-m-styles">
        <div className="flex gap-3 items-center">
          <BiHide size={22} />
          <h2>Hidden Words</h2>
        </div>
        <div></div>
      </div>
      <div className="border border-b"></div>
      <div>
        <h1>Other privacy settings</h1>
      </div>
      <div className="settings-pah-m-styles">
        <div className="flex gap-3 items-center">
          <MdOutlineBlock size={22} />
          <h2>Blocked profiles</h2>
        </div>
        <BsBoxArrowUpRight />
      </div>
      <div className="settings-pah-m-styles">
        <div className="flex gap-3 items-center">
          <IoHeartDislikeOutline size={22} />
          <h2>Hide like and share counts</h2>
        </div>
        <BsBoxArrowUpRight />
      </div>
    </div>
  );
}
