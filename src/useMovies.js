import { useState, useEffect } from "react";


const KEY = process.env.OMDB_API_KEY;

export function useMovies(query) {
 
const [movies, setMovies] = useState([]);

const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(query);


  useEffect(
    function () {
      //callback?.();

      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.message);
            setError(err.message);
          }
        } finally {
          if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
          }
          setIsLoading(false);
        }
      }
      //handleCloseMovie();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
