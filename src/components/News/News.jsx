import React from "react";
import "./News.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

function News() {
  return (
    <div className="newsblock">
      <FontAwesomeIcon icon={faVideo} className="filtericon" />
      <Link className="newsLink" to={"/recommendation"}>
        Get Movie Recommendation According To Mood
      </Link>
    </div>
  );
}

export default News;
