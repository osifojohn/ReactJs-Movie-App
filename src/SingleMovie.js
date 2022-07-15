import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { defaultPoster } from "./Movies";

export const MOVIE_API_ACCESS_KEY = process.env.REACT_APP_MOVIE_API_KEY;

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const singleMovieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIE_API_ACCESS_KEY}&language=en-US`;

  const fetchMovie = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const movie = await response.json();
      setMovie(movie);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(singleMovieUrl);
  }, [singleMovieUrl]);

  if (isLoading) {
    return <div className="loading-big"></div>;
  }
  const {
    poster_path: poster,
    overview: plot,
    title,
    release_date: releaseDate,
  } = movie;
  const image = poster && "https://image.tmdb.org/t/p/original/" + poster;
  return (
    <section className="single-movie">
      <img src={image || defaultPoster} alt={title} />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>{plot}</p>
        <p>{releaseDate || "date not available"}</p>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
