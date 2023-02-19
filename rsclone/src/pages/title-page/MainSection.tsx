import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../title-page/mainSection.scss';
import { Link, useParams } from 'react-router-dom';
import AddFlag from '../../components/movie-card-carousel/AddFlag/AddFlag';
import { useEffect, useLayoutEffect, useState } from 'react';
import useModal from '../../hooks/useModal';
import { RotatingLines } from 'react-loader-spinner';
import Modal from '../../components/modal/Modal';
import { RateBox } from '../../components/rate-box/rate-box';
import { convertNumToShort } from './MainInfoSection';
import IMDBService from '../../services/IMDBService';
import { ITitle, ITitleCast, ITitleImage, ITitleImages, ITitleReview, ITitleReviews, ITitleSimilar, ITitleVideos } from '../../models/title';
import { DotSpinner } from '../../components/dots-spinner/DotSpinner';
import { UserAuth } from '../../context/AuthContext';
import { deleteFavorite } from '../../User/delete-favorite';
import { addFavorite } from '../../User/add-favorite';

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
  const [images, setImages] = useState<ITitleImage[]>()
  const [videos, setVideos] = useState<ITitleVideos>()
  const [similar, setSimilar] = useState<ITitleSimilar>()
  const [reviews, setReviews] = useState<ITitleReviews>()
  const [randReview, setRandReview] = useState<ITitleReview>()
  const [titleVideosLoading, setTitleVideosLoading] = useState<boolean>(true)
  const [titleImagesLoading, setTitleImagesLoading] = useState<boolean>(true)
  const [titleCastLoading, setTitleCastLoading] = useState<boolean>(true)
  const [titleSimilarLoading, setTitleSimilarLoading] = useState<boolean>(true)
  const [titleReviewsLoading, setTitleReviewsLoading] = useState<boolean>(true)
  const [titleLoading, setTitleLoading] = useState<boolean>(true)
  const [reviewTextHeight, setReviewTextHeight] = useState<number>(0)
  const [reviewOpen, setReviewOpen] = useState<boolean>(false)
  const [recommendations, setRecommendations] = useState<ITitleSimilar>()
  const [titleRecommendationsLoading, settitleRecommendationsLoading] = useState<boolean>(true)

  const randNum = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
  

  useEffect(() => {
    onRequest();
    setTitleLoading(true)
    setTitleVideosLoading(true)
    setTitleImagesLoading(true)
    setTitleCastLoading(true)
    setTitleSimilarLoading(true)
    setTitleReviewsLoading(true)
    setReviewOpen(false)
    settitleRecommendationsLoading(true)
  }, [params]);

  const onRequest = async () => {
    const title = await IMDBService().getTitle(+params!)
    setTitle(title)
    if (title) {
      setTitleLoading(false)
    }

    const cast = await IMDBService().getTitleCast(+params!)
    setCast(cast)
    if (cast) {
      setTitleCastLoading(false)
    }

    const images: ITitleImages = await IMDBService().getTitleImages(+params!)
    const allImages: ITitleImage[] = [...images.backdrops, ...images?.logos, ...images.posters]
    setImages(allImages)
    if (allImages) {
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
    const random = reviews.results[randNum(0, reviews.results.length)]
    setReviews(reviews)
    setRandReview(random)
    if (reviews) {
      setTitleReviewsLoading(false)
    }

    const recommendations = await IMDBService().getTitleRecommendations(+params!)
    setRecommendations(recommendations)
    if (similar) {
      settitleRecommendationsLoading(false)
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
  const imagesChunksArr = images ? spliceIntoChunks(images.slice(0, 12), 4) : []
  const similarChunksArr = similar ? spliceIntoChunks([...similar.results].slice(0, 12), 4) : []
  const recommendationsChunksArr = recommendations ? spliceIntoChunks([...recommendations.results], 4) : []

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
    const [loadingSimilar, setLoadingSimilar] = useState<boolean>(false);
    const {isShowing, toggle} = useModal();

    const { user, userData } = UserAuth()

    const isAdded = userData?.['favorite'][type as 'movie' | 'tv'].some((item: number) => item === props.item.id) as boolean;
    const rating = userData?.rate[type as 'movie' | 'tv'][props.item.id];
    
    const addMovieHandler = async () => {
      if (user) {
        setLoadingSimilar(prev => !prev);
        setTimeout(async () => {
          if (isAdded) {
            await deleteFavorite(user.uid, type as 'tv' | 'movie', props.item.id)
          } else {
            await addFavorite(user.uid, type as 'tv' | 'movie', props.item.id);
          }
          setLoadingSimilar(prev => !prev);
        }, 1000);
      }
    }

    return (
      <div className='movie-card'>
        <AddFlag checked={isAdded} loading={loadingSimilar} onClick={addMovieHandler}></AddFlag>
        <div className="img-wrap">
          <Link to={`/${type}/${props.item.id}`}>
            {
              props.item.poster_path !== null ? 
              <img src={_imgBase + props.item.poster_path} alt="poster" /> :
              <img alt="Exactly" className='movie-card-no-img' src="https://m.media-amazon.com/images/S/sash/i-t32yvKixg10fG.png"></img>
            }
            
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
                {
                  !rating && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="rate-btn-stroke-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M22.724 8.217l-6.786-.587-2.65-6.22c-.477-1.133-2.103-1.133-2.58 0l-2.65 6.234-6.772.573c-1.234.098-1.739 1.636-.8 2.446l5.146 4.446-1.542 6.598c-.28 1.202 1.023 2.153 2.09 1.51l5.818-3.495 5.819 3.509c1.065.643 2.37-.308 2.089-1.51l-1.542-6.612 5.145-4.446c.94-.81.45-2.348-.785-2.446zm-10.726 8.89l-5.272 3.174 1.402-5.983-4.655-4.026 6.141-.531 2.384-5.634 2.398 5.648 6.14.531-4.654 4.026 1.402 5.983-5.286-3.187z"></path></svg>
                }
                {
                  rating && <div className='rate-btn-value'>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="rate-btn-fill-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                    <span>{rating}</span>
                  </div>
                }
              </button>
              <Modal isShowing={isShowing} hide={toggle}>
                <RateBox title={isTvShow ? props.item.name as string : props.item.title as string} hide={toggle} id={props.item.id} type={type as 'tv' | 'movie'}></RateBox>
              </Modal>
            </div>
            <Link to={`/${type}/${props.item.id}`} className='movie-card__title'>{isTvShow ? props.item.name : props.item.title}</Link>
          </div>
          <div className='info-block__bottom'>
            <button className='watch-list-btn' onClick={addMovieHandler}>
              {!loadingSimilar && <>
              <span>{isAdded ? <svg xmlns="http://www.w3.org/2000/svg" className="watch-list-btn-added" width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M9 16.2l-3.5-3.5a.984.984 0 0 0-1.4 0 .984.984 0 0 0 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7a.984.984 0 0 0 0-1.4.984.984 0 0 0-1.4 0L9 16.2z"></path></svg> : 
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

  const transformDate = (str: string) => {
    let day = str.split("-")[2];
    let month = str.split("-")[1];
    let year = str.split("-")[0];

    switch (month) {
      case "01":
        return `${day} Jan, ${year}`;
      case "02":
        return `${day} Feb, ${year}`;
      case "03":
        return `${day} Mar, ${year}`;
      case "04":
        return `${day} Apr, ${year}`;
      case "05":
        return `${day} May, ${year}`;
      case "06":
        return `${day} Jun, ${year}`;
      case "07":
        return `${day} Jul, ${year}`;
      case "08":
        return `${day} Aug, ${year}`;
      case "09":
        return `${day} Sep, ${year}`;
      case "10":
        return `${day} Oct, ${year}`;
      case "11":
        return `${day} Nov, ${year}`;
      case "12":
        return `${day} Dec, ${year}`;
      default:
        return `${day} Mon, ${year}`;
    }
  };
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];  
  const numberWithCommas = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

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
                      <span>{videos?.results.length ? convertNumToShort(videos.results.length) : ''}</span>
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
            { images?.length !== 0 &&
              <div className='title-main-photos'>
                <div className='title-main-title'>
                  <div className='title-main-title-wrapper'>
                    <h3 className='title-main-title-text'>Photos
                      <span>{images?.length ? convertNumToShort(images.length) : ''}</span>
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
                              {
                                el.profile_path !== null ? 
                                <img src={_imgBase + el.profile_path} alt="cast-pic" className='title-main-cast-item-image'/> :
                                <svg width="24" height="24" className='title-main-cast-item-icon' viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="translate(3.000000, 2.000000)" fill="currentColor" role="presentation"><path d="M9,0 C11.49,0 13.5,1.97473684 13.5,4.42105263 C13.5,6.86736841 11.49,8.84210526 9,8.84210526 C6.50999996,8.84210526 4.5,6.86736841 4.5,4.42105263 C4.5,1.97473684 6.50999996,0 9,0 Z M9,21 C5.25,21 1.935,19.2035087 0,16.4807017 C0.045,13.6877193 6,12.1578947 9,12.1578947 C11.985,12.1578947 17.955,13.6877193 18,16.4807017 C16.065,19.2035087 12.75,21 9,21 Z"></path></g></svg>
                              }
                                
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
              reviews?.results.length !== 0 && 
              <div className='title-main-reviews'>
                <div className='title-main-title'>
                  <div className='title-main-title-wrapper'>
                    <Link to={`/${type}/${title?.id}/reviews`} className='title-main-title-link'>
                      <h3 className='title-main-title-text'>User reviews
                        <span>{reviews?.results.length ? convertNumToShort(reviews.results.length) : ''}</span>
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
                  titleReviewsLoading &&  <DotSpinner theme='light' size='big'/>
                }
                {
                  !titleReviewsLoading && 
                  <div className='title-main-reviews-featured-container'>
                    <div className='title-main-reviews-featured'>
                      <div className='title-main-reviews-featured-header'>
                        <div className='title-main-reviews-featured-header-text'>
                          <span>Featured review</span> 
                        </div>
                        { randReview?.author_details.rating &&
                          <span className='title-main-reviews-featured-header-rating'>
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className='title-main-reviews-featured-header-rating-icon' viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                              {randReview?.author_details.rating}
                            <span>/10</span>
                          </span>
                        }
                      </div>
                      <div className={`title-main-reviews-featured-text-wrapper ${reviewOpen ? 'active' : ''}`} {...reviewOpen ? {style: {maxHeight: reviewTextHeight + 5}} : false}
                      onClick={() => {
                        setReviewOpen(true)
                      }}>
                        <span className='title-main-reviews-featured-text' ref={
                          el => {
                            if (el) {
                              setReviewTextHeight(el.getBoundingClientRect().height)
                            }
                          }
                        }>{randReview?.content}</span>
                        {reviewTextHeight > 240 && !reviewOpen &&
                        <button className='title-main-reviews-featured-text-show'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='title-main-reviews-featured-text-show-icon' viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                        </button>
                        }
                      </div>
                      
                    </div>
                    <div className='title-main-reviews-featured-user-date'>
                      <span className="title-main-reviews-featured-user">
                        {randReview?.author_details.username}
                      </span>
                      <span className="title-main-reviews-featured-date">
                        {transformDate(new Date(randReview?.created_at as '').toISOString().split("T")[0])}
                      </span>
                    </div>
                  </div>
                }
              </div>
            }
          </section>
          <section className='title-main-similar-container'>
            { similar?.results.length !== 0 &&
              <div className='title-main-similar'>
                <div className='title-main-title'>
                  <div className='title-main-title-wrapper'>
                    <h3 className='title-main-title-text'>Top picks</h3>
                    <p className='title-main-title-text-subtitle'>TV shows and movies just for you</p>
                  </div>
                </div>
                <div className='title-main-similar-wrapper'>
                {
                  titleRecommendationsLoading && <DotSpinner theme='light' size='big'/>
                }
                {
                  !titleRecommendationsLoading &&
                  <Carousel showThumbs={false} showStatus={false} showIndicators={false} autoPlay={false}>
                    {recommendationsChunksArr.map((el, i) => <TitleSliderSimilarBlock item={el} key={i}></TitleSliderSimilarBlock>)}
                  </Carousel>
                }
                </div>
              </div>
            }
          </section>
          <section className='title-main-details-container'>
            <div className='title-main-details'>
              <div className='title-main-title'>
                <div className='title-main-title-wrapper'>
                  <h3 className='title-main-title-text'>Details</h3>
                </div>
              </div>
              <div className='title-main-details-wrapper'>
              {
                titleLoading&& <DotSpinner theme='light' size='big'/>
              }
              {
                title && !titleLoading &&
                <div className='title-main-details-items'>
                  <div className='title-main-info-details-item'>
                    <p className='title-main-info-details-item-title'>Release date</p>
                    <div className='title-main-info-details-item-values'>
                      <div className='title-main-info-details-item-val'>
                      {
                        !isTvShow && 
                        `${monthNames[new Date(title.release_date).getMonth()]} 
                        ${new Date(title.release_date).getDate()}, ${new Date(title.release_date).getFullYear()}`
                      }
                      {
                        isTvShow && 
                        `${monthNames[new Date(title.first_air_date).getMonth()]} 
                        ${new Date(title.first_air_date).getDate()}, ${new Date(title.first_air_date).getFullYear()}`
                      }
                      {` (United States)`}
                      </div>
                    </div>
                  </div>
                  <div className='title-main-info-details-item'>
                    <p className='title-main-info-details-item-title'>Country of origin</p>
                    <div className='title-main-info-details-item-values'>
                      <div className='title-main-info-details-item-val'>
                      { !isTvShow &&
                      title.production_countries[0].name}
                      { isTvShow &&
                      title.production_countries[0].name}
                      </div>
                    </div>
                  </div>
                  <div className='title-main-info-details-item'>
                    <p className='title-main-info-details-item-title'>{title.spoken_languages.length > 1 ? 'Languages' : 'Language'}</p>
                    <div className='title-main-info-details-item-values'>
                      {
                        title.spoken_languages?.map((el, i) => 
                          <div className='title-main-info-details-item-val' key={i}>{el.english_name}</div>
                        )
                      }
                    </div>
                  </div>
                  <div className='title-main-info-details-item'>
                    <p className='title-main-info-details-item-title'>Production {title.production_companies.length > 1 ? 'companies' : 'company'}</p>
                    <div className='title-main-info-details-item-values'>
                      {
                        title.production_companies?.map((el, i) => 
                          <div className='title-main-info-details-item-val' key={i}>{el.name}</div>
                        )
                      }
                    </div>
                  </div>
                  <div className='title-main-info-details-imdb title-main-info-details-item'>
                    <a className="title-main-info-details-imdb-pro-link" href="https://pro.imdb.com/" target="_blank">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="title-main-info-details-item-link-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M16 16.667H8A.669.669 0 0 1 7.333 16V8c0-.367.3-.667.667-.667h3.333c.367 0 .667-.3.667-.666C12 6.3 11.7 6 11.333 6h-4C6.593 6 6 6.6 6 7.333v9.334C6 17.4 6.6 18 7.333 18h9.334C17.4 18 18 17.4 18 16.667v-4c0-.367-.3-.667-.667-.667-.366 0-.666.3-.666.667V16c0 .367-.3.667-.667.667zm-2.667-10c0 .366.3.666.667.666h1.727L9.64 13.42a.664.664 0 1 0 .94.94l6.087-6.087V10c0 .367.3.667.666.667.367 0 .667-.3.667-.667V6h-4c-.367 0-.667.3-.667.667z"></path></svg>
                    </a>
                    <p className='title-main-info-details-item-title'>See more company credits at IMDbPro</p>
                  </div>
                </div>
              }
              </div>
            </div>
          </section>
          <section className='title-main-box-office-container'>
            {
              !isTvShow &&
              <div className='title-main-box-office'>
                <div className='title-main-title'>
                  <div className='title-main-title-wrapper'>
                    <h3 className='title-main-title-text'>Box office</h3>
                  </div>
                </div>
                <div className='title-main-box-office-wrapper'>
                {
                  titleLoading&& <DotSpinner theme='light' size='big'/>
                }
                {
                  title && !titleLoading && <>
                  <div className='title-main-box-office-items'>
                    <div className='title-main-box-office-item'>
                      <p className='title-main-box-office-title'>Budget</p>
                      <span className='title-main-box-office-value'>${numberWithCommas(title.budget!)}</span>
                    </div>
                    <div className='title-main-box-office-item'>
                      <p className='title-main-box-office-title'>Gross worldwide</p>
                      <span className='title-main-box-office-value'>${numberWithCommas(title.revenue!)}</span>
                    </div>
                  </div>
                  <div className="title-main-info-details-imdb-pro">
                    <a className="title-main-info-details-imdb-pro-link" href="https://pro.imdb.com/" target="_blank">
                      <svg className="title-main-info-details-imdb-pro-link-icon" width="54" height="14.538461538461538" viewBox="0 0 52 14" xmlns="http://www.w3.org/2000/svg" version="1.1"><g fill="currentColor"><rect x="0" y="1" width="3.21" height="12.34"></rect><path d="M10,1 L9.3,6.76 L8.84,3.63 C8.7,2.62 8.58,1.75 8.45,1 L4.3,1 L4.3,13.34 L7.11,13.34 L7.11,5.19 L8.3,13.34 L10.3,13.34 L11.42,5 L11.42,13.33 L14.22,13.33 L14.22,1 L10,1 Z"></path><path d="M19.24,3.22 C19.3711159,3.29185219 19.4602235,3.42180078 19.48,3.57 C19.5340993,3.92393477 19.554191,4.28223587 19.54,4.64 L19.54,9.42 C19.578852,9.92887392 19.5246327,10.4405682 19.38,10.93 C19.27,11.12 18.99,11.21 18.53,11.21 L18.53,3.11 C18.7718735,3.09406934 19.0142863,3.13162626 19.24,3.22 Z M19.24,13.34 C19.8163127,13.3574057 20.3928505,13.3138302 20.96,13.21 C21.3245396,13.1481159 21.6680909,12.9969533 21.96,12.77 C22.2288287,12.5438006 22.4209712,12.2398661 22.51,11.9 C22.643288,11.1679419 22.6969338,10.4236056 22.67,9.68 L22.67,5.34 C22.6662002,4.55669241 22.6060449,3.77467335 22.49,3 C22.43037,2.59841431 22.260779,2.22116094 22,1.91 C21.6636187,1.56093667 21.2326608,1.317654 20.76,1.21 C19.7709421,1.02848785 18.7647002,0.958050915 17.76,1 L15.32,1 L15.32,13.34 L19.24,13.34 Z"></path><path d="M27.86,10.34 C27.8769902,10.7218086 27.8501483,11.1043064 27.78,11.48 C27.72,11.63 27.46,11.71 27.26,11.71 C27.0954951,11.7299271 26.9386363,11.6349863 26.88,11.48 C26.7930212,11.1542289 26.7592527,10.8165437 26.78,10.48 L26.78,7.18 C26.7626076,6.84408875 26.7929089,6.50740774 26.87,6.18 C26.9317534,6.03447231 27.0833938,5.94840616 27.24,5.97 C27.43,5.97 27.7,6.05 27.76,6.21 C27.8468064,6.53580251 27.8805721,6.87345964 27.86,7.21 L27.86,10.34 Z M23.7,1 L23.7,13.34 L26.58,13.34 L26.78,12.55 C27.0112432,12.8467609 27.3048209,13.0891332 27.64,13.26 C28.0022345,13.4198442 28.394069,13.5016184 28.79,13.5 C29.2588971,13.515288 29.7196211,13.3746089 30.1,13.1 C30.4399329,12.8800058 30.6913549,12.5471372 30.81,12.16 C30.9423503,11.6167622 31.0061799,11.0590937 31,10.5 L31,7 C31.0087531,6.51279482 30.9920637,6.02546488 30.95,5.54 C30.904474,5.28996521 30.801805,5.05382649 30.65,4.85 C30.4742549,4.59691259 30.2270668,4.40194735 29.94,4.29 C29.5869438,4.15031408 29.2096076,4.08232558 28.83,4.09 C28.4361722,4.08961884 28.0458787,4.16428368 27.68,4.31 C27.3513666,4.46911893 27.0587137,4.693713 26.82,4.97 L26.82,1 L23.7,1 Z"></path></g><g fill="#33C5F3"><path d="M32.13,1 L35.32,1 C35.9925574,0.978531332 36.6650118,1.04577677 37.32,1.2 C37.717112,1.29759578 38.0801182,1.50157071 38.37,1.79 C38.6060895,2.05302496 38.7682605,2.37391646 38.84,2.72 C38.935586,3.27463823 38.9757837,3.8374068 38.96,4.4 L38.96,5.46 C38.9916226,6.03689533 38.9100917,6.61440551 38.72,7.16 C38.5402933,7.53432344 38.2260614,7.82713037 37.84,7.98 C37.3049997,8.18709035 36.7332458,8.28238268 36.16,8.26 L35.31,8.26 L35.31,13.16 L32.13,13.16 L32.13,1 Z M35.29,3.08 L35.29,6.18 L35.53,6.18 C35.7515781,6.20532753 35.9725786,6.12797738 36.13,5.97 C36.2717869,5.69610033 36.3308522,5.38687568 36.3,5.08 L36.3,4.08 C36.3390022,3.79579475 36.2713114,3.5072181 36.11,3.27 C35.8671804,3.11299554 35.5771259,3.04578777 35.29,3.08 Z"></path><path d="M42,4.36 L41.89,5.52 C42.28,4.69 43.67,4.42 44.41,4.37 L43.6,7.3 C43.2290559,7.27725357 42.8582004,7.34593052 42.52,7.5 C42.3057075,7.61238438 42.1519927,7.81367763 42.1,8.05 C42.0178205,8.59259006 41.9843538,9.14144496 42,9.69 L42,13.16 L39.34,13.16 L39.34,4.36 L42,4.36 Z"></path><path d="M51.63,9.71 C51.6472876,10.3265292 51.6003682,10.9431837 51.49,11.55 C51.376862,11.9620426 51.1639158,12.3398504 50.87,12.65 C50.5352227,13.001529 50.1148049,13.2599826 49.65,13.4 C49.0994264,13.5686585 48.5257464,13.6496486 47.95,13.64 C47.3333389,13.6524659 46.7178074,13.5818311 46.12,13.43 C45.6996896,13.322764 45.3140099,13.1092627 45,12.81 C44.7275808,12.5275876 44.5254637,12.1850161 44.41,11.81 C44.2627681,11.2181509 44.1921903,10.6098373 44.2,10 L44.2,7.64 C44.1691064,6.9584837 44.2780071,6.27785447 44.52,5.64 C44.7547114,5.12751365 45.1616363,4.71351186 45.67,4.47 C46.3337168,4.13941646 47.0688388,3.97796445 47.81,4 C48.4454888,3.98667568 49.0783958,4.08482705 49.68,4.29 C50.1352004,4.42444561 50.5506052,4.66819552 50.89,5 C51.1535526,5.26601188 51.3550281,5.58700663 51.48,5.94 C51.6001358,6.42708696 51.6506379,6.92874119 51.63,7.43 L51.63,9.71 Z M48.39,6.73 C48.412199,6.42705368 48.3817488,6.12255154 48.3,5.83 C48.2091142,5.71223121 48.0687606,5.64325757 47.92,5.64325757 C47.7712394,5.64325757 47.6308858,5.71223121 47.54,5.83 C47.447616,6.12046452 47.4136298,6.42634058 47.44,6.73 L47.44,10.93 C47.4168299,11.2204468 47.4508034,11.5126191 47.54,11.79 C47.609766,11.9270995 47.7570827,12.0067302 47.91,11.99 C48.0639216,12.0108082 48.2159732,11.9406305 48.3,11.81 C48.3790864,11.5546009 48.4096133,11.2866434 48.39,11.02 L48.39,6.73 Z"></path></g></svg>
                      <span className="title-main-info-details-imdb-pro-link-text">See detailed box office info on IMDbPro
                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="title-main-info-details-imdb-pro-link-icon2" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path></svg></span>
                    </a>
                  </div>
                </>
                }
                </div>
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
