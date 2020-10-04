import React from "react";
import classes from "./BackdropModal.module.css";
import ReactModal from "react-modal";
import Slider from "react-slick";

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
  const settings = {
    customPaging: (i) => (
      <div className="w-20 h-12 sm:w-40 sm:h-20 rounded overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w780${backdrops[i].file_path}`}
          alt="poster"
          className="w-full h-full object-cover"
        />
      </div>
    ),
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    className: `${classes.InnerSlider}`,
  };
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
      <Slider {...settings}>
        {backdrops.map((backdrop) => (
          <div key={backdrop.file_path} className={classes.Current}>
            <img
              src={`https://image.tmdb.org/t/p/w780${backdrop.file_path}`}
              alt="backdrop"
              className="w-full h-full object-contain sm:object-cover"
            />
          </div>
        ))}
      </Slider>
    </ReactModal>
  );
};

export default BackdropModal;
