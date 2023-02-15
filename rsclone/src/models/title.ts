export interface ITitle{
  budget?: number,
  created_by?: {id: number, name: string}[],
  first_air_date?: string,
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
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: {id: number, name: string, origin_country: string}[],
  production_countries: {iso_3166_1: string, name: string}[],
  release_date?: string,
  revenue?: number,
  runtime?: number,
  spoken_languages: {english_name: string, iso_639_1: string, name: string}[],
  title?: string,
  vote_average: number,
  vote_count: number
}
export interface ITitleCast{
  cast: {
    id: number,
    character: string,
    known_for_department: string,
    name: string,
    popularity: number,
    profile_path: string
  }[],
  crew: {
    id: number,
    department: string,
    job: string,
    known_for_department: string,
    name: string,
    popularity: number,
    profile_path: string
  }[]
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
export interface ITitleReviews{
  page: number,
  results: {
    author: string,
    author_details: {
      rating: number,
      username: string
    }
    content: string,
    created_at: string,
    id: string,
    updated_at: string,
  }[],
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