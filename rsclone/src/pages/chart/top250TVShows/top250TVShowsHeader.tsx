import { HeaderWrapperShareButton } from "../header/headerShareButton";

export const Top250Header = () => {
  return (
    <>
      <h3>IMDb Charts</h3>
      <div className="header__wrapper">
        <h1 className="header__250">Top Rated TV Shows</h1>
        <div className="header__250_subtitle">
            Top 250 as rated by IMDb Users.
        </div>
        <HeaderWrapperShareButton />
      </div>
    </>
  );
};
