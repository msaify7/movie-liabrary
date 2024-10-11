import { Link } from "react-router-dom";
import "./MovieCard.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function MovieCard({ data }) {
  const poster = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isloading ? (
        <div className="cards">
          <SkeletonTheme baseColor="#313131" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link style={{ textDecoration: "none", color: "white" }} to={`/movie/${data.id}`}>
          <div className="cards">
            <img className="cards-img" src={poster} alt="" />
            <div className="cards-overlay">
              <div className="cards-title">{data.title}</div>
              <div className="cards-runtime">
                {data.release_date}
                <span className="cards-rating">
                  {data.vote_average} <FontAwesomeIcon icon={faStar} />
                </span>
              </div>
              <div className="cards-description">{data.overview.slice(0, 118) + "..."}</div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

export default MovieCard;
