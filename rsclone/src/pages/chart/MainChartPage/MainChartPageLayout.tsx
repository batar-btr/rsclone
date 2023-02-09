
import BoxOffice from "../boxOffice/boxOffice";
import { Recently } from "../recently/recentley";
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
          <Recently/>
        </div>
      </div>
    </>
  );
};

export default MainChartPage;
