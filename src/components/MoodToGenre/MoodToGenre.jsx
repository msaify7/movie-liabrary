import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { useOutletContext } from "react-router-dom";
import "./MoodToGenre.css";

function MoodToGenre() {
  const [movies, setMovies] = useState([]);
  const [mood, setMood] = useState([]);
  const [currMood, setCurrMood] = useState("");
  // const [liked, setLiked] = useState([]);
  // const [disliked, setDisliked] = useState([]);
  const [movieIndex, setMovieIndex] = useState(0);

  const { liked, setLiked, disliked, setDisliked } = useOutletContext();

  const getStoredList = () => {
    let likedMovies = localStorage.getItem("likelist");
    let dislikedMovies = localStorage.getItem("dislikelist");
    let data1 = JSON.parse(dislikedMovies);
    let data = JSON.parse(likedMovies);
    setDisliked(data1 ? data1 : []);
    setLiked(data ? data : []);
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
    Anxious: [53, 27, 9648, 35],
    Romantic: [10749, 10402],
    Nostalgic: [36, 10751, 37],
    Lonely: [18, 80, 10749],
    Adventurous: [12, 14, 878, 37],
    Bored: [28, 12, 35, 53],
    Inspired: [99, 36, 10402],
    Angry: [28, 80, 53],
    Confused: [9648, 18, 53, 35],
    Scared: [27, 53, 9648],
    Curious: [99, 878, 9648, 36],
    Energetic: [28, 12, 35, 10402],
    Tired: [16, 10751, 10770],
    Surprised: [53, 9648, 27, 80],
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

  const handleNext = () => {
    if (movieIndex < movies.length - 1) {
      setMovieIndex((prev) => prev + 1);
    } else return;
  };

  const handleprev = () => {
    if (movieIndex > 0) {
      setMovieIndex((prev) => prev - 1);
    } else return;
  };

  const handleHide = () => {
    const updatedDisliked = [...disliked, movies[movieIndex].id];
    setDisliked(updatedDisliked);
    localStorage.setItem("dislikelist", JSON.stringify(updatedDisliked));
    setMovieIndex((prev) => prev + 1);
  };

  const handleWatchlist = () => {
    const updatedLiked = [...liked, movies[movieIndex].id];
    setLiked(updatedLiked);
    localStorage.setItem("likelist", JSON.stringify(updatedLiked));
    setMovieIndex((prev) => prev + 1);
  };

  const key = import.meta.env;

  useEffect(() => {
    if (mood.length === 0) return;

    getStoredList();

    const fetchMovies = async () => {
      const fetchedMovies = [];
      for (let m of mood) {
        let page = Math.floor(Math.random() * 10) + 1;
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${m}&api_key=${key.VITE_API_KEY}`);
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
    <div className="mood-main">
      <div className="moodHeading">{currMood === "" ? <h3>Choose A Mood</h3> : ""}</div>
      <div className="selectmoodsection">
        {mood != "" ? (
          <div className="mood-box">
            <span className="changemoodheading">Feeling:</span>
            <select className="selectmood" onChange={(e) => (setMood(moodToGenre[e.target.value]), setCurrMood(e.target.value))}>
              {selectedmoods.map((m, index) => (
                <option className="moodoptions" value={m} key={index}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="mood-list">
            {selectedmoods.map((m, index) => (
              <div key={index} className="button-main">
                <button className="mood-button" onClick={() => setMood(moodToGenre[m], setCurrMood(m))}>
                  {m}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {movies.length ? (
        <div className="movie-section-details">
          <MovieCard data={movies[movieIndex]} />
          <div className="movie-navigation">
            <div className="add-buttons">
              <button onClick={handleWatchlist}>Add To Watchlist</button>
            </div>
            <div className="nav-button">
              <button onClick={handleprev}>Back</button>
              <button onClick={handleHide}>Hide</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default MoodToGenre;
