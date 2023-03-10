import { FC, useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './MovieCardCarousel.scss';
import AddFlag from './AddFlag/AddFlag';
import { ReactComponent as Star } from './icons/star.svg';
import { ReactComponent as StrokeStar } from './icons/stroke-star.svg';
import { ReactComponent as PlayIcon } from './icons/play.svg';
import { ReactComponent as Arrow } from './icons/right-arrow.svg';
import { RotatingLines } from 'react-loader-spinner';
import { fetchCarouselData } from './fetchCarouselData';
import { RateBox } from '../rate-box/rate-box';

import { UserAuth } from '../../context/AuthContext';
import useModal from '../../hooks/useModal';
import Modal from '../modal/Modal';
import { addFavorite } from '../../User/add-favorite';
import { deleteFavorite } from '../../User/delete-favorite';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { ITitleVideos } from '../../models/title';
import { InfoBox } from '../info-box/info-box';
import { User } from 'firebase/auth';

interface MovieCardCarouselProps {
  topTitle?: string;
  subTitle?: string[];
  type: 'favorites' | 'top' | 'top-tv';
}

export interface CarouselCardItem {
  id: number;
  title: string;
  img: string | null;
  rate: number;
  type: 'tv' | 'movie';
}

const MovieCardCarousel: FC<MovieCardCarouselProps> = ({ topTitle, subTitle, type }) => {

  const [items, setItems] = useState<CarouselCardItem[][]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await fetchCarouselData(type);
      setItems(data);
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
    const { title, img, rate, type, id } = props.item;

    const [select, setSelect] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { isShowing, toggle } = useModal();
    const { isShowing: isInfoShowing, toggle: toggleInfo } = useModal();
    const imgPath = `https://image.tmdb.org/t/p/w500${img}`;

    const [mainTrailer, setMainTrailer] = useState('')

    const { user, userData } = UserAuth()

    const isAdded = userData?.['favorite'][type].some((item: number) => item === id) as boolean;
    const rating = userData?.rate[type][id];


    useEffect(() => {
      const getVideos = async () => {
        const videos: ITitleVideos = await (
          await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=62050b72659b37dc215bf1de992857d4&language=en-US`)
        ).json()
        const mainTr = videos.results.filter(el => el.type === 'Trailer')[0]
        setMainTrailer(mainTr ? mainTr.key : '')
      }
      getVideos()
    }, [])

    const addMovieHandler = async (user: User | null, type: 'tv' | 'movie', id: number) => {

      if (user) {
        setLoading(prev => !prev);
        setTimeout(async () => {
          if (isAdded) {
            await deleteFavorite(user.uid, type, id)
          } else {
            await addFavorite(user.uid, type, id);
          }
          setLoading(prev => !prev);
        }, 1000);
      }
    }


    return (
      <div className='movie-card'>
        <div className="img-wrap">
          <AddFlag checked={isAdded} loading={loading} onClick={() => addMovieHandler(user, type, id)}></AddFlag>
          <Link to={`/${type}/${id}`}>
            <img src={imgPath} alt="poster" />
            <div className='movie-card-poster-overlay'></div>
          </Link>
        </div>
        <div className="info-block">
          <div>
            <div className='movie-card__rating'>
              <div>
                <Star fill='#f5c518' width='13' height='13'></Star>
                <span>{rate.toFixed(1)}</span>
              </div>
              <button className='rate-btn' onClick={toggle}>
                {rating ? <Star fill='#5799ef' width='14' height='14' /> : <StrokeStar fill='#fff' width='14' height='14' />}
                {rating && ` ${rating}`}
              </button>
              <Modal isShowing={isShowing} hide={toggle}>
                <RateBox title={title} hide={toggle} id={id} type={type}></RateBox>
              </Modal>
            </div>
            <Link to={`/${type}/${id}`} className='movie-card__title'>{title}</Link>
          </div>
          <div className='info-block__bottom'>

            <button className='watch-list-btn' onClick={() => addMovieHandler(user, type, id)}>
              {!loading && <><span>{`${isAdded ? '??? ' : '+ '}`}</span><>Watchlist</></>}
              {loading && <RotatingLines
                strokeColor="#5799ef"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
              />}
            </button>
            <div>
              <Link to={`/${type}/${id}/video/${mainTrailer}`} className='trailer-btn'>
                <PlayIcon fill='#fff'></PlayIcon>
                Trailer
              </Link>
              <button className='movie-info-button' onClick={toggleInfo}>
                <span>i</span>
              </button>
              <Modal isShowing={isInfoShowing} hide={toggleInfo}>
                <InfoBox openRate={toggle} info={props.item} hide={toggleInfo} toWatchlist={() => addMovieHandler(user, type, id)} loading={loading} />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='movie-card-carousel'>
      {topTitle && <h3 className='top-title'>{topTitle}</h3>}
      <div className='sub-title-wrap'>
        <div className='sub-title-wrap__marker'></div>
        <div>{subTitle?.[0]}</div>
        <div className='arrow-icon'>
          <Arrow />
        </div>
      </div>
      <h4>{subTitle?.[1]}</h4>
      <Carousel showThumbs={false} showStatus={false} showIndicators={false} autoPlay={false}>
        {items.map((item, index) => <MovieCardBlock items={item} key={index}></MovieCardBlock>)}
      </Carousel>
    </div>
  );
}

export { MovieCardCarousel }