import React from "react";
import Navbar from "../Navbar/Navbar";
import Slider from "react-slick";
import classes from "./Slideshow.module.css";
import "./slick-theme.css";

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: false,
    customPaging: function () {
      return <div className={classes.dot}></div>;
    },
  };
  return (
    <div>
      <Navbar />
      <Slider {...settings} className={classes.Slider}>
        <div className={classes.imgCont}>
          <img
            src="images/7.jpg"
            alt="dummy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className={classes.imgCont}>
          <img
            src="images/8.jpg"
            alt="dummy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className={classes.imgCont}>
          <img
            src="images/9.jpg"
            alt="dummy"
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-8 px-8 text-gray-200 font-bai text-xl font-bold bg-gray-500 bg-opacity-25">
            TENET
          </span>
        </div>
        <div className={classes.imgCont}>
          <img
            src="images/10.jpg"
            alt="dummy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className={classes.imgCont}>
          <img
            src="images/11.jpg"
            alt="dummy"
            className="h-full w-full object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Slideshow;
