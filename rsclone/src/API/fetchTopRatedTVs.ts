import { API_KEY, BASE_URL } from "./api";
import axios from "axios";
import { IPopularTVShow } from "../models/IMDBModels";

const fetchTopRatedTVs = async (page = 1) => {
  const res = await axios.get<{results: IPopularTVShow[]}>(`${BASE_URL}/tv/top_rated`, {
    params: {
      api_key: API_KEY,
      page
    }
  })
  return res.data.results;
}


export default fetchTopRatedTVs;