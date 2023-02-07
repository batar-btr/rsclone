import { NavLink } from "react-router-dom";

import "./aside.scss";

const AsideChart = () => {
  return (
    <div className="chartLinks">
      <h3 className="chartLinks__title">IMDb Charts</h3>

      <ul className="chartLinks__list">
        <li className="chartLinks__list_item">
          <NavLink to="/chart/boxOffice">Box Office</NavLink>
        </li>
        <li className="chartLinks__list_item">
          <NavLink to="/chart/mostPopularMovies">Most Popular Movies</NavLink>
        </li>
        <li className="chartLinks__list_item">
          <NavLink to="/chart/top250">Top 250 Movies</NavLink>
        </li>
        <li className="chartLinks__list_item">
          <NavLink to="/chart/mostPopularTVShows">Most Popular TV Shows</NavLink>
        </li>
        <li className="chartLinks__list_item">
          <NavLink to="/chart/top250TVShows">Top 250 TV Shows</NavLink>
        </li>
        <li className="chartLinks__list_item">
          <NavLink to="/chart/lowestRated">Lowest Rated Movies</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AsideChart;
