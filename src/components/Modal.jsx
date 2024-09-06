import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 md:rounded-2xl md:shadow-lg md:w-full md:max-w-[620px] dark:text-white dark:bg-neutral-900 dark:border dark:border-gray-800
                   md:max-h-[80vh] md:px-8 w-full h-full md:h-auto relative focus:outline-none z-[999]"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
