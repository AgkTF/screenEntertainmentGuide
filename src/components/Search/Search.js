import React, { useState } from "react";
import classes from "./Search.module.css";

const Search = () => {
  const [menuShown, setMenuShown] = useState(false);

  return (
    <div
      className="relative flex"
      onClick={() => {
        setMenuShown(true);
      }}
    >
      <div className="font-bai relative">
        <div
          className={`px-2 w-48 bg-white rounded-t-lg flex items-center ${
            menuShown ? "" : "rounded-b-lg"
          }`}
        >
          <label className="font-semibold text-sm text-gray-500 flex-shrink-0">
            {menuShown ? (
              "category |"
            ) : (
              <svg
                className="w-5 h-5"
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
            )}
          </label>
          <input
            type="input"
            className="w-full px-1 py-1 text-base font-semibold text-gray-700 placeholder-gray-400 focus:outline-none"
            placeholder="Search..."
          />
        </div>

        <div
          className={`pt-4 pb-3 rounded-b-lg bg-white w-48 flex flex-col justify-between items-center ${
            menuShown ? `${classes.shown}` : `${classes.hidden}`
          }`}
        >
          <div className="w-full text-center flex justify-around items-center">
            <div className="w-20 bg-gray-400 rounded-full text-gray-700 px-2 font-semibold flex-shrink-0">
              Movies
            </div>
            <div className="w-20 bg-gray-400 rounded-full text-gray-700 px-2 font-semibold flex-shrink-0">
              TV
            </div>
          </div>
          <div className="w-full mt-3 text-center flex justify-around items-center">
            <div className="w-20 bg-gray-400 rounded-full text-gray-700 px-2 font-semibold flex-shrink-0">
              People
            </div>
            <div className="w-20 bg-gray-600 rounded-full text-gray-200 px-2 font-semibold flex-shrink-0">
              All
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
