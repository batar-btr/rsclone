import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/home-page/HomePage';
import MostPopularMovies from '../pages/chart/popularMovies/mostPopularMovies';
import MainChartPage from '../pages/chart/MainChartPage/MainChartPageLayout';
import {Top250} from '../pages/chart/top250/top250';
import { Top250TVShows } from '../pages/chart/top250TVShows/top250TVShows';
import LowestRated from '../pages/chart/lowestRated/lowestRated';
import { Error404 } from '../pages/error-page/404';
import MostPopularTVShows from '../pages/chart/popularTVShows/mostPopularTVShows';
import { Layout } from '../components/layout/Layout';
import { TitlePage } from '../pages/title-page/TitlePage';
import { SingInPage } from '../pages/sing-in/SingInPage';





function App() {
  return (
    <>      
      <Routes>      
        <Route path="/" element={<Layout/>}>
          <Route index element={ <HomePage/> }/>
          <Route path="/chart" element={<MainChartPage/>} />
          <Route path="/chart/boxoffice" element={<MainChartPage/>} />                  
          <Route path='/chart/popularmovies' element={<MostPopularMovies/>} />
          <Route path='/chart/top250' element={<Top250/>}/>
          <Route path='/chart/popularshows' element={<MostPopularTVShows/>}/>
          <Route path='/chart/top250shows' element={<Top250TVShows/>}/>
          <Route path='/chart/lowestRated' element={<LowestRated/>} /> 
          <Route path="/registration/signin" element={ <SingInPage/> }></Route>
          <Route path="/title/:id" element={ <TitlePage/> }></Route>
        </Route>        
          <Route path="*" element={<Error404/>}/>
      </Routes>
    </>
  )
}

export default App;
