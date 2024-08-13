import { useState } from "react";
import { Link } from "react-router-dom";
import { FaConnectdevelop } from "react-icons/fa";
import { supabase } from "../supabaseClient";

export default function Signup() {
  const [message, setMessage] = useState({
    type: "",
    content: "",
    visible: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage({ type: "", content: "", visible: false });

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        setMessage({ type: "error", content: error.message, visible: true });
      } else {
        console.log("User signed up successfully:", data);
        setMessage({
          type: "success",
          content:
            "Signup successful! Please check your email to confirm your account.",
          visible: true,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        content: "An unexpected error occurred. Please try again.",
        visible: true,
      });
    } finally {
      setTimeout(() => setMessage({ ...message, visible: false }), 3000);
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center">
      <div className="block md:hidden">
        <FaConnectdevelop size={40} />
      </div>
      <div className="flex flex-col items-center gap-2 md:w-2/5 min-h-1 md:min-h-[90svh] p-5 mt-4">
        <h1 className="font-bold p-2 text-2xl">SignUp</h1>
        {message.visible && (
          <div className="message">{message.content || message.type}</div>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" className="input" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
          />
          <button
            className="md:h-14 md:w-80 md:rounded-md md:p-4 text-gray-300 bg-black h-14 w-72 rounded-xl p-2"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center w-auto mt-4">
          <hr className="border-t border-gray-300 w-32" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="border-t border-gray-300 w-32" />
        </div>
        <div className="md:h-14 md:w-80 md:rounded-md md:p-4 md:justify-between bg-gray-200 h-14 w-72 rounded-xl p-2 flex flex-row gap-2 justify-center">
          <h5>Already have an account?</h5>
          <Link className="text-blue-500" to="/">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}