import React from "react";

const ErrorBox = ({ errorMessage }) => {
  return (
    <div className="border-2 border-red-200 rounded-xl max-w-xs px-1 py-3 bg-red-100 text-red-500 flex flex-col items-center justify-center text-center">
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <div className="mt-2 text-sm">
        <p className="font-bold">Error</p>
        <p className="font-normal">
          Please check your connection and try again.
          {/* {errorMessage} */}
        </p>
      </div>{" "}
    </div>
  );
};

export default ErrorBox;
