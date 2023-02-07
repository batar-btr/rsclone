import { IMovie } from '../../../types';
import cross from '../cross.svg';

type CarouselItemProps = {
  movie: IMovie
}

const CarouselItem = ({ movie }: CarouselItemProps) => {
  const { backdrop_path: bg, poster_path: poster, title } = movie;
  const bgPath = `https://image.tmdb.org/t/p/original${bg}`;
  const posterPath = `https://image.tmdb.org/t/p/w300${poster}`;

  return (
    <div className='slide-wrap'>
      <img src={bgPath} alt={title} />
      <div className="legend custom">
        <div className="poster-wrap">
          <img src={posterPath} alt="poster" />
          <div className="flag-icon">
            <img src={cross} alt="cross-icon" />
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