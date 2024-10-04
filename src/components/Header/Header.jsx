import { NavLink } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faXmark,
  faBarcode,
} from "@fortawesome/free-solid-svg-icons";
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
        <NavLink to="/">
          <h1>Movie Library</h1>
        </NavLink>
      </div>
      <div className="search">
        <input
          type="search"
          placeholder="Type here.."
          value={props.searchTerm}
          onChange={(e) => props.setSearchTerm(e.target.value)}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
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
