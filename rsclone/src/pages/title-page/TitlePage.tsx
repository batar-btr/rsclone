import '../title-page/titlePage.scss';
import { useState, useEffect } from "react"
import { useTitle } from '../../hooks/titleData';
import { Link, useLocation } from 'react-router-dom';

export const TitlePage = () => {
  const {isTvShow, title, cast, images, videos, reviews, similar, certification} = useTitle()
  const { state } = useLocation();
  const imgBase = 'https://www.themoviedb.org/t/p/w500/'

  // console.log(title)
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
          <Link to={`/title/${title?.id}/fullcredits`} state={{ type: `${state.type}` }}>Cast & Crew</Link>
        </div>
      </div>
    </div>
  )
}
