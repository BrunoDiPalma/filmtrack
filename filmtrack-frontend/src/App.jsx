import { useState, useEffect } from "react";
import "./App.css";
import { MovieList } from "./components/MovieList";
import { MovieCard } from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`http://localhost:3000`);
      const data = await response.json();
      setMovies(data.data);
    } catch (error) {
      console.error("Erro ao buscar filmes", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/${id}`, {
        method: "DELETE",
      });
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Erro ao excluir filme da lista", error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    const response = await fetch(
      `http://www.omdbapi.com/?s=${searchTerm}&apikey=fa7cf79e`,
    );

    const data = await response.json();

    if (data.Search) {
      setSearchResults(data.Search);
    } else {
      setSearchResults([]);
    }
  };

  const handleSave = async (movie) => {
    const newMovie = {
      title: movie.Title,
      year: movie.Year,
    };

    await fetch(`http://localhost:3000`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });
    fetchMovies();
  };

  return (
    <div>
      <h1>FilmTrack! 🎥</h1>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {searchResults.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} onSave={handleSave} />
      ))}
      <MovieList movies={movies} onDelete={handleDelete} />
    </div>
  );
}

export default App;
