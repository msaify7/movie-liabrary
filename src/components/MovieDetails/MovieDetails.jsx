import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import "./MovieDetails.css";

function MovieDetails() {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backdrop = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=f5e8526f65c1d8e4d5069dedb065d661`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  const handleSubmt = () => {
    localStorage.setItem(movie.id, JSON.stringify(movie));
  };
  return (
    <>
      <div className="movie-details">
        <div className="back-drop">
          <img src={backdrop} alt="" />
          <div className="details-card">
            <div className="detail-img">
              <img src={poster} alt="" />
            </div>
            <div className="detail-text">
              <p>{movie.title}</p>
              <p>{movie.vote_average}</p>
              <button onClick={handleSubmt}>Add To Favorites</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
