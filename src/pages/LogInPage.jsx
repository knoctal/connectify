import { useState } from "react";
import { useApp } from "../AppContext";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { FaConnectdevelop, FaSpinner } from "react-icons/fa";

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
    <div className=" flex flex-col items-center justify-center min-h-screen md:min-h-screen relative  bg-slate-50 dark:bg-gray-950 text-black object-cover dark:text-white ">
      <div className="block md:hidden">
        <FaConnectdevelop size={40} />
      </div>
      <div className="top-0 ml-[-70vh] mt-[-12vh] absolute z-0 md:block hidden object-cover">
        <img src="/Back-Image.webp" alt="Front" className="object-cover" />
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
            className="input"
          />
          <input
            type="password"
            id="password-input"
            name="password"
            placeholder="Password"
            className="input   "
          />

          <button
            className="text-gray-300 flex items-center justify-center bg-black h-14 w-72 rounded-xl p-2 md:h-14 md:w-80 md:rounded-xl md:p-4 dark:bg-white dark:text-gray-800"
            type="submit"
          >
            {loading ? (
              <FaSpinner className="animate-spin dark:text-black " size={15} />
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
        <div className="bg-gray-200 h-14 w-72 rounded-xl p-2 flex flex-row gap-2 justify-center md:h-14 md:w-80 md:rounded-md md:p-4 md:justify-between">
          <h5 className="dark:text-black">Don&apos;t have an account?</h5>
          <Link to="/Signup">
            <h4 className="text-blue-500">Sign Up</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}
