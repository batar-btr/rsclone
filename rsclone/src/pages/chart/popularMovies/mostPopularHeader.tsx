

import { HeaderWrapperShareButton } from '../header/headerShareButton';

export const MostPopularHeader = () => {

  return (
    <>
    <h3>IMDb Charts</h3>
    <div className='header__wrapper'>      
      <h1 className="header__popular">Most Popular Movies</h1>
      <div className="header__popular_subtitle">As determined by IMDb Users</div>      
      <HeaderWrapperShareButton/>
    </div>
    </>    
  );
};
