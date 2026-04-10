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
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/movies`);
      const data = await response.json();
      setMovies(data?.data || []);
    } catch (error) {
      console.error("Erro ao buscar filmes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${searchTerm}&apikey=fa7cf79e`,
        );

        const data = await response.json();

        if (data.Search) {
          setSearchResults(data.Search);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Erro ao buscar filmes", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir?");
    if (!confirmDelete) {
      return;
    }
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/movies/${id}`, {
        method: "DELETE",
      });

      setMessage("Filme excluído com sucesso!");

      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Erro ao excluir filme da lista", error);
    }
  };

  const handleSave = async (movie) => {
    const newMovie = {
      title: movie.Title,
      year: movie.Year,
      imdbID: movie.imdbID || null,
      poster_url: movie.Poster !== "N/A" ? movie.Poster : null,
      status: "watchlist",
      rating: null,
    };

    const alreadyExists = movies.some((m) => m.imdbID === newMovie.imdbID);

    if (alreadyExists) {
      setMessage("Esse filme já está em sua lista de desejos");
      return;
    }

    if (saving) return;
    setSaving(true);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });

      fetchMovies();
      setMessage("✅ Filme adicionado!");
    } catch (error) {
      setMessage("Erro ao adicionar filme");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <h1>FilmTrack! 🎥</h1>
      <input
        value={searchTerm}
        placeholder="Buscar filmes..."
        onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value);

          if (!value.trim()) {
            setSearchResults([]);
          }
        }}
      />

      {message && <p>{message}</p>}
      {loading && <p>Carregando...</p>}

      {searchTerm.trim() ? (
        searchResults.length > 0 ? (
          <div className="grid">
            {searchResults.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onSave={handleSave}
                saving={saving}
              />
            ))}
          </div>
        ) : (
          <p>Nenhum filme encontrado</p>
        )
      ) : movies.length > 0 ? (
        <MovieList movies={movies} onDelete={handleDelete} />
      ) : (
        <p>Nenhum filme salvo</p>
      )}
    </div>
  );
}

export default App;
