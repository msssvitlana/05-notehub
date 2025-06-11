// fetchMovies 
import axios from "axios";
import { type Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

interface FetchMoviesParams {
  query: string;
  page: number;
}
export interface TMDBResponse {
  results: Movie[];
  total_pages: number; 
}

export default async function fetchMovies({ query, page }: FetchMoviesParams): Promise<TMDBResponse> {
  const { data } = await axios.get<TMDBResponse>(BASE_URL, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    }
  });
  return data;
}
