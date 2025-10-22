import React from "react";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

function Forbidden() {
  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="bg-white rounded-lg shadow-lg p-10 text-center max-w-md">
        <FaLock className="text-6xl text-red-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary text-black font-semibold rounded hover:bg-primary-focus transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default Forbidden;
