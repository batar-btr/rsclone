import { FC, useState, useEffect } from 'react';
import fetchTrending from '../../API/fetchTrending';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './MovieCardCarousel.scss';
import AddFlag from './AddFlag';
import { ReactComponent as Star } from './icons/star.svg';
import { ReactComponent as StrokeStar } from './icons/stroke-star.svg';
import { ReactComponent as PlayIcon } from './icons/play.svg';


interface MovieCardCarouselProps {
  topTitle?: string;
  type: 'favorites' | 'top';
}

interface CarouselCardItem {
  id: number;
  title: string;
  img: string | null;
  rate: number;
}

const MovieCardCarousel: FC<MovieCardCarouselProps> = ({ topTitle, type }) => {

  const [items, setItems] = useState<CarouselCardItem[][]>([]);


  useEffect(() => {
    (async () => {
      let result: CarouselCardItem[] = [];
      switch (type) {
        case 'favorites':
          let movies = await fetchTrending('movie', 'week');
          let tvs = await fetchTrending('tv', 'week');
          result = [...movies, ...tvs].map(item => ({
            id: item.id,
            title: item['title'] || item['name'] || '',
            img: item.poster_path,
            rate: item.vote_average
          })).slice(0, 24).sort((a, b) => (0.5 - Math.random()));
          break;
      }

      function spliceIntoChunks<T>(arr: T[], chunkSize: number) {
        const res = [];
        while (arr.length > 0) {
          const chunk = arr.splice(0, chunkSize);
          res.push(chunk);
        }
        return res;
      }

      setItems(spliceIntoChunks(result.slice(0, 24), 6));
    })()
  }, [type])

  type MovieCardBlockProps = {
    items: CarouselCardItem[]
  }

  const MovieCardBlock = (props: MovieCardBlockProps) => {
    return (
      <div className='movie-card-block'>
        {props.items.map(item => {
          return (
            <MovieCard item={item} key={item.id}></MovieCard>
          );
        })}
      </div>
    );
  }

  interface MovieCardProps {
    item: CarouselCardItem
  }

  const MovieCard = (props: MovieCardProps) => {
    const [select, setSelect] = useState<boolean>(false);
    const imgPath = `https://image.tmdb.org/t/p/w500${props.item.img}`;

    const addMovieHandler = () => {
      setTimeout(() => {
        return setSelect(prev => {
          console.log(prev);
          return !prev;
        })
      }, 1000);

    }

    return (
      <div className='movie-card'>
        <div className="img-wrap">
          <img src={imgPath} alt="" />
          <AddFlag checked={select} onClick={addMovieHandler}></AddFlag>
        </div>
        <div className="info-block">
          <div>
            <div className='movie-card__rating'>
              <div>
                <Star fill='#f5c518' width='13' height='13'></Star>
                <span>{props.item.rate.toFixed(1)}</span>
              </div>
              <button className='rate-btn'><StrokeStar fill='#fff' width='14' height='14'></StrokeStar></button>
            </div>
            <h3 className='movie-card__title'>{`${props.item.title.slice(0, 35)}...`}</h3>
          </div>
          <div className='info-block__bottom'>
            <button className='watch-list-btn' onClick={addMovieHandler}><span>{`${select ? '✓ ' : '+ '}`}</span>Watchlist</button>
            <div>
              <button className='trailer-btn'>
                <PlayIcon fill='#fff'></PlayIcon>
                Trailer
              </button>
              <button className='movie-info-button'>
                <span>i</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='movie-card-carousel'>
      {topTitle && <h2>{topTitle}</h2>}
      <Carousel showThumbs={false} showStatus={false} showIndicators={false}>
        {items.map((item, index) => <MovieCardBlock items={item} key={index}></MovieCardBlock>)}
      </Carousel>
    </div>
  );
}

export { MovieCardCarousel }