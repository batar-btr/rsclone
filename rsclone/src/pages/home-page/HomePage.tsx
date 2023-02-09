import { Link } from "react-router-dom"
import '../home-page/homePage.scss';
import { MainCarousel } from "../../components/carousel/carousel";

export const HomePage = () => {
  return (
    <>
      <MainCarousel/>
      <Link to='/movie/299534'>Movie</Link>
      <Link to='/tv/119051'>Show</Link>
      
    </>
    
  )
}
