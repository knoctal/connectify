import { GoHome } from "react-icons/go";
import { CiLight } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { VscPinned } from "react-icons/vsc";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoMoonOutline } from "react-icons/io5";
import { GoPaperAirplane } from "react-icons/go";
import { AiOutlineRetweet } from "react-icons/ai";
import { MdOutlineModeComment } from "react-icons/md";
import { FaRegHeart, FaRegUser, FaRegEdit } from "react-icons/fa";

export function Post() {
  return <FaRegEdit size={26} />;
}

export function Home() {
  return <GoHome size={30} />;
}

export function Light() {
  return <CiLight size={25} />;
}

export function Search() {
  return <FiSearch size={30} />;
}

export function Pinned() {
  return <VscPinned size={30} />;
}

export function Profile() {
  return <FaRegUser size={24} />;
}

export function Dark() {
  return <IoMoonOutline size={25} />;
}
export function Menu() {
  return <BiMenuAltLeft size={35} />;
}

export function Avatar({ ...rest }) {
  return <CgProfile size={20} {...rest} />;
}

export function HeartOutline({ ...rest }) {
  return <FaRegHeart size={20} {...rest} />;
}

export function Share({ ...rest }) {
  return <GoPaperAirplane size={20} {...rest} />;
}
export function Repost({ ...rest }) {
  return <AiOutlineRetweet size={20} {...rest} />;
}

export function Comment({ ...rest }) {
  return <MdOutlineModeComment size={20} {...rest} />;
}

export function ActionButton({ Icon, info }) {
  return (
    <div className="flex cursor-pointer font-extralight text-base text-gray-400 items-center gap-1 py-1.5 px-1 rounded-full hover:bg-slate-800 ">
      <Icon size={25} color="gray" className="p-1" /> <div>{info}</div>
    </div>
  );
}
