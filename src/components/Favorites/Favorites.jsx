import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./favorites.css";

function Favorites() {
  let movies = [];

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    let data = JSON.parse(value);

    movies.push(data);
  }

  console.log(movies);
  return (
    <>
      <div className="list">
        {movies.map((movie, index) => (
          <div className="fav-card">
            <MovieCard data={movie} key={index} />
            <button
              onClick={() => {
                let key = movie.id;
                localStorage.removeItem(key);
              }}
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Favorites;
