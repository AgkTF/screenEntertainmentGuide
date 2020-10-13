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
    let url;
    if (category === "now_playing") {
      url = "http://localhost:8080/movies/now-playing";
    } else if (category === "trending") {
      url = "http://localhost:8080/movies/trending";
    } else if (category === "upcoming") {
      url = "http://localhost:8080/movies/upcoming";
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

  useEffect(() => {
    if (
      (category === "now_playing" && nowPlayingMovies.length > 0) ||
      (category === "trending" && trendingMovies.length > 0) ||
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
    <div className="relative mx-auto max-w-3xl min-h-screen bg-gray-100 shadow-lg">
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
            render={() => <Movies movies={trendingMovies} fn={clickHandler} />}
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
