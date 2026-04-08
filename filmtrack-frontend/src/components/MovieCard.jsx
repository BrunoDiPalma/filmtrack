export function MovieCard({ movie, onSave, saving }) {
  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450";

  return (
    <div className="card">
      <div className="card-image">
        <img src={poster} alt={movie.Title} />
      </div>

      <div className="card-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>

      <button
        className="card-btn"
        disabled={saving}
        onClick={() => onSave(movie)}
      >
        Salvar
      </button>
    </div>
  );
}
