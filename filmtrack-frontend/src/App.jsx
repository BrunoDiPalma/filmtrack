import { useState, useEffect } from "react";
import "./App.css";
import { MovieList } from "./components/MovieList";
import { MovieCard } from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

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

  useEffect(() => {
  const delayDebounce = setTimeout(async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const response = await fetch(
      `http://www.omdbapi.com/?s=${searchTerm}&apikey=fa7cf79e`
    );

    const data = await response.json();

    if (data.Search) {
      setSearchResults(data.Search);
    } else {
      setSearchResults([]);
    }
  }, 500);

  return () => clearTimeout(delayDebounce);
}, [searchTerm]);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/${id}`, {
        method: "DELETE",
      });

      setMessage("Filme excluído com sucesso!");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Erro ao excluir filme da lista", error);
    }
  };

  const handleSave = async (movie) => {
    const newMovie = {
      title: movie.Title,
      year: movie.Year,
      imdbID: movie.imdbID,
    };

    const alreadyExists = movies.some((m) => m.imdbID === newMovie.imdbID);

    if (alreadyExists) {
      setMessage("Esse filme já está em sua lista de desejos");
      return;
    }

    if (saving) return;
    setSaving(true);

    try {
      await fetch(`http://localhost:3000`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });

      setMovies((prev) => [...prev, newMovie]);

      setMessage("Filme adicionado com sucesso!");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage("Erro ao adicionar filme", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1>FilmTrack! 🎥</h1>
      <input
        value={searchTerm} placeholder="Buscar filmes..."
        onChange={(e) => {
          const value = e.target.value
          setSearchTerm(value)

          if(!value.trim()) {
            searchResults([])
          }

        }}
      />


      {message && <p>{message}</p>}

      {searchTerm.trim() ? (
        searchResults.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onSave={handleSave}
            saving={saving}
          />
        ))
      ) : (
        <MovieList movies={movies} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;
