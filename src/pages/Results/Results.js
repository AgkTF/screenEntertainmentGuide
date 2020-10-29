import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import * as queryString from 'query-string';
import axios from '../../axios';
import Spinner from '../../components/Spinner/Spinner';
import classes from './Results.module.css';
import { genreMapper } from '../../utils/utils';
import Image from '../../components/Image/Image';
import ReactPaginate from 'react-paginate';

//TODO: add a spinner when the data is being loaded
const Results = () => {
  const location = useLocation();
  const query = queryString.parse(location.search).q;
  const encodedQuery = encodeURIComponent(queryString.parse(location.search).q);
  // console.log("🚀", encodedQuery);

  const [current, setCurrent] = useState('movies');
  const [{ results, totalPages, loading }, setCombinedState] = useState({
    results: [],
    totalPages: 0,
    loading: true,
  });

  const fetchResults = useCallback(
    (newPage = 1) => {
      if (!encodedQuery) return;

      axios
        .get(`/search/${encodedQuery}?page=${newPage}`)
        .then((response) => {
          // console.log(response.data);
          setCombinedState((prevState) => {
            return {
              ...prevState,
              results: response.data.results,
              totalPages: response.data.total_pages,
              loading: false,
            };
          });
        })
        .catch((error) => {
          if (error.response) {
            // console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            console.log(error.request);
          } else {
            // console.log("Error", error.message);
          }
        });
    },
    [encodedQuery]
  );

  useEffect(
    (newPage) => {
      fetchResults(newPage);
    },
    [fetchResults]
  );

  let resultsCount = results ? results.length : <Spinner />;

  let movies = results
    ? results.filter((result) => result.media_type === 'movie')
    : [];

  let tv = results
    ? results.filter((result) => result.media_type === 'tv')
    : [];

  let people = results
    ? results.filter((result) => result.media_type === 'person')
    : [];

  const createData = (current) => {
    switch (current) {
      case 'movies':
        return movies.map((movie) => (
          <div
            className="h-20 py-3 pr-3 flex items-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-sm text-gray-700"
            key={movie.id}
          >
            <div className="w-12 h-20 flex-shrink-0 text-gray-600 rounded-md overflow-hidden">
              <Link to={`/movie/${movie.id}/details`}>
                {' '}
                <Image
                  url={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  altText={`"${movie.title}" poster`}
                />
              </Link>
            </div>
            <div className="ml-3 text-sm">
              <h3 className="font-semibold leading-tight">
                <Link to={`/movie/${movie.id}/details`}>{movie.title}</Link>
                <span className="ml-1 font-normal text-gray-500 text-xs ">
                  ({movie.release_date.split('-')[0]})
                </span>
              </h3>
              <p className="mt-1 text-xs">{genreMapper(movie.genre_ids)}</p>
            </div>
          </div>
        ));

      case 'tv':
        return tv.map((show) => (
          <div
            className="h-20 py-3 pr-3 flex items-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-sm text-gray-700"
            key={show.id}
          >
            <div className="w-12 h-20 flex-shrink-0 text-gray-600 rounded-md overflow-hidden">
              <Link to={`/show/${show.id}/details`}>
                <Image
                  url={`https://image.tmdb.org/t/p/w92${show.poster_path}`}
                  altText={show.name}
                />
              </Link>
            </div>
            <div className="ml-3 text-sm">
              <h3 className="font-semibold leading-tight">
                <Link to={`/show/${show.id}/details`}>{show.name}</Link>
                <span className="ml-1 font-normal text-gray-500 text-xs">
                  ({show.first_air_date.split('-')[0]})
                </span>
              </h3>
              <p className="mt-1 text-xs">{genreMapper(show.genre_ids)}</p>
            </div>
          </div>
        ));

      case 'people':
        //FIXME: the works disappear when moving between categories
        return people.map((person) => (
          <div
            className="h-20 py-3 pr-3 flex items-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-sm text-gray-700"
            key={person.id}
          >
            <div className="w-12 h-20 flex-shrink-0 text-gray-600 rounded-md overflow-hidden">
              <Link to={`/person/${person.id}`}>
                <Image
                  url={`https://image.tmdb.org/t/p/w92${person.profile_path}`}
                  altText={person.name}
                />
              </Link>
            </div>
            <div className="ml-3 text-sm">
              <h3 className="font-semibold leading-tight">
                <Link to={`/person/${person.id}`}>{person.name}</Link>
              </h3>
              <p className="text-xs font-medium">
                {person.known_for_department}
              </p>
              <div className="mt-1 text-xs truncate">
                {person.known_for.splice(0, 3).map((work, i) =>
                  work.title ? (
                    <span key={work.id} className="hover:text-blue-700">
                      <Link to={`/movie/${work.id}/details`}>
                        {work.title}
                        {i < 2 ? ', ' : ''}
                      </Link>
                    </span>
                  ) : (
                    <span key={work.id} className="hover:text-blue-700">
                      {work.name}
                      {i < 2 ? ', ' : ''}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        ));

      default:
        return <Spinner />;
    }
  };

  return (
    <div className="pt-12 sm:pt-16 mx-5 font-bai text-gray-700">
      <h2 className="mt-4 font-bold xs:text-xl">
        Displaying {resultsCount} results for{' '}
        <span className="italic">"{query}"</span>
      </h2>
      <div>
        <div className="pb-2 mt-5 flex justify-between text-sm font-semibold border-b-2 border-gray-300 max-w-sm mx-auto">
          <button
            className={`sm:text-base font-semibold hover:text-gray-700 ${
              current === 'movies' ? '' : 'text-gray-500'
            }`}
            onClick={() => setCurrent('movies')}
            disabled={!movies.length ? true : false}
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
              current === 'tv' ? '' : 'text-gray-500'
            }`}
            onClick={() => setCurrent('tv')}
            disabled={!tv.length ? true : false}
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
              current === 'people' ? '' : 'text-gray-500'
            }`}
            onClick={() => setCurrent('people')}
            disabled={!people.length ? true : false}
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

      {loading ? (
        <div className="mt-8 text-green-600 flex items-center justify-center">
          <Spinner size="2x" />
        </div>
      ) : (
        <div className="mt-5 grid gap-y-4 xs:grid-cols-2 xs:gap-4">
          {createData(current)}
        </div>
      )}

      <ReactPaginate
        previousLabel={
          <p className="flex flex-row-reverse items-center justify-center">
            <span>Previous</span>
            <span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </p>
        }
        previousClassName="bg-gray-300 pr-2 rounded shadow-lg"
        previousLinkClassName="font-semibold text-gray-700"
        nextLabel={
          <p className="flex items-center justify-center">
            <span className="ml-2">Next</span>
            <span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </p>
        }
        nextClassName="bg-gray-300 px-1 rounded shadow-lg"
        nextLinkClassName="font-semibold text-gray-700"
        disabledClassName="text-gray-500 cursor-not-allowed"
        breakLabel={'...'}
        breakClassName="text-white tracking-widest"
        pageCount={totalPages}
        pageClassName={`px-1 h-5 text-center text-gray-500 bg-gray-300 rounded shadow-lg ${classes.page}`}
        activeClassName="text-gray-600"
        activeLinkClassName="font-bold text-blue-600"
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        containerClassName="my-8 mx-auto max-w-md font-semibold text-sm text-gray-600 bg-gray-500 rounded-lg flex h-8 items-center justify-around list-none"
        onPageChange={(data) => fetchResults(data.selected + 1)}
      />
    </div>
  );
};

export default Results;
