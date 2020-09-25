import React, { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import MovieSlide from "../MovieSlide/MovieSlide";
import classes from "./MovieCarousel.module.css";
import { genreMapper } from "../../utils/genre-mapper";
// import axios from "axios";

//TODO: Add prop-types

const MovieCarousel = ({ movies }) => {
  const [windowWidth, setWindowWith] = useState(window.innerWidth);
  const [currentTitle, setCurrentTitle] = useState("");

  console.log({ currentTitle });

  const afterSlideChangeHandler = useCallback(() => {
    let newCurrentSlide = document.querySelector(
      "div.slick-slide.slick-active.slick-center.slick-current"
    );
    let newCurrentTitle = newCurrentSlide.querySelector("p.font-bold")
      .innerText;

    setCurrentTitle(newCurrentTitle);
  }, []);

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
    infinite: false,
    centerPadding: `${padding}px`,
    speed: 500,
    arrows: false,
    initialSlide: 0,
    slidesToShow: slidesToShow,
    focusOnSelect: true,
    afterChange: () => afterSlideChangeHandler(),
  };

  return (
    <div className={classes.Container}>
      <div className="mx-auto mb-6 font-bai font-semibold text-sm text-gray-700 flex items-center justify-around max-w-xs">
        <p className="border-b-2 border-gray-700 border-opacity-25">
          Now Playing
        </p>
        <p className="opacity-50">Trending</p>
        <p className="opacity-50">Upcoming</p>
      </div>
      <Slider {...settings}>
        {movies.map((movie) => (
          <MovieSlide
            key={movie.id}
            id={movie.id}
            // posterUrl={
            //   movie.poster_path
            //     ? `https://image.tmdb.org/t/p/w780/${movie.poster_path}`
            //     : "/images/24.jpg"
            // }
            posterUrl={`./images${movie.poster_path}`}
            altText={`${movie.title} poster`}
            title={`${movie.title}`}
            genre={genreMapper(movie.genre_ids)}
            isCurrent={currentTitle === movie.title ? true : false}
          />
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
