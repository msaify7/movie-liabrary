import { NavLink } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchCard from "../SearchCard/SearchCard";
import { faMagnifyingGlass, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Header(props) {
  const [icon, setIcon] = useState(faBars);
  const [mobileNav, setMobileNav] = useState("mobile-nav");

  const handleIcon = () => {
    if (icon === faBars) {
      setIcon(faXmark), setMobileNav("mobile-nav open");
    } else setIcon(faBars), setMobileNav("mobile-nav");
  };
  return (
    <div className="head">
      <div className="logo">
        <NavLink to="/">Movie Liabrary</NavLink>
      </div>
      <div className="search">
        <input
          type="search"
          placeholder="Type here.."
          value={props.searchTerm}
          onChange={(e) => {
            props.setSearchTerm(e.target.value);
            if (e.target.value === "") {
              props.setSearchDrop("searchDisplay");
            } else {
              props.setSearchDrop("searchDisplay visible");
            }
          }}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <div className={props.searchDrop}>
          <SearchCard searchTerm={props.searchTerm} />
        </div>
      </div>

      <div className="nav">
        <NavLink to="/movies/top_rated">Top Rated</NavLink>
        <NavLink to="/movies/upcoming">Upcoming</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </div>
      <div onClick={handleIcon} className="toggle-btn">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={mobileNav}>
        <NavLink to="/movies/top_rated">Top Rated</NavLink>
        <NavLink to="/movies/upcoming">Upcoming</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </div>
    </div>
  );
}

export default Header;
