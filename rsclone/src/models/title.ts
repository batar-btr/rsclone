export interface ITitle{
  budget?: number,
  created_by?: {id: number, name: string}[],
  first_air_date: string,
  genres: {id: number, name: string}[],
  homepage: string,
  id: string,
  in_production?: boolean,
  languages?: string[],
  last_air_date?: string,
  name?: string,
  networks?: {id: number, name: string}[],
  number_of_episodes?: number,
  number_of_seasons?: number,
  origin_country?: string[],
  original_language?: string,
  original_title: string;
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: {id: number, name: string, origin_country: string}[],
  production_countries: {iso_3166_1: string, name: string}[],
  release_date: string,
  revenue?: number,
  runtime?: number,
  spoken_languages: {english_name: string, iso_639_1: string, name: string}[],
  title?: string,
  vote_average: number,
  vote_count: number
}
export type Cast = {
  id: number,
  character: string,
  credit_id: string,
  known_for_department: string,
  name: string,
  popularity: number,
  profile_path: string
}

export type Crew = {
  id: number,
  department: string,
  job: string,
  known_for_department: string,
  name: string,
  popularity: number,
  profile_path: string
}
export interface ITitleCast{
  cast: Cast[],
  crew: Crew[]
}
export interface ITitleImages{
  backdrops: {file_path: string}[],
  logos: {file_path: string}[],
  posters: {file_path: string}[]
}
export interface ITitleVideos{
  results: {
    key: string,
    name: string,
    type: string
  }[]
}

export type TitleReviews = {
  author: string,
  author_details: TitleReviewAutor,
  content: string,
  created_at: string,
  id: string,
  updated_at: string,
}

export type TransformDetails = {
  id: string;
  name: string;
  username: string;
  description: string;
  create: string;
  update: string;
  rating: number | null;
  avatar: string | null;
}

export type TitleReviewAutor = {
"name": string,
"username": string,
"avatar_path": null | string,
"rating": null | number
}

export type ReviewSort = { 
item: TransformDetails[]; 
func: (propsArray: TransformDetails[]) => void; 
}
export interface ITitleReviews{
  page: number,
  results: ITitleReview[],
  total_pages: number,
  total_results: number
}
export interface ITitleReview{
  author: string,
  author_details: {
    rating: number,
    username: string,
  }
  content: string,
  created_at: string,
  id: string,
  updated_at: string
}

export interface ITitleObjectReviews{
  page: number,
  results: TitleReviews[],
  total_pages: number,
  total_results: number
}
export interface ITitleSimilar{
  page: number,
  results: {
    id: number,
    title?: string,
    name?: string,
    poster_path: string,
    vote_average: number,
  }[]
  total_pages: number,
  total_results: number
}
export interface IMovieReleaseDates{
  results: {
    iso_3166_1: string
    release_dates: {
      certification: string
    }[]
  }[]
}
export interface ITvContentRatings{
  results: {
    iso_3166_1: string,
    rating: string
  }[]
}