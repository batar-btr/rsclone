import { CarouselCardItem } from "./MovieCardCarousel";
import { IMovie, ITV } from "../../types";
import { TrendingItem } from "../../API/fetchTrending";
import fetchTrending from "../../API/fetchTrending";
import fetchTopRatedMovies from "../../API/fetchTopRatedMovies";
import fetchTopRatedTVs from "../../API/fetchTopRatedTVs";

function addType<T>(arr: T[], type: 'tv' | 'movie'): T[] {
  return arr.map(item => ({ ...item, type }));
}

const fetchCarouselData = async (type: 'favorites' | 'top' | 'top-tv') => {

  let result: CarouselCardItem[] = [];
  let movies: Array<IMovie | TrendingItem> = [];
  let tvs: Array<ITV | TrendingItem> = [];

  switch (type) {
    case 'favorites': {
      movies = await fetchTrending('movie', 'week');
      tvs = await fetchTrending('tv', 'week');
      break;
    }
    case 'top': {
      movies = await fetchTopRatedMovies();
      tvs = await fetchTopRatedTVs();
      break;
    }
    case 'top-tv': {
      let page1 = await fetchTopRatedTVs();
      let page2 = await fetchTopRatedTVs(2);
      tvs = [...page1, ...page2];
    }
  }

  type MediaType = 'tv' | 'movie'

  result = [...addType(movies, 'movie'), ...addType(tvs, 'tv')].map(item => ({
    id: item.id,
    title: item?.['title'] || item?.['name'] || '',
    img: item.poster_path,
    rate: item.vote_average,
    type: item.type as MediaType
  })).slice(0, 24).sort(() => (0.5 - Math.random()));

  function spliceIntoChunks<T>(arr: T[], chunkSize: number) {
    const res = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }
    return res;
  }

  return spliceIntoChunks(result, 6);
}

export {fetchCarouselData }