import React from "react";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie/Movie";

function App() {
  return (
    <div className="mx-auto max-w-2xl min-h-screen bg-gray-200 shadow-lg">
      <Movies />
      {/* <Movie /> */}
    </div>
  );
}

export default App;
