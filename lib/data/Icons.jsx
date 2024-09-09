import { GoHome } from "react-icons/go";
import { CiLight } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { VscPinned } from "react-icons/vsc";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoMoonOutline } from "react-icons/io5";
import { GoPaperAirplane } from "react-icons/go";
import { VscHeartFilled } from "react-icons/vsc";
import { AiOutlineRetweet } from "react-icons/ai";
import { MdOutlineModeComment } from "react-icons/md";
import { FaRegHeart, FaRegUser, FaRegEdit } from "react-icons/fa";

export function Post() {
  return <FaRegEdit size={26} color="gray" />;
}

export function Home() {
  return <GoHome size={30} color="gray" />;
}

export function Light() {
  return <CiLight size={25} color="gray" />;
}

export function Search() {
  return <FiSearch size={30} color="gray" />;
}
export function SimpleRepost({ ...rest }) {
  return <AiOutlineRetweet size={20} {...rest} color="gray" />;
}
export function FilledRepost({ ...rest }) {
  return <AiOutlineRetweet size={20} {...rest} color="green" />;
}
export function Pinned() {
  return <VscPinned size={30} color="gray" />;
}

export function Profile() {
  return <FaRegUser size={24} color="gray" />;
}

export function Dark() {
  return <IoMoonOutline size={25} color="gray" />;
}
export function Menu() {
  return <BiMenuAltLeft size={35} color="gray" />;
}

export function Avatar({ ...rest }) {
  return <CgProfile size={20} {...rest} color="gray" />;
}

export function HeartOutline({ ...rest }) {
  return <FaRegHeart size={20} {...rest} color="gray" />;
}

export function Share({ ...rest }) {
  return <GoPaperAirplane size={20} {...rest} color="gray" />;
}

export function Comment({ ...rest }) {
  return <MdOutlineModeComment size={20} {...rest} color="gray" />;
}

export function RedHeart() {
  return <VscHeartFilled size={20} color="red" />;
}

export function ActionButton({ Icon, info }) {
  return (
    <div className="flex cursor-pointer font-extralight text-base text-gray-400 items-center gap-1">
      <Icon size={35} className="p-2" /> <div>{info}</div>
    </div>
  );
}
