import './info-box.scss'
import { FC } from 'react'
import { ReactComponent as CloseIcon } from '../rate-box/close-icon.svg'
import { CarouselCardItem } from '../movie-card-carousel/MovieCardCarousel';
import { useState, useEffect } from 'react';
import { IMovie, ITV } from '../../types';
import { fetchDetails } from '../../API/fetchDetails';
import { ReactComponent as Star } from '../movie-card-carousel/icons/star.svg';
import { ReactComponent as StrokeStar } from '../movie-card-carousel/icons/stroke-star.svg';
import { UserAuth } from '../../context/AuthContext';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';


interface InfoBoxProps {
  info: CarouselCardItem;
  loading: boolean;
  hide: () => void;
  toWatchlist: () => void;
  openRate: () => void;
}

const InfoBox: FC<InfoBoxProps> = (props) => {
  const { loading, toWatchlist, openRate, hide } = props;
  const { title, img, rate, type, id } = props.info;
  const imgPath = `https://image.tmdb.org/t/p/w500${img}`;

  const [info, setInfo] = useState<IMovie | ITV | null>(null);
  const [infoLoading, setInfoLoading] = useState<boolean>(false);

  const { user, userData } = UserAuth()

  const isAdded = userData?.['favorite'][type].some((item: number) => item === id) as boolean;
  const rating = userData?.rate[type][id];

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setInfoLoading(true);
      const data = await fetchDetails(type, id);
      setInfo(data);
      setInfoLoading(false);
    })()
  }, [])

  const getYear = (date: string) => date.split('-')[0];

  const getTime = (minutes: number): string => {
    const MPH = 60;
    let h = Math.floor(minutes / MPH);
    let m = minutes % MPH;
    return `${h ? `${h}h` : ''} ${m}min`
  }

  const year = (type: 'tv' | 'movie') => {
    if (type === 'tv') {
      const data = info as ITV;
      return (getYear(data.first_air_date))
    } else {
      const data = info as IMovie;
      return (getYear(data.release_date))
    }
  }

  const time = (type: 'tv' | 'movie') => {
    if (type === 'tv') {
      const data = info as ITV;
      return (getTime(data.episode_run_time[0]))
    } else {
      const data = info as IMovie;
      return (getTime(data.runtime))
    }
  }

  const navigateTo = (path: string) => {
    hide();
    navigate(path);
  }

  const markUp = (
    <>
      <div className="top-section">
        <div className="img-wrap" onClick={() => navigateTo(`${type}/${id}`)}>
          <img src={imgPath} alt={title} />
        </div>
        <div className="info">
          <h2 onClick={() => navigateTo(`${type}/${id}`)}>{title}</h2>
          <p>
            <span>{info && year(type)}</span>
            <span className='dot'>.</span>
            <span>{info && time(type)}</span>
          </p>
          <p className='genres'>
            {info && info.genres.map((item, idx) => <span key={idx}>{item.name}</span>).flatMap((e, idx) => [e, <span key={idx + 10} className='dot'>.</span>]).slice(0, -1)}
          </p>
          <div className='rating-bar'>
            <div>
              <Star fill='#f5c518' width='13' height='13'></Star>
              <span>{` ${rate.toFixed(1)} / 10`}</span>
            </div>
            <button className='rate-btn' onClick={openRate}>
              {rating ? <Star fill='#5799ef' width='14' height='14' /> : <StrokeStar fill='#fff' width='14' height='14' />}
              {rating && ` ${rating}`}
            </button>
          </div>
        </div>
      </div>
      <div className="description">{info?.overview}</div>
      <div className="bottom-section">
        <button className='watch-list-btn' onClick={toWatchlist}>
          {!loading && <><span>{`${isAdded ? '✓ ' : '+ '}`}</span><>Watchlist</></>}
          {loading && <RotatingLines
            strokeColor="#5799ef"
            strokeWidth="5"
            animationDuration="0.75"
            width="20"
            visible={true}
          />}
        </button>
      </div>
    </>
  );

  const preloader = <RotatingLines
    strokeColor="#5799ef"
    strokeWidth="5"
    animationDuration="0.75"
    width="100"
    visible={true}
  />

  return (
    <div className={`info-box-wrap${infoLoading ? ' loading' : ''}`}>
      {infoLoading && preloader}
      {!infoLoading && markUp}
      <button className='close-btn' onClick={hide}><CloseIcon /></button>
    </div>
  );
}

export { InfoBox }