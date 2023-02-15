import { Top250Header } from "./top250TVShowsHeader";
import AsideChart from "../aside/aside";
import { YouHaveSeenWidget } from "../top250/youHaveSeenTop250";
import { Recently } from "../recently/recentley";
import { useState, useEffect } from "react";
import IMDBService from "../../../services/IMDBService";
import { Spinner } from "../spinner/Spinner";
import { ITransformMovie } from "../../../models/IMDBModels";
import { SortTop250 } from "../top250/top250Sort";

import "../top250/top250.scss";
import { Link } from "react-router-dom";

export const Top250TVShows = () => {
  const initial = [] as Array<ITransformMovie>;
  const [movieList, setMovieList] = useState(initial);
  const [movieLoading, setMovieLoading] = useState(true);

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    IMDBService()
      .getTop250TVShows()
      .then((movieList) => setMovieList(movieList))
      .then(() => setMovieLoading(false));
  };

  const renderItems = (arr: ITransformMovie[]) => {
    const items = arr.map((item, id) => {
      const evenOrOdd = id % 2 === 0;
      return (
        <li
          className={`${
            evenOrOdd ? "mostPopular__item odd" : "mostPopular__item even"
          }`}
          key={item.title}
        >
          <div className="mostPopular__item_img">
            <img src={item.thumbnail} alt={item.title} />
          </div>
          <div className="mostPopular__item_title-top">
            <div className="mostPopular__item_title-rate">{id + 1}. </div>
            <Link to={`/tv/${item.id}`} reloadDocument>{item.title} ({item.year.split('-')[0]})</Link>
          </div>
          <div className="mostPopular__item_rating">
            <div className="mostPopular__item_rating-star"></div>
            <div className="mostPopular__item_rating-next">{item.vote}</div>
          </div>
          <div className="mostPopular__item_unseen"></div>
          <div className="mostPopular__item_watch">
            <div
              className="mostPopular__item_watch-add"
              title="Click to add to watchlist"
            ></div>
          </div>
        </li>
      );
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
  const sort = movieLoading ? null : <SortTop250 item={movieList} func={sortedStateArray}/>;

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
          </div>
          <Recently />
        </div>
      </div>
    </>
  );
};
