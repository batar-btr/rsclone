import { MediaType } from "./components/header/search-result";


export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  type?: 'movie';
  name?: 'string';
  media_type?: MediaType;
  genres: {name: string, id: number}[]
  profile_path: string | null;
}

export interface ITV {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  episode_run_time: number[];
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
  type?: 'tv';
  title?: string;
  genres: {name: string, id: number}[];
  media_type?: MediaType;
  profile_path: string | null;
}

export interface IPersonSearch {
  profile_path: string | null;
  id: number;
  name: string;
  title?: string;
  media_type?: MediaType;
  poster_path?: string;
}
