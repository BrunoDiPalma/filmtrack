export function MovieItem({ movie, onDelete }) {
  return (
    <div>
      <h2>{movie.title}</h2>
      {movie.genre && <p>{movie.genre}</p>}
      <button onClick={() => onDelete(movie.id)}>Excluir filme de sua lista</button>
      {movie.poster_url && (
        <img src={movie.poster_url} alt={movie.title} width="100" />
      )}
    </div>
  );
}