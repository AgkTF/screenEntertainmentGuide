import React from "react";
import { Link } from "react-router-dom";

const Similar = ({ movies }) => {
  let rendered = movies
    ? movies.slice(0, 6).map((movie) => (
        <div className="flex flex-col mr-4" key={movie.id}>
          <div className="w-20 h-32 sm:w-24 sm:h-40 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover text-center"
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt={`${movie.title} poster`}
            />
          </div>

          <span className="mt-1 font-semibold text-xs sm:text-sm leading-tight">
            <Link to={`/${movie.id}/details`}>{movie.title}</Link>
          </span>
        </div>
      ))
    : "💩";

  return rendered;
};

export default Similar;
