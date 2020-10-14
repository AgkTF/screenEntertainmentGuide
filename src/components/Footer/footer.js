import React from "react";
import classes from "./Footer.module.css";
import tmdbLogo from "../../images/alt-short-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer
      className={`max-w-3xl mx-auto text-xs font-bai h-12 text-gray-600 sticky bottom-0 ${classes.footer}`}
    >
      <div className="py-3 px-0 my-0 mx-auto flex items-center justify-around xs:justify-between xs:max-w-sm">
        <div className="bg-gray-300 rounded h-6 py-1 px-2 font-semibold shadow-lg flex items-baseline">
          <p className="flex-shrink-0">Made by </p>
          <a href="https://www.themoviedb.org/" className="ml-1 flex-shrink-0">
            <img src={tmdbLogo} alt="tmdbLogo" className="h-2" />
          </a>
        </div>

        <a
          href="https://twiter.com/agktf"
          className="bg-gray-300 rounded h-6 w-6 text-base text-blue-500 text-center shadow-lg"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>

        <a
          href="https://github.com/agktf"
          className="bg-gray-300 rounded h-6 w-6 text-base text-black text-center shadow-lg"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>

        <div className="bg-gray-300 rounded h-6 py-1 px-2 font-semibold shadow-lg flex items-center">
          <span className="flex-shrink-0">Made with</span>
          <span className="mx-1">
            <svg
              className="w-4 h-4 text-red-700"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span>
            by{" "}
            <a
              href="https://agktf.com"
              className="font-bold text-blue-600 hover:underline"
            >
              Agk
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
