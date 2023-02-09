import { MovieCardCarousel } from '../../components/movie-card-carousel/MovieCardCarousel'
import { Link } from "react-router-dom"
import '../home-page/homePage.scss';
import { MainCarousel } from "../../components/carousel/carousel"

export const HomePage = () => {
  return (
    <>
      <MainCarousel/>
      <MovieCardCarousel topTitle='What to watch' type='favorites'/>
      <Link to='/title/tt4154796' className="test-title">Movie</Link>
      <Link to='/title/tt13443470' className="test-title">Show</Link>
    </>
  )
}
