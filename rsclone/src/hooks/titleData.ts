import { IMovieReleaseDates, ITitle, ITitleCast, ITitleImages, ITitleReviews, ITitleSimilar, ITitleVideos, ITvContentRatings } from "../models/title"
import { useParams, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

export const useTitle = () => {
  const params = useParams()
  const { state } = useLocation();
  const _apiBase = 'https://api.themoviedb.org/3';
  const _apiKey3 = "api_key=62050b72659b37dc215bf1de992857d4";
  const _apiLang = 'language=en-US'
  const [isTvShow, setIsTvShow] = useState(false)
  const [title, setTitle] = useState<ITitle>();
  const [cast, setCast] = useState<ITitleCast>()
  const [images, setImages] = useState<ITitleImages>()
  const [videos, setVideos] = useState<ITitleVideos>()
  const [reviews, setReviews] = useState<ITitleReviews>()
  const [similar, setSimilar] = useState<ITitleSimilar>()
  const [certification, setCertification] = useState('')

  useEffect(() => {
    state.type === 'movie' ? setIsTvShow(false) : setIsTvShow(true)

    const titleFetch = async () => {
      const title: ITitle = await (
        await fetch(`${_apiBase}/${state.type}/${params.id}?${_apiKey3}&${_apiLang}`)
      ).json()
      setTitle(title)

      const cast: ITitleCast = await (
        await fetch(`${_apiBase}/${state.type}/${params.id}/credits?${_apiKey3}&${_apiLang}`)
      ).json()
      setCast(cast)

      const images: ITitleImages = await (
        await fetch(`${_apiBase}/${state.type}/${params.id}/images?${_apiKey3}`)
      ).json()
      setImages(images)

      const videos: ITitleVideos = await (
        await fetch(`${_apiBase}/${state.type}/${params.id}/videos?${_apiKey3}&${_apiLang}`)
      ).json()
      setVideos(videos)

      const reviews: ITitleReviews = await (
        await fetch(`${_apiBase}/${state.type}/${params.id}/reviews?${_apiKey3}&${_apiLang}&page=1`)
      ).json()
      setReviews(reviews)

      const similar: ITitleSimilar = await (
        await fetch(`${_apiBase}/${state.type}/${params.id}/similar?${_apiKey3}&${_apiLang}&page=1`)
      ).json()
      setSimilar(similar)

      let certRes = ''
      if (state.type === 'movie') {
        const certification: IMovieReleaseDates = await (
          await fetch(`${_apiBase}/${state.type}/${params.id}/release_dates?${_apiKey3}`)
        ).json()
        certRes = certification.results.filter(el => el.iso_3166_1 === 'US')[0].release_dates[0].certification
      } else {
        const certification: ITvContentRatings = await (
          await fetch(`${_apiBase}/${state.type}/${params.id}/content_ratings?${_apiKey3}&${_apiLang}`)
        ).json()
        certRes = certification.results.filter(el => el.iso_3166_1 === 'US')[0].rating
      }
      setCertification(certRes)
    };
    titleFetch();
  }, []);

  return {isTvShow, title, cast, images, videos, reviews, similar, certification}
}