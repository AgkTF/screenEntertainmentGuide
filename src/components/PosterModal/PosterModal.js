import React from "react";
import classes from "./PosterModal.module.css";
import ReactModal from "react-modal";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

ReactModal.setAppElement("#root");
// const urls = [
//   "/images/1.jpg",
//   "/images/2.jpg",
//   "/images/3.jpg",
//   "/images/4.jpg",
//   "/images/5.jpg",
//   "/images/6.jpg",
// ];
const PosterModal = ({ isOpen, toggleHandler, posters }) => {
  const images = posters.map((poster) => {
    return {
      original: `https://image.tmdb.org/t/p/w780${poster.file_path}`,
      originalAlt: "poster",
      thumbnail: `https://image.tmdb.org/t/p/w300${poster.file_path}`,
      thumbnailAlt: "thumbnail",
    };
  });

  return (
    <ReactModal
      ariaHideApp={true}
      isOpen={isOpen}
      contentLabel={"poster images modal"}
      shouldCloseOnOverlayClick={true}
      onRequestClose={toggleHandler}
      className={classes.Content}
      overlayClassName={classes.Overlay}
      bodyOpenClassName={classes.Body}
    >
      <Gallery items={images} lazyLoad showPlayButton={false} showIndex />
    </ReactModal>
  );
};

export default PosterModal;
