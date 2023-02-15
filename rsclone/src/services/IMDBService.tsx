import { useHttp } from "./http.hook";
import {
  IMDBPopular,
  ITransformMovie,
  IPopular,
  IPopularTVShow,
  IMDBPopularTVShow,
  IGenres,
} from "../models/IMDBModels";
import { 
  IMovieReleaseDates, 
  ITitle, 
  ITitleCast, 
  ITitleImages, 
  ITitleReviews, 
  ITitleSimilar, 
  ITitleVideos, 
  ITvContentRatings 
} from "../models/title"

const IMDBService = () => {
  const { request } = useHttp();
  const _apiBase = "https://api.themoviedb.org/3/";
  const _apiLang = 'language=en-US'
  const _apiKey3 = "api_key=62050b72659b37dc215bf1de992857d4";
  // const _apiKey4 = "api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjA1MGI3MjY1OWIzN2RjMjE1YmYxZGU5OTI4NTdkNCIsInN1YiI6IjYzZGNmM2IxY2QyMDQ2MDA3OTcwMzRiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XKKVY-ZqJB4run5AUDdIemKdlPeKhKRZIFU-aGOSzRk";
  const _image = "https://image.tmdb.org/t/p/w500";
  const type = document.URL.split('/')[3]

  const getPopular = async () => {
    const requestLength = 5;

    const arr: ITransformMovie[] = [];

    for (let i = 0; i < requestLength; i++) {
      const res = (await request(
        `${_apiBase}movie/popular?${_apiKey3}&language=en-US&page=${i + 1}`
      )) as IMDBPopular;

      arr.push(...res.results.map(_transformMovie));
    }

    return arr;
  };

  const getPopularTVShow = async () => {
    const requestLength = 5;

    const arr: ITransformMovie[] = [];

    for (let i = 0; i < requestLength; i++) {
      const res = (await request(
        `${_apiBase}tv/popular?${_apiKey3}&language=en-US&page=${i + 1}`
      )) as IMDBPopularTVShow;

      arr.push(...res.results.map(_transformTVShow));
    }

    return arr;
  };

  const getLowestRated = async () => {
    const requestLength = 5;
    let maxPage = 497;

    const arr: ITransformMovie[] = [];

    for (let i = 0; i < requestLength; i++) {
      const res = (await request(
        `${_apiBase}movie/top_rated?${_apiKey3}&language=en-US&page=${(maxPage -= 1)}`
      )) as IMDBPopular;

      arr.push(...res.results.map(_transformMovie));
    }

    return arr;
  };

  const getTop250 = async () => {
    const requestLength = 13;

    const arr: ITransformMovie[] = [];

    for (let i = 0; i < requestLength; i++) {
      const res = (await request(
        `${_apiBase}movie/top_rated?${_apiKey3}&page=${i + 1}`
      )) as IMDBPopular;
      arr.push(...res.results.map(_transformMovie));
    }

    let newArr = arr.filter(
      (
        (el) => (f) =>
          !el.has(f.id) && el.add(f.id)
      )(new Set())
    );

    newArr.length = 250;

    return newArr;
  };

  const getUpcoming = async () => {
    let totalPage = 20;

    const date = new Date().toLocaleDateString().split(".").reverse().join("-");

    const firstDate = new Date(date);

    let arr: ITransformMovie[] = [];

    for (let i = 0; i < totalPage; i++) {
      const res = (await request(
        `${_apiBase}movie/upcoming?${_apiKey3}&language=en-US&page=${i + 1}`
      )) as IMDBPopular;
      arr.push(...res.results.map(_transformMovie));
    }

    arr = arr.filter((item) => {
      const secondDate = new Date(item.year);

      return (firstDate < secondDate) === true;
    });

    let newArr = arr.filter(
      (
        (el) => (f) =>
          !el.has(f.id) && el.add(f.id)
      )(new Set())
    );

    return newArr;
  };

  const getTop250TVShows = async () => {
    const requestLength = 13;

    const arr: ITransformMovie[] = [];

    for (let i = 0; i < requestLength; i++) {
      const res = (await request(
        `${_apiBase}tv/top_rated?${_apiKey3}&page=${i + 1}`
      )) as IMDBPopularTVShow;
      arr.push(...res.results.map(_transformTVShow));
    }

    let newArr = arr.filter((el) => el.title !== "The D'Amelio Show");

    newArr.length = 250;

    return newArr;
  };

  const getGenres = async () => {
    const res = (await request(
      `${_apiBase}genre/movie/list?${_apiKey3}&language=en-US&page=${1}`
    )) as IGenres;
    return res.genres;
  };

  const _transformMovie = (movie: IPopular) => {
    return {
      id: movie.id,
      title: movie.original_title,
      description: movie.overview,
      thumbnail: _image + movie.poster_path,
      year: movie.release_date,
      vote: movie.vote_average,
      genre: movie.genre_ids,
    };
  };

  const _transformTVShow = (movie: IPopularTVShow) => {
    return {
      id: movie.id,
      title: movie.name,
      description: movie.overview,
      thumbnail: _image + movie.poster_path,
      year: movie.first_air_date,
      vote: movie.vote_average,
      genre: movie.genre_ids,
    };
  };

  // title requests
  const isTvShow = () => type === 'movie' ? false :  true

  const getTitle = async (id: number) => (await request(
    `${_apiBase}/${type}/${id}?${_apiKey3}&${_apiLang}`
  )) as ITitle;

  const getTitleCast = async (id: number) => (await request(
    `${_apiBase}/${type}/${id}/credits?${_apiKey3}&${_apiLang}`
  )) as ITitleCast;

  const getTitleImages = async (id: number) => (await request(
    `${_apiBase}/${type}/${id}/images?${_apiKey3}`
  )) as ITitleImages;

  const getTitleVideos = async (id: number) => (await request(
    `${_apiBase}/${type}/${id}/videos?${_apiKey3}&${_apiLang}`
  )) as ITitleVideos;

  const getTitleReviews = async (id: number) => (await request(
    `${_apiBase}/${type}/${id}/reviews?${_apiKey3}&${_apiLang}&page=1`
  )) as ITitleReviews

  const getTitleSimilar = async (id: number) => (await request(
    `${_apiBase}/${type}/${id}/recommendations?${_apiKey3}&${_apiLang}&page=1`
  )) as ITitleSimilar;

  const getTitleCertification = async (id: number) => {
    if (type === 'movie') {
      return (await (
        request(`${_apiBase}/${type}/${id}/release_dates?${_apiKey3}`)
      )) as IMovieReleaseDates
    } else {
      return (await (
        request(`${_apiBase}/${type}/${id}/content_ratings?${_apiKey3}&${_apiLang}`)
      )) as ITvContentRatings
    }
  }

  return {
    getPopular,
    getTop250,
    getLowestRated,
    getPopularTVShow,
    getTop250TVShows,
    getUpcoming,
    getGenres,
    isTvShow,
    getTitle,
    getTitleCast,
    getTitleImages,
    getTitleVideos,
    getTitleReviews,
    getTitleSimilar,
    getTitleCertification,
    type,
    _image
  };
};

export default IMDBService;
