import React, { useState, useCallback, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import { genreMapper } from "../../utils/utils";
import Image from "../../components/Image/Image";
import ReactPaginate from "react-paginate";
import axios from "../../axios";
import { Link } from "react-router-dom";
import classes from "./ResultsGrid.module.css";

const ResultsGrid = ({ url }) => {
  const [{ results, totalPages, loading }, setCombinedState] = useState({
    results: [],
    totalPages: 0,
    loading: true,
  });

  const fetchResults = useCallback(
    (newPage = 1) => {
      axios
        .get(`${url}?page=${newPage}`)
        .then((response) => {
          console.log(response.data);
          setCombinedState((prevState) => {
            return {
              ...prevState,
              results: response.data.similar,
              totalPages: response.data.total_pages,
              loading: false,
            };
          });
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
    },
    [url]
  );

  useEffect(
    (newPage) => {
      fetchResults(newPage);
    },
    [fetchResults]
  );

  const createData = (data) => {
    return data.map((entry) => (
      <div
        className="h-20 py-3 pr-3 flex items-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-sm text-gray-700"
        key={entry.id}
      >
        <div className="w-12 h-20 flex-shrink-0 text-gray-600 rounded-md overflow-hidden">
          <Image
            url={`https://image.tmdb.org/t/p/w92${entry.poster_path}`}
            altText={`"${entry.title}" poster`}
          />
        </div>
        <div className="ml-3 text-sm">
          <h3 className="font-semibold leading-tight">
            <Link to={`/movie/${entry.id}/details`}>{entry.title}</Link>
            <span className="ml-1 font-normal text-gray-500 text-xs ">
              ({entry.release_date.split("-")[0]})
            </span>
          </h3>
          <p className="mt-1 text-xs">{genreMapper(entry.genre_ids)}</p>
        </div>
      </div>
    ));
  };

  return (
    <>
      {loading ? (
        <div className="mt-8 text-green-600 flex items-center justify-center">
          <Spinner size="2x" />
        </div>
      ) : (
        <div className="mt-5 grid gap-y-4 xs:grid-cols-2 xs:gap-4">
          {createData(results)}
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
        breakLabel={"..."}
        breakClassName="text-white tracking-widest"
        pageCount={totalPages}
        pageClassName={`px-1 h-5 text-center text-gray-500 bg-gray-300 rounded shadow-lg ${classes.page}`}
        activeClassName="text-gray-600"
        activeLinkClassName="font-bold text-blue-600"
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        containerClassName="my-8 mx-auto max-w-md font-semibold text-sm text-gray-600 bg-gray-500 rounded-lg flex h-8 items-center justify-around"
        onPageChange={(data) => fetchResults(data.selected + 1)}
      />
    </>
  );
};

export default ResultsGrid;
