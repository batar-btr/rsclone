import { useState, useEffect } from "react";
import IMDBService from "../../../services/IMDBService";
import { MostPopularHeader } from "./mostPopularHeader";
import { Recently } from "../recently/recentley";
import AsideChart from "../aside/aside";
import { ITransformMovie } from "../../../models/IMDBModels";
import { Spinner } from "../spinner/Spinner";

import '../popularMovies/mostPopularMovies.scss';

const MostPopularTVShows = () => {
  const initial = [] as Array<ITransformMovie>;
  const [movieList, setMovieList] = useState(initial);
  const [movieLoading, setMovieLoading] = useState(true)
  

  useEffect(() => {    
        onRequest();
  }, []);

  const onRequest = () => {
    IMDBService()
      .getPopularTVShow().then(movieList => setMovieList(movieList)).then(() => setMovieLoading(false))
      
  }; 

  const renderItems = (arr: ITransformMovie[]) => {
    const items = arr.map((item, id) => {
      const evenOrOdd = id % 2 === 0  
      return (
        <li 
        className= {`${evenOrOdd ? "mostPopular__item odd" : "mostPopular__item even"}`}
        key={item.title}>

                <div className="mostPopular__item_img">
                <img src={item.thumbnail} alt={item.title}/>
                </div>
                <div className="mostPopular__item_title">
                  <a href="#"> {item.title} ({item.year.split('-')[0]})</a>
                  <div className="mostPopular__item_title-rate">{id + 1}</div>
                </div>
                <div className="mostPopular__item_rating">
                  <div className="mostPopular__item_rating-star"></div>
                  <div className="mostPopular__item_rating-next">{item.vote}</div>
                  </div>
                <div className="mostPopular__item_unseen"></div>                
                <div className="mostPopular__item_watch">
                    <div className="mostPopular__item_watch-add" title="Click to add to watchlist"></div>
                </div>          
        </li>
      )

    })

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
  )
    
    
  };

  const items = renderItems(movieList);
  const spinner = movieLoading ? <Spinner/> : null;
  

  return (
    <>      
      <div className="wideWrapper">
        <div className="wideContent">
          <div className="article">
            <MostPopularHeader />
            {items}
            {spinner}
          </div>
          <div className="sidebar">
            <AsideChart />
          </div>
          <Recently />
        </div>
      </div>
    </>
  );
};

export default MostPopularTVShows;