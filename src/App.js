import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

// The fetch API is built into browsers and allows us to fetch/send data via HTTP requests/responses

function App() {
  const [movies, setMovies] = useState([]);

  // METHOD ONE:
  /* fetch returns a promise that allows us to react to the response or potential errors. A promise is an object that will eventually yield some data, because sending a HTTP request is an async task.
  We can use .then to define a function that will be called whenever we get a response. The response we get in the '.then' is actually an object that contains lots of info about the response.
  Hence, we can do .json to convert to a JS object. .json returns a promise also, so we return that promise and chain another .then which will be fired once data transformation is complete */

  // const fetchMoviesHandler = () => {
  //   fetch("https://swapi.dev/api/films/")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const transformedMovies = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date,
  //         };
  //       });
  //       setMovies(transformedMovies);
  //     });
  // };

  // METHOD TWO
  /* This is an alternative way of doing Method One, but using async/await instead of promsies. It becomes cleaner as you don't need to use .then chains and can instead assign responses to reusable variables */
  async function fetchMoviesHandler() {
    const response = await fetch("https://swapi.dev/api/films/");
    const data = response.json;

    // We map the returned data to a new object to transform the incoming data from its original format (opening_crawl etc..), the the format we expect to recieve (openingText). This is defined in Movie.js
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
