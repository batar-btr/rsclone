import { Top250Header } from "./top250Header";
import AsideChart from "../aside/aside";
import { YouHaveSeenWidget } from "./youHaveSeenTop250";
import { Top250RatedByGenre } from "./top250RatedByGenre";
import { Recently } from "../recently/recentley";
import { useState, useEffect } from "react";
import IMDBService from "../../../services/IMDBService";
import { Spinner } from "../spinner/Spinner";
import { ITransformMovie } from "../../../models/IMDBModels";
import { SortTop250 } from "./top250Sort";

import "./top250.scss";
import { Link } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { deleteFavorite } from "../../../User/delete-favorite";
import { addFavorite } from "../../../User/add-favorite";
import useModal from "../../../hooks/useModal";
import Modal from "../../../components/modal/Modal";
import { RateBox } from "../../../components/rate-box/rate-box";
import AddFlag from "../../../components/movie-card-carousel/AddFlag/AddFlag";

export const Top250 = () => {
  const initial = [] as Array<ITransformMovie>;
  const [movieList, setMovieList] = useState(initial);
  const [movieLoading, setMovieLoading] = useState(true);

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    IMDBService()
      .getTop250()
      .then((movieList) => setMovieList(movieList))
      .then(() => setMovieLoading(false));
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
    return (
      <li
        className={`${
          evenOrOdd ? "mostPopular__item odd" : "mostPopular__item even"
        }`}
        key={props.item.title}
      >
        <div className="mostPopular__item_img">
          <img src={props.item.thumbnail} alt={props.item.title} />
        </div>
        <div className="mostPopular__item_title-top">
          <div className="mostPopular__item_title-rate">{props.id + 1}. </div>
          <Link to={`/movie/${props.item.id}`}>{props.item.title} ({props.item.year.split('-')[0]})</Link>
        </div>
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
      return <Item item={item} id={id}></Item>
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
  const spinner = movieLoading ? <Spinner /> : null;
  const sort = movieLoading ? null : <SortTop250 item={movieList} func={sortedStateArray}/>

  return (
    <>      
      <div className="wideWrapper">
        <div className="wideContent">
          <div className="article">
            <Top250Header />
            {sort}
            {items}
            {spinner}
          </div>
          <div className="sidebar">
            <YouHaveSeenWidget />
            <AsideChart />
            <Top250RatedByGenre />
          </div>
          <Recently />
        </div>
      </div>
    </>
  );
};
