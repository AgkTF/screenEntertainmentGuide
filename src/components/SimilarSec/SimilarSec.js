import React from "react";
import { Link } from "react-router-dom";
import classes from "./SimilarSec.module.css";
import Image from "../Image/Image";

const SimilarSec = ({ movies }) => {
  console.log({ similar: movies });

  let rendered =
    movies.length > 0 ? (
      movies.slice(0, 5).map((movie) => (
        <div className="flex flex-col mr-6" key={movie.id}>
          <div
            className={`w-20 h-32 rounded-lg overflow-hidden shadow-md ${classes.poster}`}
          >
            <Link to={`/movie/${movie.id}/details`}>
              <Image
                url={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                altText={`"${movie.title}" poster`}
              />
            </Link>
          </div>

          <span className="mt-2 font-semibold text-xs sm:text-sm leading-tight text-center">
            <Link to={`/movie/${movie.id}/details`}>{movie.title}</Link>
          </span>
        </div>
      ))
    ) : (
      <p className="my-2 mx-auto font-medium text-sm text-gray-600">
        Nothing to show here. Sorry!
      </p>
    );

  return rendered;
};

export default SimilarSec;
