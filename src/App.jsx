import { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Search from "./components/Search/Search";
import { Outlet } from "react-router-dom";

function App() {
  const Popular_Api =
    "https://api.themoviedb.org/3/movie/popular?api_key=f5e8526f65c1d8e4d5069dedb065d661&language=en-US";

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm === "") {
      fetch(Popular_Api)
        .then((res) => res.json())
        .then((data) => setData(data.results));
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=f5e8526f65c1d8e4d5069dedb065d661`
      )
        .then((response) => response.json())
        .then((response) => setData(response.results));
    }
  }, [searchTerm]);

  return (
    <div className="main-app">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet context={[data]} />
      <Footer />
    </div>
  );
}

export default App;
