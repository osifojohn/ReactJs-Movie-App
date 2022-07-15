import React from "react";
import { useGlobalContext } from "./context";
import { Link, useNavigate } from "react-router-dom";
import { MovieData } from "./MovieData";

const SearchForm = () => {
  let navigate = useNavigate();

  const {
    query,
    setQuery,
    setPage,
    searchResultInfo,
    setSearchResultInfo,
    movieUrl,
    setMovieUrl,
    isLoading,
  } = useGlobalContext();

  const [newQuery, setNewQuery] = React.useState("");

  const movieCategories = ["Popular", "Upcoming", "Top-rated"];
  let categoryTitle;
  if (movieUrl === MovieData[0]) {
    categoryTitle = "Popular";
  }
  if (movieUrl === MovieData[1]) {
    categoryTitle = "Upcoming";
  }
  if (movieUrl === MovieData[2]) {
    categoryTitle = "Top-rated";
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuery) return;
    setPage(1);
    setQuery(newQuery);
  };

  const navigateToPopularMovies = (e) => {
    e.preventDefault();
    setNewQuery("");
    setQuery("");
    setSearchResultInfo({ show: false });
    navigate("/", { replace: true });
  };
  return (
    <form className="search-form " onSubmit={handleSubmit}>
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
        alt="tmdb-logo"
        className="tmdb-logo"
        onClick={navigateToPopularMovies}
      />
      <h2
        style={{
          display: "inline-block",
          paddingTop: 0,
        }}
      >
        {query ? "search movies" : `${categoryTitle || "Popular"} Movies`}
      </h2>
      {!query && (
        <div className="search-container">
          {
            <input
              type="text"
              id="search-bar"
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              placeholder="search movie"
              style={{ display: "block", marginBottom: 0 }}
            ></input>
          }
          {
            <img
              className="search-icon"
              src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
              alt=""
              onClick={handleSubmit}
              style={{ cursor: "pointer" }}
            ></img>
          }
        </div>
      )}

      {!query &&
        movieCategories.map((movies, index) => {
          return (
            <button
              key={index}
              type="button"
              name="movies"
              onClick={() => setMovieUrl(MovieData[index])}
              autoFocus
              disabled={isLoading}
            >
              {movies}
            </button>
          );
        })}
      {searchResultInfo.show && (
        <div className="search-msg">
          {searchResultInfo.msg}
          {query && (
            <div>
              <Link to="/" className="btn" onClick={navigateToPopularMovies}>
                {`back to ${categoryTitle || "Popular"} movies`}
              </Link>
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default SearchForm;
