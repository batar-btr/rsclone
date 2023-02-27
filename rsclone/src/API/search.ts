import { API_KEY, BASE_URL } from "./api";
import axios from "axios";
import { ITV, IMovie, IPersonSearch } from "../types";
import { SearchType } from "../components/header/HeaderSearch";

const searchPath = (type: SearchType) => `${BASE_URL}/search/${type}`;

const search = async (type: SearchType, value: string): Promise<Array<IMovie | ITV | IPersonSearch>> => {
  const data = await axios.get(`${searchPath(type)}`, {
    params: {
      api_key: API_KEY,
      query: value
    }
  })
  return data.data.results;
}

export { search }
