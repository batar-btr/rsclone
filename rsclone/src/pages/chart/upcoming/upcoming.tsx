import { useState, useEffect } from "react";
import IMDBService from "../../../services/IMDBService";
import { Spinner } from "../spinner/Spinner";
import { ITransformMovie, IGenre } from "../../../models/IMDBModels";
import { Link } from "react-router-dom";
import { UpcomingHeader } from "./upcomingHeader";
import React from "react";
import {v4 as uuidv4} from 'uuid';


import "./upcoming.scss";

export const UpcomingMovie = () => {
  const initial = [] as Array<ITransformMovie>;
  const initialGenreArray = [] as Array<IGenre>
  const [movieList, setMovieList] = useState(initial);
  const [movieLoading, setMovieLoading] = useState(true);
  const [genres, setGenres] = useState(initialGenreArray)

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    
    IMDBService().getGenres().then(genres => setGenres(genres)) 

    IMDBService()
      .getUpcoming()
      .then((movieList) => setMovieList(movieList))
      .then(() => setMovieLoading(false));  
      
       
  };

  const renderGenres = (arr: number[]) => {

    let key = uuidv4();
    const items = arr.map(item => { 
      
      let arrayGenre: JSX.Element[] = []
      let genreName = [...genres].filter(it => it.id === item ? arrayGenre.push(<>{it.name}</>) : null);
      let key = uuidv4();

      return (
        <li key={key}
        className="releases__item_description-list-item">
          {arrayGenre}
        </li>
      )

    })
    
    
    return (
      <ul className="releases__item_description-list">
        {arr.length === 0 ?
         <li 
         key={key}
         className="releases__item_description-list-item">Genre</li> 
         : items}
      </ul>
    )
    

  }



  const renderItems = (arr: ITransformMovie[]) => {
    const transformDate = (str: string) => {
      let day = str.split("-")[2];
      let month = str.split("-")[1];
      let year = str.split("-")[0];

      switch (month) {
        case "01":
          return `Jan ${day}, ${year}`;
        case "02":
          return `Feb ${day}, ${year}`;
        case "03":
          return `Mar ${day}, ${year}`;
        case "04":
          return `Apr ${day}, ${year}`;
        case "05":
          return `May ${day}, ${year}`;
        case "06":
          return `Jun ${day}, ${year}`;
        case "07":
          return `Jul ${day}, ${year}`;
        case "08":
          return `Aug ${day}, ${year}`;
        case "09":
          return `Sep ${day}, ${year}`;
        case "10":
          return `Oct ${day}, ${year}`;
        case "11":
          return `Nov ${day}, ${year}`;
        case "12":
          return `Dec ${day}, ${year}`;
        default:
          return `Mon ${day}, ${year}`;
      }
    };

    let datesArray = [...new Set([...arr.map((item) => item.year)])];

    datesArray = datesArray.sort((data1, data2) => {
      let obj1 = data1.split("-").map((str) => parseInt(str));
      let obj2 = data2.split("-").map((str) => parseInt(str));

      if (obj1[1] === obj2[1])
        if (obj1[0] === obj2[0]) return obj1[2] - obj2[2];
        else return obj1[0] - obj2[0];
      else return obj1[1] - obj2[1];
    });    

    const listItem = (arr: ITransformMovie[]) => {
      let key = uuidv4();
      const items = arr.map((item) => {
        let poster =
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnko_ynQmPm0MSyZfvo45vvAuyEGW94FR9Cg&usqp=CAU";

        const length = arr.length;

        return (
          <li
            key={item.id}
            className={
              length === 1
                ? "releases__item"
                : "releases__item releases__item_under"
            }
          >
            <div className="releases__item_img">
              <img
                src={
                  item.thumbnail === "https://image.tmdb.org/t/p/w500null"
                    ? poster
                    : item.thumbnail
                }
                alt=""
              />
            </div>

            <div className="releases__item_description">
              <a href="#" className="releases__item_link">
                {item.title}
              </a>              
              {renderGenres(item.genre)}              
            </div>

            <div className="releases__item_watchList">
              <svg
                className="releases__item_watchList-svg"
                width="24px"
                height="34px"
                viewBox="0 0 24 34"
                xmlns="http://www.w3.org/2000/svg"
                role="presentation"
              >
                <polygon
                  className="releases__item_watchList-svg-first"
                  fill="#000000"
                  points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
                ></polygon>
                <polygon
                  className="releases__item_watchList-svg-second"
                  points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
                ></polygon>
                <polygon
                  className="releases__item_watchList-svg-third"
                  points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"
                ></polygon>
              </svg>
              <div className="releases__item_watchList-svgPlus" role="presentation">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  className="releases__item_watchList-svgPlus-first"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                >
                  <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
                </svg>
              </div>
            </div>
          </li>
        );
      });

      return (
        <React.Fragment key={key}>
          <h3 className="releases__wrapper_header">
            {transformDate(arr[0].year)}
          </h3>
          <ul className="releases__wrapper">{items}</ul>
        </React.Fragment>
      );
    };

    if (arr.length > 0) {
      let arrD;
      let len = datesArray.length;
      let array: JSX.Element[] = [];

      for (let i = 0; i < len; i++) {
        arrD = arr.filter((item) => item.year === datesArray[i]);
        array.push(listItem(arrD));
      }

      return <div className="releases">{array}</div>;
    }
  };

  const items = renderItems(movieList);
  const spinner = movieLoading ? <Spinner /> : null;

  return (
    <>
      <div className="releases__content">
        <div className="releases__article">
          <UpcomingHeader />
          {items}
          {spinner}
        </div>
      </div>
    </>
  );
};
