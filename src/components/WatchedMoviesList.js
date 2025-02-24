import { WatchedMovie } from "./WatchedMovie";

export function WatchedMoviesList({ watched, onDeletWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeletWatched={onDeletWatched} />
      ))}
    </ul>
  );
}
