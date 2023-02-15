import { IMovie } from '../../../types';
import { UserAuth } from '../../../context/AuthContext';
import { useState } from 'react'
import AddFlag from '../../movie-card-carousel/AddFlag/AddFlag';
import { addFavorite } from '../../../User/add-favorite';
import { deleteFavorite } from '../../../User/delete-favorite';
type CarouselItemProps = {
  movie: IMovie
}

const CarouselItem = ({ movie }: CarouselItemProps) => {
  const { backdrop_path: bg, poster_path: poster, title, id } = movie;
  const bgPath = `https://image.tmdb.org/t/p/original${bg}`;
  const posterPath = `https://image.tmdb.org/t/p/w300${poster}`;

  const [loading, setLoading] = useState<boolean>(false)

  const { user, userData } = UserAuth()
  const isAdded = userData?.['favorite']['movie'].some((item: number) => item === id) as boolean;

  const addMovieHandler = () => {
    if(user) {
      setLoading(prev => !prev);
      setTimeout(async () => {
        if(isAdded) {
          await deleteFavorite(user.uid, 'movie', id)
        } else {
          await addFavorite(user.uid, 'movie', id);
        }
        setLoading(prev => !prev);
      }, 1000);
    }
  }

  return (
    <div className='slide-wrap'>
      <img src={bgPath} alt={title} />
      <div className="legend custom">
        <div className="poster-wrap">
          <img src={posterPath} alt="poster" />
          <AddFlag checked={isAdded} loading={loading} onClick={addMovieHandler}></AddFlag>
          {/* <div className="flag-icon" onClick={addMovieHandler}>
            <img src={cross} alt="cross-icon" />
          </div> */}
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