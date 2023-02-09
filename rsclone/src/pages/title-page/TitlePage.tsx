import '../title-page/titlePage.scss';
import { useState, useEffect } from "react"
import { useTitle } from '../../hooks/titleData';
import { Link, useLocation } from 'react-router-dom';

export const TitlePage = () => {
  const {isTvShow, title, cast, images, videos, reviews, similar, certification} = useTitle()
  const type = document.URL.split('/')[3]
  const imgBase = 'https://www.themoviedb.org/t/p/w500/'

  console.log(title)
  // console.log(cast)
  // console.log(images)
  // console.log(videos)
  // console.log(reviews)
  // console.log(similar)
  // console.log(certification)

 
  
  // const mainTariler = videos!.results.filter(el => el.type === 'Trailer')
 

  return (
    <div className='title-container'>
      <div className='title-main-info'>
        <div className='title-main-info-top'>
          <Link to={`/${type}/${title?.id}/fullcredits`}>Cast & Crew</Link>
          <img src={imgBase + title?.poster_path} alt='img' width={150}></img>
          {
            title?.name && <div>{title.name}</div>
          }
        </div>
      </div>
    </div>
  )
}
