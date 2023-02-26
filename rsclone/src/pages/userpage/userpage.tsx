import './userpage.scss'
import { useEffect, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { fetchDetails } from '../../API/fetchDetails';
import { addType } from '../../components/movie-card-carousel/fetchCarouselData';
import { IMovie, ITV } from '../../types';
import { year, time } from '../../components/info-box/info-box';
import AddFlag from '../../components/movie-card-carousel/AddFlag/AddFlag';
import { User } from 'firebase/auth';
import { deleteFavorite } from '../../User/delete-favorite';
import { addFavorite } from '../../User/add-favorite';
import useModal from '../../hooks/useModal';
import Modal from '../../components/modal/Modal';
import { RateBox } from '../../components/rate-box/rate-box';
import { Link } from 'react-router-dom';


interface UserPageProps {
  pageType: 'rate' | 'favorite';
}

const UserPage = (props: UserPageProps) => {

  const { userData } = UserAuth()
  const [viewMode, setViewMode] = useState<'grid' | 'line'>('line');
  const [favorites, setFavorites] = useState<Array<IMovie | ITV> | null>(null);

  const { pageType } = props;

  useEffect(() => {
    if (userData) {
      let movie: number[] = [];
      let tv: number[] = [];
      if (pageType === 'favorite') {
        movie = userData.favorite.movie;
        tv = userData.favorite.tv;
      } else {
        movie = Object.keys(userData.rate.movie).map(str => +str);
        tv = Object.keys(userData.rate.tv).map(str => +str);
      }

      (async () => {
        let movieData = await Promise.allSettled(movie.map(id => fetchDetails('movie', id)))
          .then(res => res.filter(item => item.status === 'fulfilled'))
          .then(res => res.map(item => {
            if (item.status === 'fulfilled') {
              return item.value
            }
          }))

        let tvData = await Promise.allSettled(tv.map(id => fetchDetails('tv', id)))
          .then(res => res.filter(item => item.status === 'fulfilled'))
          .then(res => res.map(item => {
            if (item.status === 'fulfilled') {
              return item.value
            }
          }))
        let result = [...addType(movieData, 'movie'), ...addType(tvData, 'tv')]

        if (result.length !== 0) {
          setFavorites(result as Array<IMovie | ITV>);
        } else {
          setFavorites(null);
        }
      })()
    }
  }, [userData, pageType])

  const toggleViewMode = () => {
    setViewMode(prev => {
      if (prev === 'grid') {
        return 'line';
      } else {
        return 'grid';
      }
    })
  }

  type FavoritesItemsProps = {
    item: IMovie | ITV;
  }

  const FavoriteItem = (props: FavoritesItemsProps) => {
    const { user, userData } = UserAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const { isShowing, toggle } = useModal();
    const { item } = props;
    const { item: { type, id } } = props
    const isAdded = userData?.['favorite'][type as 'movie' | 'tv'].some((item: number) => item === id) as boolean;
    const rating = userData?.rate[type as 'movie' | 'tv'][id];

    const imgPath = `https://image.tmdb.org/t/p/w185${item.poster_path}`;



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
      <div className='favorite-item'>
        <div className="img-wrap">
          <Link to={`/${type}/${id}`}><img src={imgPath} alt={item.title} /></Link>
          <AddFlag loading={loading} checked={isAdded} onClick={() => addMovieHandler(user, type as 'movie' | 'tv', id)} />
        </div>
        <div>
          <Link to={`/${type}/${id}`}><h3>{item.title || item.name}</h3></Link>
          <p className='info'>
            <span>{item.type && year(item.type, item)}</span>
            <span className='separ'></span>
            <span>{item.type && time(item.type, item)}</span>
            <span className='separ'></span>
            <span>{item.genres.map(i => i.name).join(', ')}</span>
          </p>
          <div className='rating-bar'>
            <div className="rating">
              <span className='star-icon'></span>
              {item.vote_average.toFixed(1)}
            </div>
            <div className={`user-rating${`${rating ? ' added' : ''}`}`} onClick={toggle}>
              <span className='star-icon'></span>
              {rating ? rating : 'Rate'}
            </div>
          </div>
          <p className="description">{item.overview}</p>
        </div>
        <Modal isShowing={isShowing} hide={toggle}>
          <RateBox
            title={item.title as string || item.name as string}
            id={id}
            type={type as 'movie' | 'tv'}
            hide={toggle}
          />
        </Modal>
      </div>
    );
  }

  return (
    <div className='watchlist-wrap'>
      <div className="watchlist-container">
        <h2>{`Your ${pageType === 'favorite' ? 'Favorites' : 'Ratings'}`}</h2>
        <div className='private'>
          <span className='lock'></span>
          <span> PRIVATE</span>
        </div>
        <div className="bar">
          <span className='item-count'>{`${favorites ? favorites.length : '0'} Titles`}</span>
          <div className={`view-mode ${viewMode}`} onClick={toggleViewMode}></div>
        </div>
        <div className={`favorite-items ${viewMode}`}>
          {favorites?.map(item => <FavoriteItem item={item} key={item.id} />)}
        </div>
      </div>
    </div>
  );
}

export { UserPage }