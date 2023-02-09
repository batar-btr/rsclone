export interface IMDBPopular {
    "page": number,
    "results": [IPopular],
    "total_results": number,
    "total_pages": number
}

export interface IMDBPopularTVShow {
    "page": number,
    "results": [IPopularTVShow],
    "total_results": number,
    "total_pages": number
}

export type IPopular = {        
        "poster_path": string,
        "adult": boolean,
        "overview": string,
        "release_date": string,
        "genre_ids": number[],
        "id": number,
        "original_title": string,
        "original_language": string,
        "title": string,
        "backdrop_path": string,
        "popularity": number,
        "vote_count": number,
        "video": boolean,
        "vote_average": number      
}

export type IPopularTVShow = {
    "poster_path": string,
    "popularity": number,
    "id": number,
    "backdrop_path": string,
    "vote_average": number,    
    "overview": string,
    "first_air_date": string,
    "origin_country": string[],
    "genre_ids": number[],
    "original_language": string,    
    "vote_count": number,
    "name": string,
    "original_name": string 
}

export type ITransformMovie = {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    year: string;
    vote: number;
    genre: number[];
}

export interface IGenres {
    "genres": IGenre []
}

export type IGenre = {
    "id": number,
    "name": string
}