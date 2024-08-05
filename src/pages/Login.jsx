import { Link } from "react-router-dom";
import { FaConnectdevelop } from "react-icons/fa";
import { useContext, useState } from "react";
import { supabase } from "../supabaseClient";
import AppContext from "../AppContext";

export default function LogIn() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [confirmMessage, setConfirmMessage] = useState("");

  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    confirmMessage,
    setConfirmMessage,
  } = useContext(AppContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        setError(error.message);
        console.error("Sign up error:", error.message);
      } else {
        console.log("User signed in successfully:", data);
        setConfirmMessage("Signin successful!");
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
      setError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="bg-slate-50 flex flex-col items-center justify-center min-h-screen md:min-h-screen relative">
      <div className="block md:hidden ">
        <FaConnectdevelop size={40} />
      </div>

      <div className="absolute  -top-20 left-[-480px] -right-0 h-14 z-0 md:block hidden ">
        <img src="/frontPic.webp" alt="Front" />
      </div>
      <div className=" flex flex-col items-center justify-center gap-4 z-10 md:w-2/5 md:min-h-[90svh] mr-2">
        <h1 className="font-bold text-xl md:block">LogIn</h1>
        <form
          className="flex flex-col items-center gap-2 md:gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your Email"
            className="input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className=" text-gray-300 bg-black h-14 w-72 rounded-xl p-2 md:h-14 md:w-80 md:rounded-md md:p-4"
            type="submit"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {confirmMessage && <p className="text-green-500">{confirmMessage}</p>}
        <h4 className="text-gray-400 text-center">Forgot password?</h4>
        <div className="flex items-center w-auto mt-4">
          <hr className="border-t border-gray-300 w-32" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="border-t border-gray-300 w-32" />
        </div>
        <div className=" bg-gray-200 h-14 w-72 rounded-xl p-2 flex flex-row gap-2 justify-center md:h-14 md:w-80 md:rounded-md md:p-4 md:justify-between">
          <h5>Don&apos;t have an account?</h5>
          <Link to="/Signup">
            <h4 className="text-blue-500">Sign Up</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}
