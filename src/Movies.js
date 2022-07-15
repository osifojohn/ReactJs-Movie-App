import React, { useRef, useCallback } from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";

export const defaultPoster =
  "https://wipfilms.net/wp-content/data/posters/tt0165863.jpg";

const Movies = () => {
  const { movies, isLoading, hasMore, setPage, data } = useGlobalContext();

  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((oldPage) => oldPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, setPage]
  );

  return (
    <section className="movies">
      {movies.map((movie, index) => {
        const {
          backdrop_path: poster,
          original_title: title,
          release_date: releaseDate,
          id,
        } = movie;

        const markupOutput = () => {
          return (
            <article>
              <img src={image || defaultPoster} alt={title || "movie"} />
              <div className="movie-info">
                <h4 className="title">{title || "movie"}</h4>
                <p>{releaseDate || "date not available"}</p>
              </div>
            </article>
          );
        };
        const image = poster && "https://image.tmdb.org/t/p/original/" + poster;
        if (data.page !== data.total_pages) {
          return (
            <Link
              to={`/movies/${id}`}
              className="movie"
              key={index}
              ref={lastMovieElementRef}
            >
              {markupOutput()}
            </Link>
          );
        } else {
          return (
            <Link to={`/movies/${id}`} className="movie" key={index}>
              {markupOutput()}
            </Link>
          );
        }
      })}
      {isLoading && <div className="loading-small"></div>}
    </section>
  );
};

export default Movies;
