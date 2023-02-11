import { Link } from 'react-router-dom';
import { useTitleInfoService } from '../../hooks/titleInfoService';
import useModal from '../../hooks/useModal';
import '../title-page/mainInfoSection.scss';
import Modal from '../../components/modal/Modal';
import { RateBox } from '../../components/rate-box/rate-box';
import AddFlag from '../../components/movie-card-carousel/AddFlag/AddFlag';
import { useState } from 'react';


export const MainInfoSection = () => {
  const {isTvShow, title, cast, images, videos, reviews, similar, 
    certification, _imgBase, type} = useTitleInfoService()

  const {isShowing, toggle} = useModal();
  const [select, setSelect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const trailers = videos ? videos!.results.filter(el => el.type === 'Trailer') : []
  const mainTrailer = trailers.length !== 0 ? trailers[0].key : ''
  
  const convertTime = (hours: number) => {
    if (Number.isNaN(hours)) return ''
    const date = new Date(hours * 1000).toISOString()
    const h = date.slice(14, 16)
    const m = date.slice(17, 19)
    return `${+h !== 0 ? `${+h}h ` : ''}${+m}m`
  }
  const convertNumToShort = (num: number) => {
    const formatter = Intl.NumberFormat('en', { notation: 'compact' });
    return num ? formatter.format(num) : ''
  }

  const addMovieHandler = () => {
    setLoading(prev => !prev);
    setTimeout(() => {
      return setSelect(prev => {
        setLoading(prev => !prev);
        return !prev;
      })
    }, 1000);
  }
 
  return (
    <section className='title-main-info-container'>
        <div className='title-main-info title-section'>
          <div className='title-main-info-top'>
            <Link to={`/${type}/${title?.id}/fullcredits`} className='title-main-info-top-link'>Cast & Crew</Link>
            <Link to={`/${type}/${title?.id}/reviews`} className='title-main-info-top-link'>User reviews</Link>
            <div className='title-main-info-top-link'>
              <Link to={`/`} >IMDB Pro</Link>
            </div>
            <div className='title-main-info-top-share'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="title-main-info-top-link-share-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path></svg>
            </div>
          </div>
          <div className='title-main-info-name-rating'>
            <div className='title-main-info-name'>
              <h1 className='title-main-info-name-text'>{title?.title || title?.name}</h1>
              <div className='title-main-info-basic-data'>
                {
                  certification && <>
                    {isTvShow && <p className='title-main-info-basic-data-item'>TV Series</p>}
                    <p className='title-main-info-basic-data-item'>{
                      title?.release_date?.split('-')[0] ||
                      `${title?.first_air_date!.split('-')[0]}${
                        title?.number_of_seasons === 1 && !title?.in_production ? '' :
                        !title?.in_production ? `–${title?.last_air_date!.split('-')[0]}`  
                      : '–'}`
                    }</p>
                    {
                      certification !== 'empty' && 
                        <p className='title-main-info-basic-data-item'>{certification}</p>
                    }
                    {
                      !isTvShow && <p className='title-main-info-basic-data-item'>
                        {convertTime(+title?.runtime!)}
                      </p>
                    }
                  </>
                }
              </div>
            </div>
            <div className='title-main-info-rating'>
              {
                title && <>
                  <div className='title-main-info-rating-item'>
                    <div className='title-main-info-rating-title'>IMDb RATING</div>
                    <div className='title-main-info-rating-imdb'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="title-main-info-rating-imdb-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path></svg>
                      <div className='title-main-info-rating-imdb-content'>
                        <div className='title-main-info-rating-imdb-content-wrapper'>
                          {
                            title?.vote_average && <>
                              <span className='title-main-info-rating-imdb-value'>{`${title?.vote_average!.toFixed(1)}`}</span>
                              <span className='title-main-info-rating-imdb-total'>/10</span>
                            </>
                          }
                        </div>
                        <div className='title-main-info-rating-imdb-count'>{convertNumToShort(title?.vote_count!)}</div>
                      </div>
                    </div>
                  </div>
                  <div className='title-main-info-rating-item'>
                    <div className='title-main-info-rating-title'>YOUR RATING</div> 
                    <div className='title-main-info-your-rating' onClick={toggle}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="title-main-info-your-rating-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M19.65 9.04l-4.84-.42-1.89-4.45c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.73 3.67-3.18c.67-.58.32-1.68-.56-1.75zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></svg>
                      <div className="title-main-info-your-rating-text">Rate</div>
                    </div>    
                  </div>
                  <Modal isShowing={isShowing} hide={toggle}>
                    <RateBox title={`${title?.title || title?.name}`} hide={toggle}></RateBox>
                  </Modal>
                  <div className='title-main-info-rating-item'>
                    <div className='title-main-info-rating-title'>POPULARITY</div> 
                      <Link to={isTvShow ? '/chart/popularshows' : '/chart/popularmovies'} 
                        className='title-main-info-popularity'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="title-main-info-popularity-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-2.6 0-5-1.3-6.4-3.3l2.8-3.4 1.3 1.5c.4.4 1 .4 1.3 0l2.9-3.2 1.3 1.4c.3.3.8.1.8-.3V8.5c0-.3-.2-.5-.5-.5h-4c-.4 0-.6.5-.3.8l1.3 1.4-2.2 2.5L9 11.3c-.4-.4-1-.4-1.3 0L4.6 15c-.4-.9-.6-1.9-.6-3 0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"></path></svg>
                        <div className="title-main-info-your-rating-text">{title?.popularity.toFixed()} </div>
                      </Link>
                  </div>
                </>
              }
            </div>
          </div>
          <div className='title-main-info-madia'>
            {
              title && 
              <div className='title-main-info-madia-poster'>
                <AddFlag checked={select} loading={loading} onClick={addMovieHandler}></AddFlag>
                <div className="title-main-info-madia-poster-img">
                  <Link to={`/`}>
                    <img src={_imgBase + title?.poster_path} alt="poster"/>
                    <div className='title-main-overlay'></div>
                  </Link>
                </div>
              </div>
            }
            <div className='title-main-info-madia-trailer'>
              {
                videos &&
                <Link to={`/${type}/${title?.id}/video/${mainTrailer}`}>
                  <img 
                    src={`http://img.youtube.com/vi/${mainTrailer}/maxresdefault.jpg`} 
                    alt="trailer-preview" 
                    className='title-main-info-madia-trailer-preview'/>
                    <div className='title-main-overlay'></div>
                </Link>
                
              }
              <div className="title-main-info-madia-trailer-play-btn">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="title-main-info-madia-trailer-play-btn-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                  <path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path>
                  <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                </svg>
                <span className="title-main-info-madia-trailer-play-btn-text">Play trailer</span>
              </div>
            </div> 
            <div className='title-main-info-madia-gallery-links'>
              {
                title && <>
                  <div className='title-main-info-madia-gallery'>
                    <div className="title-main-info-madia-gallery-info">
                      <svg xmlns="http://www.w3.org/2000/svg" className='title-main-info-madia-gallery-icon' width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l5.47 4.1c.27.2.27.6 0 .8L12 14.5z"></path></svg>
                      <div className="title-main-info-madia-gallery-text">99+ Videos</div></div>
                  </div>
                  <div className='title-main-info-madia-gallery'>
                    <div className="title-main-info-madia-gallery-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='title-main-info-madia-gallery-icon' viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-10.6-3.47l1.63 2.18 2.58-3.22a.5.5 0 0 1 .78 0l2.96 3.7c.26.33.03.81-.39.81H9a.5.5 0 0 1-.4-.8l2-2.67c.2-.26.6-.26.8 0zM2 7v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"></path></svg>
                      <div className="title-main-info-madia-gallery-text">99+ Photos</div></div>
                  </div>
                </>
              }
            </div>         
          </div>
          <div className='title-main-info-details-wrapper'>
            <div className='title-main-info-details'>

            </div>
            <div className='title-main-info-add-to-watchlist'>

            </div>
          </div>
        </div>
      </section>
  )
}
