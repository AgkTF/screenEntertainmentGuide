import React from "react";
import { Link } from "react-router-dom";
import { srcSelector } from "../../utils/utils";
import Image from "../Image/Image";

const Cast = ({ cast }) => {
  let rendered = cast
    ? cast.slice(0, 6).map((actor) => (
        <div key={actor.id} className="flex flex-col mr-3 sm:mr-4">
          <div className="w-20 h-24 sm:w-24 sm:h-32">
            <Image
              url={srcSelector(actor.profile_path, actor.gender)}
              altText={`${actor.name} Profile Pic`}
            />
          </div>
          <p
            className="mt-2 font-semibold text-xs sm:text-sm text-center"
            style={{ lineHeight: "14px" }}
          >
            <Link to={`/person/${actor.id}`}>{actor.name}</Link>
          </p>
          <p className="mt-1 font-light text-xs text-center">
            <span>{actor.character}</span>
          </p>
        </div>
      ))
    : "💩";

  return rendered;
};

export default Cast;
