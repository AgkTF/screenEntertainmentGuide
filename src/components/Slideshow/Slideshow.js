import React from "react";
import Navbar from "../Navbar/Navbar";
import Slider from "react-slick";
import classes from "./Slideshow.module.css";
import { Link } from "react-router-dom";

const Slideshow = ({ movies }) => {
  const settings = {
    dots: false,
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
    <>
      <Navbar />
      <Slider {...settings} className={classes.Slider}>
        {movies.map((movie) => (
          <div className={classes.imgCont} key={movie.id}>
            <img
              // src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
              src={`./images${movie.backdrop_path}`}
              alt={`${movie.title} backdrop`}
              className="h-full w-full object-cover"
            />
            <Link to={`${movie.id}/details`}>
              <span className="absolute bottom-8 px-4 text-gray-200 font-bai text-lg sm:text-xl font-bold bg-gray-500 bg-opacity-50 rounded max-w-xs uppercase">
                {`${movie.title}`}
              </span>
            </Link>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Slideshow;
