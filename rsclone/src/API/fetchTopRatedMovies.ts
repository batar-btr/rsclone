import { API_KEY, BASE_URL } from "./api";
import axios from "axios";
import { IMovie } from "../types";

const fetchTopRatedMovies = async (page = 1) => {
  const res = await axios.get<{results: IMovie[]}>(`${BASE_URL}/movie/top_rated`, {
    params: {
      api_key: API_KEY,
      page
    }
  })
  return res.data.results;
}


export default fetchTopRatedMovies;