import React, { useState, useEffect, useCallback } from "react";
import star from "../../images/star.svg";
import axios from "axios";
import classes from "./Movie.module.css";

const Movie = ({ match }) => {
  console.log(match);

  //TODO: useReducer()
  const [tmdbDetails, setTmdbDetails] = useState({});
  const [omdbDetails, setOmdbDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchOMBdDetails = useCallback((imdb_id) => {
    axios
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMBD_KEY}&i=${imdb_id}&plot=full`
      )
      .then((response) => {
        console.log({ imdb: response.data });
        setOmdbDetails(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const tmdb_id = match.params.id;
  let prodCompanies = !isLoading
    ? tmdbDetails.production_companies.map((company) => company.name).join(", ")
    : "💩";
  let langs = !isLoading
    ? tmdbDetails.spoken_languages.map((lang) => lang.name).join(", ")
    : "💩";

  const fetchTMBdDetails = useCallback(
    (id) => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMBD_KEY}&language=en-US`
        )
        .then((response) => {
          console.log(response.data);
          setTmdbDetails(response.data);
          let imdb_id = response.data && response.data.imdb_id;
          if (!imdb_id) return;
          fetchOMBdDetails(imdb_id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [fetchOMBdDetails]
  );

  useEffect(() => {
    fetchTMBdDetails(tmdb_id);
  }, [fetchTMBdDetails, tmdb_id]);

  let metascoreRating = !isLoading
    ? omdbDetails.Ratings.find((rating) => rating.Source === "Metacritic")
    : "";
  let metascore = metascoreRating ? metascoreRating.Value.split("/")[0] : "💩";

  let awards;
  if (isLoading) {
    awards = "💩";
  } else if (
    !isLoading &&
    (omdbDetails.Awards === "" || omdbDetails.Awards === "N/A")
  ) {
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

  let directors;
  if (!isLoading) {
    directors = omdbDetails.Director.split(", ").map((director) => (
      <span key={director} className="text-xs font-semibold sm:text-sm">
        {director}
      </span>
    ));
  } else {
    directors = "💩";
  }

  let writers;
  if (!isLoading) {
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
        <p key={parts[0]} className="text-xs font-semibold sm:text-sm">
          {parts[0]}
          <span className="italic font-light">{`(${parts[1]}`}</span>
        </p>
      );
    });
  } else {
    writers = "💩";
  }

  console.log(writers);

  return (
    <div className="font-bai text-gray-700">
      <div className="relative inset-x-0 top-0">
        <svg
          className="w-6 h-6 absolute top-4 left-4 z-50 text-gray-300 bg-gray-600 bg-opacity-75 rounded"
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
        <div className={classes.Backdrop}>
          <img
            src={`https://image.tmdb.org/t/p/w780${tmdbDetails.backdrop_path}`}
            alt={`${tmdbDetails.title} backdrop`}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <main className="mx-5 relative -mt-20 sm:-mt-48 sm:mx-8 lg:mx-12">
        <section className={`relative flex items-end ${classes.PosterSec}`}>
          <div className="w-32 h-48 sm:w-40 sm:h-64 relative rounded-lg overflow-hidden border-2 border-gray-300 box-content">
            <img
              src={`https://image.tmdb.org/t/p/w342${tmdbDetails.poster_path}`}
              alt={`${tmdbDetails.title} poster`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="ml-4 sm:ml-6 sm:flex">
            <div className="flex-grow flex-shrink-0">
              <p className="font-bold text-lg sm:text-xl">
                {tmdbDetails.title}
              </p>
              <p className="text-xs">
                {!isLoading ? omdbDetails.Genre.replaceAll(", ", "/") : "💩"}
              </p>
              <p className="text-xs">
                {!isLoading
                  ? `${omdbDetails.Rated} / ${omdbDetails.Runtime}`
                  : "💩"}
                {/* PG-13 / 2h 38min */}
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
                    {!isLoading && omdbDetails.imdbRating}
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

        <section className="mt-6 sm:mt-8">
          <h2 className="text-sm font-bold sm:text-lg">Plot Summary</h2>
          <p className="mt-1 text-xs sm:text-sm">
            {!isLoading ? omdbDetails.Plot : "💩"}
          </p>
        </section>

        <section className="mt-5 sm:mt-6">
          <h2 className="text-sm font-bold sm:text-lg">Main Cast & Crew</h2>
          <div className="mt-2 flex flex-no-wrap">
            <div className="flex flex-col w-16 mr-3 sm:mr-4">
              <img
                className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded"
                src="images/13.jpg"
                alt="actor"
              />
              <p
                className="mt-1 flex flex-col justify-center items-center font-semibold text-xs"
                style={{ lineHeight: "14px" }}
              >
                <span>Matt</span>
                <span>Damon</span>
              </p>
            </div>

            <div className="flex flex-col w-16 mr-3 sm:mr-4">
              <img
                className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded"
                src="images/14.jpg"
                alt="actor"
              />
              <p
                className="mt-1 flex flex-col justify-center items-center font-semibold text-xs"
                style={{ lineHeight: "14px" }}
              >
                <span>Jeff</span>
                <span>Daniels</span>
              </p>
            </div>

            <div className="flex flex-col w-16 mr-3 sm:mr-4">
              <img
                className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded"
                src="images/15.jpg"
                alt="actor"
              />
              <p
                className="mt-1 flex flex-col justify-center items-center font-semibold text-xs"
                style={{ lineHeight: "14px" }}
              >
                <span>Jessica</span>
                <span>Chastain</span>
              </p>
            </div>

            <div className="flex flex-col w-16 mr-3 sm:mr-4">
              <img
                className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded"
                src="images/16.jpg"
                alt="actor"
              />
              <p
                className="mt-1 flex flex-col justify-center items-center font-semibold text-xs"
                style={{ lineHeight: "14px" }}
              >
                <span>Kristen </span>
                <span>Wiig</span>
              </p>
            </div>
          </div>

          <div className={`mt-3 sm:mt-4 ${classes.CrewDetails}`}>
            <div className="flex flex-col">
              <span className="text-xs">Director</span>
              {directors}
            </div>

            <div className="mt-2 sm:mt-0 flex flex-col">
              <span className="text-xs">Writer</span>
              {writers}
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="text-sm font-bold sm:text-lg">Details</h2>
          <div
            className={`mt-1 flex flex-wrap justify-between ${classes.Details}`}
          >
            <div className="flex flex-col">
              <span className="text-xs">Release Date</span>
              <span className="text-xs font-semibold sm:text-sm">
                {!isLoading ? omdbDetails.Released : "💩"}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs">Language Spoken</span>
              <span className="text-xs font-semibold sm:text-sm">{langs}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs">Country of Origin</span>
              <span className="text-xs font-semibold sm:text-sm">
                {!isLoading ? omdbDetails.Country : "💩"}
              </span>
            </div>
          </div>
        </section>

        <section className="mt-5 sm:mt-6">
          <h2 className="text-sm font-bold sm:text-lg">Box Office</h2>
          <div
            className={`mt-1 flex flex-wrap justify-between ${classes.BoxDetails}`}
          >
            <div className="flex flex-col">
              <span className="text-xs">Budget</span>
              <span className="text-xs font-semibold tracking-wider sm:text-sm">
                {!isLoading
                  ? `$${tmdbDetails.budget.toLocaleString("en-US")}`
                  : "💩"}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs">Revenue</span>
              <span className="text-xs font-semibold tracking-wider sm:text-sm">
                {!isLoading
                  ? `$${tmdbDetails.revenue.toLocaleString("en-US")}`
                  : "💩"}
              </span>
            </div>
          </div>
        </section>

        <section className="mt-5 sm:mt-6">
          <h2 className="text-sm font-bold sm:text-lg">Awards</h2>
          <div className="mt-1 flex flex-wrap justify-between">
            <div className="flex flex-col">{awards}</div>
          </div>
        </section>

        <section className="mt-5 sm:mt-6">
          <h2 className="text-sm font-bold sm:text-lg">Company Credits</h2>
          <div className="mt-1 flex flex-wrap justify-between">
            <div className="flex flex-col">
              <span className="text-xs">Production Company</span>
              <span className="text-xs font-semibold sm:text-sm">
                {prodCompanies}
              </span>
            </div>
          </div>
        </section>

        <section className="mt-5 sm:mt-6">
          <h2 className="text-sm font-bold sm:text-lg">More Like This</h2>
          <div className="mt-2 sm:mt-3 flex flex-no-wrap">
            <div className="flex flex-col mr-4">
              <div className="w-20 h-32 sm:w-24 sm:h-40 rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="images/18.jpg"
                  alt="poster"
                />
              </div>

              <span className="mt-1 text-center font-semibold text-xs sm:text-sm">
                Apollo 13
              </span>
            </div>

            <div className="flex flex-col mr-4">
              <div className="w-20 h-32 sm:w-24 sm:h-40 rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="images/1.jpg"
                  alt="poster"
                />
              </div>
              <span className="mt-1 text-center font-semibold text-xs sm:text-sm">
                First Man
              </span>
            </div>

            <div className="flex flex-col mr-4">
              <div className="w-20 h-32 sm:w-24 sm:h-40 rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="images/19.jpg"
                  alt="poster"
                />
              </div>
              <span className="mt-1 text-center font-semibold text-xs sm:text-sm">
                Gravity
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Movie;
