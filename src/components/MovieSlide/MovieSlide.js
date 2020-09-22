import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import star from "./star.svg";
import classes from "./MovieSlide.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieSlide = ({ posterUrl, altText, title, genre, id, isCurrent }) => {
  // const [omdbDetails, setOmdbDetails] = useState({});

  // const fetchOMBdDetails = useCallback((title, year = 2020) => {
  //   axios
  //     .get(
  //       `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMBD_KEY}&t=${title}&y=${year}`
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       setOmdbDetails({ [title]: response.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect(() => {
  //   if (isCurrent && !omdbDetails[title]) {
  //     fetchOMBdDetails(title);
  //   } else {
  //     return;
  //   }
  // }, [isCurrent, title, omdbDetails, fetchOMBdDetails]);

  // let imdbRating =
  //   omdbDetails[title] && omdbDetails[title].imdbRating
  //     ? omdbDetails[title].imdbRating
  //     : "💩";

  // let metascoreRating =
  //   omdbDetails[title] &&
  //   omdbDetails[title].Ratings.find((rating) => rating.Source === "Metacritic");

  // let metascore =
  //   omdbDetails[title] && metascoreRating
  //     ? metascoreRating.Value.split("/")[0]
  //     : "💩";

  return (
    <div className="max-w-3xl flex flex-col justify-center">
      <div className={classes.imgContainer}>
        <img
          src={posterUrl}
          alt={altText}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="mt-3 text-gray-700 font-bai text-center opacity-0 transition-opacity duration-300">
        <Link to={`/${id}`}>
          <p className="font-bold">{title}</p>
        </Link>
        <p className="text-xs">{genre}</p>
        <div className="mt-3 flex flex-col items-center">
          <div className="w-full flex items-center justify-around">
            <div>
              <div className="flex items-center justify-center">
                <img src={star} alt="rating star" className="w-3 h-3" />
                {/* <span className="ml-1 font-semibold">{imdbRating}</span> */}
                <span className="ml-1 font-semibold">6.6</span>
              </div>
              <p className="text-xs font-light">IMDb</p>
            </div>
            <div>
              <span className="p-1 bg-green-500 text-sm text-white font-semibold">
                {/* {metascore} */}
                77
              </span>
              <p className="mt-1 text-xs font-light">Metascore</p>
            </div>
          </div>

          <Link to={`/${id}`}>
            <button className="mt-3 px-3 py-1 text-sm font-semibold rounded-full border-2 border-opacity-50 border-gray-700 cursor-pointer">
              See more
            </button>
          </Link>
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
  isCurrent: PropTypes.bool,
};

export default MovieSlide;
