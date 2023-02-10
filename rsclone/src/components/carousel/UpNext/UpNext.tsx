import { IMovie } from "../../../types";
import { Link } from "react-router-dom";

type UpNextItemProps = {
  title: string,
  poster: string
}

const UpNextItem = (props: UpNextItemProps) => {
  const { title, poster } = props;
  const posterPath = `https://image.tmdb.org/t/p/w300${poster}`;

  const trimTitle = title.length > 30 ? `${title.slice(0,30)}...` : title;

  return (
    <div className='upnext-item'>
      <div className='upnext-img-wrap'>
        <img src={posterPath} alt={title} />
      </div>
      <Link to='/'>
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
        {movies.map(item => <UpNextItem title={item.title} poster={item.poster_path} key={item.id}></UpNextItem>)}
        <Link className="browse-link" to='/'>{`Browse trailers >`}</Link>
      </div>
    </div>
  );
}

export { UpNext }
