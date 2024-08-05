import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaConnectdevelop } from "react-icons/fa6";
import { supabase } from "../supabaseClient";
import AppContext from "../AppContext";

export default function Signup() {
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
    setError(null);

    console.log("Email/Mobile:", email);
    console.log("Password:", password);

    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        console.error("Sign up error:", error.message);
        setError(error.message);
      } else {
        console.log("User signed up successfully:", data);
        setConfirmMessage(
          "Signup successful! Please check your email to confirm your account."
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
      setError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center">
      <div className="block md:hidden ">
        <FaConnectdevelop size={40} />
      </div>
      <div className="flex flex-col items-center gap-2 md:w-2/5 min-h-1 md:min-h-[90svh] p-5 mt-4">
        <h1 className=" font-bold p-2 text-2xl">SignUp</h1>
        {confirmMessage && <p className="text-green-500">{confirmMessage}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" className="input" />
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="text" placeholder="Username" className="input" />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <div className="md:h-14 md:w-80 md:rounded-md md:p-4 md:justify-between bg-gray-200  h-14 w-72 rounded-xl  p-2 flex flex-row gap-2 justify-center ">
          <h5>Already have an account?</h5>
          <Link className="text-blue-500" to="/">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
