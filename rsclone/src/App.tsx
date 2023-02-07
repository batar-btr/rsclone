import { Route, Routes } from 'react-router-dom'
import { HometPage } from './pages/home-page/HomePage';
import { Header } from './components/header/Header';
import { TitlePage } from './pages/title-page/TitlePage';
import { SingInPage } from './pages/sing-in/SingInPage';


function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={ <HometPage/> }></Route>
        <Route path="/registration/signin" element={ <SingInPage/> }></Route>
        <Route path="title/:id" element={ <TitlePage/> } />
      </Routes>
    </>
  )
}

export default App;
