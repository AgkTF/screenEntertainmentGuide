import React, { useState, useEffect } from "react";
import classes from "./Person.module.css";
import { Link } from "react-router-dom";
import Roles from "../../components/Roles/Roles";
import axios from "../../axios";
import Spinner from "../../components/Spinner/Spinner";
import { srcSelector } from "../../utils/utils";
import Image from "../../components/Image/Image";

const Person = ({ match, history }) => {
  console.log("Person RENDERED 🤵");
  const person_id = match.params.id;

  const [personDetails, setPersonDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(true);

  const [moreBio, setMoreBio] = useState(false);

  const moreBioHandler = () => {
    setMoreBio((prevState) => !prevState);
  };

  //TODO: check the language parameter for any problems
  useEffect(() => {
    axios
      .get(`/person/${person_id}`)
      .then((response) => {
        console.log(response.data.person);
        setPersonDetails(response.data.person);
        setDetailsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [person_id]);

  let genderToRender;
  switch (personDetails.gender) {
    case 0:
      genderToRender = "N/A";
      break;

    case 1:
      genderToRender = "Female";
      break;

    case 2:
      genderToRender = "Male";
      break;

    default:
      genderToRender = "N/A";
  }

  return (
    <div className="mx-4 xs:mx-6 sm:mx-10 pt-16 font-bai text-gray-700">
      <section className="mt-3 flex">
        <div className="mr-5 xs:mr-10 sm:mr-14 w-32 xs:w-40 h-48 xs:h-64 rounded-lg shadow-lg overflow-hidden border-gray-500 border-2 flex-shrink-0">
          <Image
            url={srcSelector(personDetails.profile_path, personDetails.gender)}
            altText={`${personDetails.name} profile pic`}
          />
        </div>
        <div>
          <h1 className="font-bold text-lg xs:text-xl sm:text-2xl">
            {personDetails.name}
          </h1>
          <div className="mt-2 flex flex-col">
            <span className="text-xs xs:text-sm">Known for</span>
            <span className="-mt-1 text-xs xs:text-sm font-semibold">
              {personDetails.known_for_department}
            </span>
          </div>

          <div className="mt-1 flex flex-col">
            <span className="text-xs xs:text-sm">Place of birth</span>
            <span className="-mt-1 text-xs xs:text-sm font-semibold leading-tight">
              {!personDetails.place_of_birth
                ? "-"
                : personDetails.place_of_birth}
            </span>
          </div>

          <div className="mt-1 flex flex-col">
            <span className="text-xs xs:text-sm">Gender</span>
            <span className="-mt-1 text-xs xs:text-sm font-semibold">
              {genderToRender}
            </span>
          </div>

          {/* Not an accurate age but I think couple of days won't make a big difference here */}
          <div className="mt-1 flex flex-col">
            <span className="text-xs xs:text-sm">Birthday</span>
            <span className="-mt-1 text-xs xs:text-sm font-semibold">
              {!personDetails.birthday
                ? "-"
                : new Date(personDetails.birthday).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
              {personDetails.birthday && (
                <span className="font-normal">{`(${Math.trunc(
                  (new Date() - new Date(personDetails.birthday)) /
                    1000 /
                    60 /
                    60 /
                    24 /
                    365
                )} years old)`}</span>
              )}
            </span>
          </div>

          {!personDetails.deathday ? (
            <p></p>
          ) : (
            <div className="mt-1 flex flex-col">
              <span className="text-xs xs:text-sm">Deathday</span>
              <span className="-mt-1 text-xs xs:text-sm font-semibold">
                {personDetails.deathday}
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="relative mt-4">
        <h1 className="font-bold text-base">Biography</h1>
        <p
          className={`mt-1 text-xs sm:text-sm whitespace-pre-line ${
            moreBio ? `${classes.More}` : `${classes.Less}`
          }`}
        >
          {personDetails.biography ? (
            personDetails.biography
          ) : (
            <span className="font-medium text-sm">
              There is no bio for {personDetails.name}
            </span>
          )}
        </p>
        {personDetails.biography && (
          <button
            className="absolute right-4 font-semibold text-xs sm:text-sm underline"
            onClick={moreBioHandler}
          >
            {moreBio ? "See less" : "See full bio"}
          </button>
        )}
      </section>

      <section className="mt-4 sm:mt-8">
        <h1 className="font-bold text-base">Known for</h1>
        <div className="mt-1 sm:mt-2 flex flex-no-wrap overflow-auto">
          {!detailsLoading ? (
            personDetails.combined_credits.cast.slice(0, 6).map((work) => (
              <div
                className="mr-5 sm:mr-4 flex flex-col items-center"
                key={work.id}
              >
                <div className="w-20 sm:w-24 h-32 sm:h-40 rounded-md overflow-hidden">
                  <Image
                    url={
                      work.poster_path
                        ? `https://image.tmdb.org/t/p/w185${work.poster_path}`
                        : ""
                    }
                    altText={`${work.title} Movie poster`}
                  />
                </div>
                <p className="sm:mt-1 font-semibold text-xs sm:text-sm leading-tight text-center">
                  <Link to={`/movie/${work.id}/details`}>{work.title}</Link>
                </p>
              </div>
            ))
          ) : (
            <Spinner />
          )}
        </div>

        <section className="relative mt-1">
          <Roles
            known_for={personDetails.known_for_department}
            cast={!detailsLoading ? personDetails.combined_credits.cast : []}
            crew={!detailsLoading ? personDetails.combined_credits.crew : []}
          />
        </section>
      </section>
    </div>
  );
};

export default Person;
