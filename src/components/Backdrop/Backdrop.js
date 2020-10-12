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
        url={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
        altText={`"${title}" movie backdrop`}
      />

      <button
        className="absolute right-4 bottom-2 text-sm font-semibold text-gray-200 underline z-30 tracking-wide"
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
