import { Link, useParams } from 'react-router-dom';
import { ITitle, ITitleImage, ITitleImages, ITitleVideos } from '../../models/title';
import IMDBService from '../../services/IMDBService';
import './photoGalleryPage.scss';
import { useEffect, useState } from 'react';
import { DotSpinner } from '../../components/dots-spinner/DotSpinner';

export const PhotoGalleryPage = () => {
  const id = useParams().id
  const type = IMDBService().type 
  const _imgBaseSmall = IMDBService()._imageSmall 
  const _imgBaseMiddle = IMDBService()._imageMiddle
  const isTvShow = IMDBService().isTvShow()
  const [images, setImages] = useState<ITitleImage[]>()
  const [title, setTitle] = useState<ITitle>()
  const [videos, setVideos] = useState<ITitleVideos>()
  const [titleImagesLoading, setTitleImagesLoading] = useState<boolean>(true)
  const [titleLoading, setTitleLoading] = useState<boolean>(true)
  
  let currentPage = window.location.href.split('page=')[1] ? +window.location.href.split('page=')[1] : 1
  
  setTimeout(() => window.scrollTo(0, 0), 0)
  useEffect(() => {
    onRequest();
  }, [id, currentPage]);

  const onRequest = async () => {
    const title = await IMDBService().getTitle(+id!)
    setTitle(title)
    if (title) {
      setTitleLoading(false)
    }

    const images: ITitleImages = await IMDBService().getTitleImages(+id!)
    const allImages: ITitleImage[] = [...images.backdrops, ...images.posters]
    setImages(allImages)
    if (allImages) {
      setTitleImagesLoading(false)
    }

    const videos = await IMDBService().getTitleVideos(+id!)
    setVideos(videos)

  }

  const trailers = videos ? [...videos.results.filter(el => el.type === 'Trailer')] : []
  const orderVideos = videos ? [...trailers, 
  ...[...videos.results.filter(el => el.type !== 'Trailer' && el.type !== 'Bloopers')]] : []

  function spliceIntoChunks<T>(arr: T[], chunkSize: number) {
    const res = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }
    return res;
  }

  const imagesChunksArr = images ? spliceIntoChunks([...images], 48) : []

  const currentChunk = currentPage <= imagesChunksArr.length
  ? imagesChunksArr[currentPage - 1] : imagesChunksArr[0]

  currentPage = currentPage > imagesChunksArr.length ? 1 : currentPage

  const numberWithCommas = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  const GalleryPagination = () => (
    <div className='photos-gallery-pagination'>
      <div className='photos-gallery-pagination-total'>
        {images && `${(currentPage - 1 ) * imagesChunksArr[0].length + 1}-${
          currentPage !== imagesChunksArr.length ? currentPage * imagesChunksArr[0].length : images.length} of ${numberWithCommas(images?.length)} photos`}
      </div>
      <div className='photos-gallery-pagination-pages-wrapper'>
        {
          currentPage !== 1 && 
          <Link to={`/${type}/${id}/photogallery?page=${currentPage-1}`} 
            className="photos-gallery-pagination-prev">«&nbsp;Previous</Link>
        }
        <div className='photos-gallery-pagination-pages'>
        {
            titleImagesLoading && <DotSpinner theme='light' size='small'/>
          }
          { !titleImagesLoading && 
            imagesChunksArr.map((el, i) => 
            i+1 === currentPage ? <span key={i}>{i+1}</span> :
            <Link to={`/${type}/${id}/photogallery?page=${i+1}`} key={i}>{i+1}</Link>)
          }
        </div>
        {
          currentPage !== imagesChunksArr.length &&
          <Link to={`/${type}/${id}/photogallery?page=${currentPage+1 || 2}`} 
          className="photos-gallery-pagination-next">Next&nbsp;»</Link>
        }
      </div>
    </div>
  )
  

  return(
    <div className='photos-gallery-container'>
      <div className='photos-gallery-wrapper'>
        <div className='photos-gallery-main-wrapper'>
          <div className='photos-gallery-main'>
            <div className='photos-gallery-title-info-wrapper'>
              <Link to={`/${type}/${id}`} className="photos-gallery-title-info-poster">
                {
                  titleLoading && <DotSpinner theme='light' size='big'/>
                }
                {
                  !titleLoading && <img src={_imgBaseSmall + title?.poster_path} alt="poster"/>
                }
              </Link>
              <div className='photos-gallery-title-info'>
                <h3 className='photos-gallery-title-info-name'>
                {
                  titleLoading && <DotSpinner theme='light' size='big'/>
                }
                {
                  !titleLoading && 
                  <>
                    <Link to={`/${type}/${id}`}>
                      {title?.title || title?.name}
                    </Link>
                    <span>
                      {`(${!isTvShow ? 
                        new Date(title?.release_date as '').getFullYear() : 
                        new Date(title?.first_air_date as '').getFullYear()})`}
                    </span>
                  </>
                }
                </h3>
                <h1 className="photos-gallery-title-info-title">Photo Gallery</h1>
              </div>
            </div>
            <div className='photos-gallery'>
              <GalleryPagination/>
              <div className='photos-gallery-content'>
                {
                  titleImagesLoading && <DotSpinner theme='light' size='big'/>
                }
                {
                  !titleImagesLoading && 
                  currentChunk.map((el, i) => 
                    <Link to={`/${type}/${id}/mediaviewer/item=${i+1 + ((imagesChunksArr[0].length * currentPage) - imagesChunksArr[0].length)}`} key={i} className='photos-gallery-item'>
                      <img src={_imgBaseMiddle + el.file_path} alt="gallery-image" />
                    </Link>
                  )
                }
              </div>
              <GalleryPagination/>
            </div>
          </div>
          <div className='photos-gallery-trailers'>
            <h1 className="photos-gallery-trailers-title">Trailers and Videos</h1>
            <div className='photos-gallery-trailers-content'>
              {
                orderVideos.slice(0, 3).map((el, i) => 
                <Link to={`/${type}/${id!}/video/${el.key}`} key={i} className='photos-gallery-trailers-content-item'>
                  <img src={`http://img.youtube.com/vi/${el.key}/maxresdefault.jpg`}
                    alt="trailer-preview" className='photos-gallery-trailers-content-item-preview'>
                  </img>
                </Link>
                )
              }
            </div>
            <div className="photos-gallery-trailers-see-more">
              <Link to={`/${type}/${id}/videogallery`}> See all {orderVideos.length} trailers and videos</Link>
              
              &nbsp;»
            </div>
          </div>
          <div className='photos-gallery-storyline'>
            <h1 className="photos-gallery-storyline-title">Storyline</h1>
            <p className='photos-gallery-storyline-text'>{title?.overview}</p>
          </div>
        </div>
        <div className='photos-gallery-sidebar'></div>
      </div>
    </div>
  )
}