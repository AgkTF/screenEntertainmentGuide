import React, { useState } from "react";
import logo from "../../images/seg-logo.svg";
import { Link } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";

const Navbar = () => {
  const [inputShown, setInputShown] = useState(false);

  return (
    <div
      className="py-2 flex flex-col bg-gray-700
      bg-opacity-50 z-50 absolute w-full"
    >
      <div
        className="
      h-10
      sm:h-12
      flex
      items-center
      justify-around
      relative 
      "
      >
        <button onClick={() => setInputShown((prevState) => !prevState)}>
          <svg
            className="w-6 h-6 text-gray-200"
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
        </button>

        <div>
          <Link to="/">
            <img
              src={logo}
              alt="seg-logo"
              className="sm:w-full h-full object-contain"
            />
          </Link>
        </div>

        <div>
          <span className="px-2 font-bai font-semibold text-xs text-gray-200 bg-gray-600 rounded-full">
            Movies
          </span>
        </div>
      </div>

      <div>
        <SearchInput shown={inputShown} />
      </div>
    </div>
  );
};

export default Navbar;
