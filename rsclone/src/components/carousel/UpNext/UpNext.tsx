import { IMovie } from "../../../types";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ITitleVideos } from "../../../models/title";

type UpNextItemProps = {
  id: number,
  title: string,
  poster: string
}

const UpNextItem = (props: UpNextItemProps) => {
  const { id, title, poster } = props;
  const posterPath = `https://image.tmdb.org/t/p/w300${poster}`;

  const trimTitle = title.length > 30 ? `${title.slice(0,30)}...` : title;

  const [mainTrailer, setMainTrailer] = useState('')

  useEffect(() => {
    const getVideos = async () => {
      const videos: ITitleVideos = await (
        await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=62050b72659b37dc215bf1de992857d4&language=en-US`)
      ).json()
      const mainTr = videos.results.filter(el => el.type === 'Trailer')[0]
      setMainTrailer(mainTr ? mainTr.key : '')
    }
    getVideos()
  }, [])

  return (
    <div className='upnext-item'>
      <div className='upnext-img-wrap'>
        <img src={posterPath} alt={title} />
      </div>
      <Link to={`/movie/${id}/video/${mainTrailer}`}>
        <div className="upnext-item-info">
          <div>
            <button className='upnext-play-btn'></button>
          </div>
          <h4>{trimTitle}</h4>
          <p>Watch trailer</p>
        </div>
      </Link>
    </div>
  );
}

type UpNextProps = {
  movies: IMovie[]
}

const UpNext = (props: UpNextProps) => {
  const { movies } = props;
  return (
    <div className="upnext">
      <h3 className='upnext-title'>Up next</h3>
      <div className="upnext-items">
        {movies.map(item => <UpNextItem title={item.title} poster={item.poster_path} id={item.id} key={item.id}></UpNextItem>)}
        <Link className="browse-link" to='/'>{`Browse trailers >`}</Link>
      </div>
    </div>
  );
}

export { UpNext }
