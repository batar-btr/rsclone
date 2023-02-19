import { Link, useParams } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import '../title-page/mainInfoSection.scss';
import Modal from '../../components/modal/Modal';
import { RateBox } from '../../components/rate-box/rate-box';
import AddFlag from '../../components/movie-card-carousel/AddFlag/AddFlag';
import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import IMDBService from '../../services/IMDBService';
import { IMovieReleaseDates, ITitle, ITitleCast, ITitleVideos, ITvContentRatings } from '../../models/title';
import { DotSpinner } from '../../components/dots-spinner/DotSpinner';
import { UserAuth } from '../../context/AuthContext';
import { deleteFavorite } from '../../User/delete-favorite';
import { addFavorite } from '../../User/add-favorite';

export const convertNumToShort = (num: number) => {
    const formatter = Intl.NumberFormat('en', { notation: 'compact' });
    return num ? formatter.format(num) : ''
  }

export const MainInfoSection = () => {
  
  
  const params = useParams().id
  const isTvShow = IMDBService().isTvShow() 
  const _imgBase = IMDBService()._image 
  const type = IMDBService().type 
  const [title, setTitle] = useState<ITitle>()
  const [cast, setCast] = useState<ITitleCast>()
  const [videos, setVideos] = useState<ITitleVideos>()
  const [certification, setCertification] = useState<string>('')
  const [certLoading, setCertLoading] = useState<boolean>(true)
  const [titleLoading, setTitleLoading] = useState<boolean>(true)
  const [titleVideoLoading, setTitleVideoLoading] = useState<boolean>(true)
  const [titleCastLoading, setTitleCastLoading] = useState<boolean>(true)
  
  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0))
    onRequest();
    setCertLoading(true)
    setTitleLoading(true)
    setTitleVideoLoading(true)
    setTitleCastLoading(true)
  }, [params]);
  
  const onRequest = async () => {
    const title = await IMDBService().getTitle(+params!)
    setTitle(title)
    if (title) {
      setTitleLoading(false)
    }

    const video = await IMDBService().getTitleVideos(+params!)
    setVideos(video)
    if (video) {
      setTitleVideoLoading(false)
    }

    const cast = await IMDBService().getTitleCast(+params!)
    setCast(cast)
    if (cast) {
      setTitleCastLoading(false)
    }

    const certifications = await IMDBService().getTitleCertification(+params!)
    let certification = ''
    if (!isTvShow) {
      const data = certifications as IMovieReleaseDates
      try {
        certification = data.results.filter(el => el.iso_3166_1 === 'US')[0]
          .release_dates.filter(el => el.certification !== '')[0].certification
      } catch (error) {
        certification = 'empty'
      }
    } else {
      const data = certifications as ITvContentRatings
      const filtered = data.results.filter(el => el.iso_3166_1 === 'US')[0]
      certification = filtered ? filtered.rating : ''
    }
    setCertification(certification)
    if (certification) {
      setCertLoading(false)
    }
  };

  const {isShowing, toggle} = useModal();
  const [select, setSelect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const trailers = videos ? videos!.results.filter(el => el.type === 'Trailer') : []
  const mainTrailer = trailers.length !== 0 ? trailers[0].key : ''

  const directors = cast ? cast.crew.filter(el => el.job === 'Director') : []
  const writers = cast ? cast.crew.filter(el => isTvShow ? el.known_for_department === 'Writing' : el.department === 'Writing').slice(0, 3) : []
  const topCast = cast ? cast.cast.slice(0, 3) : []
  
  const convertTime = (hours: number) => {
    if (Number.isNaN(hours)) return ''
    const date = new Date(hours * 1000).toISOString()
    const h = date.slice(14, 16)
    const m = date.slice(17, 19)
    return `${+h !== 0 ? `${+h}h ` : ''}${+m}m`
  }

  const { user, userData } = UserAuth()

  const isAdded = userData?.['favorite'][type as 'movie' | 'tv'].some((item: number) => item === +params!) as boolean;
  const rating = userData?.rate[type as 'movie' | 'tv'][+params!];
  
  const addMovieHandler = async () => {
    if (user) {
      setLoading(prev => !prev);
      setTimeout(async () => {
        if (isAdded) {
          await deleteFavorite(user.uid, type as 'tv' | 'movie', +params!)
        } else {
          await addFavorite(user.uid, type as 'tv' | 'movie', +params!);
        }
        setLoading(prev => !prev);
      }, 1000);
    }
  }

  // title && setTimeout(() => setLoading(false), 1000)
  
  return (
    <section className='title-main-info-container'>
      <div className='title-main-info title-section'>
        <div className='title-main-info-top'>
          <Link to={`/${type}/${title?.id}/fullcredits`} className='title-main-info-top-link'>Cast & Crew</Link>
          <Link to={`/${type}/${title?.id}/reviews`} className='title-main-info-top-link'>User reviews</Link>
          <div className='title-main-info-top-link'>
            <a href='https://pro.imdb.com/'>IMDB Pro</a>
          </div>
          <div className='title-main-info-top-share'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="title-main-info-top-link-share-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path></svg>
          </div>
        </div>
        <div className='title-main-info-name-rating'>
          {
            titleLoading && <DotSpinner theme='dark' size='big'/>
          }
          { !titleLoading && <>
            <div className='title-main-info-name'>
              <h1 className='title-main-info-name-text'>{title?.title || title?.name}</h1>            
              <div className='title-main-info-basic-data'>
                {isTvShow && <p className='title-main-info-basic-data-item'>TV Series</p>}
                <p className='title-main-info-basic-data-item'>{
                  title?.release_date?.split('-')[0] ||
                  `${title?.first_air_date!.split('-')[0]}${
                    title?.number_of_seasons === 1 && !title?.in_production ? '' :
                    !title?.in_production ? `–${title?.last_air_date!.split('-')[0]}`  
                  : '–'}`
                }</p>
                {
                  certLoading &&
                  <div className='title-main-info-basic-data-item title-main-info-basic-data-certification'>
                    <DotSpinner theme='dark' size='small'/>
                  </div> 
                }
                {
                  !certLoading && certification !== 'empty' && 
                  <div className='title-main-info-basic-data-item title-main-info-basic-data-certification'>
                    {certification}
                  </div>
                }
                {
                  !isTvShow && <p className='title-main-info-basic-data-item'>
                    {convertTime(+title?.runtime!)}
                  </p>
                }
              </div>
            </div>
            <div className='title-main-info-rating'>
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
                  {
                    !rating && <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="title-main-info-your-rating-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M19.65 9.04l-4.84-.42-1.89-4.45c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.73 3.67-3.18c.67-.58.32-1.68-.56-1.75zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></svg>
                      <div className="title-main-info-your-rating-text">Rate</div>
                    </> 
                  }
                  {
                    rating && <div className='title-main-info-your-rating-wrapper'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="title-main-info-your-rating-filled-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path></svg>
                      <div className='title-main-info-your-rating-value'>
                        <span>{rating}</span>
                        /10
                      </div>
                    </div>
                  }
                  
                </div>    
              </div>
              <Modal isShowing={isShowing} hide={toggle}>
                <RateBox title={`${title?.title || title?.name}`} hide={toggle} id={+params!} type={type as 'tv' | 'movie'}></RateBox>
              </Modal>
              <div className='title-main-info-rating-item'>
                <div className='title-main-info-rating-title'>POPULARITY</div> 
                  <Link to={isTvShow ? '/chart/popularshows' : '/chart/popularmovies'} 
                    className='title-main-info-popularity'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="title-main-info-popularity-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-2.6 0-5-1.3-6.4-3.3l2.8-3.4 1.3 1.5c.4.4 1 .4 1.3 0l2.9-3.2 1.3 1.4c.3.3.8.1.8-.3V8.5c0-.3-.2-.5-.5-.5h-4c-.4 0-.6.5-.3.8l1.3 1.4-2.2 2.5L9 11.3c-.4-.4-1-.4-1.3 0L4.6 15c-.4-.9-.6-1.9-.6-3 0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"></path></svg>
                    <div className="title-main-info-your-rating-text">{title?.popularity.toFixed()} </div>
                  </Link>
              </div>
            </div>
          </>}
        </div>
        <div className='title-main-info-madia-wrapper'>
          <div className='title-main-info-madia-container'>
            <div className='title-main-info-madia'>
              <div className='title-main-info-madia-poster'>
              {
                titleLoading && <DotSpinner theme='dark' size='big'/>
              }
              { !titleLoading && <>
                <AddFlag checked={isAdded} loading={loading} onClick={addMovieHandler}></AddFlag>
                <div className="title-main-info-madia-poster-img">
                  <Link to={`/`}>
                    <img src={_imgBase + title?.poster_path} alt="poster"/>
                    <div className='title-main-overlay'></div>
                  </Link>
                </div>
              </>
              }
              </div>
              <div className='title-main-info-madia-trailer'>
              {
                titleVideoLoading && <DotSpinner theme='dark' size='big'/>
              }
              {
                !titleVideoLoading &&
                <Link to={`/${type}/${title?.id}/video/${mainTrailer}`}>
                  <img 
                    src={`http://img.youtube.com/vi/${mainTrailer}/maxresdefault.jpg`} 
                    alt="trailer-preview" 
                    className='title-main-info-madia-trailer-preview'/>
                    <div className='title-main-overlay'></div>
                    <div className="title-main-info-madia-trailer-play-btn">
                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="title-main-info-madia-trailer-play-btn-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                        <path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path>
                        <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                      </svg>
                      <span className="title-main-info-madia-trailer-play-btn-text">Play trailer</span>
                    </div>
                </Link>
              }
              </div> 
              <div className='title-main-info-madia-gallery-links'>
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
              </div>         
            </div>
          </div>
        </div>
        <div className='title-main-info-details-wrapper'>
          <div className='title-main-info-details-container'>
            {
              titleCastLoading && <DotSpinner theme='dark' size='big'/>
            }
            {
              !titleCastLoading && title &&
              <div className='title-main-info-details'>
                <div className='title-main-info-details-genres'>
                  {
                    title.genres.map((el, i) => {
                      return <div className='title-main-info-details-genre' key={i}>{el.name}</div>
                    })
                  }
                </div>
                {
                  title && cast && <>
                    <p className='title-main-info-details-description'>
                      {title.overview}
                    </p>
                    {
                      !isTvShow &&
                      <div className='title-main-info-details-directors title-main-info-details-item'>
                        <p className='title-main-info-details-item-title'>Directors</p>
                        <div className='title-main-info-details-item-values'>
                          {
                            directors.map((el, i) => <div className='title-main-info-details-item-val' key={i}>
                              <Link to={`/name/${el.id}`}>{el.name}</Link>
                            </div>)
                          }
                        </div>
                      </div>
                    }
                    <div className='title-main-info-details-writers title-main-info-details-item'>
                      <Link to={`/${type}/${title?.id}/fullcredits`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="title-main-info-details-item-link-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"></path></svg>
                      </Link>
                      <p className='title-main-info-details-item-title'>{isTvShow ? writers.length === 0 ? 'Creator' : 'Creators' : 'Writers'}</p>
                      <div className='title-main-info-details-item-values'>
                        {
                          writers.map((el, i) => <div className='title-main-info-details-item-val' key={i}>
                            <Link to={`/name/${el.id}`}>{el.name}</Link>
                            {
                              !isTvShow &&
                              <span>({el.job.toLocaleLowerCase()} by)</span>
                            }
                          </div>)
                        }
                      </div>
                    </div>
                    <div className='title-main-info-details-top-cast title-main-info-details-item'>
                      <Link to={`/${type}/${title?.id}/fullcredits`} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="title-main-info-details-item-link-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"></path></svg>
                      </Link>
                      <p className='title-main-info-details-item-title'>Stars</p>
                      <div className='title-main-info-details-item-values'>
                        {
                          topCast.map((el, i) => <div className='title-main-info-details-item-val' key={i}>
                            <Link to={`/name/${el.id}`}>{el.name}</Link>
                          </div>)
                        }
                      </div>
                    </div>
                  </>
                }
                <div className="title-main-info-details-imdb-pro">
                  <a className="title-main-info-details-imdb-pro-link" href="https://pro.imdb.com/" target="_blank">
                    <svg className="title-main-info-details-imdb-pro-link-icon" width="54" height="14.538461538461538" viewBox="0 0 52 14" xmlns="http://www.w3.org/2000/svg" version="1.1"><g fill="currentColor"><rect x="0" y="1" width="3.21" height="12.34"></rect><path d="M10,1 L9.3,6.76 L8.84,3.63 C8.7,2.62 8.58,1.75 8.45,1 L4.3,1 L4.3,13.34 L7.11,13.34 L7.11,5.19 L8.3,13.34 L10.3,13.34 L11.42,5 L11.42,13.33 L14.22,13.33 L14.22,1 L10,1 Z"></path><path d="M19.24,3.22 C19.3711159,3.29185219 19.4602235,3.42180078 19.48,3.57 C19.5340993,3.92393477 19.554191,4.28223587 19.54,4.64 L19.54,9.42 C19.578852,9.92887392 19.5246327,10.4405682 19.38,10.93 C19.27,11.12 18.99,11.21 18.53,11.21 L18.53,3.11 C18.7718735,3.09406934 19.0142863,3.13162626 19.24,3.22 Z M19.24,13.34 C19.8163127,13.3574057 20.3928505,13.3138302 20.96,13.21 C21.3245396,13.1481159 21.6680909,12.9969533 21.96,12.77 C22.2288287,12.5438006 22.4209712,12.2398661 22.51,11.9 C22.643288,11.1679419 22.6969338,10.4236056 22.67,9.68 L22.67,5.34 C22.6662002,4.55669241 22.6060449,3.77467335 22.49,3 C22.43037,2.59841431 22.260779,2.22116094 22,1.91 C21.6636187,1.56093667 21.2326608,1.317654 20.76,1.21 C19.7709421,1.02848785 18.7647002,0.958050915 17.76,1 L15.32,1 L15.32,13.34 L19.24,13.34 Z"></path><path d="M27.86,10.34 C27.8769902,10.7218086 27.8501483,11.1043064 27.78,11.48 C27.72,11.63 27.46,11.71 27.26,11.71 C27.0954951,11.7299271 26.9386363,11.6349863 26.88,11.48 C26.7930212,11.1542289 26.7592527,10.8165437 26.78,10.48 L26.78,7.18 C26.7626076,6.84408875 26.7929089,6.50740774 26.87,6.18 C26.9317534,6.03447231 27.0833938,5.94840616 27.24,5.97 C27.43,5.97 27.7,6.05 27.76,6.21 C27.8468064,6.53580251 27.8805721,6.87345964 27.86,7.21 L27.86,10.34 Z M23.7,1 L23.7,13.34 L26.58,13.34 L26.78,12.55 C27.0112432,12.8467609 27.3048209,13.0891332 27.64,13.26 C28.0022345,13.4198442 28.394069,13.5016184 28.79,13.5 C29.2588971,13.515288 29.7196211,13.3746089 30.1,13.1 C30.4399329,12.8800058 30.6913549,12.5471372 30.81,12.16 C30.9423503,11.6167622 31.0061799,11.0590937 31,10.5 L31,7 C31.0087531,6.51279482 30.9920637,6.02546488 30.95,5.54 C30.904474,5.28996521 30.801805,5.05382649 30.65,4.85 C30.4742549,4.59691259 30.2270668,4.40194735 29.94,4.29 C29.5869438,4.15031408 29.2096076,4.08232558 28.83,4.09 C28.4361722,4.08961884 28.0458787,4.16428368 27.68,4.31 C27.3513666,4.46911893 27.0587137,4.693713 26.82,4.97 L26.82,1 L23.7,1 Z"></path></g><g fill="#33C5F3"><path d="M32.13,1 L35.32,1 C35.9925574,0.978531332 36.6650118,1.04577677 37.32,1.2 C37.717112,1.29759578 38.0801182,1.50157071 38.37,1.79 C38.6060895,2.05302496 38.7682605,2.37391646 38.84,2.72 C38.935586,3.27463823 38.9757837,3.8374068 38.96,4.4 L38.96,5.46 C38.9916226,6.03689533 38.9100917,6.61440551 38.72,7.16 C38.5402933,7.53432344 38.2260614,7.82713037 37.84,7.98 C37.3049997,8.18709035 36.7332458,8.28238268 36.16,8.26 L35.31,8.26 L35.31,13.16 L32.13,13.16 L32.13,1 Z M35.29,3.08 L35.29,6.18 L35.53,6.18 C35.7515781,6.20532753 35.9725786,6.12797738 36.13,5.97 C36.2717869,5.69610033 36.3308522,5.38687568 36.3,5.08 L36.3,4.08 C36.3390022,3.79579475 36.2713114,3.5072181 36.11,3.27 C35.8671804,3.11299554 35.5771259,3.04578777 35.29,3.08 Z"></path><path d="M42,4.36 L41.89,5.52 C42.28,4.69 43.67,4.42 44.41,4.37 L43.6,7.3 C43.2290559,7.27725357 42.8582004,7.34593052 42.52,7.5 C42.3057075,7.61238438 42.1519927,7.81367763 42.1,8.05 C42.0178205,8.59259006 41.9843538,9.14144496 42,9.69 L42,13.16 L39.34,13.16 L39.34,4.36 L42,4.36 Z"></path><path d="M51.63,9.71 C51.6472876,10.3265292 51.6003682,10.9431837 51.49,11.55 C51.376862,11.9620426 51.1639158,12.3398504 50.87,12.65 C50.5352227,13.001529 50.1148049,13.2599826 49.65,13.4 C49.0994264,13.5686585 48.5257464,13.6496486 47.95,13.64 C47.3333389,13.6524659 46.7178074,13.5818311 46.12,13.43 C45.6996896,13.322764 45.3140099,13.1092627 45,12.81 C44.7275808,12.5275876 44.5254637,12.1850161 44.41,11.81 C44.2627681,11.2181509 44.1921903,10.6098373 44.2,10 L44.2,7.64 C44.1691064,6.9584837 44.2780071,6.27785447 44.52,5.64 C44.7547114,5.12751365 45.1616363,4.71351186 45.67,4.47 C46.3337168,4.13941646 47.0688388,3.97796445 47.81,4 C48.4454888,3.98667568 49.0783958,4.08482705 49.68,4.29 C50.1352004,4.42444561 50.5506052,4.66819552 50.89,5 C51.1535526,5.26601188 51.3550281,5.58700663 51.48,5.94 C51.6001358,6.42708696 51.6506379,6.92874119 51.63,7.43 L51.63,9.71 Z M48.39,6.73 C48.412199,6.42705368 48.3817488,6.12255154 48.3,5.83 C48.2091142,5.71223121 48.0687606,5.64325757 47.92,5.64325757 C47.7712394,5.64325757 47.6308858,5.71223121 47.54,5.83 C47.447616,6.12046452 47.4136298,6.42634058 47.44,6.73 L47.44,10.93 C47.4168299,11.2204468 47.4508034,11.5126191 47.54,11.79 C47.609766,11.9270995 47.7570827,12.0067302 47.91,11.99 C48.0639216,12.0108082 48.2159732,11.9406305 48.3,11.81 C48.3790864,11.5546009 48.4096133,11.2866434 48.39,11.02 L48.39,6.73 Z"></path></g></svg>
                    <span className="title-main-info-details-imdb-pro-link-text">See production, box office &amp; company info
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="title-main-info-details-imdb-pro-link-icon2" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path></svg></span>
                  </a>
                </div>
              </div>
            }
          </div>  
          
          <div className='title-main-info-add-to-watchlist'>
            {
              <button className='title-main-info-add-to-watchlist-btn' onClick={addMovieHandler}>
              {
                !loading && <>
                {
                  isAdded && <>
                  <svg xmlns="http://www.w3.org/2000/svg" className='title-main-info-add-to-watchlist-btn-icon' width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M9 16.2l-3.5-3.5a.984.984 0 0 0-1.4 0 .984.984 0 0 0 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7a.984.984 0 0 0 0-1.4.984.984 0 0 0-1.4 0L9 16.2z"></path></svg>
                  <span>Added to Watchlist</span>
                  </>
                }
                {
                  !isAdded && <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='title-main-info-add-to-watchlist-btn-icon' viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path></svg>
                  <span>Add to Watchlist</span>
                  </>
                }
                </>
              }
              {
                loading &&
                <div className="title-main-info-add-to-watchlist-loader">
                  <RotatingLines
                  strokeColor="#fff"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="20"
                  visible={true}/>
                </div>
              }
              </button>
            }
          </div>
        </div>
      </div>
    </section>
  )
}
