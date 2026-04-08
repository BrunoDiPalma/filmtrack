export function MovieItem({ movie, onDelete }) {
  return (
    <div className="card">
      <div className="card-image">
        {movie.poster_url && <img src={movie.poster_url} alt={movie.title} />}
      </div>

      <div className="card-info">
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
      </div>

      <button
        className="card-btn delete-btn"
        onClick={() => onDelete(movie.id)}
      >
        Remover
      </button>
    </div>
  );
}
