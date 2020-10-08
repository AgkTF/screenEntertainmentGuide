import React from "react";
import logo from "../../images/seg-logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      className="
      bg-gray-700
      bg-opacity-50
      h-10
      sm:h-12
      flex
      justify-around
      items-center
      relative
      z-50"
    >
      <div>
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-gray-200  "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="seg-logo"
            className="w-3/4 sm:w-full h-full object-contain"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
