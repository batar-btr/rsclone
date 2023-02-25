import "./boxOffice.scss";
import { BoxOfficeTitles } from "./boxOfficeTitles";

const BoxOffice = () => {
  return (
    <>
      <div className="header__boxOffice">
        <h2 className="header__boxOffice_title">Top Box Office (US)</h2>
        <h4 className="header__boxOffice_subtitle">
        Weekend of February 17 - 19, 2023
        </h4>
      </div>
      <BoxOfficeTitles />

      <div className="boxOffice__reported">
        Reported by
        <a
          className="boxOffice__reported_link "
          href="https://www.boxofficemojo.com"
        >
          Box Office Mojo
        </a>
        © 2023
      </div>

      <a
        className="boxOffice__offsiteLink"        
        href="https://www.boxofficemojo.com/daily/chart/"        
      >
        See more box office results at BoxOfficeMojo.com
      </a>
    </>
  );
};

export default BoxOffice;
