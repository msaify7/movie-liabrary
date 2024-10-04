import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ data }) {
  const poster = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
  return (
    <>
      <Link to={`/movie/${data.id}`}>
        <div className="card">
          <img className="card-img" src={poster} alt="" />
          <h2 className="card-h2">{data.title}</h2>
          <h4 className="card-h4"> Rating : {data.vote_average}</h4>
        </div>
      </Link>
    </>
  );
}

export default MovieCard;
