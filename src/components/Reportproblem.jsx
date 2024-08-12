import React, { useState, useEffect, useContext } from "react";
import { GrAttachment } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useApp } from "../AppContext";

export default function () {
  const navigate = useNavigate();

  const { theme, setTheme } = useApp();
  const [showMessage, setShowMessage] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (redirect) {
      navigate("/Home");
    }
  }, [redirect, navigate]);

  function handleOut() {
    setRedirect(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    document.getElementById("txt-area").value = "";
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setRedirect(true);
    }, 3000);
  }

  function handleAttachmentClick() {
    const fileInput = document.getElementById("file-input");
    if (fileInput) {
      fileInput.click();
    }
  }

  return (
    <>
      <div className="h-svh w-full flex flex-col justify-center items-center dark:bg-black dark:text-white">
        <div className="absolute top-10 left-10">
          <RxCross2 onClick={handleOut} />
        </div>
        <div className="flex flex-col h-[380px] w-[500px] items-center justify-center gap-4">
          <h1 className="font-bold text-lg">Report a problem</h1>
          <form
            className="flex flex-col h-60 w-[400px] gap-3 rounded-xl p-3 border-t shadow-md"
            onSubmit={handleSubmit}
          >
            <textarea
              name=""
              id="txt-area"
              placeholder="Please include as many details as possible.."
              rows={10}
              className="p-3 rounded-md outline-none resize-none dark:bg-transparent dark:text-white "
            />
            <div className="flex items-center justify-between p-1 rounded-md ">
              <GrAttachment
                onClick={handleAttachmentClick}
                className="cursor-pointer"
              />
              <input type="file" id="file-input" className="hidden" />
              <button
                type="submit"
                className="h-8 w-20 rounded-md border border-gray-200"
              >
                Submit
              </button>
            </div>
          </form>
          {showMessage && (
            <div className="message">
              Your report has been submitted successfully!
            </div>
          )}
        </div>
      </div>
    </>
  );
}
