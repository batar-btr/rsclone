
import IMDBService from '../../../services/IMDBService';
import { useEffect, useState, useMemo } from 'react';
import { uuidv4 } from '@firebase/util';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { IPopularActor, IPopularActorKnownFor, IPopularActorResults } from '../../../models/title';
import { Spinner } from '../../chart/spinner/Spinner';
import { DotSpinner } from "../../../components/dots-spinner/DotSpinner";

import './mostPopularCelebs.scss';

export const MostPopularCelebs = () => {
  
  window.scrollTo(0, 0);
  const navigate = useNavigate();

  const initialActorResults = {} as IPopularActor;
  const initialCurrentPage = 1;    

  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [popularArray, setPopularArray] = useState(initialActorResults);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const start = searchParams.get("start");    
  
  useEffect(() => {    
      onRequest();      
  }, [currentPage]);

    
    const onRequest = () => {
      if (+start! >=501 || +start! < 0 ) {
        navigate("/error")
      } else {
        if (start === null) {
          IMDBService()
          .getPopularActor(1)
          .then(changeURLParams) 
        } else {
          IMDBService()
          .getPopularActor(+start)
          .then(changeURLParams) 
        }
      }                    
    }; 

    const changeURLParams = (obj: IPopularActor) => { 
          
          setPopularArray(prev => obj);
          let searchTerm = `${obj.page}`; 
          setSearchParams({start: searchTerm});          
          setLoading(loading => false);            
      }

    const nextPage = () => {

      if (+start! >= popularArray.total_pages) return;

      setLoading(loading => true);
      setCurrentPage(prev => prev + 1);
      setSearchParams({start: `${+start! + 1}`});
    }

    const prevPage = () => {

      if (start === null || +start === 1) return;

      setLoading(loading => true);
      setCurrentPage(prev => prev - 1);
      setSearchParams({start: `${+start! - 1}`});

    }

  
    const departmentJob = (item: IPopularActorResults) => {
        if (item.gender === 2) {
          if (item.known_for_department === 'Acting') {
            return 'Actor'
          }
          if (item.known_for_department === 'Directing') {
            return 'Producer'
          }
          if (item.known_for_department === 'Writing') {
            return 'Writer'
          }

        } else {
          if (item.known_for_department === 'Acting') {
            return 'Actress'
          }
          if (item.known_for_department === 'Directing') {
            return 'Producer'
          }
          if (item.known_for_department === 'Writing') {
            return 'Writer'
          }
        }
    }


    const RenderItems = (arr: IPopularActorResults[]) => {
      
      
      if (!arr) return;
      const img = "https://image.tmdb.org/t/p/w500";
      const lorem =  "https://media.istockphoto.com/id/1136411827/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B0%D0%B1%D1%81%D1%82%D1%80%D0%B0%D0%BA%D1%82%D0%BD%D1%8B%D0%B9-%D1%8F%D1%80%D0%BA%D0%B8%D0%B9-%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD-%D0%B4%D0%BB%D1%8F-%D1%81%D0%BE%D0%B4%D0%B5%D1%80%D0%B6%D0%B8%D0%BC%D0%BE%D0%B3%D0%BE-%D0%BB%D0%BE%D1%80%D0%B5%D0%BC-%D0%B8%D0%BF%D1%81%D1%83%D0%BC.jpg?s=612x612&w=0&k=20&c=VhMys9_GZYFd0Iv_BdY0XpGtGOqTEx9n-6lXyMcmMiI=";
      let count = (+start! * 20) - 20;
      
      const items = arr.map((item, id) => {

        const evenOrOdd = id % 2 === 0;        

        const knownFor = item.known_for[0].media_type === 'tv' ? item.known_for[0].original_name : item.known_for[0].original_title;
        const titleLink = item.known_for[0].media_type === 'tv' ? `/tv/${item.known_for[0].id}` : `/movie/${item.known_for[0].id}`;
        const job = departmentJob(item);
        
        const interactive = (arr: IPopularActorKnownFor[]) => {

          const result = arr.map(item => {

              let imageType = item.poster_path === null ? lorem : item.poster_path === undefined ? lorem : img + item.poster_path;

              const imageLink = item.media_type === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`;

              return (<li key={uuidv4()}
              className='celebs__item_content-interactiveImage-list-item'>

                <a href={imageLink}>
                  <div className='celebs__item_content-interactiveImage-list-item-image'>

                    <img src={ imageType}  alt="" />

                  </div>
                </a>


              </li>)

          })

          return (<ul className='celebs__item_content-interactiveImage-list'>
            {result}
          </ul>)

        }

        const interactiveImage = popularArray ? interactive(item.known_for) : null;
        
        return (
          <li
            key={uuidv4()}
            className={evenOrOdd ? "celebs__item odd" : "celebs__item even"}
          >
            <div className="celebs__item_image">
              <a href={`/name/${item.id}`}>
                <img
                  className="celebs__item_image-img"
                  src={item.profile_path === null ? lorem : item.profile_path === null ? lorem : img + item.profile_path}
                  alt=""
                />
              </a>
            </div>

            <div className="celebs__item_content">
              <h3 className="celebs__item_content-header">
                <span className="celebs__item_content-header-text">
                  {(count += 1)}.
                </span>
                <a href={`/name/${item.id}`}>{item.name}</a>
              </h3>

              <p className="celebs__item_content-job">
                {job} <span className="elebs__item_content-job-ghost">|</span>
                <a href={titleLink}>{knownFor}</a>
              </p>

              <div className='celebs__item_content-interactiveImage'>
                <div className='celebs__item_content-interactiveImage-know'>Known for:</div>
                {interactiveImage}
                </div>

            </div>
          </li>
        );
      })      

      return (<ul className='celebs__items'>      
          {items}
      </ul>)
    };

    const CurrentNamesCount = () => {

    const currentItem = (+start! * 20) - 19;
    const currentItems = (+start! * 20);

    return (
      <div className="celebs__names">
        <div className="celebs__names_current">
          {currentItem}-{currentItems} 
          {" "}of{" "}
          {`${
            popularArray.total_results
              ? popularArray.total_results.toString().slice(0, 2)
              : null
          },${
            popularArray.total_results
              ? popularArray.total_results.toString().slice(2)
              : null
          } `}{" "}
          names.
        </div>
        <span className="celebs__names_ghost">|</span>
        <button className="celebs__names_prev celebs__names_btn" onClick={prevPage}>
        « Previous
        </button>
        <span className="celebs__names_ghost">|</span>
        <button className="celebs__names_next celebs__names_btn" onClick={nextPage}>
          Next »
        </button>
      </div>
    );

    }

    const items = useMemo(() => {
      return RenderItems(popularArray.results)
    }, [popularArray.results]);

    const spinner = loading ? <Spinner/>:  null;
    const content = !loading ? items : null;
    const pages = (start === null) || (popularArray.total_results === undefined) ? DotSpinner({ theme: "light", size: "big" }) : <CurrentNamesCount/>;

  return (
      <>

        <div className='celebs__container'>
            <div className="celebs">

                <div className="celebs__wrapper">

                    <div className="celebs__title">
                        <h1>Most Popular Celebs</h1>
                    </div>                 
                    {pages} 
                    <div className='celebs__content_wrapper'>
                      {spinner}
                      {content}
                    </div>  
                    {pages}
                </div>

            

            </div>
        </div>
      
      </>
  )

}