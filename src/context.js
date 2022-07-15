import React, { useState, useEffect, useContext, useCallback } from "react";
import { MOVIE_API_ACCESS_KEY } from "./SingleMovie";
import { MovieData } from "./MovieData";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchResultInfo, setSearchResultInfo] = useState({
    show: false,
    msg: "",
  });
  const [data, setData] = useState(null);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [movieUrl, setMovieUrl] = useState("");

  useEffect(() => {
    setMovies([]);
  }, [query, movieUrl]);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    let url;
    if (query) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_ACCESS_KEY}&language=en-US${urlPage}&include_adult=false${urlQuery}`;
    } else {
      let popularMovieUrl = MovieData[0];
      if (movieUrl) {
        popularMovieUrl = "";
        url = `${movieUrl}${MOVIE_API_ACCESS_KEY}&language=en-US${urlPage}`;
      }

      if (popularMovieUrl) {
        url = `${popularMovieUrl}${MOVIE_API_ACCESS_KEY}&language=en-US${urlPage}`;
      }
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setMovies((oldMovies) => {
        if (query && page === 1) {
          const totalFetchedResults = data.total_results;
          const fetchedResults = data.results.length;

          query && data.total_pages === 0
            ? setSearchResultInfo({
                show: true,
                msg: "No result found, Please enter another name",
              })
            : setSearchResultInfo({
                show: true,
                msg: `showing ${fetchedResults} of ${totalFetchedResults} results`,
              });
          return data.results;
        } else if (query) {
          return [...oldMovies, ...data.results];
        } else {
          return [...oldMovies, ...data.results];
        }
      });
      setHasMore(data.total_results > 0);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [page, query, movieUrl]);

  useEffect(() => {
    fetchMovies();
  }, [page, movieUrl, fetchMovies]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        movies,
        setMovies,
        query,
        setQuery,
        page,
        setPage,
        fetchMovies,
        hasMore,
        searchResultInfo,
        setSearchResultInfo,
        data,
        movieUrl,
        setMovieUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
