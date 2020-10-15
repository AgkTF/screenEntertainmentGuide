import React from "react";
import Slider from "react-slick";
import classes from "./Slideshow.module.css";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import Image from "../Image/Image";

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
      <Slider {...settings} className={classes.Slider}>
        {movies ? (
          movies.map((movie) => (
            <div className={classes.imgCont} key={movie.id}>
              <Image
                url={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
                // url={`/images${movie.backdrop_path}`}
                altText={`"${movie.title}" backdrop`}
              />
              <Link to={`/movie/${movie.id}/details`}>
                <span className="absolute bottom-8 px-4 text-gray-200 font-bai text-lg sm:text-xl font-bold bg-gray-600 bg-opacity-50 rounded max-w-xs uppercase">
                  {`${movie.title}`}
                </span>
              </Link>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </Slider>

      {/* {movies} */}
    </>
  );
};

export default Slideshow;
