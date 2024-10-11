import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";

function MoviesList() {
  const { type } = useParams();
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=f5e8526f65c1d8e4d5069dedb065d661&language=en-US`)
      .then((res) => res.json())
      .then((data) => setMoviesData(data.results));
  }, [type]);

  return (
    <>
      <h2 className="grid-heading">{type === "top_rated" ? "Top Rated" : type.toUpperCase()}</h2>
      <div>
        <div className="card-grid">
          {moviesData.map((movie, index) => (
            <MovieCard data={movie} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MoviesList;
