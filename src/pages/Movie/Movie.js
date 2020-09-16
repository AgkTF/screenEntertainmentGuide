import React from "react";
import star from "../../images/star.svg";
import classes from "./Movie.module.css";

const Movie = () => {
  return (
    <div className="font-bai text-gray-700">
      <div className="relative inset-x-0 top-0">
        <svg
          className="w-6 h-6 absolute top-4 left-4 z-50 text-gray-600"
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
            src="images/12.jpg"
            alt="Movie backdrop"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <main className="mx-5 relative -mt-20 sm:-mt-48 sm:mx-8 lg:mx-12">
        <section className={`relative flex items-end ${classes.PosterSec}`}>
          <div className="w-32 h-48 sm:w-40 sm:h-64 relative rounded-lg overflow-hidden border-2 border-gray-300 box-content">
            <img
              src="images/3.jpg"
              alt="Movie poster"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="ml-4 sm:ml-6 sm:flex">
            <div>
              <p className="font-bold text-lg sm:text-xl">The Martian</p>
              <p className="text-xs">Drama/Biography/Action</p>
              <p className="text-xs">PG-13 / 2h 38min</p>
            </div>
            <div className="w-full flex items-end sm:justify-end">
              <div className="mt-3 flex flex-col justify-center items-center">
                <div className="flex items-center justify-center">
                  <img
                    src={star}
                    alt="rating star"
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  />
                  <span className="ml-1 text-xs font-semibold sm:text-sm">
                    8.0
                  </span>
                </div>
                <p className="text-xs font-light">IMDb</p>
              </div>
              <div className="ml-8 text-center">
                <span className="p-1 bg-green-500 text-xs text-white font-semibold">
                  80
                </span>
                <p className="text-xs font-light">Metascore</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 sm:mt-8">
          <h2 className="text-sm font-bold sm:text-lg">Plot Summary</h2>
          <p className="mt-1 text-xs sm:text-sm">
            During a manned mission to Mars, Astronaut Mark Watney is presumed
            dead after a fierce storm and left behind by his crew. But Watney
            has survived and finds himself stranded and alone on the hostile
            planet. With only meager supplies, he must draw upon his ingenuity,
            wit and spirit to subsist and find a way to signal to Earth that he
            is alive.
          </p>
        </section>

        <section className="mt-5 sm:mt-6">
          <h2 className="text-sm font-bold sm:text-lg">Cast & Crew</h2>
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
              <span className="text-xs font-semibold sm:text-sm">
                Ridley Scott
              </span>
            </div>

            <div className="mt-2 flex flex-col">
              <span className="text-xs">Writer</span>
              <p className="text-xs font-semibold sm:text-sm">
                Drew Goddard{" "}
                <span className="italic font-light">(screenplay by)</span>
              </p>
              <p className="text-xs font-semibold sm:text-sm">
                Andy Weir{" "}
                <span className="italic font-light">
                  {" "}
                  (based on the novel by)
                </span>
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="text-sm font-bold sm:text-lg">Details</h2>
          <div className="mt-1 flex flex-wrap justify-between">
            <div className="flex flex-col">
              <span className="text-xs">Release Date</span>
              <span className="text-xs font-semibold sm:text-sm">
                02 Oct 2015
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs">Language Spoken</span>
              <span className="text-xs font-semibold sm:text-sm">
                English, Mandarin
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs">Country of Origin</span>
              <span className="text-xs font-semibold sm:text-sm">
                UK, USA, Hungary, Jordan
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
                $108,000,000
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs">Revenue</span>
              <span className="text-xs font-semibold tracking-wider sm:text-sm">
                $630,161,890
              </span>
            </div>
          </div>
        </section>

        <section className="mt-5 sm:mt-6">
          <h2 className="text-sm font-bold sm:text-lg">Awards</h2>
          <div className="mt-1 flex flex-wrap justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold sm:text-sm">
                Nominated For 7 Oscars
              </span>
              <span className="text-xs font-normal italic sm:text-sm">
                Another 40 wins & 188 nominations
              </span>
            </div>
          </div>
        </section>

        <section className="mt-5 sm:mt-6">
          <h2 className="text-sm font-bold sm:text-lg">Company Credits</h2>
          <div className="mt-1 flex flex-wrap justify-between">
            <div className="flex flex-col">
              <span className="text-xs">Production Company</span>
              <span className="text-xs font-semibold sm:text-sm">
                Scott Free Productions, Mid Atlantic Films, International
                Traders, TSG Entertainment, Genre Films, 20th Century Fox
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
