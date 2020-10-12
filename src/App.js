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
      url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMBD_KEY}&language=en-US&page=1`;
    } else if (category === "trending") {
      url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMBD_KEY}`;
    } else if (category === "upcoming") {
      url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMBD_KEY}&language=en-US&page=1`;
    }

    axios
      .get(url)
      .then((response) => {
        console.log(response);
        if (category === "now_playing") {
          setNowPlayingMovies(response.data.results);
        } else if (category === "trending") {
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
