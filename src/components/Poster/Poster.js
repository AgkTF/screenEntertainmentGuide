import React, { useState } from "react";
import PosterModal from "../PosterModal/PosterModal";
import classes from "./Poster.module.css";
import Image from "../Image/Image";

const Poster = ({ poster_path, title, tmdbLoading, images }) => {
  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <div
      className={`w-32 h-48 sm:w-40 sm:h-64 relative rounded-xl overflow-hidden border-2 border-gray-300 box-content ${classes.PosterContainer}`}
    >
      <Image
        url={
          !tmdbLoading ? `https://image.tmdb.org/t/p/w342${poster_path}` : ""
        }
        altText={`"${title}" poster`}
      />
      <button
        className={`text-sm sm:text-base bg-gray-600 bg-opacity-50 text-gray-200 text-center font-semibold flex justify-center items-center w-full ${classes.PosterExpand}`}
        onClick={openModalHandler}
      >
        <span>Expand </span>
        <span>
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </span>
      </button>

      <PosterModal
        isOpen={openModal}
        toggleHandler={openModalHandler}
        posters={images}
      />
    </div>
  );
};

export default Poster;
