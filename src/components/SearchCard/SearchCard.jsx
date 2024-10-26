import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SearchCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function SearchCard(props) {
  const [sdata, setSdata] = useState([]);
  const poster = `https://image.tmdb.org/t/p/w500`;
  const key = import.meta.env;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${props.searchTerm}&include_adult=false&language=en-US&page=1&api_key=${key.VITE_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setSdata(data.results));
  }, [props.searchTerm]);
  return (
    <>
      <div>
        <div className="search-display">
          {sdata.map((movie, index) => (
            <Link to={`/movie/${movie.id}`}>
              <li className="search-item" key={index}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                <div className="search-details">
                  <h1 className="movie-title">{movie.title}</h1>
                  <div className="search-date">
                    <p>{movie.release_date.slice(0, 4)}</p>
                    <p>
                      {movie.vote_average}
                      <FontAwesomeIcon icon={faStar} />
                    </p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchCard;
