import { BsBoxArrowUpRight } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Help() {
  return (
    <div className="flex flex-col gap-2">
      <div className="settings-pah-m-styles">
        <h2>Privacy and security help</h2>
        <MdKeyboardArrowRight />
      </div>
      <div className="settings-pah-m-styles">
        <h2>Support requests</h2>
        <MdKeyboardArrowRight />
      </div>
      <div className="border border-b"></div>
      <div className="settings-pah-m-styles">
        <h2>Help Center</h2>
        <BsBoxArrowUpRight />
      </div>
      <div className="settings-pah-m-styles">
        <h2>Knoctals Privacy Policy</h2>
        <BsBoxArrowUpRight />
      </div>
      <div className="settings-pah-m-styles">
        <h2>Knoctals Terms of Use</h2>
        <BsBoxArrowUpRight />
      </div>
      <div className="settings-pah-m-styles">
        <h2>Connectify Supplemental Privacy Policy</h2>
        <BsBoxArrowUpRight />
      </div>
      <div className="settings-pah-m-styles">
        <h2>Connectify Terms of Use</h2>
        <BsBoxArrowUpRight />
      </div>
      <div className="settings-pah-m-styles">
        <h2>Cookies Policy</h2>
        <BsBoxArrowUpRight />
      </div>
      <div className="settings-pah-m-styles">
        <h2>Fediverse Guide</h2>
        <BsBoxArrowUpRight />
      </div>
    </div>
  );
}
