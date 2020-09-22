import React from "react";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie/Movie";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="mx-auto max-w-2xl min-h-screen bg-gray-200 shadow-lg">
      <Switch>
        <Route path="/:id" component={Movie} />

        <Route path="/" exact component={Movies} />
        {/* <Route path="/movies/now-playing" exact component={Movies} />
        <Route path="/movies/trending" exact component={Movies} />
        <Route path="/movies/upcoming" exact component={Movies} /> */}
      </Switch>
    </div>
  );
}

export default App;
