import React, { useState, useEffect, useCallback } from "react";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie/Movie";
import Person from "./pages/Person/Person";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Results from "./pages/Results/Results";

function App() {
  console.log("APP Rendered 🎬");

  const [category, setCategory] = useState("now_playing");
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const clickHandler = (cat) => {
    console.log(cat);
    setCategory(cat);
  };

  const fetchCategory = useCallback((category) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.REACT_APP_TMBD_KEY}&language=en-US&page=1 `
      )
      .then((response) => {
        console.log(response);
        if (category === "now_playing") {
          setNowPlayingMovies(response.data.results);
        } else if (category === "popular") {
          setTrendingMovies(response.data.results);
        } else if (category === "upcoming") {
          setUpcomingMovies(response.data.results);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (
      (category === "now_playing" && nowPlayingMovies.length > 0) ||
      (category === "popular" && trendingMovies.length > 0) ||
      (category === "upcoming" && upcomingMovies.length > 0)
    )
      return;

    fetchCategory(category);
  }, [
    fetchCategory,
    category,
    nowPlayingMovies.length,
    trendingMovies.length,
    upcomingMovies.length,
  ]);

  return (
    <div className="mx-auto max-w-3xl min-h-screen bg-gray-100 shadow-lg">
      <Navbar />

      {/* <div className="relative top-10 sm:top-12"> */}
      <div>
        <Switch>
          <Route path="/person/:id" exact component={Person} />
          <Route
            path="/movies/now-playing"
            exact
            render={() => (
              <Movies movies={nowPlayingMovies} fn={clickHandler} />
            )}
            // render={() => <Movies movies={nowPlayingMovies} />}
          />
          <Route
            path="/movies/trending"
            exact
            render={() => <Movies movies={trendingMovies} fn={clickHandler} />}
            // render={() => <Movies movies={trendingMovies} />}
          />
          <Route
            path="/movies/upcoming"
            exact
            render={() => <Movies movies={upcomingMovies} fn={clickHandler} />}
          />
          <Route path="/movie/:id" component={Movie} />
          <Route path="/search" component={Results} />
          <Redirect exact from="/" to="/movies/now-playing" />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
