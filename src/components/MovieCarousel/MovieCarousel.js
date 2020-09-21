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
  // const [omdbDetails, setOmdbDetails] = useState({});

  console.log({ currentTitle });

  // const fetchOMBdDetails = useCallback((title, year = 2020) => {
  //   axios
  //     .get(
  //       `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMBD_KEY}&t=${title}&y=${year}`
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       setOmdbDetails((omdbDetails) => {
  //         return { ...omdbDetails, [response.data.Title]: response.data };
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const afterSlideChangeHandler = useCallback(() => {
    let newCurrentSlide = document.querySelector(
      "div.slick-slide.slick-active.slick-center.slick-current"
    );
    let newCurrentTitle = newCurrentSlide.querySelector("p.font-bold")
      .innerText;
    // console.log(newCurrentTitle);

    setCurrentTitle(newCurrentTitle);

    // if (omdbDetails[newCurrentTitle] || !newCurrentTitle) return;
    // fetchOMBdDetails(currentTitle);
  }, []);

  useEffect(() => {
    afterSlideChangeHandler();
  }, [afterSlideChangeHandler]);

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

  // let imdbRating =
  //   omdbDetails[currentTitle] && omdbDetails[currentTitle].Ratings[0]
  //     ? omdbDetails[currentTitle].Ratings[0].Value.split("/")[0]
  //     : "NO 🛑";

  // let metascore =
  //   omdbDetails[currentTitle] && omdbDetails[currentTitle].Ratings[1]
  //     ? omdbDetails[currentTitle].Ratings[1].Value.split("/")[0]
  //     : "NO 🛑";

  // console.log({ imdbRating, metascore });

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
            // posterUrl={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
            posterUrl={`./images${movie.poster_path}`}
            altText={`${movie.title} poster`}
            title={`${movie.title}`}
            genre={genreMapper(movie.genre_ids)}
            isCurrent={currentTitle === movie.title ? true : false}
            // imdbRating={imdbRating}
            // metascore={metascore}
          />
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
