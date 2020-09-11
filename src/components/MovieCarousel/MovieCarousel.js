import React from "react";
import classes from "./MovieCarousel.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MovieCarousel extends React.Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "48px",
      slidesToShow: 1,
      speed: 500,
      arrows: false,
    };
    return (
      <div className="mx-auto my-1" style={{ width: "320px", height: "320px" }}>
        <Slider {...settings}>
          <div
            className={`bg-pink-300 rounded-lg overflow-hidden ${classes.imgContainer}`}
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
  }
}

export default MovieCarousel;
