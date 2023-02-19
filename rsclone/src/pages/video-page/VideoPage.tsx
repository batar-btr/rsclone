import { useParams } from "react-router-dom"
import '../video-page/videoPage.scss';

export const VideoPage = () => {
  const params = useParams()
  const id = params.id
  const key = params.key
  

  return (
    <div className="video-container">
      <iframe width="560" height="315" src={`https://www.youtube.com/embed/${key}?autoplay=1&enablejsapi=1`} allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
    </div>
    
  )
}
