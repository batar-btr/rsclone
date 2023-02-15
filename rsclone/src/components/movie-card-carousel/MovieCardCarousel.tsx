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
    const imgPath = `https://image.tmdb.org/t/p/w500${img}`;

    const { user, userData } = UserAuth()

    const isAdded = userData?.['favorite'][type].some((item:number) => item === id) as boolean;
    const rating = userData?.rate[type][id];

    const addMovieHandler = async () => {
      if(user) {
        setLoading(prev => !prev);
        setTimeout(async () => {
          if(isAdded) {
            await deleteFavorite(user.uid, type, id)
          } else {
            await addFavorite(user.uid, type, id);
          }
          setLoading(prev => !prev);
        }, 1000);
      }
    }
    
    const trimTitle = title.length > 22 ? `${title.slice(0, 22)}...` : title;

    const testHandler = () => {
      toggle();
      console.log(isShowing)
    };

    return (
      <div className='movie-card'>
        <div className="img-wrap">
          <img src={imgPath} alt="" />
          <AddFlag checked={isAdded} loading={loading} onClick={addMovieHandler}></AddFlag>
        </div>
        <div className="info-block">
          <div>
            <div className='movie-card__rating'>
              <div>
                <Star fill='#f5c518' width='13' height='13'></Star>
                <span>{rate.toFixed(1)}</span>
              </div>
              <button className='rate-btn' onClick={toggle}>
                {rating ? <Star fill='#5799ef' width='14' height='14'/> : <StrokeStar fill='#fff' width='14' height='14'/>}
                { rating && ` ${rating}` }
              </button>
              <Modal isShowing={isShowing} hide={toggle}>
                <RateBox title={title} hide={toggle} id={id} type={type}></RateBox>
              </Modal>
            </div>
            <h3 className='movie-card__title'>{trimTitle}</h3>
          </div>
          <div className='info-block__bottom'>
            <button className='watch-list-btn' onClick={addMovieHandler}>
              {!loading && <><span>{`${isAdded ? '✓ ' : '+ '}`}</span><>Watchlist</></>}
              {loading && <RotatingLines
                strokeColor="#5799ef"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
              />}
            </button>
            <div>
              <button className='trailer-btn' onClick={()=>navigate(`${type}/${id}`)}>
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
      {topTitle && <h3 className='top-title'>{topTitle}</h3>}
      <div className='sub-title-wrap'>
        <div className='sub-title-wrap__marker'></div>
        <div>{subTitle?.[0]}</div>
        <div className='arrow-icon'>
          <Arrow />
        </div>
      </div>
      <h4>{subTitle?.[1]}</h4>
      <Carousel showThumbs={false} showStatus={false} showIndicators={false}>
        {items.map((item, index) => <MovieCardBlock items={item} key={index}></MovieCardBlock>)}
      </Carousel>
    </div>
  );
}

export { MovieCardCarousel }