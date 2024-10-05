import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";

function Search() {
  const { searchTerm, searchData, setSearchData } = useOutletContext();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=f5e8526f65c1d8e4d5069dedb065d661`
    )
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
