import { ITitle, ITitleCast, ITitleId, ITitleImages, ITitleReleaseDates, ITitleReviews, ITitleSimilar, ITitleVideos } from "../models/title"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export const useTitle = () => {
  const params = useParams()
  const _apiBase = 'https://api.themoviedb.org/3/';
  const _apiKey3 = "api_key=62050b72659b37dc215bf1de992857d4";
  const _apiLang = 'language=en-US'
  const [isTvShow, setIsTvShow] = useState(false)
  const [title, setTitle] = useState<ITitle>();
  const [cast, setCast] = useState<ITitleCast>()
  const [images, setImages] = useState<ITitleImages>()
  const [videos, setVideos] = useState<ITitleVideos>()
  const [reviews, setReviews] = useState<ITitleReviews>()
  const [similar, setSimilar] = useState<ITitleSimilar>()
  const [certification, setCertification] = useState<ITitleReleaseDates>()

  useEffect(() => {
    const titleFetch = async () => {
      const data: ITitleId = await (
        await fetch(`${_apiBase}find/${params.id!}?${_apiKey3}&${_apiLang}&external_source=imdb_id`)
      ).json();
      const isMoviesResults = data.movie_results.length === 1
      isMoviesResults ? setIsTvShow(false) : setIsTvShow(true)
      const contentType = isMoviesResults ? 'movie' : 'tv'
      const resultsContentType = isMoviesResults? 'movie_results' : 'tv_results'
      
      const title: ITitle = await (
        await fetch(`https://api.themoviedb.org/3/${contentType}/
        ${data[resultsContentType][0].id}?${_apiKey3}&${_apiLang}`)
      ).json()
      setTitle(title)

      const cast: ITitleCast = await (
        await fetch(`https://api.themoviedb.org/3/${contentType}/
        ${data[resultsContentType][0].id}/credits?${_apiKey3}&${_apiLang}`)
      ).json()
      setCast(cast)

      const images: ITitleImages = await (
        await fetch(`https://api.themoviedb.org/3/${contentType}/
        ${data[resultsContentType][0].id}/images?${_apiKey3}`)
      ).json()
      setImages(images)

      const videos: ITitleVideos = await (
        await fetch(`https://api.themoviedb.org/3/${contentType}/
        ${data[resultsContentType][0].id}/videos?${_apiKey3}&${_apiLang}`)
      ).json()
      setVideos(videos)

      const reviews: ITitleReviews = await (
        await fetch(`https://api.themoviedb.org/3/${contentType}/
        ${data[resultsContentType][0].id}/reviews?${_apiKey3}&${_apiLang}&page=1`)
      ).json()
      setReviews(reviews)

      const similar: ITitleSimilar = await (
        await fetch(`https://api.themoviedb.org/3/${contentType}/
        ${data[resultsContentType][0].id}/similar?${_apiKey3}&${_apiLang}&page=1`)
      ).json()
      setSimilar(similar)

      // const certification: ITitleReleaseDates = await (
      //   await fetch(`https://api.themoviedb.org/3/${contentType}/
      //   ${data[resultsContentType][0].id}/release_dates?${_apiKey3}`)
      // ).json()
      // setCertification(certification)
    };
    titleFetch();
  }, []);


  return {isTvShow, title, cast, images, videos, reviews, similar, certification}
}