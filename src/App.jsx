import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import SearchCard from "./components/SearchCard/SearchCard";

function App() {
  const Search_Api = `https://api.themoviedb.org/3/search/movie?query=${"searchTerm"}&include_adult=false&language=en-US&page=1&api_key=f5e8526f65c1d8e4d5069dedb065d661`;
  const Popular_Api =
    "https://api.themoviedb.org/3/movie/popular?api_key=f5e8526f65c1d8e4d5069dedb065d661&language=en-US";

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchDrop, setSearchDrop] = useState("searchDisplay");

  useEffect(() => {
    fetch(Popular_Api)
      .then((res) => res.json())
      .then((data) => setData(data.results));
  }, []);

  const handleSearch = () => {
    if (searchDrop === "searchDisplay visible") {
      setSearchDrop("searchDisplay");
    }
  };

  console.log(data);

  return (
    <div onClick={handleSearch} className="main-app">
      <Header
        searchDrop={searchDrop}
        setSearchDrop={setSearchDrop}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Outlet
        context={{
          data,
          searchTerm,
          searchData,
          setSearchData,
        }}
      />
      <Footer />
    </div>
  );
}

export default App;
