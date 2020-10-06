import React, { useState, useEffect, useCallback } from "react";
import classes from "./Movie.module.css";
import star from "../../images/star.svg";
import axios from "axios";
import { Route } from "react-router-dom";
import Sections from "../../components/Sections/Sections";
import FullCast from "../../components/Full-Cast/FullCast";
// import { response } from "../../utils/response";
import { timeExpander } from "../../utils/utils";
import Poster from "../../components/Poster/Poster";
import Backdrop from "../../components/Backdrop/Backdrop";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

// const omdb = {
//   Title: "The Martian",
//   Year: "2015",
//   Rated: "PG-13",
//   Released: "02 Oct 2015",
//   Runtime: "144 min",
//   Genre: "Adventure, Drama, Sci-Fi",
//   Director: "Ridley Scott",
//   Writer: "Drew Goddard (screenplay by), Andy Weir (based on the novel by)",
//   Actors: "Matt Damon, Jessica Chastain, Kristen Wiig, Jeff Daniels",
//   Plot:
//     "An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.",
//   Language: "English, Mandarin",
//   Country: "UK, USA, Hungary, Jordan",
//   Awards: "Nominated for 7 Oscars. Another 40 wins & 188 nominations.",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg",
//   Ratings: [
//     { Source: "Internet Movie Database", Value: "8.0/10" },
//     { Source: "Rotten Tomatoes", Value: "91%" },
//     { Source: "Metacritic", Value: "80/100" },
//   ],
//   Metascore: "80",
//   imdbRating: "8.0",
//   imdbVotes: "738,085",
//   imdbID: "tt3659388",
//   Type: "movie",
//   DVD: "12 Jan 2016",
//   BoxOffice: "$202,313,768",
//   Production: "20th Century Fox",
//   Website: "N/A",
//   Response: "True",
// };

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
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMBD_KEY}&append_to_response=credits%2Csimilar%2Cimages`
      )
      .then((response) => {
        console.log(response.data);
        setTmdbDetails(response.data);
        setTmdbLoading(false);
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
  }, []);

  useEffect(() => {
    fetchTMBdDetails(tmdb_id);
  }, [tmdb_id, fetchTMBdDetails]);

  useEffect(() => {
    fetchOMBdDetails(tmdbDetails.imdb_id);
  }, [fetchOMBdDetails, tmdbDetails.imdb_id]);

  let prodCompanies = !tmdbLoading ? (
    tmdbDetails.production_companies.map((company) => company.name).join(", ")
  ) : (
    <Spinner />
  );

  let langs = !tmdbLoading ? (
    tmdbDetails.spoken_languages.map((lang) => lang.name).join(", ")
  ) : (
    <Spinner />
  );

  let metascoreRating = !omdbLoading
    ? omdbDetails.Ratings.find((rating) => rating.Source === "Metacritic")
    : "";
  let metascore = metascoreRating ? metascoreRating.Value.split("/")[0] : "N/A";

  let directors;
  if (!tmdbLoading) {
    directors = tmdbDetails.credits.crew
      .filter(
        (person) =>
          person.department === "Directing" && person.job === "Director"
      )
      .map((found) => (
        <span key={found.id} className="text-xs font-semibold sm:text-sm">
          <Link to={`/person/${found.id}`}>{found.name}</Link>
        </span>
      ));
  } else {
    directors = <Spinner />;
  }

  let writers;
  if (!tmdbLoading) {
    writers = tmdbDetails.credits.crew
      .filter((person) => person.department === "Writing")
      .map((found) => {
        let job = found.job === "Writer" ? "" : ` (${found.job})`;
        return (
          <Link to={`/person/${found.id}`} key={found.id}>
            <p className="text-xs font-semibold sm:text-sm">
              {found.name}
              <span className="italic font-light">{job}</span>
            </p>
          </Link>
        );
      });
  }

  let awards;
  if (omdbLoading) {
    awards = <Spinner />;
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
          className="absolute top-4 left-4 text-gray-300 bg-gray-600 bg-opacity-75 rounded"
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

        <Backdrop
          backdrop_path={tmdbDetails.backdrop_path}
          title={tmdbDetails.title}
          images={!tmdbLoading ? tmdbDetails.images.backdrops : []}
          tmdbLoading={tmdbLoading}
        />
      </div>

      <section
        className={`mx-5 sm:mx-8 md:mx-12 relative flex items-end -mt-20 sm:-mt-48 ${classes.PosterSec}`}
      >
        <Poster
          poster_path={tmdbDetails.poster_path}
          title={tmdbDetails.title}
          images={!tmdbLoading ? tmdbDetails.images.posters : []}
          tmdbLoading={tmdbLoading}
        />
        <div className="ml-4 sm:ml-6 sm:flex">
          <div className="flex-grow flex-shrink-0">
            <p className="font-bold text-lg sm:text-xl">{tmdbDetails.title}</p>
            <p className="text-xs">
              {!omdbLoading ? (
                omdbDetails.Genre.replaceAll(", ", "/")
              ) : (
                <Spinner />
              )}
            </p>
            <p className="text-xs">
              {!omdbLoading ? (
                `${omdbDetails.Rated} / ${timeExpander(tmdbDetails.runtime)}`
              ) : (
                <Spinner />
              )}
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
                  {!omdbLoading ? omdbDetails.imdbRating : <Spinner />}
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

      <main className="mx-5 relative sm:mx-8 md:mx-12">
        <Route
          path="/:id/details"
          render={() => (
            <>
              {tmdbLoading && omdbLoading ? (
                <div className="mx-auto my-20 text-center">
                  <Spinner size="2x" />
                </div>
              ) : (
                <Sections
                  plot={omdbDetails.Plot}
                  directors={directors}
                  writers={writers}
                  released={new Date(
                    tmdbDetails.release_date
                  ).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
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
