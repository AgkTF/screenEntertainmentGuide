import React from "react";
// import G from "../images/g.png";
import G from "../../images/g.png";
import NC17 from "../../images/nc-17.png";
import NotRated from "../../images/not-rated.png";
import PG13 from "../../images/pg-13.png";
import PG from "../../images/pg.png";
import R from "../../images/r.png";
import Unrated from "../../images/unrated.png";

const Rating = ({ rated }) => {
  let src;
  if (!rated) {
    return;
  }

  switch (rated) {
    case "G":
      src = G;
      break;

    case "NC-17":
      src = NC17;
      break;

    case "Not Rated":
      src = NotRated;
      break;

    case "PG-13":
      src = PG13;
      break;

    case "PG":
      src = PG;
      break;

    case "R":
      src = R;
      break;

    case "Unrated":
      src = Unrated;
      break;

    default:
      break;
  }

  return (
    <div className="">
      <img
        src={src}
        alt={`${rated} icon`}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Rating;
