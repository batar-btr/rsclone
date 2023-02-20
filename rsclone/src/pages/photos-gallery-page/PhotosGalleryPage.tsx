import { Link, useParams } from 'react-router-dom';
import { ITitle, ITitleImage, ITitleImages } from '../../models/title';
import IMDBService from '../../services/IMDBService';
import '../photos-gallery-page/photosGalleryPage.scss';
import { useEffect, useState } from 'react';

export const PhotosGalleryPage = () => {
  const id = useParams().id
  const type = IMDBService().type 
  const _imgBase = IMDBService()._imageSmall 
  const isTvShow = IMDBService().isTvShow()
  const [images, setImages] = useState<ITitleImage[]>()
  const [title, setTitle] = useState<ITitle>()
  const [titleImagesLoading, setTitleImagesLoading] = useState<boolean>(true)
  const [titleLoading, setTitleLoading] = useState<boolean>(true)
  
  useEffect(() => {
    onRequest();
    setTitleLoading(true)
    setTitleImagesLoading(true)
  }, [id]);

  const onRequest = async () => {
    const title = await IMDBService().getTitle(+id!)
    setTitle(title)
    if (title) {
      setTitleLoading(false)
    }

    const images: ITitleImages = await IMDBService().getTitleImages(+id!)
    const allImages: ITitleImage[] = [...images.backdrops, ...images?.logos, ...images.posters]
    setImages(allImages)
    if (allImages) {
      setTitleImagesLoading(false)
    }
  }

  function spliceIntoChunks<T>(arr: T[], chunkSize: number) {
    const res = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }
    return res;
  }

  const imagesChunksArr = images ? spliceIntoChunks(images, 48) : []

  
  return(
    <div className='photos-gallery-container'>
      <div className='photos-gallery-wrapper'>
        <div className='photos-gallery-main-wrapper'>
          <div className='photos-gallery-main'>
            <div className='photos-gallery-title-info-wrapper'>
              <Link to={`/${type}/${id}`} className="photos-gallery-title-info-poster">
                <img src={_imgBase + title?.poster_path} alt="poster"/>
              </Link>
              <div className='photos-gallery-title-info'>
                <h3 className='photos-gallery-title-info-name'>
                  <Link to={`/${type}/${id}`}>
                    {title?.title || title?.name}
                  </Link>
                  <span>
                    {`(${!isTvShow ? 
                      new Date(title?.release_date as '').getFullYear() : 
                      new Date(title?.first_air_date as '').getFullYear()})`}
                  </span>
                </h3>
                <h1 className="photos-gallery-title-info-title">Photo Gallery</h1>
              </div>
            </div>
          </div>
        </div>
        <div className='photos-gallery-sidebar'></div>
      </div>
    </div>
  )
}