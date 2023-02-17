import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../title-page/mainSection.scss';
import { Link, useParams } from 'react-router-dom';
import AddFlag from '../../components/movie-card-carousel/AddFlag/AddFlag';
import { useEffect, useState } from 'react';
import useModal from '../../hooks/useModal';
import { RotatingLines } from 'react-loader-spinner';
import Modal from '../../components/modal/Modal';
import { RateBox } from '../../components/rate-box/rate-box';
import { convertNumToShort } from './MainInfoSection';
import IMDBService from '../../services/IMDBService';
import { ITitle, ITitleCast, ITitleImages, ITitleReview, ITitleReviews, ITitleSimilar, ITitleVideos } from '../../models/title';
import { DotSpinner } from '../../components/dots-spinner/DotSpinner';

interface TitleVideoProps {
  item: TitleVideo[]
}
type TitleVideo = {
  key: string,
  name: string, 
  type: string
}
interface TitleImageProps {
  item: TitleImage[]
}
type TitleImage = {
  file_path: string,
}
interface TitleSimilarProps {
  item: TitleSimilar[]
}
interface TitleSimilarItemProps {
  item: TitleSimilar
}
type TitleSimilar = {
  id: number;
  title?: string,
  name?: string,
  poster_path: string;
  vote_average: number;
}

