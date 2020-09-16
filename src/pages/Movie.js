import React from "react";
import star from "../images/star.svg";

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
        <div style={{ height: "18rem" }} className="">
          <img
            src="images/12.jpg"
            alt="Movie backdrop"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <main className="mx-5 relative -mt-20">
        <section className="relative flex items-end">
          <div className="h-48 w-32 relative rounded-lg overflow-hidden border-2 border-gray-300">
            <img
              src="images/3.jpg"
              alt="Movie backdrop"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="ml-4">
            <p className="font-bold text-lg">The Martian</p>
            <p className="text-xs">Drama/Biography/Action</p>
            <p className="text-xs">PG-13 / 2h 38min</p>
            <div className="w-full flex items-end">
              <div className="mt-3 flex flex-col justify-center items-center">
                <div className="flex items-center justify-center">
                  <img src={star} alt="rating star" className="w-3 h-3" />
                  <span className="ml-1 text-xs font-semibold">8.0</span>
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

        <section className="mt-6">
          <h2 className="text-sm font-bold">Plot Summary</h2>
          <p className="mt-1 text-xs">
            An astronaut becomes stranded on Mars after his team assume him
            dead, and must rely on his ingenuity to find a way to signal to
            Earth that he is alive.
          </p>
        </section>

        <section className="mt-5">
          <h2 className="text-sm font-bold">Cast & Crew</h2>
          <div className="mt-2 flex flex-no-wrap">
            <div className="flex flex-col w-16 mr-3">
              <img
                className="w-16 h-20 object-cover rounded"
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

            <div className="flex flex-col w-16 mr-3">
              <img
                className="w-16 h-20 object-cover rounded"
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

            <div className="flex flex-col w-16 mr-3">
              <img
                className="w-16 h-20 object-cover rounded"
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

            <div className="flex flex-col w-16 mr-3">
              <img
                className="w-16 h-20 object-cover rounded"
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

          <div className="mt-3 flex flex-col">
            <span className="text-xs">Director</span>
            <span className="text-xs font-semibold">Ridley Scott</span>
          </div>

          <div className="mt-2 flex flex-col">
            <span className="text-xs">Writer</span>
            <p className="text-xs font-semibold">
              Drew Goddard{" "}
              <span className="italic font-light">(screenplay by)</span>
            </p>
            <p className="text-xs font-semibold">
              Andy Weir{" "}
              <span className="italic font-light">
                {" "}
                (based on the novel by)
              </span>
            </p>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="text-sm font-bold">Details</h2>
          <div className="mt-1 flex flex-wrap justify-between">
            <div className="flex flex-col">
              <span className="text-xs">Release Date</span>
              <span className="text-xs font-semibold">02 Oct 2015</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs">Language Spoken</span>
              <span className="text-xs font-semibold">English, Mandarin</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs">Country of Origin</span>
              <span className="text-xs font-semibold">
                UK, USA, Hungary, Jordan
              </span>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="text-sm font-bold">Box Office</h2>
          <div className="mt-1 flex flex-wrap justify-between">
            <div className="flex flex-col">
              <span className="text-xs">Budget</span>
              <span className="text-xs font-semibold tracking-wider">
                $108,000,000
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs">Revenue</span>
              <span className="text-xs font-semibold tracking-wider">
                $630,161,890
              </span>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="text-sm font-bold">Awards</h2>
          <div className="mt-1 flex flex-wrap justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold">
                Nominated For 7 Oscars
              </span>
              <span className="text-xs font-normal italic">
                Another 40 wins & 188 nominations
              </span>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="text-sm font-bold">Company Credits</h2>
          <div className="mt-1 flex flex-wrap justify-between">
            <div className="flex flex-col">
              <span className="text-xs">Production Company</span>
              <span className="text-xs font-semibold">
                Scott Free Productions, Mid Atlantic Films, International
                Traders, TSG Entertainment, Genre Films, 20th Century Fox
              </span>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="text-sm font-bold">More Like This</h2>
          <div className="mt-2 flex flex-no-wrap">
            <div className="flex flex-col mr-4">
              <div className="w-20 h-32">
                <img
                  className="w-full h-full object-cover rounded"
                  src="images/18.jpg"
                  alt="poster"
                />
              </div>

              <span className="mt-1 text-center font-semibold text-xs">
                Apollo 13
              </span>
            </div>

            <div className="flex flex-col mr-4">
              <div className="w-20 h-32">
                <img
                  className="w-full h-full object-cover rounded"
                  src="images/1.jpg"
                  alt="poster"
                />
              </div>
              <span className="mt-1 text-center font-semibold text-xs">
                First Man
              </span>
            </div>

            <div className="flex flex-col mr-4">
              <div className="w-20 h-32">
                <img
                  className="w-full h-full object-cover rounded"
                  src="images/19.jpg"
                  alt="poster"
                />
              </div>
              <span className="mt-1 text-center font-semibold text-xs">
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
