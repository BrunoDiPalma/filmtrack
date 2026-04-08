import { MovieItem } from "./MovieItem";

export function MovieList({ movies, onDelete }) {
  return (
    <div className="grid">
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} onDelete={onDelete} />
      ))}
    </div>
  );
}
