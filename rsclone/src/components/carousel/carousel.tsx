import { useEffect, useState } from 'react';
import './carousel.scss';
import { IMovie } from '../../types';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { fetchUpcomingMovies } from '../../API/api';
import { CarouselItem } from './CarouselItem/CarouselItem';
import { UpNext } from './UpNext/UpNext';
import { DotSpinner } from '../dots-spinner/DotSpinner';

const MainCarousel = () => {

  const [data, setData] = useState<IMovie[]>([]);
  const [upNext, setUpNext] = useState<IMovie[]>([]);
  const [dataLoading, setdataLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const data = await fetchUpcomingMovies()
      const moviesWithImg = data.filter(({ backdrop_path, poster_path }) => backdrop_path && poster_path);
      setData(moviesWithImg);
      if (moviesWithImg) {
        setdataLoading(false)
      }
      setUpNext(moviesWithImg.slice(1, 4));
    })();
  }, []);


  const onChangeHandler = (index: number): void => {
    const arr = [...data];
    const nextMovies = [...arr.slice(index), ...arr.slice(0, index)];
    setUpNext(nextMovies.slice(1, 4));
  }

  const opts = {
    autoPlay: true,
    infiniteLoop: true,
    showThumbs: false,
    interval: 5000,
    showIndicators: false,
    showStatus: false
  }

  return (
    <div className="carousel-container">
      <div className="carousel-main">
        {
          dataLoading && <DotSpinner theme='dark' size='big'/>
        }
        {data.length > 0 && !dataLoading &&
          <Carousel {...opts} onChange={onChangeHandler}>
            {data.map(item => (
              <CarouselItem movie={item} key={item.id} />
            ))}
          </Carousel>
        }
      </div>
      <div className="carousel-sidebar">
        <UpNext movies={upNext}></UpNext>
      </div>
    </div>
  );
}


export { MainCarousel }