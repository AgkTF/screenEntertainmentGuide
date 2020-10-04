import React, { useState, useEffect } from "react";
import classes from "./Person.module.css";
import { Link } from "react-router-dom";
import { data } from "../../utils/person-data";

const Person = ({ match, history }) => {
  console.log("Person RENDERED 🤵");
  const person_id = match.params.id;

  const [personDetails, setPersonDetails] = useState(data);
  const [moreBio, setMoreBio] = useState(false);

  const moreBioHandler = () => {
    setMoreBio((prevState) => !prevState);
  };

  const uniqueDeps = new Set(
    data.combined_credits.crew.map((work) => work.department)
  );
  const uniqueDepsArray = [...uniqueDeps];
  let combined = [];
  for (let i = 0; i < uniqueDepsArray.length; i++) {
    let single = data.combined_credits.crew.filter(
      (work) => work.department === uniqueDepsArray[i]
    );
    combined.push(single);
  }
  console.log(combined);

  let crewRoles = uniqueDepsArray.map((department, index) => (
    <section key={department} className="mt-3">
      <h3 className="font-semibold text-sm">{department}</h3>
      <div className="mt-1">
        {combined[index].map((work) => (
          <div key={work.id} className="mt-1 flex">
            <span className="text-xs font-light mr-2">
              {work.release_date !== undefined
                ? work.release_date.split("-")[0]
                : work.first_air_date.split("-")[0]}
            </span>
            <p className="text-xs">
              <Link to={`/${work.id}/details`}>
                <span className="font-semibold">
                  {work.title ? work.title : work.name}
                </span>
              </Link>
              <span className="font-hairline"> as </span>
              <span className="font-normal">{work.job}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  ));

  let actingRoles = personDetails.combined_credits.cast.map((work) => {
    let year;
    if (!work.release_date && !work.first_air_date) {
      year = "-";
    } else if (work.release_date) {
      year = work.release_date.split("-")[0];
    } else if (work.first_air_date) {
      year = work.first_air_date.split("-")[0];
    }

    let title = work.title ? work.title : work.name;
    return (
      <div key={work.id} className="mt-1 flex">
        <span className="text-xs font-light mr-2">{year}</span>
        <p className="text-xs">
          <Link to={`/${work.id}/details`}>
            <span className="font-semibold">{title}</span>
          </Link>
          {work.character ? <span className="font-hairline"> as </span> : ""}
          <span className="font-normal">{work.character}</span>
        </p>
      </div>
    );
  });

  return (
    <div className="mx-4 pt-4 font-bai text-gray-700">
      <div className="relative inset-x-0 top-0">
        <button
          className="relative text-gray-300 bg-gray-600 bg-opacity-75 rounded"
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
      </div>

      <section className="mt-4 flex">
        <div className="mr-5 w-32 h-48 rounded-lg shadow-lg overflow-hidden border-gray-500 border-2">
          <img
            className="w-full h-full object-cover"
            src="/images/13.jpg"
            alt="poster"
            // src={`https://image.tmdb.org/t/p/w185${personDetails.profile_path}`}
            // alt={`${personDetails.name} profile pic`}
          />
        </div>
        <div>
          <h1 className="font-bold text-lg">{personDetails.name}</h1>
          <div className="mt-2 flex flex-col">
            <span className="text-xs">Known for</span>
            <span className="-mt-1 text-xs font-semibold">
              {personDetails.known_for_department}
            </span>
          </div>

          <div className="mt-1 flex flex-col">
            <span className="text-xs">Place of birth</span>
            <span className="-mt-1 text-xs font-semibold leading-tight">
              {personDetails.place_of_birth}
            </span>
          </div>

          {/* //TODO: gender mapper */}
          <div className="mt-1 flex flex-col">
            <span className="text-xs">Gender</span>
            <span className="-mt-1 text-xs font-semibold">Male</span>
          </div>

          {/* //TODO: date difference */}
          <div className="mt-1 flex flex-col">
            <span className="text-xs">Birthday</span>
            <span className="-mt-1 text-xs font-semibold">
              {new Date(personDetails.birthday).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              <span className="font-normal">(50 years old)</span>
            </span>
          </div>

          {/* //TODO: null mapper */}
          <div className="mt-1 flex flex-col">
            <span className="text-xs">Deathday</span>
            <span className="-mt-1 text-xs font-semibold">Still alive</span>
          </div>
        </div>
      </section>

      <section className="relative mt-4">
        <h1 className="font-bold text-base">Biography</h1>
        <p
          className={`mt-1 text-xs whitespace-pre-line ${
            moreBio ? `${classes.More}` : `${classes.Less}`
          }`}
        >
          {personDetails.biography}
        </p>
        <button
          className="absolute right-4 font-semibold text-xs underline"
          onClick={moreBioHandler}
        >
          {moreBio ? "See less" : "See full bio"}
        </button>
      </section>

      <section className="mt-4">
        <h1 className="font-bold text-base">Known for</h1>
        <div className="mt-1 flex flex-no-wrap overflow-auto">
          {personDetails.combined_credits.cast.slice(0, 6).map((work) => (
            <div className="mr-5 flex flex-col items-center" key={work.id}>
              <div className="w-20 h-32 rounded overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w185${work.poster_path}`}
                  alt={`${work.title} Movie poster`}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-semibold text-xs leading-tight text-center">
                <Link to={`/${work.id}/details`}>{work.title}</Link>
              </p>
            </div>
          ))}
        </div>

        <section className="mt-1">
          <h3 className="font-semibold text-sm">Acting</h3>
          {actingRoles}
        </section>

        <section>{crewRoles}</section>
      </section>
    </div>
  );
};

export default Person;
