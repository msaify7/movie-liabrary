import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SearchCard.css";

function SearchCard(props) {
  const [sdata, setSdata] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${props.searchTerm}&include_adult=false&language=en-US&page=1&api_key=f5e8526f65c1d8e4d5069dedb065d661`
    )
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
                <h1 className="movie-title">{movie.title}</h1>
              </li>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchCard;
