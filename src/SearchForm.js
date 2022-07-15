import React from "react";
import { useGlobalContext } from "./context";
import { Link, useNavigate } from "react-router-dom";

const SearchForm = () => {
  let navigate = useNavigate();
  const { query, setQuery, setPage, searchResultInfo, setSearchResultInfo } =
    useGlobalContext();

  const [newQuery, setNewQuery] = React.useState("");
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
        {query ? "search movies" : "Popular Movies"}
      </h2>
      {!query && (
        <input
          type="text "
          className="form-input"
          value={newQuery}
          onChange={(e) => setNewQuery(e.target.value)}
          placeholder="search movie"
          style={{ display: "block", marginBottom: 0 }}
        />
      )}
      {searchResultInfo.show && (
        <div className="search-msg">
          {searchResultInfo.msg}
          {query && (
            <div>
              <Link to="/" className="btn" onClick={navigateToPopularMovies}>
                back to popular movies
              </Link>
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default SearchForm;
