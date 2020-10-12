import React from "react";
import { Link } from "react-router-dom";
import classes from "./Similar.module.css";
import Image from "../Image/Image";

const Similar = ({ movies }) => {
  let rendered = movies
    ? movies.slice(0, 5).map((movie) => (
        <div className="flex flex-col mr-6" key={movie.id}>
          <div
            className={`w-20 h-32 rounded-lg overflow-hidden shadow-md ${classes.poster}`}
          >
            <Image
              url={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              altText={`"${movie.title}" poster`}
            />
          </div>

          <span className="mt-2 font-semibold text-xs sm:text-sm leading-tight text-center">
            <Link to={`/movie/${movie.id}/details`}>{movie.title}</Link>
          </span>
        </div>
      ))
    : "💩";

  return rendered;
};

export default Similar;
