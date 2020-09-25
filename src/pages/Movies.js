import React from "react";
import Slideshow from "../components/Slideshow/Slideshow";
import MovieCarousel from "../components/MovieCarousel/MovieCarousel";

const Movies = ({ movies }) => {
  return (
    <>
      <Slideshow movies={movies} />
      <MovieCarousel movies={movies} />
    </>
  );
};

export default Movies;
