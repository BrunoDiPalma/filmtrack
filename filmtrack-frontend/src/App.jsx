import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch("http://localhost:3000");
      const data = await response.json();
      setMovies(data.data);
    }
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Filmtrack! 🎥</h1>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.genre}/</p>
        </div>
      ))}
    </div>
  );
}

export default App;
