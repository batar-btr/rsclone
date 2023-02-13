import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useTitleInfoService } from '../../hooks/titleInfoService';
import '../title-page/mainSection.scss';
import { Link } from 'react-router-dom';

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

export const MainSection = () => {
  const {isTvShow, title, cast, images, videos, reviews, similar, 
    certification, _imgBase, type} = useTitleInfoService()
  
  function spliceIntoChunks<T>(arr: T[], chunkSize: number) {
    const res = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }
    return res;
  }
  
  const videosChunkArr = videos ? spliceIntoChunks([...videos.results.filter(el => el.type !== 'Bloopers')].slice(0, 12), 2) : []
  const allImages = images ? [...images.backdrops, ...images?.logos, images.backdrops] : []
  const backdropsChunkArr = images ? spliceIntoChunks([...images.backdrops], 4) : []
  

  const TitleSliderVideosBlock = (props: TitleVideoProps) => {
    return (
      <div className='title-main-slider-video-items'>
        {props.item.map((el, i) => 
        <div className='title-main-slider-video-item' key={i}>
          <Link to={`/${type}/${title?.id}/video/${el.key}`}>
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
      <div className='title-main-slider-images-items'>
        {props.item.map((el, i) => 
        <div className='title-main-slider-image-item' key={i}>
          <Link to={`/`}>
            <div className='title-main-slider-image-item-wrapper'>
              <img src={_imgBase + el.file_path} 
                alt="trailer-preview" className='title-main-slider-image-item'>
              </img>
            </div>
            <div className='title-main-overlay'></div>
          </Link>
        </div>
        )}
      </div>
    )
  }

  return (
    <section className='title-main-container'>
      <div className='title-main title-section'>
        <div className='title-main-wrapper'>
          <section className='title-main-videos-container'>
            {
              videos && videosChunkArr.length !== 0 && 
              <div className='title-main-videos'>
                <div className='title-main-title'>
                  <div className='title-main-title-wrapper'>
                    <h3 className='title-main-title-text'>Videos
                      <span>{videos.results.length}</span>
                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="title-main-title-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>
                    </h3>
                  </div>
                </div>
                <Carousel showThumbs={false} showStatus={false} showIndicators={false} autoPlay={false}>
                  {videosChunkArr.map((el, i) => <TitleSliderVideosBlock item={el} key={i}></TitleSliderVideosBlock>)}
                </Carousel>
              </div>
            }
          </section>
          <section className='title-main-photos-container'>
            {
              images && 
              <div className='title-main-photos'>
                <div className='title-main-title'>
                  <div className='title-main-title-wrapper'>
                    <h3 className='title-main-title-text'>Photos
                      <span>{allImages.length}</span>
                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="title-main-title-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>
                    </h3>
                  </div>
                </div>
                {/* <Carousel showThumbs={false} showStatus={false} showIndicators={false} autoPlay={false}>
                  {backdropsChunkArr.map((el, i) => <TitleSliderImagesBlock item={el} key={i}></TitleSliderImagesBlock>)}
                </Carousel> */}
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
