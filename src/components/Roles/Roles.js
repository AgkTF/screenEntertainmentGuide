import React, { useState } from "react";
import { Link } from "react-router-dom";

const Roles = ({ known_for, cast, crew }) => {
  console.log("ROLES 🐾");

  const [filters, setFilters] = useState({
    mediaType: "movie",
    department: "",
  });

  const mediaChangeHandler = (e) => {
    e.persist();
    setFilters((prevState) => {
      return { ...prevState, mediaType: e.target.value };
    });
  };

  const depChangeHandler = (e) => {
    e.persist();
    setFilters((prevState) => {
      return { ...prevState, department: e.target.value };
    });
  };

  const sortArrayByYear = (array, media_type) => {
    let sortedArray = array.sort((role1, role2) => {
      let y1;
      let y2;

      if (media_type === "movie") {
        y1 = role1.release_date ? role1.release_date.split("-")[0] : 0;
        y2 = role2.release_date ? role2.release_date.split("-")[0] : 0;
      } else {
        y1 = role1.first_air_date ? role1.first_air_date.split("-")[0] : 0;
        y2 = role2.first_air_date ? role2.first_air_date.split("-")[0] : 0;
      }

      return y2 - y1;
    });

    return sortedArray;
  };

  const mediaTypeExtractor = (mediaArray, media_type) => {
    let sortedArray;
    if (mediaArray === undefined) {
      sortedArray = [];
    } else {
      sortedArray = mediaArray
        .filter((role) => role.media_type === media_type)
        .sort((role1, role2) => {
          let y1;
          let y2;

          if (media_type === "movie") {
            y1 = role1.release_date ? role1.release_date.split("-")[0] : 0;
            y2 = role2.release_date ? role2.release_date.split("-")[0] : 0;
          } else {
            y1 = role1.first_air_date ? role1.first_air_date.split("-")[0] : 0;
            y2 = role2.first_air_date ? role2.first_air_date.split("-")[0] : 0;
          }

          return y2 - y1;
        });
    }

    return sortedArray;
  };

  const uniqueDepsExtractor = (mediaArray) => {
    let uniqueDeps = new Set(
      mediaArray.map((work) => (work.department ? work.department : "Acting"))
    );

    return [...uniqueDeps];
  };

  const sortedCastMovies = mediaTypeExtractor(cast, "movie");
  const sortedCastTv = mediaTypeExtractor(cast, "tv");

  const sortedCrewMovies = mediaTypeExtractor(crew, "movie");
  const sortedCrewTv = mediaTypeExtractor(crew, "tv");

  let uniqueMovieDeps = uniqueDepsExtractor(sortedCrewMovies);
  let uniqueTvDeps = uniqueDepsExtractor(sortedCrewTv);

  let movieActingRoles = sortedCastMovies.map((work) => {
    let year = work.release_date ? work.release_date.split("-")[0] : "-";
    let title = work.title;
    return (
      <div key={work.id} className="mt-1 flex text-xs sm:text-sm">
        <span className="font-light mr-2">{year}</span>
        <p>
          <Link to={`/movie/${work.id}/details`}>
            <span className="font-semibold">{title}</span>
          </Link>
          {work.character ? <span className="font-hairline"> as </span> : ""}
          <span className="font-normal">{work.character}</span>
        </p>
      </div>
    );
  });

  let tvActingRoles = sortedCastTv.map((work) => {
    let year = work.first_air_date ? work.first_air_date.split("-")[0] : "-";
    let title = work.name;
    let episodes = ` (${work.episode_count} ${
      work.episode_count > 1 ? `episodes` : `episode`
    })`;
    return (
      <div key={work.credit_id} className="mt-1 flex text-xs sm:text-sm">
        <span className="font-light mr-2">{year}</span>
        <p>
          <Link to={`/${work.id}/details`}>
            <span className="font-semibold">{title}</span>
          </Link>
          <span className="font-hairline">{episodes}</span>
          {work.character ? <span className="font-hairline"> as </span> : ""}
          <span className="font-normal">{work.character}</span>
        </p>
      </div>
    );
  });

  if (movieActingRoles.length > 0) {
    uniqueMovieDeps = [...uniqueMovieDeps, "Acting"];
  }

  if (tvActingRoles.length > 0) {
    uniqueTvDeps = [...uniqueTvDeps, "Acting"];
  }

  let allFatherCrewMovieArray = [];
  for (let i = 0; i < uniqueMovieDeps.length; i++) {
    let single = sortedCrewMovies.filter(
      (work) => work.department === uniqueMovieDeps[i]
    );
    allFatherCrewMovieArray.push(single);
  }

  let allFatherCrewTvArray = [];
  for (let i = 0; i < uniqueTvDeps.length; i++) {
    let single = sortedCrewTv.filter(
      (work) => work.department === uniqueTvDeps[i]
    );
    allFatherCrewTvArray.push(single);
  }

  const createDataToRender = (mediaType, dep) => {
    let dataToRender;
    if (mediaType === "movie" && dep === "Acting") {
      dataToRender = movieActingRoles;
    } else if (mediaType === "tv" && dep === "Acting") {
      dataToRender = tvActingRoles;
    } else if (mediaType === "movie" && dep !== "Acting") {
      let index = uniqueMovieDeps.indexOf(dep);
      if (index === -1) {
        return <p>Nothing here</p>;
      }

      let sortedAllFatherMovies = sortArrayByYear(allFatherCrewMovieArray);

      dataToRender = sortedAllFatherMovies[index].map((work) => (
        <div key={work.id} className="mt-1 flex text-xs sm:text-sm">
          <span className="font-light mr-2">
            {work.release_date ? work.release_date.split("-")[0] : ""}
          </span>
          <p>
            <Link to={`/movie/${work.id}/details`}>
              <span className="font-semibold">
                {work.title ? work.title : ""}
              </span>
            </Link>
            <span className="font-hairline"> as </span>
            <span className="font-normal">{work.job}</span>
          </p>
        </div>
      ));
    } else if (mediaType === "tv" && dep !== "Acting") {
      let index = uniqueTvDeps.indexOf(dep);
      if (index === -1) {
        return <p>Nothing here</p>;
      }
      let sortedAllFatherTv = sortArrayByYear(allFatherCrewTvArray);

      dataToRender = sortedAllFatherTv[index].map((work) => (
        <div key={work.credit_id} className="mt-1 flex text-xs sm:text-sm">
          <span className="font-light mr-2 flex-shrink-0">
            {work.first_air_date ? work.first_air_date.split("-")[0] : ""}
          </span>
          <p>
            <Link to={`/${work.id}/details`}>
              <span className="font-semibold">
                {work.name ? work.name : ""}
              </span>
            </Link>
            <span className="font-hairline"> as </span>
            <span className="font-normal">{work.job}</span>
          </p>
        </div>
      ));
    }

    return dataToRender;
  };

  let rolesToRender = createDataToRender(
    filters.mediaType,
    !filters.department ? known_for : filters.department
  );

  let optionDeps =
    filters.mediaType === "movie" ? uniqueMovieDeps : uniqueTvDeps;

  return (
    <>
      <section className="mt-3">
        <div className="flex justify-between">
          <h3 className="font-semibold text-sm sm:text-base">
            {!filters.department ? known_for : filters.department}
          </h3>
          <div className="text-xs sm:text-sm">
            <select
              value={filters.mediaType}
              onChange={mediaChangeHandler}
              className="px-1 rounded bg-gray-500 text-gray-200"
            >
              <option value="movie">Movies</option>
              <option value="tv">TV Shows</option>
            </select>

            <select
              value={filters.department}
              onChange={depChangeHandler}
              className="ml-4 px-1 rounded bg-gray-500 text-gray-200"
            >
              <option value="" disabled>
                Department
              </option>
              {optionDeps.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-2">{rolesToRender}</div>
      </section>
    </>
  );
};

export default Roles;
