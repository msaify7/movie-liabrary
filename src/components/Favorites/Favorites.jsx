import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./favorites.css";
import { useOutletContext } from "react-router-dom";

function Favorites() {
  const [fav, setFav] = useState([]);
  const [mov, setMov] = useState([]);
  let movies = [];
  let id = "";
  const movieApi = `https://api.themoviedb.org/3/movie/${id}?api_key=f5e8526f65c1d8e4d5069dedb065d661`;

  const { liked, setLiked } = useOutletContext();

  // for (let i = 0; i < localStorage.length; i++) {
  //   let key = localStorage.key(i);
  //   let value = localStorage.getItem(key);
  //   let data = JSON.parse(value);

  //   movies.push(data);
  // }
  const getLikedMovies = () => {
    movies = [];
    let value = localStorage.getItem("likelist");
    let data = JSON.parse(value);
    movies.push(...data);
  };

  const fetchMovie = async (i) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${i}?api_key=f5e8526f65c1d8e4d5069dedb065d661`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {}, []);

  useEffect(() => {
    getLikedMovies();
    const fetchedMovies = async () => {
      const moviePromises = movies.map((m) => fetchMovie(m));
      const movieData = await Promise.all(moviePromises);
      setFav(movieData);
    };
    fetchedMovies();
    console.log(movies);
    console.log(fav);
  }, []);

  return (
    <>
      <div className="list">
        {fav.map((movie) => (
          <div className="fav-card">
            <MovieCard data={movie} key={crypto.randomUUID()} />
            {/* <button
              onClick={() => {
                let key = movie.id;
                localStorage.removeItem(key);
              }}
            >
              Remove from Favorites
            </button> */}
          </div>
        ))}
      </div>
    </>
  );
}

export default Favorites;
