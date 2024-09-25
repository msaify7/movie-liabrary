import { NavLink } from "react-router-dom";
import "./Header.css";

function Header(props) {
  return (
    <div className="head">
      <div className="logo">
        <NavLink to="/">
          <h1>Movie Library</h1>
        </NavLink>
      </div>
      <div className="nav">
        <NavLink to="/movies/top_rated">Top Rated</NavLink>
        <NavLink to="/movies/upcoming">Upcoming</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </div>
      <div className="search">
        <input
          type="search"
          placeholder="Type here.."
          value={props.searchTerm}
          onChange={(e) => props.setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </div>
    </div>
  );
}

export default Header;
