import { useState, useEffect } from "react";
import IMDBService from "../../../services/IMDBService";
import { Spinner } from "../spinner/Spinner";
import { ITransformMovie, IGenre } from "../../../models/IMDBModels";
import { Link } from "react-router-dom";
import { UpcomingHeader } from "./upcomingHeader";
import React from "react";
import {v4 as uuidv4} from 'uuid';

import "./upcoming.scss";
import AddFlag from "../../../components/movie-card-carousel/AddFlag/AddFlag";
import useModal from "../../../hooks/useModal";
import { UserAuth } from "../../../context/AuthContext";
import { deleteFavorite } from "../../../User/delete-favorite";
import { addFavorite } from "../../../User/add-favorite";

export const UpcomingMovie = () => {
  const initial = [] as Array<ITransformMovie>;
  const initialGenreArray = [] as Array<IGenre>
  const [movieList, setMovieList] = useState(initial);
  const [movieLoading, setMovieLoading] = useState(true);
  const [genres, setGenres] = useState(initialGenreArray)

  setTimeout(() => window.scrollTo(0, 0), 0)

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

    
    const items = arr.map(item => { 
      
      let arrayGenre: string[] = []
      let genreName = [...genres].filter(it => it.id === item ? arrayGenre.push(it.name) : null);
      

      return (
        <li 
        key={uuidv4()}
        className="releases__item_description-list-item">
          {arrayGenre}
        </li>
      )

    })
    
    
    return (
      <ul className="releases__item_description-list">
        {arr.length === 0 ?
         <li 
         key={uuidv4()}
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

    interface props{
      item: ITransformMovie
    }

    const Item = (props: props) => {
      const [loading, setSimilar] = useState<boolean>(false);
      
      const { user, userData } = UserAuth()

      const isAdded = userData?.['favorite']['movie'].some((item: number) => item === props.item.id) as boolean;
      const rating = userData?.rate['movie'][props.item.id];
    
      const addMovieHandler = async () => {
        if (user) {
          setSimilar(prev => !prev);
          setTimeout(async () => {
            if (isAdded) {
              await deleteFavorite(user.uid, 'movie', props.item.id)
            } else {
              await addFavorite(user.uid, 'movie', props.item.id);
            }
            setSimilar(prev => !prev);
          }, 1000);
        }
      }

      let poster =
        "https://media.istockphoto.com/id/1136411827/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B0%D0%B1%D1%81%D1%82%D1%80%D0%B0%D0%BA%D1%82%D0%BD%D1%8B%D0%B9-%D1%8F%D1%80%D0%BA%D0%B8%D0%B9-%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD-%D0%B4%D0%BB%D1%8F-%D1%81%D0%BE%D0%B4%D0%B5%D1%80%D0%B6%D0%B8%D0%BC%D0%BE%D0%B3%D0%BE-%D0%BB%D0%BE%D1%80%D0%B5%D0%BC-%D0%B8%D0%BF%D1%81%D1%83%D0%BC.jpg?s=612x612&w=0&k=20&c=VhMys9_GZYFd0Iv_BdY0XpGtGOqTEx9n-6lXyMcmMiI=";

      const length = arr.length;

      return (
        <li
          key={uuidv4()}
          className={
            length === 1
              ? "releases__item"
              : "releases__item releases__item_under"
          }
        >
          <div className="releases__item_img">
            <img
              src={
                props.item.thumbnail === "https://image.tmdb.org/t/p/w500null"
                  ? poster
                  : props.item.thumbnail
              }
              alt=""
            />
          </div>


          <div className="releases__item_description">
            
            <Link to={`/movie/${props.item.id}`} className="releases__item_link">{props.item.title}</Link>           
            {renderGenres(props.item.genre)}              
          </div>

          <AddFlag checked={isAdded} loading={loading} onClick={addMovieHandler}></AddFlag>
          
        </li>
      );
    }
    

    const listItem = (arr: ITransformMovie[]) => {
      const items = arr.map((el) => <Item item={el}></Item>)
        
        return (
          <React.Fragment key={uuidv4()} >
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

      return <div  className="releases">{array}</div>;
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
