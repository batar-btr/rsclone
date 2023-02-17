import { useNavigate } from 'react-router-dom';
import { ITitleVideos } from '../../../models/title';
import { IMovie } from '../../../types';
import cross from '../cross.svg';
import { useState, useEffect } from "react"
import AddFlag from '../../movie-card-carousel/AddFlag/AddFlag';

type CarouselItemProps = {
  movie: IMovie
}

const CarouselItem = ({ movie }: CarouselItemProps) => {
  const { backdrop_path: bg, poster_path: poster, title, id } = movie;
  const bgPath = `https://image.tmdb.org/t/p/original${bg}`;
  const posterPath = `https://image.tmdb.org/t/p/w300${poster}`;

  const [select, setSelect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [mainTrailer, setMainTrailer] = useState('')
  const navigate = useNavigate(); 

  useEffect(() => {
    const getVideos = async () => {
      const videos: ITitleVideos = await (
        await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=62050b72659b37dc215bf1de992857d4&language=en-US`)
      ).json()
      const mainTr = videos.results.filter(el => el.type === 'Trailer')[0]
      setMainTrailer(mainTr ? mainTr.key : '')
    }
    getVideos()
  }, [])

  const addMovieHandler = () => {
    setLoading(prev => !prev);
    setTimeout(() => {
      return setSelect(prev => {
        setLoading(prev => !prev);
        return !prev;
      })
    }, 1000);
  }

  return (
    <div className='slide-wrap' onClick={(e) => {
      e.stopPropagation()
      navigate(`/movie/${id}/video/${mainTrailer}`)
    }}>
      <img src={bgPath} alt={title} />
      <div className="legend custom">
        <div className="poster-wrap" onClick={(e) => {
          e.stopPropagation()
          navigate(`/movie/${id}`)
        }}>
          <img src={posterPath} alt="poster" />
          <div onClick={(e) => e.stopPropagation()}>
            <AddFlag checked={select} loading={loading} onClick={addMovieHandler}></AddFlag>
          </div>
        </div>
        <div className="slide-info">
          <button className='play-btn'></button>
          <div>
            <div className="title-top">
              <p className="main-slide-title">{title}</p>
            </div>
            <div className="title-bottom">
              <p className="sub-title">
                {`Watch "${title}" trailer`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CarouselItem }