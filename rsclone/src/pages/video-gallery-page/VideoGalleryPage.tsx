import { Link, useParams } from 'react-router-dom';
import { ITitle, ITitleImage, ITitleImages, ITitleVideos } from '../../models/title';
import IMDBService from '../../services/IMDBService';
import './videoGalleryPage.scss';
import { useEffect, useState } from 'react';
import { DotSpinner } from '../../components/dots-spinner/DotSpinner';

export const VideoGalleryPage = () => {
  const id = useParams().id
  const type = IMDBService().type 
  const _imgBaseSmall = IMDBService()._imageSmall 
  const _imgBaseMiddle = IMDBService()._imageMiddle
  const isTvShow = IMDBService().isTvShow()
  const [title, setTitle] = useState<ITitle>()
  const [videos, setVideos] = useState<ITitleVideos>()
  const [titleLoading, setTitleLoading] = useState<boolean>(true)
  const [titleVideosLoading, setTitleVideosLoading] = useState<boolean>(true)
  
  let currentPage = window.location.href.split('page=')[1] ? +window.location.href.split('page=')[1] : 1
  let contentType = window.location.href.split('content-type=')[1] ? 
    window.location.href.split('content-type=')[1].split('&page=')[0] : ''

  setTimeout(() => window.scrollTo(0, 0), 0)
  useEffect(() => {
    onRequest();
  }, [id, currentPage, contentType]);

  const onRequest = async () => {
    const title = await IMDBService().getTitle(+id!)
    setTitle(title)
    if (title) {
      setTitleLoading(false)
    }

    const videos = await IMDBService().getTitleVideos(+id!)
    setVideos(videos)
    if (videos) {
      setTitleVideosLoading(false)
    }
  }

  const withoutBloopers = videos ? [...videos.results.filter(el => el.type !== 'Bloopers')] : []
  const videoTypes = [...new Set([...withoutBloopers.map(el => el.type)])]
  const checkFilter = withoutBloopers.filter(el => el.type.split(' ').join('-').toLowerCase() === contentType) 
  const filtered = contentType.length !== 0 ? 
    checkFilter.length !== 0 ? checkFilter : withoutBloopers
  : withoutBloopers

  contentType = checkFilter.length === 0 ? '' : contentType

  function spliceIntoChunks<T>(arr: T[], chunkSize: number) {
    const res = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }
    return res;
  }

  const videosChunksArr = filtered ? spliceIntoChunks([...filtered], 30) : []

  const currentChunk = currentPage <= videosChunksArr.length
  ? videosChunksArr[currentPage - 1] : videosChunksArr[0]

  currentPage = currentPage > videosChunksArr.length ? 1 : currentPage

  const numberWithCommas = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  const GalleryPagination = () => (
    <div className='videos-gallery-pagination'>
      <div className='videos-gallery-pagination-total'>
        {videos && `${(currentPage - 1 ) * videosChunksArr[0].length + 1}-${
          currentPage !== videosChunksArr.length ? currentPage * videosChunksArr[0].length : filtered.length} of ${numberWithCommas(filtered.length)} videos`}
      </div>
      <div className='videos-gallery-pagination-pages-wrapper'>
        {
          currentPage !== 1 ?
          <Link to={`/${type}/${id}/videogallery?${
            contentType ?  `content-type=${contentType}&` : ''}page=${currentPage - 1}`} 
            className="videos-gallery-pagination-prev">«&nbsp;Prev</Link> :
          <div className="videos-gallery-pagination-prev">«&nbsp;Prev</div>
        }
       
        <div className='videos-gallery-pagination-pages'>
          {
            titleVideosLoading && <DotSpinner theme='light' size='small'/>
          }
          {
            !titleVideosLoading &&
            videosChunksArr.map((el, i) => 
              i+1 === currentPage ? <span key={i} className='videos-gallery-pagination-default'>{i+1}</span> :
              <Link to={`/${type}/${id}/videogallery?${
                contentType ?  `content-type=${contentType}&` : ''}page=${i+1}`} key={i}>{i+1}</Link>
            )
          }
        </div>
        {
          currentPage !== videosChunksArr.length ?
          <Link to={`/${type}/${id}/videogallery?${
            contentType ?  `content-type=${contentType}&` : ''}page=${currentPage+1 || 2}`} 
          className="videos-gallery-pagination-next">Next&nbsp;»</Link> :
          <div className="videos-gallery-pagination-next">Next&nbsp;»</div>
        }
      </div>
    </div>
  )
  
  const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1)

  return(
    <div className='videos-gallery-container'>
      <div className='videos-gallery-wrapper'>
        <div className='videos-gallery-main-wrapper'>
          <div className='videos-gallery-main'>
            <div className='videos-gallery-title-info-wrapper'>
              <Link to={`/${type}/${id}`} className="videos-gallery-title-info-poster">
                {
                  titleLoading && <DotSpinner theme='light' size='big'/>
                }
                {
                  !titleLoading && <img src={_imgBaseSmall + title?.poster_path} alt="poster"/>
                }
              </Link>
              <div className='videos-gallery-title-info'>
                <h3 className='videos-gallery-title-info-name'>
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
                <h1 className="videos-gallery-title-info-title">Video Gallery</h1>
              </div>
            </div>
            <div className='videos-gallery'>
              <GalleryPagination/>
              <div className='videos-gallery-content'>
                {
                  titleVideosLoading && <DotSpinner theme='light' size='big'/>
                }
                {
                  !titleVideosLoading &&
                    currentChunk.map((el, i) => 
                    <div key={i} className='videos-gallery-item'>
                      <Link to={`/${type}/${id!}/video/${el.key}`} className='videos-gallery-item-image-wrapper'>
                        <img src={`http://img.youtube.com/vi/${el.key}/maxresdefault.jpg`}
                          alt="trailer-preview" className='videos-gallery-item-preview'>
                        </img>
                      </Link>
                      <div className='videos-gallery-item-name'>
                        <Link to={`/${type}/${id!}/video/${el.key}`} className='videos-gallery-item-name-text'>{el.name}</Link>
                      </div>
                      
                    </div>
                  )
                }
              </div>
              <GalleryPagination/>
            </div>
          </div>
          <div className='videos-gallery-see-also'>
            <h1 className="videos-gallery-see-also-title">See also</h1>
            <Link to={`/${type}/${id}/photogallery`} className='videos-gallery-see-also-text'>Photos gallery</Link>
          </div>
        </div>
        <div className='videos-gallery-sidebar'>
          <h1 className="videos-gallery-refinebytype-title">Refine By Type</h1>
          <div className='videos-gallery-refinebytype'>
            {
              titleVideosLoading && <DotSpinner theme='light' size='big'/>
            }
            { !titleVideosLoading && 
              (contentType.length === 0 ?
              videoTypes.map((el, i) => 
              <div className='videos-gallery-refinebytype-item' key={i}>
                <Link to={`/${type}/${id}/videogallery?content-type=${el.split(' ').join('-').toLowerCase()}`}
                className='videos-gallery-refinebytype-item-name'>{capitalize(el.toLowerCase())}</Link>
                <span className='videos-gallery-refinebytype-item-count'>
                  ({withoutBloopers.filter(item => item.type === el).length})
                </span>
              </div>
              )
              : 
              <div className='videos-gallery-refinebytype-selected'>
                <span className='videos-gallery-refinebytype-selected-type'>
                  {videoTypes.filter(el => el.split(' ').join('-').toLowerCase() === contentType)[0]}
                </span>
                <span className='videos-gallery-refinebytype-selected-count'>
                  {`(${withoutBloopers.filter(el => el.type === 
                    videoTypes.filter(el => el.split(' ').join('-').toLowerCase() === contentType)[0]).length})`}
                </span>
                <span className='videos-gallery-refinebytype-selected-close'>[<Link to={`/${type}/${id}/videogallery`}>x</Link>]</span>
              </div>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}