import axios from 'axios';
import { IMovie } from './types';

const API_KEY = 'de39c600e446784b868125d50f325ca6';
const BASE_URL = 'https://api.themoviedb.org/3';
const UPCOMING = `${BASE_URL}/movie/upcoming`;

const fetchUpcomingMovies = async ():Promise<IMovie[]> => {
  const data = await axios.get(UPCOMING, {
    params: {
      api_key: API_KEY
    }
  })
  return data.data.results;
}

export {
  fetchUpcomingMovies
}