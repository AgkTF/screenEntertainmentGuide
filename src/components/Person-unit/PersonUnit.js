import React from "react";
import { Link } from "react-router-dom";

const PersonUnit = ({ id, name, character, profile_path, gender }) => {
  const srcSelector = (profile_path, gender) => {
    if (!profile_path) {
      if (gender === 1) {
        return "/female-wo.svg";
      } else {
        return "/male-wo.svg";
      }
    } else {
      return "/images/17.jpg";
      // return `https://image.tmdb.org/t/p/w185${profile_path}`;
    }
  };

  return (
    <div className="mb-4 flex justify-start">
      <div className="w-20 h-24 sm:w-24 sm:h-32 flex-shrink-0 shadow-md">
        <img
          className="w-full h-full object-cover rounded"
          src={srcSelector(profile_path, gender)}
          alt={`${name}`}
          loading="lazy"
        />
      </div>
      <div className="ml-8 flex flex-col justify-center items-start">
        <p
          className="mt-2 font-semibold text-sm leading-tight"
          style={{ lineHeight: "14px" }}
        >
          <Link to={`/person/${id}`}>{name}</Link>
        </p>
        <p className="mt-1 font-light text-sm leading-tight">{character}</p>
      </div>
    </div>
  );
};

export default PersonUnit;
