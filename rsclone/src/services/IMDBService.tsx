import { useHttp } from './http.hook';
import { IMDBPopular, ITransformMovie, IPopular, IPopularTVShow, IMDBPopularTVShow } from '../models/IMDBModels';


const IMDBService = () => {

    const { request } = useHttp();
    const _apiBase = 'https://api.themoviedb.org/3/';
   
    const _apiKey3 = "api_key=62050b72659b37dc215bf1de992857d4"; 
   // const _apiKey4 = "api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjA1MGI3MjY1OWIzN2RjMjE1YmYxZGU5OTI4NTdkNCIsInN1YiI6IjYzZGNmM2IxY2QyMDQ2MDA3OTcwMzRiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XKKVY-ZqJB4run5AUDdIemKdlPeKhKRZIFU-aGOSzRk"; 
    const _image = 'https://image.tmdb.org/t/p/w500'


    const getPopular = async () => {

      const requestLength = 5;

      const arr: ITransformMovie[] = []

      for (let i = 0; i < requestLength; i++) {
        const res = await request(`${_apiBase}movie/popular?${_apiKey3}&language=en-US&page=${i + 1}`) as IMDBPopular;       
        
        arr.push(...res.results.map(_transformMovie))         
      } 

      return arr
        
    }

    const getPopularTVShow = async () => {

      const requestLength = 5;

      const arr: ITransformMovie[] = []

      for (let i = 0; i < requestLength; i++) {
        const res = await request(`${_apiBase}tv/popular?${_apiKey3}&language=en-US&page=${i + 1}`) as IMDBPopularTVShow;       
        
        arr.push(...res.results.map(_transformTVShow))         
      } 

      return arr
        
    }

    const getLowestRated = async () => {

      const requestLength = 5;
      let maxPage = 497;

      const arr: ITransformMovie[] = []

      for (let i = 0; i < requestLength; i++) {
        const res = await request(`${_apiBase}movie/top_rated?${_apiKey3}&language=en-US&page=${maxPage -= 1}`) as IMDBPopular;       
        
        arr.push(...res.results.map(_transformMovie))         
      } 

      return arr
        
    }

    const getTop250 = async () => {

      const requestLength = 13;

      const arr: ITransformMovie[] = []

      for (let i = 0; i < requestLength; i++) {
        const res = await request(`${_apiBase}movie/top_rated?${_apiKey3}&language=en-US&page=${i + 1}`) as IMDBPopular;
        arr.push(...res.results.map(_transformMovie))         
      } 

      arr.length = 250 

      return arr
        
    }

    const getTop250TVShows = async () => {

      const requestLength = 13;

      const arr: ITransformMovie[] = []

      for (let i = 0; i < requestLength; i++) {
        const res = await request(`${_apiBase}tv/top_rated?${_apiKey3}&language=en-US&page=${i + 1}`) as IMDBPopularTVShow;
        arr.push(...res.results.map(_transformTVShow))         
      } 

      arr.length = 250 

      return arr
        
    }

    const _transformMovie = (movie: IPopular) => {
        return {
            id: movie.id,
            title: movie.original_title,
            description: movie.overview,
            thumbnail: _image + movie.poster_path,
            year: movie.release_date,
            vote: movie.vote_average
        }
    }

    const _transformTVShow = (movie: IPopularTVShow) => {
        return {
            id: movie.id,
            title: movie.name,
            description: movie.overview,
            thumbnail: _image + movie.poster_path,
            year: movie.first_air_date,
            vote: movie.vote_average
        }
    }
    

    return {getPopular, getTop250, getLowestRated, getPopularTVShow, getTop250TVShows}  
    
}

export default IMDBService;