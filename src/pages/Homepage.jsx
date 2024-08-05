import React from "react";
import { Link } from "react-router-dom";
export default function Homepage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-40 w-60 flex flex-col items-center justify-center gap-4 border border-blue-400">
        <h2>home page</h2>
        <div className=" flex gap-5">
          <Link
            to="/login"
            className="h-10 w-20 text-center border border-red-500"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className=" h-10 w-20 text-center border border-red-500"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
