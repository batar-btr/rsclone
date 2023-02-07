import '../title-page/titlePage.scss';
import { useState, useEffect } from "react"
import { useTitle } from '../../hooks/titleData';

export const TitlePage = () => {
  const {isTvShow, title, cast, images, videos, reviews, similar} = useTitle()

  console.log(title)
  console.log(cast)
  console.log(images)
  console.log(videos)
  console.log(reviews)
  console.log(similar)
  
  
  // const mainTariler = videos!.results.filter(el => el.type === 'Trailer')
 

  return (
    <div>{title?.title || title?.name}</div>
  )
}
