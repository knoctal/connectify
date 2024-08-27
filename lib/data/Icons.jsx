import { CgProfile } from 'react-icons/cg';
import { FaRegHeart } from 'react-icons/fa';
import { GoPaperAirplane } from 'react-icons/go';
import { AiOutlineRetweet } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';
import { MdOutlineModeComment } from 'react-icons/md';

export function Avatar({ ...rest }) {
  return <CgProfile size={20} {...rest} />;
}

export function HeartOutline({ ...rest }) {
  return <CiHeart size={20} {...rest} />;
}

export function Comment({ ...rest }) {
  return <MdOutlineModeComment size={20} {...rest} />;
}
