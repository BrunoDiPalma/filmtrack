export function MovieCard({ movie, onSave }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px"}}>
      <img
        src={
          movie.Poster !== "NA"
            ? movie.Poster
            : "https://via.placeholder.com/150"
        }
        alt={movie.Title}
      />

      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>

      <button onClick={() => onSave(movie)}>Salvar em sua lista</button>
    </div>
  );
}
