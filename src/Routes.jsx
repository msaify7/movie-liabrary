import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import MoviesList from "./components/MoviesList/MoviesList";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Favorites from "./components/Favorites/Favorites";
import MoodToGenre from "./components/MoodToGenre/MoodToGenre";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "movies/:type",
        element: <MoviesList />,
      },
      {
        path: "movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "rec",
        element: <MoodToGenre />,
      },
    ],
  },
]);

export default router;
