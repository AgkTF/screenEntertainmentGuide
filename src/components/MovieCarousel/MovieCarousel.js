import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import MovieSlide from "../MovieSlide/MovieSlide";
import classes from "./MovieCarousel.module.css";

//TODO: Add prop-types

const MovieCarousel = () => {
  const [windowWidth, setWindowWith] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => {
      setWindowWith(window.innerWidth);
    };

    window.addEventListener("resize", resizeHandler);

    console.log({
      windowWidth,
      padding: (windowWidth - 208) / 2,
    });
    return (_) => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [windowWidth]);

  let padding = windowWidth >= 700 ? 24 : (windowWidth - 208) / 2;
  let slidesToShow = windowWidth >= 700 ? 3 : 1;

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: `${padding}px`,
    speed: 500,
    arrows: false,
    initialSlide: 0,
    slidesToShow: slidesToShow,
  };

  return (
    <div className={classes.Container}>
      <div className="mx-auto mb-6 font-bai font-semibold text-sm text-gray-700 flex items-center justify-around max-w-xs">
        <p className="border-b-2 border-gray-700 border-opacity-25">
          Now Playing
        </p>
        <p className="opacity-50">Trending</p>
        <p className="opacity-50">Upcoming</p>
      </div>
      <Slider {...settings}>
        <MovieSlide
          posterUrl="images/1.jpg"
          altText="First Man movie poster"
          title="First Man"
          genre="Biography/Drama/History"
          imdbRating={7.3}
          metascore={84}
        />
        <MovieSlide
          posterUrl="images/2.jpg"
          altText="Mission: Impossible - Rogue Nation movie poster"
          title="Mission: Impossible - Rogue Nation"
          genre="Action/Adventure/Thriller"
          imdbRating={7.4}
          metascore={75}
        />
        <MovieSlide
          posterUrl="images/3.jpg"
          altText="The Martian movie poster"
          title="The Martian"
          genre="Adventure/Drama/Sci-Fi"
          imdbRating={8.0}
          metascore={80}
        />
        <MovieSlide
          posterUrl="images/4.jpg"
          altText="Ford v Ferrari movie poster"
          title="Ford v Ferrari"
          genre=" Action/Biography/Drama"
          imdbRating={8.1}
          metascore={81}
        />
      </Slider>
    </div>
  );
};

export default MovieCarousel;
