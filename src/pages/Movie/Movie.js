import React, { useState, useEffect, useCallback } from "react";
import classes from "./Movie.module.css";
import star from "../../images/star.svg";
import axios from "axios";
import { Route } from "react-router-dom";
import Sections from "../../components/Sections/Sections";
import FullCast from "../../components/Full-Cast/FullCast";

const Movie = ({ match, history }) => {
  console.log("RENDERED 🚀");
  const tmdb_id = match.params.id;

  const [tmdbDetails, setTmdbDetails] = useState({});
  const [tmdbLoading, setTmdbLoading] = useState(true);

  const [omdbDetails, setOmdbDetails] = useState({});
  const [omdbLoading, setOmdbLoading] = useState(true);

  const fetchTMBdDetails = useCallback((id) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMBD_KEY}&language=en-US&append_to_response=credits%2Csimilar`
      )
      .then((response) => {
        console.log(response.data);
        setTmdbDetails(response.data);
        setTmdbLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchOMBdDetails = useCallback((imdb_id) => {
    if (!imdb_id) return;

    axios
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMBD_KEY}&i=${imdb_id}&plot=full`
      )
      .then((response) => {
        console.log({ imdb: response.data });
        setOmdbDetails(response.data);
        setOmdbLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchTMBdDetails(tmdb_id);
  }, [tmdb_id, fetchTMBdDetails]);

  useEffect(() => {
    fetchOMBdDetails(tmdbDetails.imdb_id);
  }, [fetchOMBdDetails, tmdbDetails.imdb_id]);

  let prodCompanies = !tmdbLoading
    ? tmdbDetails.production_companies.map((company) => company.name).join(", ")
    : "💩";
  let langs = !tmdbLoading
    ? tmdbDetails.spoken_languages.map((lang) => lang.name).join(", ")
    : "💩";

  let metascoreRating = !omdbLoading
    ? omdbDetails.Ratings.find((rating) => rating.Source === "Metacritic")
    : "";
  let metascore = metascoreRating ? metascoreRating.Value.split("/")[0] : "💩";

  let directors;
  if (!omdbLoading) {
    directors = omdbDetails.Director.split(", ").map((director) => (
      <span key={director} className="text-xs font-semibold sm:text-sm">
        {director}
      </span>
    ));
  }

  let writers;
  if (!omdbLoading) {
    writers = omdbDetails.Writer.split(", ").map((writer) => {
      let parts = writer.split(" (");
      if (parts.length === 1) {
        return (
          <p key={parts[0]} className="text-xs font-semibold sm:text-sm">
            {parts[0]}
          </p>
        );
      }
      return (
        <p key={parts} className="text-xs font-semibold sm:text-sm">
          {parts[0]}
          <span className="italic font-light">{` (${parts[1]}`}</span>
        </p>
      );
    });
  }

  let awards;
  if (omdbLoading) {
    awards = "💩";
  } else if (!omdbLoading && !omdbDetails.Awards) {
    awards = (
      <span className="text-xs font-normal italic sm:text-sm">
        "No Awards for this movie yet!"
      </span>
    );
  } else {
    let parts = omdbDetails.Awards.split(".");
    awards =
      parts.length > 0 ? (
        <>
          <span className="text-xs font-semibold sm:text-sm">{parts[0]}</span>
          <span className="text-xs font-normal italic sm:text-sm">
            {parts[1]}
          </span>
        </>
      ) : (
        <span className="text-xs font-semibold sm:text-sm">{`${parts[0]}.`}</span>
      );
  }

  return (
    <div className="font-bai text-gray-700">
      <div className="relative inset-x-0 top-0">
        <button
          className="absolute top-4 left-4 z-50 text-gray-300 bg-gray-600 bg-opacity-75 rounded"
          onClick={() => {
            history.goBack();
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className={classes.Backdrop}>
          <img
            src={
              !tmdbLoading
                ? `https://image.tmdb.org/t/p/w780${tmdbDetails.backdrop_path}`
                : ""
            }
            alt={`${tmdbDetails.title} backdrop`}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <section
        className={`mx-5 sm:mx-8 lg:mx-12 relative flex items-end -mt-20 sm:-mt-48 ${classes.PosterSec}`}
      >
        <div className="w-32 h-48 sm:w-40 sm:h-64 relative rounded-lg overflow-hidden border-2 border-gray-300 box-content">
          <img
            src={
              !tmdbLoading
                ? `https://image.tmdb.org/t/p/w342${tmdbDetails.poster_path}`
                : ""
            }
            alt={`${tmdbDetails.title} poster`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="ml-4 sm:ml-6 sm:flex">
          <div className="flex-grow flex-shrink-0">
            <p className="font-bold text-lg sm:text-xl">{tmdbDetails.title}</p>
            <p className="text-xs">
              {!omdbLoading ? omdbDetails.Genre.replaceAll(", ", "/") : "💩"}
            </p>
            <p className="text-xs">
              {!omdbLoading
                ? `${omdbDetails.Rated} / ${omdbDetails.Runtime}`
                : "💩"}
            </p>
          </div>
          <div className="w-full flex items-end sm:justify-end sm:items-end">
            <div className="mt-3 flex flex-col justify-center items-center">
              <div className="flex items-center justify-center">
                <img
                  src={star}
                  alt="rating star"
                  className="w-3 h-3 sm:w-4 sm:h-4"
                />
                <span className="ml-1 text-xs font-semibold sm:text-sm">
                  {!omdbLoading ? omdbDetails.imdbRating : "💩"}
                </span>
              </div>
              <p className="text-xs font-light">IMDb</p>
            </div>
            <div className="ml-8 text-center">
              <span className="p-1 bg-green-500 text-xs text-white font-semibold">
                {metascore}
              </span>
              <p className="text-xs font-light">Metascore</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-5 relative sm:mx-8 lg:mx-12">
        <Route
          path="/:id/details"
          render={() => (
            <>
              {tmdbLoading && omdbLoading ? (
                <h1>COME ON</h1>
              ) : (
                <Sections
                  plot={omdbDetails.Plot}
                  directors={directors}
                  writers={writers}
                  released={omdbDetails.Released}
                  langs={langs}
                  country={omdbDetails.Country}
                  budget={tmdbDetails.budget}
                  revenue={tmdbDetails.revenue}
                  awards={awards}
                  prodCompanies={prodCompanies}
                  cast={tmdbDetails.credits.cast}
                  similar={tmdbDetails.similar.results}
                />
              )}
            </>
          )}
        />

        <Route
          path="/:id/full-cast"
          exact
          render={() => <FullCast fullTeam={tmdbDetails.credits} />}
        />
      </main>
    </div>
  );
};

export default Movie;
