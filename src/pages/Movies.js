import React from 'react';
import Slideshow from '../components/Slideshow/Slideshow';
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';
// import ErrorBoundary from '../components/Error/Error';

const Movies = ({ movies, fn }) => {
  return (
    <>
      <Slideshow movies={movies} />
      {/* <ErrorBoundary> */}
      <MovieCarousel movies={movies} fn={fn} />
      {/* </ErrorBoundary> */}
    </>
  );
};

export default Movies;
