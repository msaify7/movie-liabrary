import { Link, useOutletContext } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import SearchCard from "../SearchCard/SearchCard";

function Home() {
  const { data } = useOutletContext();
  return (
    <>
      <div className="main">
        <div className="hero">
          <div className="poster">
            <Carousel showThumbs={false} autoPlay={true} transitionTime={3} infiniteLoop={true} showStatus={false}>
              {data.map((movie, index) => (
                <Link style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`}>
                  <div key={index}>
                    <div className="posterImage">
                      <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt="" />
                    </div>
                    <div className="posterImage-overlay">
                      <div className="posterImage-title">{movie ? movie.original_title : ""}</div>
                      <div className="posterImage-runtime">
                        {movie ? movie.release_date : ""}{" "}
                        <span className="posterImage-rating">
                          {movie ? movie.vote_average : ""}
                          <FontAwesomeIcon icon={faStar} />{" "}
                        </span>
                      </div>
                      <div className="posterImage-description"> {movie ? movie.overview.slice(0, 140) + "..." : ""}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="grid-heading">
          <h2>Popular</h2>
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
