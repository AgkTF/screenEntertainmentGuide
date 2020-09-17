import React, { useState } from "react";
import Slideshow from "../components/Slideshow/Slideshow";
import MovieCarousel from "../components/MovieCarousel/MovieCarousel";

// const [movies, setMovies] = useState([]);

const movies = [
  {
    popularity: 787.24,
    vote_count: 433,
    video: false,
    poster_path: "/20.jpg",
    id: 581392,
    adult: false,
    backdrop_path: "/20-1.jpg",
    original_language: "ko",
    original_title: "반도",
    genre_ids: [28, 27, 53],
    title: "Peninsula",
    vote_average: 7.2,
    overview:
      "A soldier and his team battle hordes of post-apocalyptic zombies in the wastelands of the Korean Peninsula.",
    release_date: "2020-08-21",
  },
  {
    popularity: 312.961,
    vote_count: 130,
    video: false,
    poster_path: "/21.jpg",
    id: 531499,
    adult: false,
    backdrop_path: "/21-1.jpg",
    original_language: "en",
    original_title: "The Tax Collector",
    genre_ids: [28, 80, 18],
    title: "The Tax Collector",
    vote_average: 6.1,
    overview:
      "David Cuevas is a family man who works as a gangland tax collector for high ranking Los Angeles gang members. He makes collections across the city with his partner Creeper making sure people pay up or will see retaliation. An old threat returns to Los Angeles that puts everything David loves in harm’s way.",
    release_date: "2020-08-07",
  },
  {
    popularity: 293.774,
    vote_count: 29,
    video: false,
    poster_path: "/22.jpg",
    id: 675490,
    adult: false,
    backdrop_path: "/22-1.jpg",
    original_language: "en",
    original_title: "The Unfamiliar",
    genre_ids: [27, 53],
    title: "The Unfamiliar",
    vote_average: 5.8,
    overview:
      "A British Army doctor comes back from a war, thinking that she has PTSD only to discover that there is a more daunting malevolence at work making the life that she knew unfamiliar.",
    release_date: "2020-08-21",
  },
  {
    popularity: 284.511,
    vote_count: 16,
    video: false,
    poster_path: "/24.jpg",
    id: 610201,
    adult: false,
    backdrop_path: "/24-1.jpg",
    original_language: "en",
    original_title: "The Pale Door",
    genre_ids: [27, 37],
    title: "The Pale Door",
    vote_average: 6,
    overview:
      "The Dalton gang escape to a nearby town after a train robbery goes south, but they are met by a coven of witches with sinister plans for the unsuspecting outlaws.",
    release_date: "2020-08-21",
  },
  {
    popularity: 271.631,
    vote_count: 1510,
    video: false,
    poster_path: "/25.jpg",
    id: 577922,
    adult: false,
    backdrop_path: "/25-1.jpg",
    original_language: "en",
    original_title: "Tenet",
    genre_ids: [28, 878, 53],
    title: "Tenet",
    vote_average: 7.5,
    overview:
      "Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
    release_date: "2020-09-03",
  },
  {
    popularity: 234.929,
    vote_count: 155,
    video: false,
    poster_path: "/26.jpg",
    id: 501979,
    adult: false,
    backdrop_path: "/26-1.jpg",
    original_language: "en",
    original_title: "Bill & Ted Face the Music",
    genre_ids: [12, 35, 878],
    title: "Bill & Ted Face the Music",
    vote_average: 6.6,
    overview:
      "Yet to fulfill their rock and roll destiny, the now middle-aged best friends Bill and Ted set out on a new adventure when a visitor from the future warns them that only their song can save life as we know it. Along the way, they are helped by their daughters, a new batch of historical figures and a few music legends—to seek the song that will set their world right and bring harmony to the universe.",
    release_date: "2020-08-28",
  },
  {
    popularity: 205.695,
    vote_count: 244,
    video: false,
    poster_path: "/27.jpg",
    id: 340102,
    adult: false,
    backdrop_path: "/27-1.jpg",
    original_language: "en",
    original_title: "The New Mutants",
    genre_ids: [28, 12, 27, 878],
    title: "The New Mutants",
    vote_average: 5.9,
    overview:
      "Five young mutants, just discovering their abilities while held in a secret facility against their will, fight to escape their past si ns and save themselves.",
    release_date: "2020-08-28",
  },
];

const Movies = () => {
  return (
    <>
      <Slideshow movies={movies} />
      <MovieCarousel movies={movies} />
    </>
  );
};

export default Movies;
