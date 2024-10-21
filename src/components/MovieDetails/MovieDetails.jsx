import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import "./MovieDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function MovieDetails() {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backdrop = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f5e8526f65c1d8e4d5069dedb065d661`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
    window.scrollTo(0, 0);
  }, [id]);

  const handleSubmt = () => {
    localStorage.setItem(movie.id, JSON.stringify(movie));
  };
  return (
    <>
      <div className="movie">
        <div className="movie-intro">
          <img className="movie-backdrop" src={backdrop} />
          <div className="backdrop-overlay"></div>
        </div>
        <div className="movie-detail">
          <div className="movie-detailLeft">
            <div className="movie-posterBox">
              <img className="movie-poster" src={poster} />
            </div>
          </div>
          <div className="movie-detailRight">
            <div className="movie-detailRightTop">
              <div className="movie-name">{movie ? movie.original_title : ""}</div>
              <div className="movie-tagline">{movie ? movie.tagline : ""}</div>
              <div className="movie-rating">
                {movie ? movie.vote_average : ""} <FontAwesomeIcon icon={faStar} />
                <span className="movie-voteCount">{movie ? "(" + movie.vote_count + ") votes" : ""}</span>
              </div>
              <div className="movie-runtime">{movie ? movie.runtime + " mins" : ""}</div>
              <div className="movie-releaseDate">{movie ? "Release date: " + movie.release_date : ""}</div>
              <div className="movie-genres">
                {movie && movie.genres
                  ? movie.genres.map((genre, index) => (
                      <span className="movie-genre" id={genre.id} key={index}>
                        {genre.name}
                      </span>
                    ))
                  : ""}
              </div>
              <button onClick={handleSubmt} className="favorite">
                Add To Favorite
              </button>
            </div>
            <div className="movie-detailRightBottom">
              <div className="synopsisText">Synopsis</div>
              <div>{movie ? movie.overview : ""}</div>
            </div>
          </div>
        </div>
        <div className="movie-links">
          <div className="movie-heading">Useful Links:</div>
          {movie && movie.homepage && (
            <a href={movie.homepage} target="blank" style={{ textDecoration: "none" }}>
              <p>
                <span className="moviehomeButton movie-Button">
                  Movie Homepage <i className="newTab fas fa-external-link-alt"></i>
                </span>
              </p>
            </a>
          )}
          {movie && movie.imdb_id && (
            <a href={"https://www.imdb.com/title/" + movie.imdb_id} target="blank" style={{ textDecoration: "none" }}>
              <p>
                <span className="movieimdbButton movie-Button">
                  IMDb<i className="newTab fas fa-external-link-alt"></i>
                </span>
              </p>
            </a>
          )}
        </div>
        <div className="production">
          <div className="movie-heading-production">Production companies</div>
          <div className="movie-production">
            {movie &&
              movie.production_companies &&
              movie.production_companies.map((company) => (
                <>
                  {company.logo_path && (
                    <span className="productionCompanyImage">
                      <img className="movie-productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                      <span className="company-name">{company.name}</span>
                    </span>
                  )}
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
