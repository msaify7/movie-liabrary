import { useOutletContext } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import "./Home.css";
import SearchCard from "../SearchCard/SearchCard";

function Home() {
  const { data } = useOutletContext();
  return (
    <>
      <div className="main">
        <div className="hero">
          <h1>Your Home To Finding Best Movies</h1>
        </div>
        <div className="card-grid">
          {data.map((movie, index) => (
            <MovieCard data={movie} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
