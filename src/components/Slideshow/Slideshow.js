import React from "react";
import Navbar from "../Navbar/Navbar";
import Slider from "react-slick";
import classes from "./Slideshow.module.css";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

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
    lazyLoad: true,
    customPaging: function () {
      return <div className={classes.dot}></div>;
    },
  };
  return (
    <>
      {/* <Navbar /> */}
      <Slider {...settings} className={classes.Slider}>
        {movies ? (
          movies.map((movie) => (
            <div className={classes.imgCont} key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
                // src={`/images${movie.backdrop_path}`}
                alt={`${movie.title} backdrop`}
                className="h-full w-full object-cover"
              />
              <Link to={`/movie/${movie.id}/details`}>
                <span className="absolute bottom-8 px-4 text-gray-200 font-bai text-lg sm:text-xl font-bold bg-gray-500 bg-opacity-50 rounded max-w-xs uppercase">
                  {`${movie.title}`}
                </span>
              </Link>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </Slider>
    </>
  );
};

export default Slideshow;
