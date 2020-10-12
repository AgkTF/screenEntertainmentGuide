import React, { useCallback, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import * as queryString from "query-string";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";
import classes from "./Results.module.css";
import { genreMapper } from "../../utils/utils";

const Results = () => {
  const location = useLocation();
  const query = queryString.parse(location.search).q;
  const encodedQuery = encodeURIComponent(queryString.parse(location.search).q);
  console.log("🚀", encodedQuery);

  const [results, setResults] = useState([]);
  const [current, setCurrent] = useState("movies");

  const fetchResults = useCallback(() => {
    if (!encodedQuery) return;

    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMBD_KEY}&language=en-US&query=${encodedQuery}&page=1&include_adult=false`
      )
      .then((response) => {
        console.log(response.data);
        setResults(response.data.results);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }, [encodedQuery]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  let resultsCount = results ? results.length : <Spinner />;

  let movies = results
    ? results.filter((result) => result.media_type === "movie")
    : [];

  let tv = results
    ? results.filter((result) => result.media_type === "tv")
    : [];

  let people = results
    ? results.filter((result) => result.media_type === "person")
    : [];

  const createData = (current) => {
    switch (current) {
      case "movies":
        return movies.map((movie) => (
          <div
            className="h-20 py-3 pr-3 flex items-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-sm text-gray-700"
            key={movie.id}
          >
            <div className="w-12 h-20 flex-shrink-0 text-gray-600 rounded-md overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3 text-sm">
              <h3 className="font-semibold leading-tight">
                <Link to={`/movie/${movie.id}/details`}>{movie.title}</Link>
                <span className="ml-1 font-normal text-gray-500 text-xs ">
                  ({movie.release_date.split("-")[0]})
                </span>
              </h3>
              <p className="mt-1 text-xs">{genreMapper(movie.genre_ids)}</p>
            </div>
          </div>
        ));

      case "tv":
        return tv.map((show) => (
          <div
            className="h-20 py-3 pr-3 flex items-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-sm text-gray-700"
            key={show.id}
          >
            <div className="w-12 h-20 flex-shrink-0 text-gray-600 rounded-md overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w92${show.poster_path}`}
                alt={show.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3 text-sm">
              <h3 className="font-semibold leading-tight">
                <Link to={`/show/${show.id}/details`}>{show.name}</Link>
                <span className="ml-1 font-normal text-gray-500 text-xs">
                  ({show.first_air_date.split("-")[0]})
                </span>
              </h3>
              <p className="mt-1 text-xs">{genreMapper(show.genre_ids)}</p>
            </div>
          </div>
        ));

      case "people":
        //FIXME: the works disappear when moving between categories
        return people.map((person) => (
          <div
            className="h-20 py-3 pr-3 flex items-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-sm text-gray-700"
            key={person.id}
          >
            <div className="w-12 h-20 flex-shrink-0 text-gray-600 rounded-md overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w92${person.profile_path}`}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3 text-sm">
              <h3 className="font-semibold leading-tight">
                <Link to={`/person/${person.id}`}>{person.name}</Link>
              </h3>
              <p className="text-xs font-medium">
                {person.known_for_department}
              </p>
              <div className="mt-1 text-xs truncate ">
                {person.known_for.splice(0, 3).map((work, i) =>
                  work.title ? (
                    <span key={work.id} className="hover:text-blue-700">
                      <Link to={`/movie/${work.id}/details`}>
                        {work.title}
                        {i < 2 ? ", " : ""}
                      </Link>
                    </span>
                  ) : (
                    <span key={work.id} className="hover:text-blue-700">
                      {work.name}
                      {i < 2 ? ", " : ""}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        ));

      default:
    }
  };

  return (
    <div className="mx-5 font-bai text-gray-700">
      <h2 className="mt-4 font-bold sm:text-xl">
        Displaying {resultsCount} results for{" "}
        <span className="italic">"{query}"</span>
      </h2>
      <div>
        <div className="pb-2 mt-5 flex justify-between text-sm font-semibold border-b-2 border-gray-300 max-w-sm mx-auto">
          <button
            className={`sm:text-base font-semibold hover:text-gray-700 ${
              current === "movies" ? "" : "text-gray-500"
            }`}
            onClick={() => setCurrent("movies")}
          >
            Movies
            <span
              className={`ml-1 text-xs sm:text-sm font-semibold bg-white border border-gray-500 rounded-sm ${classes.count}`}
            >
              {movies ? movies.length : <Spinner />}
            </span>
          </button>

          <button
            className={`sm:text-base font-semibold hover:text-gray-700 ${
              current === "tv" ? "" : "text-gray-500"
            }`}
            onClick={() => setCurrent("tv")}
          >
            TV shows
            <span
              className={`ml-1 text-xs sm:text-sm font-semibold bg-white border border-gray-500 rounded-sm ${classes.count}`}
            >
              {tv ? tv.length : <Spinner />}
            </span>
          </button>

          <button
            className={`sm:text-base font-semibold hover:text-gray-700 ${
              current === "people" ? "" : "text-gray-500"
            }`}
            onClick={() => setCurrent("people")}
          >
            People
            <span
              className={`ml-1 text-xs sm:text-sm font-semibold bg-white border border-gray-500 rounded-sm ${classes.count}`}
            >
              {people ? people.length : <Spinner />}
            </span>
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-y-4 xs:grid-cols-2 xs:gap-4">
        {createData(current)}
      </div>
    </div>
  );
};

export default Results;
