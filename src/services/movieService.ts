import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieHttpResponse {
  results: Movie[];
}

axios.defaults.baseURL = "https://api.themoviedb.org/3/search";
const myApiToken = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MovieHttpResponse>("/movie", {
    params: {
      query: query,
    },
    headers: {
      Authorization: `Bearer ${myApiToken}`,
    },
  });

  // console.log(query);

  // console.log(response.data);
  return response.data.results;
};
