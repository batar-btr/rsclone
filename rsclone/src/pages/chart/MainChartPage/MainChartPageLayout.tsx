
import BoxOffice from "../boxOffice/boxOffice";
import AsideChart from "../aside/aside";

import "./mainpage.scss";

const MainChartPage = () => {
  return (
    <>      
      <div className="wideWrapper">
        <div className="wideContent">
          <div className="article">        
            <BoxOffice />
          </div>
          <div className="sidebar">
              <AsideChart />
          </div>          
        </div>
      </div>
    </>
  );
};

export default MainChartPage;
