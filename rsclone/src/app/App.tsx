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
import { SingInPage } from '../pages/sign-in/SignInPage';
import { FullCreditsPage } from '../pages/full-credits-page/FullCreditsPage';
import { ReviewsPage } from '../pages/reviews-page/ReviewsPage';
import { UpcomingMovie } from '../pages/chart/upcoming/upcoming';
import { VideoPage } from '../pages/video-page/VideoPage';
import { NamePage } from '../pages/name-page/NamePage';
import { SingUpPage } from '../pages/sign-up/SignUpPage';
import RegistrationPage from '../pages/registration/registration';
import { AuthProvider } from '../context/AuthContext';
import { PhotoGalleryPage } from '../pages/photo-gallery-page/PhotoGalleryPage';
import { VideoGalleryPage } from '../pages/video-gallery-page/VideoGalleryPage';
import { MediaviewerPage } from '../pages/mediaviewer-page/MediaviewerPage';
import { EpisodesPage } from '../pages/episodes-page/EpisodesPage';
import { UserPage} from '../pages/userpage/userpage';
import { AccountPage } from '../pages/account-page/account-page';
function App() {
  return (
    <> 
      <AuthProvider>   
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
            <Route path='/chart/upcoming' element={<UpcomingMovie/>} /> 
            <Route path="/registration" element={<RegistrationPage />}></Route>
            <Route path="/registration/signin" element={<SingInPage />}></Route>
            <Route path="/registration/signup" element={<SingUpPage />}></Route>
            <Route path="/movie/:id" element={ <TitlePage/>}></Route>
            <Route path="/tv/:id" element={ <TitlePage/> }></Route>
            <Route path="/movie/:id/fullcredits" element={ <FullCreditsPage/> }></Route>
            <Route path="/tv/:id/fullcredits" element={ <FullCreditsPage/> }></Route>
            <Route path="/movie/:id/reviews" element={ <ReviewsPage/> }></Route>
            <Route path="/tv/:id/reviews" element={ <ReviewsPage/> }></Route>
            <Route path="/movie/:id/video/:key" element={ <VideoPage/> }></Route>
            <Route path="/tv/:id/video/:key" element={ <VideoPage/> }></Route>
            <Route path="/movie/:id/video/" element={ <VideoPage/> }></Route>
            <Route path="/tv/:id/video/" element={ <VideoPage/> }></Route>
            <Route path="/name/:id" element={ <NamePage/> }></Route>
            <Route path="/movie/:id/photogallery" element={ <PhotoGalleryPage/> }></Route>
            <Route path="/tv/:id/photogallery" element={ <PhotoGalleryPage/> }></Route>
            <Route path="/movie/:id/videogallery" element={ <VideoGalleryPage/> }></Route>
            <Route path="/tv/:id/videogallery" element={ <VideoGalleryPage/> }></Route>
            <Route path="/movie/:id/mediaviewer/:item" element={ <MediaviewerPage/> }></Route>
            <Route path="/tv/:id/mediaviewer/:item" element={ <MediaviewerPage/> }></Route>
            <Route path="/tv/:id/episodes" element={ <EpisodesPage/> }></Route>
            <Route path="/watchlist" element={ <UserPage pageType='favorite'/> }></Route>
            <Route path="/ratings" element={ <UserPage pageType='rate'/> }></Route>
            <Route path="/account" element={ <AccountPage/> }></Route>
          </Route>        
            <Route path="*" element={<Error404/>}/>
        </Routes>
      </AuthProvider>  
    </>
  )
}

export default App;
