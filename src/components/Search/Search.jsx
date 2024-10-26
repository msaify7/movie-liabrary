import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";

function Search() {
  const { searchTerm, searchData, setSearchData } = useOutletContext();

  const key = import.meta.env;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=${key.VITE_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setSearchData(data.results));
  }, [searchTerm]);

  return (
    <>
      <div>
        {searchTerm ? (
          <div className="card-grid">
            {searchData.map((movie, index) => (
              <MovieCard data={movie} key={index} />
            ))}
          </div>
        ) : (
          <div>Search for your movie</div>
        )}
      </div>
    </>
  );
}

export default Search;
