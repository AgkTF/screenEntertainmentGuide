import React, { useState, useEffect, useCallback } from "react";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie/Movie";
import Person from "./pages/Person/Person";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "./axios";
import Navbar from "./components/Navbar/Navbar";
import Results from "./pages/Results/Results";
import Footer from "./components/Footer/footer";

function App() {
  console.log("APP Rendered 🎬");

  const [category, setCategory] = useState("now_playing");
  const [nowPlayingMovies, setNowPlayingMovies] = useState([
    {
      popularity: 3739.463,
      vote_count: 133,
      video: false,
      poster_path: "/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg",
      id: 528085,
      adult: false,
      backdrop_path: "/5UkzNSOK561c2QRy2Zr4AkADzLT.jpg",
      original_language: "en",
      original_title: "2067",
      genre_ids: [18, 878, 53],
      title: "2067",
      vote_average: 5.9,
      overview:
        "A lowly utility worker is called to the future by a mysterious radio signal, he must leave his dying wife to embark on a journey that will force him to face his deepest fears in an attempt to change the fabric of reality and save humankind from its greatest environmental crisis yet.",
      release_date: "2020-10-01",
    },
    {
      popularity: 1168.889,
      vote_count: 2524,
      video: false,
      poster_path: "/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
      id: 337401,
      adult: false,
      backdrop_path: "/zzWGRw277MNoCs3zhyG3YmYQsXv.jpg",
      original_language: "en",
      original_title: "Mulan",
      genre_ids: [28, 12, 18, 14],
      title: "Mulan",
      vote_average: 7.3,
      overview:
        "When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns, Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father. She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun, she is tested every step of the way and must harness her innermost strength and embrace her true potential.",
      release_date: "2020-09-04",
    },
    {
      popularity: 1032.342,
      vote_count: 147,
      video: false,
      poster_path: "/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
      id: 694919,
      adult: false,
      backdrop_path: "/pq0JSpwyT2URytdFG0euztQPAyR.jpg",
      original_language: "en",
      original_title: "Money Plane",
      genre_ids: [28],
      title: "Money Plane",
      vote_average: 6,
      overview:
        "A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.",
      release_date: "2020-09-29",
    },
    {
      popularity: 875.413,
      vote_count: 308,
      video: false,
      poster_path: "/uOw5JD8IlD546feZ6oxbIjvN66P.jpg",
      id: 718444,
      adult: false,
      backdrop_path: "/x4UkhIQuHIJyeeOTdcbZ3t3gBSa.jpg",
      original_language: "en",
      original_title: "Rogue",
      genre_ids: [28],
      title: "Rogue",
      vote_average: 5.9,
      overview:
        "Battle-hardened O’Hara leads a lively mercenary team of soldiers on a daring mission: rescue hostages from their captors in remote Africa. But as the mission goes awry and the team is stranded, O’Hara’s squad must face a bloody, brutal encounter with a gang of rebels.",
      release_date: "2020-08-20",
    },
    {
      popularity: 819.844,
      vote_count: 495,
      video: false,
      poster_path: "/qzA87Wf4jo1h8JMk9GilyIYvwsA.jpg",
      id: 539885,
      adult: false,
      backdrop_path: "/54yOImQgj8i85u9hxxnaIQBRUuo.jpg",
      original_language: "en",
      original_title: "Ava",
      genre_ids: [28, 80, 18, 53],
      title: "Ava",
      vote_average: 5.9,
      overview:
        "A black ops assassin is forced to fight for her own survival after a job goes dangerously wrong.",
      release_date: "2020-07-02",
    },
  ]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const clickHandler = (cat) => {
    console.log(cat);
    setCategory(cat);
  };

  const fetchCategory = useCallback((category) => {
    let url;
    if (category === "now_playing") {
      url = "/movies/now-playing";
    } else if (category === "trending") {
      url = "/movies/trending";
    } else if (category === "upcoming") {
      url = "/movies/upcoming";
    }

    axios
      .get(url)
      .then((response) => {
        console.log(response);
        if (category === "now_playing") {
          setNowPlayingMovies(response.data.movies);
        } else if (category === "trending") {
          setTrendingMovies(response.data.movies);
        } else if (category === "upcoming") {
          setUpcomingMovies(response.data.movies);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }, []);

  // useEffect(() => {
  //   if (
  //     (category === "now_playing" && nowPlayingMovies.length > 0) ||
  //     (category === "trending" && trendingMovies.length > 0) ||
  //     (category === "upcoming" && upcomingMovies.length > 0)
  //   )
  //     return;

  //   fetchCategory(category);
  // }, [
  //   fetchCategory,
  //   category,
  //   nowPlayingMovies.length,
  //   trendingMovies.length,
  //   upcomingMovies.length,
  // ]);

  return (
    <>
      <div
        className={`pb-4 relative mx-auto max-w-3xl bg-gray-100 shadow-lg min-h-screen`}
      >
        <Navbar />

        <div>
          <Switch>
            <Route path="/person/:id" exact component={Person} />
            <Route
              path="/movies/now-playing"
              exact
              render={() => (
                <Movies movies={nowPlayingMovies} fn={clickHandler} />
              )}
            />
            <Route
              path="/movies/trending"
              exact
              render={() => (
                <Movies movies={trendingMovies} fn={clickHandler} />
              )}
            />
            <Route
              path="/movies/upcoming"
              exact
              render={() => (
                <Movies movies={upcomingMovies} fn={clickHandler} />
              )}
            />
            <Route path="/movie/:id" component={Movie} />
            <Route path="/search" component={Results} />
            <Redirect exact from="/" to="/movies/now-playing" />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
