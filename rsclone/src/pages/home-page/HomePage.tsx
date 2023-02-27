import { Link } from "react-router-dom"
import '../home-page/homePage.scss';
import { MainCarousel } from "../../components/carousel/carousel";
import { MovieCardCarousel } from "../../components/movie-card-carousel/MovieCardCarousel";

export const HomePage = () => {
  return (
    <>
      <MainCarousel/>

      <MovieCardCarousel topTitle='What to watch' subTitle={['Fan Favorites', 'This week\'s top TV and movies']} type='favorites'/>
      <MovieCardCarousel subTitle={['Top Picks', 'TV shows and movies just for you']} type='top'/>
      <MovieCardCarousel topTitle='Explore what’s streaming' subTitle={['Prime video', 'Included with Prime']} type='top-tv'/>
      
      {/* <Link to='/movie/299534'>Movie</Link>
      <Link to='/tv/194766'>Show</Link>
      <Link to='/tv/119051'>In Production Show</Link>
      <Link to='/tv/1396'>Ended Show</Link> */}
      
    </>
    
  )
}
