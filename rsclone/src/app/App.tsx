import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/home-page/HomePage';
import MostPopularMovies from '../pages/chart/popularMovies/mostPopularMovies';
import MainChartPage from '../pages/chart/MainChartPage/MainChartPageLayout';
import { Top250 } from '../pages/chart/top250/top250';
import { Top250TVShows } from '../pages/chart/top250TVShows/top250TVShows';
import LowestRated from '../pages/chart/lowestRated/lowestRated';
import { Error404 } from '../pages/error-page/404';
import MostPopularTVShows from '../pages/chart/popularTVShows/mostPopularTVShows';
import { Layout } from '../components/layout/Layout';
import { TitlePage } from '../pages/title-page/TitlePage';
import { SingInPage } from '../pages/sign-in/SignInPage';
import { SingUpPage } from '../pages/sign-up/SignUpPage';
import { FullCreditsPage } from '../pages/full-credits-page/FullCreditsPage';
import { UpcomingMovie } from '../pages/chart/upcoming/upcoming';
import { AuthProvider } from '../context/AuthContext';
import RegistrationPage from '../pages/registration/registration';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/chart" element={<MainChartPage />} />
            <Route path="/chart/boxoffice" element={<MainChartPage />} />
            <Route path='/chart/popularmovies' element={<MostPopularMovies />} />
            <Route path='/chart/top250' element={<Top250 />} />
            <Route path='/chart/popularshows' element={<MostPopularTVShows />} />
            <Route path='/chart/top250shows' element={<Top250TVShows />} />
            <Route path='/chart/lowestRated' element={<LowestRated />} />
            <Route path='/chart/upcoming' element={<UpcomingMovie />} />
            <Route path="/registration" element={<RegistrationPage />}></Route>
            <Route path="/registration/signin" element={<SingInPage />}></Route>
            <Route path="/registration/signup" element={<SingUpPage />}></Route>
            <Route path="/movie/:id" element={<TitlePage />}></Route>
            <Route path="/tv/:id" element={<TitlePage />}></Route>
            <Route path="/movie/:id/fullcredits" element={<FullCreditsPage />}></Route>
            <Route path="/tv/:id/fullcredits" element={<FullCreditsPage />}></Route>
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App;