export const MainSection = () => {
  const params = useParams().id
  const isTvShow = IMDBService().isTvShow() 
  const _imgBase = IMDBService()._image 
  const type = IMDBService().type 
  const [title, setTitle] = useState<ITitle>()
  const [cast, setCast] = useState<ITitleCast>()
  const [images, setImages] = useState<ITitleImages>()
  const [videos, setVideos] = useState<ITitleVideos>()
  const [similar, setSimilar] = useState<ITitleSimilar>()
  const [reviews, setReviews] = useState<ITitleReview[]>()
  const [randReview, setRandReview] = useState<ITitleReview>()
  const [titleVideosLoading, setTitleVideosLoading] = useState(true)
  const [titleImagesLoading, setTitleImagesLoading] = useState(true)
  const [titleCastLoading, setTitleCastLoading] = useState(true)
  const [titleSimilarLoading, setTitleSimilarLoading] = useState(true)
  const [titleReviewsLoading, setTitleReviewsLoading] = useState(true)

  const randNum = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
  

  useEffect(() => {
    onRequest();
    setTitleVideosLoading(true)
    setTitleImagesLoading(true)
    setTitleCastLoading(true)
    setTitleSimilarLoading(true)
    setTitleReviewsLoading(true)
  }, [params]);

 
  
  const onRequest = async () => {
    setTitle(await IMDBService().getTitle(+params!))

    const cast = await IMDBService().getTitleCast(+params!)
    setCast(cast)
    if (cast) {
      setTitleCastLoading(false)
    }

    const images = await IMDBService().getTitleImages(+params!)
    setImages(images)
    if (images) {
      setTitleImagesLoading(false)
    }

    const videos = await IMDBService().getTitleVideos(+params!)
    setVideos(videos)
    if (videos) {
      setTitleVideosLoading(false)
    }

    const similar = await IMDBService().getTitleSimilar(+params!)
    setSimilar(similar)
    if (similar) {
      setTitleSimilarLoading(false)
    }

    const reviews = await IMDBService().getTitleReviews(+params!)
    const filtered = reviews.results.filter(el => el.author_details.rating !== null)
    const random = filtered[randNum(0, filtered.length)]
    setReviews(filtered)
    setRandReview(random)
    console.log(random)
    if (filtered) {
      setTitleReviewsLoading(false)
    }
  };

  

  const directors = cast ? cast.crew.filter(el => el.job === 'Director') : []
  const writers = cast ? cast.crew.filter(el => isTvShow ? el.known_for_department === 'Writing' : el.department === 'Writing').slice(0, 3) : []
  
  function spliceIntoChunks<T>(arr: T[], chunkSize: number) {
    const res = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }
    return res;
  }
  
  const videosChunkArr = videos ? spliceIntoChunks([...videos.results.filter(el => el.type !== 'Bloopers')].slice(0, 12), 2) : []
  const allImages = images ? [...images.backdrops, ...images?.logos, ...images.posters] : []
  const imagesChunksArr = images ? spliceIntoChunks(allImages.slice(0, 12), 4) : []
  const similarChunksArr = similar ? spliceIntoChunks([...similar.results].slice(0, 12), 4) : []

  const TitleSliderVideosBlock = (props: TitleVideoProps) => {
    return (
      <div className='title-main-slider-video-items'>
        {props.item.map((el, i) => 
        <div className='title-main-slider-video-item' key={i}>
          <Link to={`/${type}/${title?.id}/video/${el.key}`} className='title-main-slider-video-item-link'>
            <div className='title-main-slider-video-item-preview-wrapper'>
              <img src={`http://img.youtube.com/vi/${el.key}/maxresdefault.jpg`}
                alt="trailer-preview" className='title-main-slider-video-item-preview'>
              </img>
            </div>
            <div className="title-main-slider-video-item-play">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="title-main-slider-video-item-play-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M10.8 15.9l4.67-3.5c.27-.2.27-.6 0-.8L10.8 8.1a.5.5 0 0 0-.8.4v7c0 .41.47.65.8.4zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
              <span className="title-main-slider-video-item-play-text">{el.type}</span>
            </div>
            <div className='title-main-overlay'></div>
          </Link>
          <Link to={`/${type}/${title?.id}/video/${el.key}`} className='title-main-slider-video-item-name'>
            Watch {el.name}</Link>
        </div>
        )}
      </div>
    )
  }
  const TitleSliderImagesBlock = (props: TitleImageProps) => {
    return (
      <div className='title-main-slider-photo-items'>
        {props.item.map((el, i) => 
        <div className='title-main-slider-photo-item' key={i}>
          <Link to={`/`}>
            <div className='title-main-slider-photo-item-preview-wrapper'>
              <img src={_imgBase + el.file_path} 
                alt="trailer-preview" className='title-main-slider-photo-item-preview'>
              </img>
            </div>
            <div className='title-main-overlay'></div>
          </Link>
        </div>
        )}
      </div>
    )
  }

  const TitleSliderSimilarBlockItem = (props: TitleSimilarItemProps) => {
    const [selectSimilar, setSelectSimilar] = useState<boolean>(false);
    const [loadingSimilar, setLoadingSimilar] = useState<boolean>(false);
    const {isShowing, toggle} = useModal();

    const addSimilarMovieHandler = () => {
      setLoadingSimilar(prev => !prev);
      setTimeout(() => {
        return setSelectSimilar(prev => {
          setLoadingSimilar(prev => !prev);
          return !prev;
        })
      }, 1000);
    }
    // window.addEventListener('load', () => {
    //   setTimeout(() => setLoadingSimilar(false), 1000)
    // })

    return (
      <div className='movie-card'>
        <AddFlag checked={selectSimilar} loading={loadingSimilar} onClick={addSimilarMovieHandler}></AddFlag>
        <div className="img-wrap">
          <Link to={`/${type}/${props.item.id}`}>
            <img src={_imgBase + props.item.poster_path} alt="poster" />
            <div className='title-main-overlay'></div>
          </Link>
        </div>
        <div className="info-block">
          <div>
            <div className='movie-card__rating'>
              <div>
                <svg width="13" height="13" xmlns="http://www.w3.org/2000/svg" className="movie-card__rating-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                <span>{props.item.vote_average.toFixed(1)}</span>
              </div>
              <button className='rate-btn' onClick={toggle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="rate-btn-stroke-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M22.724 8.217l-6.786-.587-2.65-6.22c-.477-1.133-2.103-1.133-2.58 0l-2.65 6.234-6.772.573c-1.234.098-1.739 1.636-.8 2.446l5.146 4.446-1.542 6.598c-.28 1.202 1.023 2.153 2.09 1.51l5.818-3.495 5.819 3.509c1.065.643 2.37-.308 2.089-1.51l-1.542-6.612 5.145-4.446c.94-.81.45-2.348-.785-2.446zm-10.726 8.89l-5.272 3.174 1.402-5.983-4.655-4.026 6.141-.531 2.384-5.634 2.398 5.648 6.14.531-4.654 4.026 1.402 5.983-5.286-3.187z"></path></svg>
              </button>
              <Modal isShowing={isShowing} hide={toggle}>
                <RateBox title={isTvShow ? props.item.name as string : props.item.title as string} hide={toggle} id={123123} type={type as 'tv' | 'movie'}></RateBox>
              </Modal>
            </div>
            <Link to={`/${type}/${props.item.id}`} className='movie-card__title'>{isTvShow ? props.item.name : props.item.title}</Link>
          </div>
          <div className='info-block__bottom'>
            <button className='watch-list-btn' onClick={addSimilarMovieHandler}>
              {!loadingSimilar && <><span>{selectSimilar ? <svg xmlns="http://www.w3.org/2000/svg" className="watch-list-btn-added" width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M9 16.2l-3.5-3.5a.984.984 0 0 0-1.4 0 .984.984 0 0 0 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7a.984.984 0 0 0 0-1.4.984.984 0 0 0-1.4 0L9 16.2z"></path></svg> : 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="watch-list-btn-add" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path></svg>}
                </span><>Watchlist</></>}
              {loadingSimilar && <RotatingLines
                strokeColor="#5799ef"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
              />}
            </button>
            <div>
              <button className='movie-info-button'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='movie-info-button-icon' viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const TitleSliderSimilarBlock = (props: TitleSimilarProps) => {
    return (
      <div className='title-main-slider-similar-items'>
        {props.item.map((el, i) => 
          <TitleSliderSimilarBlockItem item={el} key={i}></TitleSliderSimilarBlockItem>
        )}
      </div>
    )
  }

  
  return (
    <section className='title-main-container'>
      <div className='title-main title-section'>
        <div className='title-main-wrapper'>
          <section className='title-main-videos-container'>
            { videos?.results.length !== 0 &&
              <div className='title-main-videos'>
                <div className='title-main-title'>
                  <div className='title-main-title-wrapper'>
                    <h3 className='title-main-title-text'>Videos
                      <span>{videos?.results.length || 0}</span>
                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="title-main-title-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>
                    </h3>
                  </div>
                </div>
                <div className='title-main-videos-wrapper'>
                {
                  titleVideosLoading && <DotSpinner theme='light' size='big'/>
                }
                {
                  !titleVideosLoading && 
                  <Carousel showThumbs={false} showStatus={false} showIndicators={false} autoPlay={false}>
                    {videosChunkArr.map((el, i) => <TitleSliderVideosBlock item={el} key={i}></TitleSliderVideosBlock>)}
                  </Carousel>
                }
                </div>
              </div>
            }
          </section>
          <section className='title-main-photos-container'>
            { allImages.length !== 0 &&
              <div className='title-main-photos'>
                <div className='title-main-title'>
                  <div className='title-main-title-wrapper'>
                    <h3 className='title-main-title-text'>Photos
                      <span>{allImages.length}</span>
                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="title-main-title-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>
                    </h3>
                  </div>
                </div>
                <div className='title-main-photos-wrapper'>
                  {
                    titleImagesLoading && <DotSpinner theme='light' size='big'/>
                  }
                  {
                    !titleImagesLoading && 
                    <Carousel showThumbs={false} showStatus={false} showIndicators={false} autoPlay={false}>
                      {imagesChunksArr.map((el, i) => <TitleSliderImagesBlock item={el} key={i}></TitleSliderImagesBlock>)}
                    </Carousel>
                  }
                </div>
              </div>
            }
          </section>
          <section className='title-main-cast-container'>
            <div className='title-main-cast-wrapper'>
              <div className='title-main-title'>
                <div className='title-main-title-wrapper'>
                  <h3 className='title-main-title-text'>Top cast
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="title-main-title-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>
                  </h3>
                </div>
              </div>
              {
                titleCastLoading && <DotSpinner theme='light' size='big'/>
              }
              {
                !titleCastLoading && <>
                  <div className='title-main-cast'>
                    <div className='title-main-cast-items'>
                      {cast!.cast.slice(0, 18).map((el, i) => <div className='title-main-cast-item' key={i}>
                        <div className='title-main-cast-item-wrapper'>
                          <div className='title-main-cast-item-container'>
                            <div className='title-main-cast-item-image-wrapper'>
                                <img src={_imgBase + el.profile_path} alt="cast-pic" className='title-main-cast-item-image'/>
                            </div>
                            <Link to={`/name/${el.id}`} className='title-main-cast-item-image-link'>
                              <div className='title-main-overlay'></div>
                            </Link>
                          </div>
                        </div>
                        <div className='title-main-cast-item-info'>
                          <Link to={`/name/${el.id}`} className='title-main-cast-item-name'>{el.name}</Link>
                          <div className='title-main-cast-item-character'>
                            <span className='title-main-cast-item-character-text'>{el.character.split('/')[0]}</span>
                            <span className='title-main-cast-item-character-dots'>{el.character.split('/')[1] ? '…' : ''}</span>
                          </div>
                        </div>
                      </div>)}
                    </div>
                  </div>
                  <div className='title-main-cast-crew-info'>
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
                      <Link to={`/${type}/${title?.id}/fullcredits`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="title-main-info-details-item-link-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"></path></svg>
                      </Link>
                      <p className='title-main-info-details-item-title'>All cast & crew</p>
                    </div>
                    <div className='title-main-info-details-imdb title-main-info-details-item'>
                      <a className="title-main-info-details-imdb-pro-link" href="https://pro.imdb.com/" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="title-main-info-details-item-link-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M16 16.667H8A.669.669 0 0 1 7.333 16V8c0-.367.3-.667.667-.667h3.333c.367 0 .667-.3.667-.666C12 6.3 11.7 6 11.333 6h-4C6.593 6 6 6.6 6 7.333v9.334C6 17.4 6.6 18 7.333 18h9.334C17.4 18 18 17.4 18 16.667v-4c0-.367-.3-.667-.667-.667-.366 0-.666.3-.666.667V16c0 .367-.3.667-.667.667zm-2.667-10c0 .366.3.666.667.666h1.727L9.64 13.42a.664.664 0 1 0 .94.94l6.087-6.087V10c0 .367.3.667.666.667.367 0 .667-.3.667-.667V6h-4c-.367 0-.667.3-.667.667z"></path></svg>
                      </a>
                      <p className='title-main-info-details-item-title'>Production, box office & more at IMDbPro</p>
                    </div>
                  </div>
                </>
              }
            </div>
          </section>
          <section className='title-main-similar-container'>
            { similar?.results.length !== 0 &&
              <div className='title-main-similar'>
                <div className='title-main-title'>
                  <div className='title-main-title-wrapper'>
                    <h3 className='title-main-title-text'>More like this</h3>
                  </div>
                </div>
                <div className='title-main-similar-wrapper'>
                {
                  titleSimilarLoading && <DotSpinner theme='light' size='big'/>
                }
                {
                  !titleSimilarLoading &&
                  <Carousel showThumbs={false} showStatus={false} showIndicators={false} autoPlay={false}>
                    {similarChunksArr.map((el, i) => <TitleSliderSimilarBlock item={el} key={i}></TitleSliderSimilarBlock>)}
                  </Carousel>
                }
                </div>
              </div>
            }
          </section>
          <section className='title-main-reviews-container'>
            {
              reviews && reviews!.length !== 0 && 
              <div className='title-main-reviews'>
                <div className='title-main-title'>
                  <div className='title-main-title-wrapper'>
                    <Link to={`/${type}/${title?.id}/reviews`} className='title-main-title-link'>
                      <h3 className='title-main-title-text'>User reviews
                        <span>{convertNumToShort(reviews!.length)}</span>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="title-main-title-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>
                      </h3>
                    </Link>
                    <div className='title-main-reviews-add-review'>
                      <Link to='/registration/signin'></Link>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='title-main-reviews-add-review-icon' viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path></svg>
                      <div className="title-main-reviews-add-review-text">Review</div>
                    </div>
                  </div>
                </div>
                {
                  titleReviewsLoading && <DotSpinner theme='light' size='big'/>
                }
                {
                  !titleReviewsLoading && 
                  <div className='title-main-reviews-featured-container'>
                    <div className='title-main-reviews-featured'>
                      <div className='title-main-reviews-featured-header'>
                        <div className='title-main-reviews-featured-header-text'>
                          <span>Featured review</span> 
                        </div>
                        <span className='title-main-reviews-featured-header-rating'>
                          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className='title-main-reviews-featured-header-rating-icon' viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                          { 
                          randReview?.author_details.rating}
                          <span>/10</span>
                        </span>
                      </div>
                      <div className='title-main-reviews-featured-text'>
                        <span>{randReview?.content}</span>
                        
                      </div>
                    </div>
                    <div className='title-main-review-user-date'>
                      
                    </div>
                  </div>
                }
                
              </div>
            }
          </section>
        </div>
        
        <section className='title-main-sidebar'>
          
        </section>
      </div>
      

    </section>
  )
}
