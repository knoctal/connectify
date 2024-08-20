import { BsBoxArrowUpRight } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Account() {
  return (
    <div className="flex flex-col gap-2">
      <div className="settings-pah-m-styles">
        <h2>Websites permissions</h2>
        <MdKeyboardArrowRight />
      </div>
      <div className="settings-pah-m-styles">
        <h2>Deactivate or delete profile</h2>
        <MdKeyboardArrowRight />
      </div>
      <div className="settings-pah-m-styles">
        <h2>Fediverse sharing</h2>
        <MdKeyboardArrowRight />
      </div>
      <div className="border border-b"></div>
      <div>
        <h1>Other privacy settings</h1>
      </div>
      <div className="settings-pah-m-styles">
        <h2>Personal information</h2>
        <BsBoxArrowUpRight />
      </div>
      <div className="settings-pah-m-styles">
        <h2>Supervision</h2>
        <BsBoxArrowUpRight />
      </div>
      <div className="settings-pah-m-styles">
        <h2>Security</h2>
        <BsBoxArrowUpRight />
      </div>
      <div className="settings-pah-m-styles">
        <h2>Account status</h2>
        <BsBoxArrowUpRight />
      </div>
      <div className="settings-pah-m-styles">
        <h2>Download your information</h2>
        <BsBoxArrowUpRight />
      </div>
      <div className="settings-pah-m-styles">
        <h2>Transfer your information</h2>
        <BsBoxArrowUpRight />
      </div>
    </div>
  );
}
