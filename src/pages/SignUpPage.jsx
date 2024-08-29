import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { FaConnectdevelop } from "react-icons/fa";

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
    const username = formData.get("username");
    const fullname = formData.get("fullname");

    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        setMessage({ type: "error", content: error.message, visible: true });
      } else {
        const { user } = data; // Get the user object that includes the user ID

        // Insert only username and user_id into userDetail table
        const { error: insertError } = await supabase
          .from("usersDetails")
          .insert([
            { user_id: user.id, user_name: username, full_name: fullname },
          ]);

        if (insertError) {
          console.error("Insert error:", insertError);
        }

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
    <div className=" flex flex-col items-center justify-center h-screen md:min-h-screen relative  bg-slate-50 dark:bg-neutral-900 text-black object-cover dark:text-white ">
      <div className="block p-4 md:hidden">
        <FaConnectdevelop size={50} />
      </div>
      <div className="flex flex-col items-center gap-2 md:w-2/5 min-h-1 md:min-h-[90svh] p-5 mt-4">
        <h1 className="font-bold p-2 text-2xl">SignUp</h1>
        {message.visible && (
          <div className="message">{message.content || message.type}</div>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Name"
            className="input"
          />
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
            className="md:h-14 md:w-80 md:rounded-md md:p-4 text-gray-300 bg-black h-14 w-72 rounded-xl p-2 dark:bg-white dark:text-black"
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
        <div className="border border-neutral-700 text-xs md:text-sm p-5 w-fit rounded-xl  flex flex-row gap-2 justify-center md:h-14 md:w-80 md:rounded-xl md:p-4 md:justify-between">
          <h5 className=" dark:text-white">Already have an account?</h5>
          <Link to="/">
            <h4 className="text-blue-500">Login</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}
