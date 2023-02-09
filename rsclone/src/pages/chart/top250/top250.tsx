import { Top250Header } from "./top250Header";
import AsideChart from "../aside/aside";
import { YouHaveSeenWidget } from "./youHaveSeenTop250";
import { Top250RatedByGenre } from "./top250RatedByGenre";
import { Recently } from "../recently/recentley";
import { useState, useEffect } from "react";
import IMDBService from "../../../services/IMDBService";
import { Spinner } from "../spinner/Spinner";
import { ITransformMovie } from "../../../models/IMDBModels";

import "./top250.scss";
import { Link } from "react-router-dom";

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
            <Link to={`/movie/${item.id}`}>{item.title} ({item.year.split('-')[0]})</Link>
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

  const items = renderItems(movieList);
  const spinner = movieLoading ? <Spinner /> : null;

  return (
    <>      
      <div className="wideWrapper">
        <div className="wideContent">
          <div className="article">
            <Top250Header />
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
