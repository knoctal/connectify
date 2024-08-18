<<<<<<< HEAD
import { useContext, useState } from "react";
=======
import { useState } from "react";
>>>>>>> 8ff739b6af1d6162c3986123a37764aac0612fd4
import { Link, useNavigate } from "react-router-dom";
import { FaConnectdevelop, FaSpinner } from "react-icons/fa";
import { supabase } from "../supabaseClient";
import { useApp } from "../AppContext";

export default function LogIn() {
  const { theme, setTheme } = useApp();
  const [message, setMessage] = useState({
    type: "",
    content: "",
    visible: false,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setMessage({ type: "", content: "", visible: false });
<<<<<<< HEAD
<<<<<<<< HEAD:src/pages/LogInPage.jsx

========
>>>>>>>> 8ff739b6af1d6162c3986123a37764aac0612fd4:src/pages/Login.jsx
=======

>>>>>>> 8ff739b6af1d6162c3986123a37764aac0612fd4
    setLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        setMessage({ type: "error", content: error.message, visible: true });
        document.getElementById("password-input").value = "";
      } else {
        console.log("User logged in:", data);
        setMessage({
          type: "success",
          content: "Logged in successfully!",
          visible: true,
        });
        navigate("/Home");
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
      setMessage({
        type: "error",
        content: "An unexpected error occurred. Please try again.",
        visible: true,
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ ...message, visible: false }), 3000);
    }
  }
  return (
<<<<<<< HEAD
    <div className=" flex flex-col items-center justify-center min-h-screen md:min-h-screen relative  bg-slate-50 dark:bg-black dark:text-white  ">
=======
    <div className=" flex flex-col items-center justify-center min-h-screen md:min-h-screen relative  bg-slate-50 dark:bg-gray-950 text-black dark:text-white ">
>>>>>>> 8ff739b6af1d6162c3986123a37764aac0612fd4
      <div className="block md:hidden">
        <FaConnectdevelop size={40} />
      </div>
      <div className="absolute -top-20 left-[-480px] -right-0 h-14 z-0 md:block hidden">
<<<<<<< HEAD
        <img src="/frontPic.webp" alt="Front" />
=======
        <img src="/frontPic.svg" alt="Front" />
>>>>>>> 8ff739b6af1d6162c3986123a37764aac0612fd4
      </div>
      <div className="flex flex-col items-center justify-center gap-4 z-10 md:w-2/5 md:min-h-[90svh] mr-2">
        <h1 className="font-bold text-xl md:block">Log in</h1>
        {message.visible && (
          <div className="message">
            {message.content ? `${message.content}` : message.type}
          </div>
        )}
        <form
          className="flex flex-col items-center gap-2 md:gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
<<<<<<< HEAD
            className="input "
=======
            className="input"
>>>>>>> 8ff739b6af1d6162c3986123a37764aac0612fd4
          />
          <input
            type="password"
            id="password-input"
            name="password"
            placeholder="Password"
<<<<<<< HEAD
            className="input   "
          />
          <button
<<<<<<<< HEAD:src/pages/LogInPage.jsx
            // className="text-gray-300 bg-black h-14 w-72 rounded-xl p-2 md:h-14 md:w-80 md:rounded-md md:p-4 dark:bg-white dark:text-black"
            // className="text-gray-300 flex items-center justify-center bg-black h-14 w-72 rounded-xl p-2 md:h-14 md:w-80 md:rounded-md md:p-4 dark:bg-white dark:text-black"
========
>>>>>>>> 8ff739b6af1d6162c3986123a37764aac0612fd4:src/pages/Login.jsx
=======
            className="input"
          />
          <button
>>>>>>> 8ff739b6af1d6162c3986123a37764aac0612fd4
            className="text-gray-300 flex items-center justify-center bg-black h-14 w-72 rounded-xl p-2 md:h-14 md:w-80 md:rounded-xl md:p-4 dark:bg-white dark:text-gray-800"
            type="submit"
          >
            {loading ? (
<<<<<<< HEAD
<<<<<<<< HEAD:src/pages/LogInPage.jsx
              <FaSpinner className="animate-spin dark:text-black " size={15} />
========
              <FaSpinner className="animate-spin  " size={15} />
>>>>>>>> 8ff739b6af1d6162c3986123a37764aac0612fd4:src/pages/Login.jsx
=======
              <FaSpinner className="animate-spin dark:text-black " size={15} />
>>>>>>> 8ff739b6af1d6162c3986123a37764aac0612fd4
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <h4 className="text-gray-400 text-center">Forgot password?</h4>
        <div className="flex items-center w-auto mt-4">
          <hr className="border-t border-gray-300 w-32" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="border-t border-gray-300 w-32" />
        </div>
<<<<<<< HEAD
        <div className="bg-gray-200 h-14 w-72 rounded-xl p-2 flex flex-row gap-2 justify-center md:h-14 md:w-80 md:rounded-md md:p-4 md:justify-between dark:bg-black dark:text-white dark:border dark:border-neutral-700">
          <h5 className="">Don&apos;t have an account?</h5>
=======
        <div className="bg-gray-200 h-14 w-72 rounded-xl p-2 flex flex-row gap-2 justify-center md:h-14 md:w-80 md:rounded-md md:p-4 md:justify-between">
          <h5 className="dark:text-black">Don&apos;t have an account?</h5>
>>>>>>> 8ff739b6af1d6162c3986123a37764aac0612fd4
          <Link to="/Signup">
            <h4 className="text-blue-500">Sign Up</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}
