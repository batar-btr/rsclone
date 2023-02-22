import IMDBService from '../../services/IMDBService';
import './mediaviewerPage.scss';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ITitle, ITitleImage, ITitleImages } from '../../models/title';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import { DotSpinner } from '../../components/dots-spinner/DotSpinner';

export const MediaviewerPage = () => {
  const id = useParams().id
  let itemNum = useParams().item?.split('=')[1]
  const type = IMDBService().type 
  const _imageOriginal = IMDBService()._imageOriginal
  const navigate = useNavigate(); 

  const [images, setImages] = useState<ITitleImage[]>()
  const [title, setTitle] = useState<ITitle>()
  const [titleImagesLoading, setTitleImagesLoading] = useState<boolean>(true)

  itemNum = images ? +itemNum! > images!.length ? `1` : itemNum : '1'

  let [counter, setCounter] = useState(1)

  useEffect(() => {
    onRequest();
  }, [id, counter]);

  const onRequest = async () => {
    const title = await IMDBService().getTitle(+id!)
    setTitle(title)
    // if (title) {
    //   setTitleLoading(false)
    // }

    const images: ITitleImages = await IMDBService().getTitleImages(+id!)
    const allImages: ITitleImage[] = [...images.backdrops, ...images.posters]
    setImages(allImages)
    if (allImages) {
      setTitleImagesLoading(false)
    }
  }
  
  
  return (
    <div className='mediaviewer-container'>
      <div className='mediaviewer-header'>
        <div className="mediaviewer-header-close-btn" onClick={() => navigate(-counter)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mediaviewer-header-close-btn-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path></svg>
          <div className="mediaviewer-header-close-btn-text">Close</div>
        </div>
        <div className='mediaviewer-header-info'>
          <div className='mediaviewer-header-info-total-wrapper'>
            {
              titleImagesLoading && <DotSpinner theme='dark' size='small'/>
            }
            {
              !titleImagesLoading && <span className='mediaviewer-header-info-total'>{`${itemNum} of ${images?.length}`}</span>
            }
          </div>
          
          <Link to={`/${type}/${id}/photogallery`} className='mediaviewer-header-info-link'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mediaviewer-header-info-link-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M4.8 14h2.4c.44 0 .8-.3.8-.667v-2.666C8 10.3 7.64 10 7.2 10H4.8c-.44 0-.8.3-.8.667v2.666c0 .367.36.667.8.667zm0-6h2.4c.44 0 .8-.3.8-.667V4.667C8 4.3 7.64 4 7.2 4H4.8c-.44 0-.8.3-.8.667v2.666C4 7.7 4.36 8 4.8 8zm0 12h2.4c.44 0 .8-.3.8-.667v-2.666C8 16.3 7.64 16 7.2 16H4.8c-.44 0-.8.3-.8.667v2.666c0 .367.36.667.8.667zm6 0h2.4c.44 0 .8-.3.8-.667v-2.666c0-.367-.36-.667-.8-.667h-2.4c-.44 0-.8.3-.8.667v2.666c0 .367.36.667.8.667zm6 0h2.4c.44 0 .8-.3.8-.667v-2.666c0-.367-.36-.667-.8-.667h-2.4c-.44 0-.8.3-.8.667v2.666c0 .367.36.667.8.667zm-6-6h2.4c.44 0 .8-.3.8-.667v-2.666c0-.367-.36-.667-.8-.667h-2.4c-.44 0-.8.3-.8.667v2.666c0 .367.36.667.8.667zm0-6h2.4c.44 0 .8-.3.8-.667V4.667C14 4.3 13.64 4 13.2 4h-2.4c-.44 0-.8.3-.8.667v2.666c0 .367.36.667.8.667zm5.2 2.667v2.666c0 .367.36.667.8.667h2.4c.44 0 .8-.3.8-.667v-2.666c0-.367-.36-.667-.8-.667h-2.4c-.44 0-.8.3-.8.667zm0-6v2.666c0 .367.36.667.8.667h2.4c.44 0 .8-.3.8-.667V4.667C20 4.3 19.64 4 19.2 4h-2.4c-.44 0-.8.3-.8.667z"></path></svg>
          </Link>
          <div className='mediaviewer-header-info-link'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mediaviewer-header-info-link-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path></svg>
          </div>
        </div>
      </div>
      <div className='mediaviewer'>
        <div className='mediaviewer-carousel'>
          {
            images && 
            <Carousel showThumbs={false} showStatus={false} transitionTime={0} showIndicators={false} autoPlay={false} selectedItem={+itemNum! - 1}
              onChange={(index) => {
                navigate(`/${type}/${id}/mediaviewer/item=${index + 1}`)
                setCounter(counter+=1)
              }}>
              {images.map((el, i) => 
                <img src={_imageOriginal + el.file_path} alt='image-item' key={i}></img>)}
            </Carousel>
          }
        </div>
      </div>
    </div>
    
  )
}