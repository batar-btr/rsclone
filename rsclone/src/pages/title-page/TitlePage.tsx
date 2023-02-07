import '../title-page/titlePage.scss';
import { useState, useEffect } from "react"
import { useTitle } from '../../hooks/titleData';

export const TitlePage = () => {
  const {isTvShow, title, cast, images, videos, reviews, similar, certification} = useTitle()

  console.log(title)
  console.log(cast)
  console.log(images)
  console.log(videos)
  console.log(reviews)
  console.log(similar)
  console.log(certification)
  
  // const mainTariler = videos!.results.filter(el => el.type === 'Trailer')
 

  return (
    <>
      <div>{title?.title || title?.name}</div>
      {
        title && <img src={'https://www.themoviedb.org/t/p/original/' + title?.poster_path} alt="poster" height={200}/>
      }
      
    </>
    
  )
}
