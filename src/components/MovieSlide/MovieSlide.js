import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import star from "./star.svg";
import classes from "./MovieSlide.module.css";

const MovieSlide = ({
  posterUrl,
  altText,
  title,
  genre,
  overview,
  // imdbRating,
  // metascore,
}) => {
  const currentSlide = useRef(null);

  // useEffect(() => {
  //   console.log(currentSlide.current);
  // }, []);

  return (
    <div className="max-w-3xl flex flex-col justify-center" ref={currentSlide}>
      <div className={classes.imgContainer}>
        <img
          src={posterUrl}
          alt={altText}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="mt-3 text-gray-700 font-bai text-center opacity-0 transition-opacity duration-300">
        <p className="font-bold">{title}</p>
        <p className="text-xs">{genre}</p>
        <div className="mt-3 flex flex-col items-center">
          <p
            className={`relative text-xs text-left max-w-full font-medium ${classes.overview}`}
          >
            {overview}
          </p>
          {/* <div className="w-full flex items-center justify-around">
            <div>
              <div className="flex items-center justify-center">
                <img src={star} alt="rating star" className="w-3 h-3" />
                <span className="ml-1 font-semibold">
                  {imdbRating.toFixed(1)}
                </span>
              </div>
              <p className="text-xs font-light">IMDb</p>
            </div>
            <div>
              <span className="p-1 bg-green-500 text-sm text-white font-semibold">
                {metascore}
              </span>
              <p className="mt-1 text-xs font-light">Metascore</p>
            </div>
          </div> */}

          <button className="mt-3 px-3 py-1 text-sm font-semibold rounded-full border-2 border-opacity-50 border-gray-700 cursor-pointer">
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

MovieSlide.propTypes = {
  posterUrl: PropTypes.string,
  altText: PropTypes.string,
  title: PropTypes.string,
  genre: PropTypes.string,
  imdbRating: PropTypes.number,
  metascore: PropTypes.number,
};

export default MovieSlide;
