import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./favorites.css";
import { useOutletContext } from "react-router-dom";

function Favorites() {
  const [fav, setFav] = useState([]);
  const [mov, setMov] = useState([]);
  let id = "";
  const movieApi = `https://api.themoviedb.org/3/movie/${id}?api_key=f5e8526f65c1d8e4d5069dedb065d661`;

  // const { liked, setLiked } = useOutletContext();

  const fetchMovie = async (i) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${i}?api_key=f5e8526f65c1d8e4d5069dedb065d661`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    let value = localStorage.getItem("likelist");
    let data = JSON.parse(value);
    const fetchedMovies = async () => {
      const moviePromises = data.map((m) => fetchMovie(m));
      const movieData = await Promise.all(moviePromises);
      setFav(movieData);
    };
    fetchedMovies();
  }, [mov]);

  // () => {
  //               let index = mov.indexOf(movie.id);
  //               console.log(index);
  //               mov.slice(index, 1);
  //               localStorage.setItem("likelist", JSON.stringify(mov));
  //               setFav(mov);
  //             }

  return (
    <>
      <div className="list">
        {fav.map((movie, index) => (
          <div className="fav-card" key={index}>
            <MovieCard data={movie} key={crypto.randomUUID()} />
            <button
              className="fav-rem-button"
              onClick={() => {
                let list = localStorage.getItem("likelist");
                let parseList = JSON.parse(list);
                let index = parseList.indexOf(movie.id);
                parseList.splice(index, 1);
                setMov(parseList);
                localStorage.setItem("likelist", JSON.stringify(parseList));
              }}
            >
              Remove From Favorites
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Favorites;
