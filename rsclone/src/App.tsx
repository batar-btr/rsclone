import { Route, Routes } from 'react-router-dom'
import { HometPage } from './pages/home-page/HomePage';
import { Header } from './components/header/Header';

function App() {
  return (
    <>
      <Header/>
      <Routes>
       
        <Route path="/" element={ <HometPage/> }></Route>
      </Routes>
    </>
  )
}

export default App;
