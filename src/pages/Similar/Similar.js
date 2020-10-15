import React from "react";
import ResultsGrid from "../../components/ResultsGrid/ResultsGrid";
import { useParams } from "react-router-dom";

const Similar = () => {
  let { id } = useParams();

  return (
    <div>
      <h2 className="mt-4 font-bold font-bai text-gray-700 xs:text-xl">
        Similar Movies
      </h2>

      <ResultsGrid url={`/tmovie/${id}/similar`} />
    </div>
  );
};

export default Similar;
