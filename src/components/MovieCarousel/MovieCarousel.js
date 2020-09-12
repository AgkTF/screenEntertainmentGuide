import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import classes from "./MovieCarousel.module.css";

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

  let padding = windowWidth >= 700 ? 24 : (windowWidth - 208) / 2;
  let slidesToShow = windowWidth >= 700 ? 3 : 1;

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: `${padding}px`,
    speed: 500,
    arrows: false,
    initialSlide: 0,
    slidesToShow: slidesToShow,
  };

  return (
    <div className="mt-4 w-full">
      <div className="mx-auto mb-6 font-bai font-semibold text-sm text-gray-700 flex items-center justify-around max-w-xs">
        <p className="border-b-2 border-gray-700 border-opacity-25">
          Now Playing
        </p>
        <p className="opacity-50">Trending</p>
        <p className="opacity-50">Upcoming</p>
      </div>
      <Slider {...settings}>
        <div
          className={`max-w-3xl bg-pink-300 rounded-lg overflow-hidden flex justify-center ${classes.imgContainer}`}
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
