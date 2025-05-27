import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "29a00e84";
const API_URL = "https://www.omdbapi.com/";

const MovieSearchApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [loading, setLoading] = useState(false)

  if(loading){
    return (
      <div>loading....</div>
    )
  }

  const fetchMovies = async () => {
    if (!searchTerm) return;
    setLoading(true)
    try {
      // setSelectedMovie(null)


      
      const response = await axios.get(`${API_URL}?t=${searchTerm}&apikey=${API_KEY}`);
      if(response.data.Error){
        alert(response.data.Error)
        setLoading(false)
        return ;
      }
      setMovies([response?.data] || []);
    } catch (error) {
      alert("Error fetching the movie!!")
      console.error("Error fetching movies:", error);
    }
    setLoading(false)
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await axios.get(`${API_URL}?i=${imdbID}&apikey=${API_KEY}`);
      setSelectedMovie(response?.data);
      
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Movie Search App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={fetchMovies}>Search</button>
      </div>
      <div className="movie-grid">
        {
          ( movies?.length > 0) ? 
          movies.map((movie) => (
              <div key={movie.imdbID} className="movie-card" onClick={() => fetchMovieDetails(movie.imdbID)}>
                <img src={movie?.Poster} alt={movie.Title} />
                <h2>{movie.Title} ({movie.Year})</h2>
                {
                  selectedMovie && (
                    <>
                      <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
                      <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
                      {/* <button onClick={() => setSelectedMovie(false)}>Close</button> */}
                    </>
                  )
                }
              </div>
            )) :
            movies == null  ? <>Search for movies</> : <>No Movie Found!</>
        }
      </div>
    </div>
  );
};

export default MovieSearchApp;
