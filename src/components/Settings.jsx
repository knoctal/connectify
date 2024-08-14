import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { GoMention } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiHide } from "react-icons/bi";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Privacy from "./Privacy";
import Account from "./Account";
import Help from "./Help";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Settings() {
  const navigate = useNavigate();
  const [isPrivate, setIsPrivate] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(true);
  const [openAccount, setOpenAccount] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [activeBtn, setActiveBtn] = useState("Privacy");

  return (
    <>
      <div className="flex justify-between h-full w-full overflow-hidden dark:text-white dark:bg-black ">
        <Sidebar />
        <div>
          <div className="flex flex-col items-center justify-center gap-5 p-0  ">
            <div className="flex items-center justify-between  h-12 w-[650px] p-3 rounded-lg">
              <div className="flex justify-between items-center w-[600px] ">
                <div>
                  <div className="h-5 w-5 flex items-center rounded-full  border border-gray-400">
                    <IoIosArrowRoundBack
                      onClick={() => {
                        navigate("/Home");
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h2>Settings</h2>
                </div>
                <div></div>
              </div>
            </div>
            {/* for beneath */}
            <div className="flex flex-col gap-2 h-[685px]   w-[650px] p-3 border  rounded-xl border-gray-200  ">
              <div className="h-14 flex justify-around items-center">
                <button
                  type="button"
                  onClick={() => {
                    setActiveBtn("Privacy");
                    setOpenPrivacy(true);
                    setOpenAccount(false);
                    setOpenHelp(false);
                  }}
                  className={`setting-buttons ${
                    activeBtn === "Privacy"
                      ? "text-black border-b-black dark:text-white dark:border-b-white"
                      : ""
                  } `}
                >
                  Privacy
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveBtn("Account");
                    setOpenPrivacy(false);
                    setOpenAccount(true);
                    setOpenHelp(false);
                  }}
                  className={`setting-buttons ${
                    activeBtn === "Account"
                      ? "text-black border-b-black  dark:text-white dark:border-b-white"
                      : ""
                  }`}
                >
                  Account
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveBtn("Help");
                    setOpenPrivacy(false);
                    setOpenAccount(false);
                    setOpenHelp(true);
                  }}
                  className={`setting-buttons ${
                    activeBtn === "Help"
                      ? "text-black border-b-black  dark:text-white dark:border-b-white"
                      : ""
                  }`}
                >
                  Help
                </button>
              </div>
              <div className="">
                {openPrivacy && <Privacy />}
                {openAccount && <Account />}
                {openHelp && <Help />}
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
