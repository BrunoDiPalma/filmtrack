export function MovieItem({ movie, onDelete }) {
  return (
    <div>
      <h2>{movie.title}</h2>
      {movie.genre && <p>{movie.genre}</p>}
      <button onClick={() => onDelete(movie.id)}>Excluir filme de sua lista</button>
    </div>
  );
}