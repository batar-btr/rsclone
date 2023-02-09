
import { HeaderWrapperShareButton } from '../header/headerShareButton';

export const LowestRatedHeader = () => {

  return (
    <>
    <h3>IMDb Charts</h3>
    <div className='header__wrapper'>      
      <h1 className="header__popular">Lowest Rated Movies</h1>
      <div className="header__popular_subtitle">Bottom 100 as voted by IMDb Users</div>      
      <HeaderWrapperShareButton/>
    </div>
    </>    
  );
};
