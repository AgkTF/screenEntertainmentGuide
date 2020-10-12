import React from "react";
import classes from "./BackdropModal.module.css";
import ReactModal from "react-modal";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

ReactModal.setAppElement("#root");
// const urls = [
//   "/images/7.jpg",
//   "/images/8.jpg",
//   "/images/9.jpg",
//   "/images/10.jpg",
//   "/images/11.jpg",
//   "/images/12.jpg",
// ];
const BackdropModal = ({ isOpen, toggleHandler, backdrops }) => {
  const images = backdrops.map((backdrop) => {
    return {
      original: `https://image.tmdb.org/t/p/w500${backdrop.file_path}`,
      originalAlt: "backdrop",
      thumbnail: `https://image.tmdb.org/t/p/w92${backdrop.file_path}`,
      thumbnailAlt: "thumbnail",
    };
  });
  return (
    <ReactModal
      ariaHideApp={true}
      isOpen={isOpen}
      contentLabel={"Backdrop images modal"}
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

export default BackdropModal;
