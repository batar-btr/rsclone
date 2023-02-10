import { API_KEY, BASE_URL } from "./api";
import axios from "axios";

type Mediatype = 'all' | 'movie' | 'tv' | 'person';
type Time = 'day' | 'week';

export interface TrendingItem {
  poster_path: string | null;
  id: number
  title?: string,
  name?: string,
  vote_average: number,
  type?: 'movie' | 'tv'
}

const fetchTrending = async (type: Mediatype = 'all', time: Time = 'week', page = 1) => {
  const res = await axios.get<{results: TrendingItem[]}>(`${BASE_URL}/trending/${type}/${time}`, {
    params: {
      api_key: API_KEY,
      page
    }
  })
  return res.data.results;
}


export default fetchTrending;