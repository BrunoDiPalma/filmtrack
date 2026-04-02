import { MovieItem } from "./MovieItem";

export function MovieList({ movies, onDelete }) {
  return (
    <div>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} onDelete={onDelete}></MovieItem>
      ))}
    </div>
  );
}
