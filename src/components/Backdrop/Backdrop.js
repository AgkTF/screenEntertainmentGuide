import React, { useState } from "react";
import BackdropModal from "../BackdropModal/BackdropModal";
import classes from "./Backdrop.module.css";
import Image from "../Image/Image";

const Backdrop = ({ backdrop_path, title, tmdbLoading, images }) => {
  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <div className={classes.Backdrop}>
      <Image
        url={
          backdrop_path ? `https://image.tmdb.org/t/p/w780${backdrop_path}` : ""
        }
        altText={`"${title}" movie backdrop`}
      />

      <button
        className="px-2 absolute right-4 bottom-2 text-sm font-semibold text-gray-300 underline z-30 tracking-wide bg-gray-800 bg-opacity-50 rounded-md hover:text-white"
        onClick={openModalHandler}
      >
        other photos
      </button>
      <BackdropModal
        isOpen={openModal}
        toggleHandler={openModalHandler}
        backdrops={images}
      />
    </div>
  );
};

export default Backdrop;
