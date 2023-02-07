import { Link } from "react-router-dom"
import '../home-page/homePage.scss';

export const HometPage = () => {
  return (
    <>
      <Link to='/title/tt4154796' className="test-title">Movie</Link>
      <Link to='/title/tt13443470' className="test-title">Show</Link>
    </>
    
  )
}
