import React from "react";
import { Link } from "react-router-dom";

const Cast = ({ cast }) => {
  let rendered = cast
    ? cast.slice(0, 6).map((actor) => (
        <div key={actor.id} className="flex flex-col mr-3 sm:mr-4">
          <div className="w-20 h-24 sm:w-24 sm:h-32">
            <img
              className="w-full h-full object-cover rounded"
              src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
              alt={`${actor.name}`}
            />
          </div>
          <p
            className="mt-2 font-semibold text-xs sm:text-sm text-center"
            style={{ lineHeight: "14px" }}
          >
            <Link to={`/${actor.id}`}>{actor.name}</Link>
          </p>
          <p className="mt-1 font-light italic text-xs text-center">
            <span>{actor.character}</span>
          </p>
        </div>
      ))
    : "💩";

  return rendered;
};

export default Cast;
