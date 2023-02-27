import { useState, useEffect } from "react";
import IMDBService from "../../../services/IMDBService";
import { MostPopularHeader } from "./mostPopularHeader";
import AsideChart from "../aside/aside";
import { ITransformMovie } from "../../../models/IMDBModels";
import { Spinner } from "../spinner/Spinner";
import { MostPopularSort } from "./mostPopularSort";
import { uuidv4 } from "@firebase/util";

import './mostPopularMovies.scss';
import { Link } from "react-router-dom";
import Modal from "../../../components/modal/Modal";
import { RateBox } from "../../../components/rate-box/rate-box";
import AddFlag from "../../../components/movie-card-carousel/AddFlag/AddFlag";
import { deleteFavorite } from "../../../User/delete-favorite";
import { addFavorite } from "../../../User/add-favorite";
import useModal from "../../../hooks/useModal";
import { UserAuth } from "../../../context/AuthContext";

const MostPopularMovies = () => {
  const initial = [] as Array<ITransformMovie>;
  const [movieList, setMovieList] = useState(initial);
  const [movieLoading, setMovieLoading] = useState(true)
  
  
  useEffect(() => {    
    onRequest();
  }, []);
  
  const onRequest = () => {
    IMDBService()
      .getPopular().then(movieList => setMovieList(movieList)).then(() => setMovieLoading(false))      
  }; 

  interface props{
    item: ITransformMovie,
    id: number
  } 

  const Item = (props: props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const {isShowing, toggle} = useModal();
      
    const { user, userData } = UserAuth()

    const isAdded = userData?.['favorite']['movie'].some((item: number) => item === props.item.id) as boolean;
    const rating = userData?.rate['movie'][props.item.id];
  
    const addMovieHandler = async () => {
      if (user) {
        setLoading(prev => !prev);
        setTimeout(async () => {
          if (isAdded) {
            await deleteFavorite(user.uid, 'movie', props.item.id)
          } else {
            await addFavorite(user.uid, 'movie', props.item.id);
          }
          setLoading(prev => !prev);
        }, 1000);
      }
    }

    const evenOrOdd = props.id % 2 === 0;

    const NotYetReleased = () => {

      return (
        <>
          <div className="mostPopular__item_rating">
          <div className="mostPopular__item_notYet"></div>
          <div className="mostPopular__item_rating-next"></div>
        </div>
        <div className="mostPopular__item_unseen-wrapper">
          <div className="mostPopular__item_notYet">Not Yet Released</div>
          {
            rating && <p className="mostPopular__item_seen-val">{rating}</p>
          }
        </div>
        </>
      )

    }

    const Released = () => {

      return (
        <>
            <div className="mostPopular__item_rating">
          <div className="mostPopular__item_rating-star"></div>
          <div className="mostPopular__item_rating-next">{props.item.vote}</div>
        </div>
        <div className="mostPopular__item_unseen-wrapper">
          <div className={`mostPopular__item_${rating ? 'seen' : 'unseen'}`} onClick={toggle}></div>
          {
            rating && <p className="mostPopular__item_seen-val">{rating}</p>
          }
        </div>
        </>
      )
    }

    const release = props.item.vote === 0 ? <NotYetReleased/> : <Released/>;

    return (
      <li
        className={`${
          evenOrOdd ? "mostPopular__item odd" : "mostPopular__item even"
        }`}
        key={uuidv4()}
      >
        <div className="mostPopular__item_img">
          <img src={props.item.thumbnail} alt={props.item.title} />
        </div>
        <div className="mostPopular__item_title-top">
          <div className="mostPopular__item_title-rate">{props.id + 1}. </div>
          <Link to={`/movie/${props.item.id}`}>{props.item.title} ({props.item.year.split('-')[0]})</Link>
        </div>

          {release}

        <Modal isShowing={isShowing} hide={toggle}>
          <RateBox title={props.item.title as string} hide={toggle} id={props.item.id} type={'movie'}></RateBox>
        </Modal>
        <div className={`mostPopular__item_watch ${loading ? 'loading' : ''}`}>
            <div title={isAdded ? 'Click to remove from watchlist' : 'Click to add to watchlist'}>
              <AddFlag checked={isAdded} loading={loading} onClick={addMovieHandler}></AddFlag>
            </div>
        </div>
      </li>
    );
  }

  const renderItems = (arr: ITransformMovie[]) => {
    const items = arr.map((item, id) => {
      return <Item key={uuidv4()} item={item} id={id}></Item>
    });

    return (
      <ul className="mostPopular__wrapper">
        <li className="mostPopular__item">
          <div className="mostPopular__item_img"></div>
          <div className="mostPopular__item_title">Rank & Title</div>
          <div className="mostPopular__item_weekend">IMDb Rating</div>
          <div className="mostPopular__item_gross">Your Rating</div>
          <div className="mostPopular__item_watch"></div>
        </li>
        {items}
      </ul>
    );
  };

  const sortedStateArray = (propsArray: Array<ITransformMovie>) => {    
    setMovieList(propsArray)   
  }

  const items = renderItems(movieList);
  const spinner = movieLoading ? <Spinner/> : null;
  const sort = movieLoading ? null : <MostPopularSort item={movieList} func={sortedStateArray}/>

  return (
    <>        
      <div className="wideWrapper">
        <div className="wideContent">
          <div className="article">
            <MostPopularHeader />
            {sort}
            {items}
            {spinner}
          </div>
          <div className="sidebar">
            <AsideChart />
          </div>          
        </div>
      </div>
    </>
  );
};

export default MostPopularMovies;
