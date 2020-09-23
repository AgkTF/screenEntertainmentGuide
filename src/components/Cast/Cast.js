import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cast = ({ tmdb_id }) => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${tmdb_id}/credits?api_key=${process.env.REACT_APP_TMBD_KEY}`
      )
      .then((response) => {
        console.log(response.data.cast);
        setCast(response.data.cast);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tmdb_id]);

  let rendered = !isLoading
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
