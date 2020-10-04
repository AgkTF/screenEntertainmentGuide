import React from "react";
import Cast from "../Cast/Cast";
import Similar from "../Similar/Similar";
import classes from "./Sections.module.css";
import { Link } from "react-router-dom";

const Sections = ({
  plot,
  directors,
  writers,
  released,
  langs,
  country,
  budget,
  revenue,
  awards,
  prodCompanies,
  cast,
  similar,
}) => {
  console.log();
  return (
    <>
      <section className="mt-6 sm:mt-8">
        <h2 className="text-sm font-bold sm:text-lg">Plot Summary</h2>
        <p className="mt-1 text-xs sm:text-sm">{plot}</p>
      </section>
      <section className="mt-5 sm:mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold sm:text-lg">Cast & Crew</h2>
          <Link to="full-cast">
            <p className="text-xs sm:text-sm flex justify-between items-center bg-gray-500 bg-opacity-25 rounded-md pr-1 pl-2 hover:bg-gray-500 hover:text-gray-200">
              See more{" "}
              <span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </p>
          </Link>
        </div>
        <div className="mt-4 flex flex-no-wrap overflow-auto">
          <Cast cast={cast} />
        </div>

        <div className={`mt-3 sm:mt-4 ${classes.CrewDetails}`}>
          <div className="flex flex-col">
            <span className="text-xs">Director</span>
            {directors}
          </div>

          <div className="sm:mt-0 flex flex-col">
            <span className="text-xs">Writer</span>
            {writers}
          </div>
        </div>
      </section>
      <section className="mt-5">
        <h2 className="text-sm font-bold sm:text-lg">Details</h2>
        <div className={`mt-1 ${classes.Details}`}>
          <div className="flex flex-col">
            <span className="text-xs">Release Date</span>
            <span className="text-xs font-semibold sm:text-sm">{released}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs">Language Spoken</span>
            <span className="text-xs font-semibold sm:text-sm">{langs}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs">Country of Origin</span>
            <span className="text-xs font-semibold sm:text-sm">{country}</span>
          </div>
        </div>
      </section>
      <section className="mt-5 sm:mt-6">
        <h2 className="text-sm font-bold sm:text-lg">Box Office</h2>
        <div className={`mt-1 ${classes.BoxDetails}`}>
          <div className="flex flex-col">
            <span className="text-xs">Budget</span>
            <span className="text-xs font-semibold tracking-wider sm:text-sm">
              <span className="text-green-600">$</span>
              {budget.toLocaleString("en-US")}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs">Revenue</span>
            <span className="text-xs font-semibold tracking-wider sm:text-sm">
              <span className="text-green-600">$</span>
              {revenue.toLocaleString("en-US")}
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
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold sm:text-lg">More Like This</h2>
          <p className="text-xs sm:text-sm flex justify-between items-center bg-gray-500 bg-opacity-25 rounded-md pr-1 pl-2 hover:bg-gray-500 hover:text-gray-200">
            See more{" "}
            <span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </p>
        </div>
        <div className="mt-2 sm:mt-3 flex flex-no-wrap overflow-auto">
          <Similar movies={similar} />
        </div>
      </section>
    </>
  );
};

export default Sections;
