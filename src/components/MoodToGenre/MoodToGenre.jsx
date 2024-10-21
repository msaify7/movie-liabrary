import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";

function MoodToGenre() {
  const [movies, setMovies] = useState([]);
  const [mood, setMood] = useState([]);
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);
  const [movieIndex, setMovieIndex] = useState(0);

  const getStoredList = () => {
    let likedMovies = localStorage.getItem(likelist);
    let dislikedMovies = localStorage.getItem(dislikelist);
    let data1 = dislikedMovies.json();
    let data = likedMovies.json();
    setDisliked(data1);
    setLiked(data);
  };

  const setStoredList = () => {
    localStorage.setItem("likelist", JSON.stringify(liked));
    localStorage.setItem("dislikelist", JSON.stringify(disliked));
  };

  const selectedmoods = [
    "Happy",
    "Sad",
    "Excited",
    "Relaxed",
    "Anxious",
    "Romantic",
    "Nostalgic",
    "Lonely",
    "Adventurous",
    "Bored",
    "Inspired",
    "Angry",
    "Confused",
    "Scared",
    "Curious",
    "Energetic",
    "Tired",
    "Surprised",
    "Empowered",
  ];

  const moodToGenre = {
    Happy: [35, 16, 10751, 10402],
    Sad: [18, 80, 36],
    Excited: [28, 12, 53],
    Relaxed: [16, 10751, 14, 10402],
    Anxious: [53, 27, 9648],
    Romantic: [10749, 35, 10402],
    Nostalgic: [36, 10751, 37],
    Lonely: [18, 80, 10749],
    Adventurous: [12, 14, 878, 37],
    Bored: [28, 12, 35, 53],
    Inspired: [99, 36, 10402],
    Angry: [28, 80, 53],
    Confused: [9648, 18, 53],
    Scared: [27, 53, 9648],
    Curious: [99, 878, 9648],
    Energetic: [28, 12, 35, 10402],
    Tired: [16, 10751, 10770],
    Surprised: [53, 9648, 27],
    Empowered: [28, 10752, 36],
  };

  const shuffleMovies = (movies) => {
    for (let i = movies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [movies[i], movies[j]] = [movies[j], movies[i]];
    }
    return movies;
  };

  const filterMovie = (movies) => {
    return movies.filter((movie) => {
      return !disliked.some((dislike) => dislike.id === movie.id) && !liked.some((like) => like.id === movie.id);
    });
  };

  useEffect(() => {
    if (mood.length === 0) return;

    const fetchMovies = async () => {
      const fetchedMovies = [];
      for (let m of mood) {
        let page = Math.floor(Math.random() * 10) + 1;
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${m}&api_key=f5e8526f65c1d8e4d5069dedb065d661`
        );
        const data = await res.json();
        fetchedMovies.push(...data.results);
      }

      const filteredMovies = filterMovie(fetchedMovies);
      const randomMovies = shuffleMovies(filteredMovies);

      setMovies(randomMovies);
    };

    fetchMovies();
  }, [mood]);

  return (
    <>
      <div>
        {selectedmoods.map((m, index) => (
          <button onClick={() => setMood(moodToGenre[m])} key={index}>
            {m}
          </button>
        ))}
      </div>
      <div>{movies.length ? <MovieCard data={movies[movieIndex]} /> : <h3>Choose a mood</h3>}</div>
    </>
  );
}

export default MoodToGenre;
