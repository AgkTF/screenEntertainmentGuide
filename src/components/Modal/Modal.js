import React from "react";
import classes from "./Modal.module.css";
import ReactModal from "react-modal";
import Slider from "react-slick";

ReactModal.setAppElement("#root");
const urls = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
];
const Modal = ({ isOpen, toggleHandler }) => {
  const settings = {
    customPaging: (i) => (
      <div className="w-16 h-24 sm:w-20 sm:h-32 rounded overflow-hidden">
        <img
          src={urls[i]}
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
      contentLabel={"poster images modal"}
      shouldCloseOnOverlayClick={true}
      onRequestClose={toggleHandler}
      className={classes.Content}
    >
      {/* <p>This is the modal</p> */}
      <Slider {...settings}>
        {urls.map((url) => (
          <div key={url} className={classes.Current}>
            <img
              src={url}
              alt="poster"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </ReactModal>
  );
};

export default Modal;
