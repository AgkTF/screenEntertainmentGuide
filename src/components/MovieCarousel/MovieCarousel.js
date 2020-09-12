import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import classes from "./MovieCarousel.module.css";
import "./slick.css";
import "./slick-theme.css";

const MovieCarousel = () => {
  const [windowWidth, setWindowWith] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => {
      setWindowWith(window.innerWidth);
    };

    window.addEventListener("resize", resizeHandler);

    console.log({
      windowWidth,
      padding: (windowWidth - 208) / 2,
    });
    return (_) => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [windowWidth]);

  let padding = (windowWidth - 208) / 2;

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: `${padding}px`,
    speed: 500,
    arrows: false,
    initialSlide: 0,
    slidesToShow: 1,
  };

  return (
    <div className={`my-20 w-full ${classes.listContainer}`}>
      <Slider {...settings}>
        <div
          className={`bg-pink-300 rounded-lg overflow-hidden flex justify-center ${classes.imgContainer}`}
        >
          <img
            src="images/1.jpg"
            alt="dummy"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className={`bg-pink-300 rounded-lg overflow-hidden ${classes.imgContainer}`}
        >
          <img
            src="images/2.jpg"
            alt="dummy"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className={`bg-pink-300 rounded-lg overflow-hidden ${classes.imgContainer}`}
        >
          <img
            src="images/3.jpg"
            alt="dummy"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className={`bg-pink-300 rounded-lg overflow-hidden ${classes.imgContainer}`}
        >
          <img
            src="images/4.jpg"
            alt="dummy"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className={`bg-pink-300 rounded-lg overflow-hidden ${classes.imgContainer}`}
        >
          <img
            src="images/5.jpg"
            alt="dummy"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className={`bg-pink-300 rounded-lg overflow-hidden ${classes.imgContainer}`}
        >
          <img
            src="images/6.jpg"
            alt="dummy"
            className="w-full h-full object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default MovieCarousel;
