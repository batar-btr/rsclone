import { API_KEY, BASE_URL } from "./api";
import axios from "axios";
import { ITV, IMovie } from "../types";
type DetailsType = 'movie' | 'tv';

const detailPath = (type: DetailsType) => `${BASE_URL}/${type}`

const fetchDetails = async (type: DetailsType, id: number): Promise<IMovie | ITV> => {
  const data = await axios.get(`${detailPath(type)}/${id}`, {
    params: {
      api_key: API_KEY
    }
  })
  return data.data;
}

export { fetchDetails }