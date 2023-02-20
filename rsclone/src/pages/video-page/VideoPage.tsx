import { Link, useParams } from "react-router-dom"
import '../video-page/videoPage.scss';
import { useEffect, useState } from "react";
import { IMovieReleaseDates, ITitle, ITitleVideos, ITvContentRatings } from "../../models/title";
import IMDBService from "../../services/IMDBService";
import { DotSpinner } from "../../components/dots-spinner/DotSpinner";
import AddFlag from "../../components/movie-card-carousel/AddFlag/AddFlag";
import { UserAuth } from "../../context/AuthContext";
import { deleteFavorite } from "../../User/delete-favorite";
import { addFavorite } from "../../User/add-favorite";

export const VideoPage = () => {
  const params = useParams()
  const id = params.id
  const key = params.key
  const type = IMDBService().type
  const isTvShow = IMDBService().isTvShow() 
  const _imgBase = IMDBService()._imageMiddle
  const [title, setTitle] = useState<ITitle>()
  const [videos, setVideos] = useState<ITitleVideos>()
  const [titleLoading, setTitleLoading] = useState<boolean>(true)
  const [titleVideoLoading, setTitleVideoLoading] = useState<boolean>(true)
  const [certification, setCertification] = useState<string>('')
  const [certLoading, setCertLoading] = useState<boolean>(true)
  
  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0))
    onRequest();
    setTitleLoading(true)
    setTitleVideoLoading(true)
    setCertLoading(true)
  }, [params]);
  
  const onRequest = async () => {
    const title = await IMDBService().getTitle(+id!)
    setTitle(title)
    if (title) {
      setTitleLoading(false)
    }

    if (key !== undefined) {
      const video = await IMDBService().getTitleVideos(+id!)
      setVideos(video)
      if (video) {
        setTitleVideoLoading(false)
      }
    }
    

    const certifications = await IMDBService().getTitleCertification(+id!)
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
      certification = filtered ? filtered.rating : 'empty'
    }
    setCertification(certification)
    if (certification) {
      setCertLoading(false)
    }
  };



  const { user, userData } = UserAuth()

  const isAdded = userData?.['favorite'][type as 'movie' | 'tv'].some((item: number) => item === +id!) as boolean;

  const [loading, setLoading] = useState<boolean>(false);
  
  const addMovieHandler = async () => {
    if (user) {
      setLoading(prev => !prev);
      setTimeout(async () => {
        if (isAdded) {
          await deleteFavorite(user.uid, type as 'tv' | 'movie', +id!)
        } else {
          await addFavorite(user.uid, type as 'tv' | 'movie', +id!);
        }
        setLoading(prev => !prev);
      }, 1000);
    }
  }

  const allInfo = title ? `${certification ? certification + ' | ' : ''} ${title!.genres.length > 0 ? title?.genres.map(el => el.name).join(', ') : ''}` : ''

  return (
    <div className="video-container">
      <div className="video-container-wrapper">
        <div className="video-player-wrapper">
          <div className="video-player-top">
            <Link to={`/${type}/${id}`} className="video-player-close-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="video-player-close-btn-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path></svg>
              <div className="video-player-close-btn-text">Close</div>
            </Link>
            <div className='title-main-info-top-share'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="title-main-info-top-link-share-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path></svg>
            </div>
          </div>
          {
            key !== undefined ?    
              <iframe className="video-player" src={`https://www.youtube.com/embed/${key}?autoplay=1&enablejsapi=1`} allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
              : <div className="video-player">Sorry, no video is avaliable</div>
            }
        </div>
        <div className="video-player-title-info-container">
          <div className="video-player-title-info-wrapper">
            <div className='title-main-info-madia-poster'>
              {
                titleLoading && <DotSpinner theme='dark' size='big'/>
              }
              { !titleLoading && <>
                <AddFlag checked={isAdded} loading={loading} onClick={addMovieHandler}></AddFlag>
                <div className="title-main-info-madia-poster-img">
                  <Link to={`/${type}/${id}`}>
                    <img src={_imgBase + title?.poster_path} alt="poster"/>
                    <div className='title-main-overlay'></div>
                  </Link>
                </div>
              </>
              }
            </div>
            <div className="video-player-title-info">
              {
                titleLoading && certLoading && <DotSpinner theme='dark' size='big'/>
              }
              {
                !titleLoading && !certLoading && <>
                <Link to={`/${type}/${id}`} className="video-player-title-info-link" title={title?.title || title?.name}>
                  <h1 className="video-player-title-info-title">
                    {`${title?.title || title?.name} (${!isTvShow ? 
                      new Date(title?.release_date as '').getFullYear() : 
                      new Date(title?.first_air_date as '').getFullYear()})`}
                  </h1>
                  <p className="video-player-title-info-all">
                    {allInfo}
                  </p>
                </Link>
                <Link to={`/${type}/${id}`} className="video-player-title-info-link video-player-title-info-link-icon" title={title?.title || title?.name}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="video-player-title-info-iocn" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"></path></svg>
                </Link>
                </>
              }
            </div>
          </div>
          <hr className="video-player-separator"/>
          {
            key !== undefined &&
          
          <div className="video-player-type">
            {
              titleVideoLoading && <DotSpinner theme='dark' size='big'/>
            }
            {
              !titleVideoLoading && videos!.results.filter(el => el.key === key)[0].name 
            }
          </div>
}
        </div>
      </div>
      
    </div>
    
  )
}
