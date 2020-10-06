import React from "react";
import { Link } from "react-router-dom";
import { srcSelector } from "../../utils/utils";

const PersonUnit = ({ id, name, character, profile_path, gender }) => {
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
