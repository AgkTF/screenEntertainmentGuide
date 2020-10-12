import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchInput = ({ shown }) => {
  const history = useHistory();

  const [query, setQuery] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    // history.push(`/search?q=${encodeURIComponent(query)}`);
    if (!query) {
      console.log("Input cannot be empty");
    } else {
      history.push(`/search?q=${query}`);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  let toRender = shown && (
    <form
      className="mt-3 mx-4 font-bai relative"
      method="get"
      onSubmit={formSubmitHandler}
    >
      <div className="px-5 w-full bg-white rounded-full flex items-center">
        <label className="font-semibold text-sm text-gray-500 flex-shrink-0">
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
        </label>
        <input
          className="w-full px-1 py-1 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
          type="input"
          name="searchQueryInput"
          placeholder="Search..."
          value={query}
          onChange={changeHandler}
        />

        <button
          className={`text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-400 px-1 py-1 rounded transition-all duration-300 ease-in-out ${
            query ? "" : "cursor-not-allowed"
          }`}
          disabled={query ? false : true}
        >
          <svg
            className="w-5 h-5 transform rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </form>
  );

  return toRender;
};

export default SearchInput;
