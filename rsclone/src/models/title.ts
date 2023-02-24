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
export interface ITitleImage{
  file_path: string
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

export interface ITvSeason{
  episodes: ITvEpisode[],
  name: string,
  overview: string,
  id: number,
  poster_path: string | null
  season_number: number
}
export interface ITvEpisode{
  air_date: string,
  episode_number: number,
  crew: {}[],
  guest_stars: {}[],
  id: number,
  name: string,
  overview: string,
  season_number: number,
  still_path: string,
  vote_average: number
  vote_count: number
}

export interface IActor {
  "birthday": string,
  "known_for_department": string,
  "deathday": string | null,
  "id": number,
  "name": string,
  "also_known_as": string[],
  "gender": number,
  "biography": string,
  "popularity": number,
  "place_of_birth": string,
  "profile_path": string,
  "adult": boolean,
  "imdb_id": string,
  "homepage": null
}
export interface IActorTaggedImages {
  "id": number,
  "page": number,
  "results": IActorTaggedImagesResults[],
    "total_pages": number,
    "total_results": number
}

export type IActorTaggedImagesResults = {
  "aspect_ratio": number,
  "file_path": string,
  "height": number,
  "id": string,
  "iso_639_1": string | null,
  "vote_average": number,
  "vote_count": number,
  "width": number,
  "image_type": string,
  "media": IActorTaggedImagesResultsMedia,
  "media_type": string
}

export type IActorTaggedImagesResultsMedia = {
  "adult": boolean,
    "backdrop_path": string,
    "genre_ids": number[],
    "_id": string,
    "id": number,
    "original_language": string,
    "original_title": string,
    "overview": string,
    "release_date": string,
    "poster_path": string,
    "popularity": number,
    "title": string,
    "video": boolean,
    "vote_average": number,
    "vote_count": number
}

export interface IActorImages {
  "id": number,
  "profiles": IActorImagesProfiles[]
}

export type IActorImagesProfiles = {
  "aspect_ratio": number,
      "file_path": string,
      "height": number,
      "iso_639_1": null,
      "vote_average": number,
      "vote_count": number,
      "width": number
}

export interface IActorCredits {
  "cast": IActorCreditsCast[],
  "crew": IActorCreditsCrew[]
}

export type IActorCreditsCast = {
      "character": string,
      "credit_id": string,
      "release_date": string,
      "vote_count": number,
      "video": boolean,
      "adult": boolean,
      "vote_average": number,
      "title": string,
      "genre_ids": number[],
      "original_language": string,
      "original_title": string,
      "popularity": number,
      "id": number,
      "backdrop_path": string,
      "overview": string,
      "poster_path": string
}

export type IActorCreditsCrew = {
        "id": number,
        "department": string,
        "original_language": string,
        "original_title": string,
        "job": string,
        "overview": string,
        "vote_count": number,
        "video": boolean,
        "poster_path": string,
        "backdrop_path": string,
        "title": string,
        "popularity": number,
        "genre_ids": number[],
        "vote_average": number,
        "adult": boolean,
        "release_date": string,
        "credit_id": string
      
}


export interface IVideos {
  "id": number,
  "results": IVideoResults[]
}

export type IVideoResults = {
  "iso_639_1": string,
  "iso_3166_1": string,
  "name": string,
  "key": string,
  "site": string,
  "size": number,
  "type": string,
  "official": boolean,
  "published_at": string,
  "id": string
}

export interface ICombinedActorCredits {
  "cast": CombinedActorCreditsCast[],
  "crew": CombinedActorCreditsCrew[],
  "id": number
}

export type CombinedActorCreditsCast = {  
    "id": number,
    "original_language": string,
    "episode_count": number,
    "overview": string,
    "origin_country": string[],
    "original_name": string,
    "genre_ids": number[],
    "name": string,
    "media_type": string,
    "poster_path": string,
    "first_air_date": string,
    "vote_average": number,
    "vote_count": number,
    "character": string,
    "backdrop_path": string,
    "popularity": number,
    "credit_id": string,
    original_title: string,
    video: boolean,
    release_date: string,
    title: string,
    adult: boolean
  
}

export type CombinedActorCreditsCrew = {
  "id": number,
  "department": string,
  "original_language": string,
  "episode_count": number,
  "job": string,
  "overview": string,
  "origin_country": string[],
  "original_name": string,
  "vote_count": number,
  "name": string,
  "media_type": string,
  "popularity": number,
  "credit_id": string,
  "backdrop_path": string | null,
  "first_air_date": string,
  "vote_average": number,
  "genre_ids": number[],
  "poster_path": string | null,
  original_title: string,
  video: boolean,
  title: string,
  adult: boolean,
  release_date: string
}
