import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import star from "./star.svg";
import classes from "./MovieSlide.module.css";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Spinner from "../Spinner/Spinner";
import Image from "../Image/Image";

const MovieSlide = ({
  posterUrl,
  altText,
  title,
  genre,
  id,
  isCurrent,
  year,
}) => {
  //   const [omdbDetails, setOmdbDetails] = useState({});

  //   const fetchOMBdDetails = useCallback((title, year) => {
  //     axios
  //       .get(`/omovie/${title}/${year}`)
  //       .then((response) => {
  //         console.log(response.data.movieDetails);
  //         setOmdbDetails({ [title]: response.data.movieDetails });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     if (isCurrent && !omdbDetails[title]) {
  //       fetchOMBdDetails(title, year);
  //     } else {
  //       return;
  //     }
  //   }, [isCurrent, title, omdbDetails, fetchOMBdDetails, year]);

  //   let imdbRating =
  //     omdbDetails[title] && omdbDetails[title].imdbRating ? (
  //       omdbDetails[title].imdbRating
  //     ) : (
  //       <Spinner />
  //     );

  //   let metascoreRating = omdbDetails[title]
  //     ? omdbDetails[title].Ratings.find(
  //         (rating) => rating.Source === "Metacritic"
  //       )
  //     : "";

  //   let metascore = metascoreRating ? metascoreRating.Value.split("/")[0] : "N/A";

  return (
    <div className="max-w-3xl flex flex-col justify-center">
      <div className={classes.imgContainer}>
        <Image url={posterUrl} altText={altText} />
      </div>

      <div className="mt-3 text-gray-700 font-bai text-center opacity-0 transition-opacity duration-300">
        <Link to={`/movie/${id}/details`}>
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
                79
              </span>
              <p className="mt-1 text-xs font-light">Metascore</p>
            </div>
          </div>

          <Link to={`/movie/${id}/details`}>
            <button className="mt-3 px-3 text-sm font-semibold rounded-full border-2 border-opacity-50 border-gray-700 cursor-pointer">
              See more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

MovieSlide.propTypes = {
  posterUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};

export default MovieSlide;
