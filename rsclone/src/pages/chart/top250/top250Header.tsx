import { HeaderWrapperShareButton } from "../header/headerShareButton";

export const Top250Header = () => {
  return (
    <>
      <h3>IMDb Charts</h3>
      <div className="header__wrapper">
        <h1 className="header__250">IMDb Top 250 Movies</h1>
        <div className="header__250_subtitle">
          IMDb Top 250 as rated by regular IMDb voters.
        </div>
        <HeaderWrapperShareButton />
      </div>
    </>
  );
};
