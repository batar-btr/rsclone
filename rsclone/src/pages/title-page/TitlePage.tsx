import '../title-page/titlePage.scss';
import { useState, useEffect } from "react"
import { MainInfoSection } from './MainInfoSection';
import { MainSection } from './MainSection';

export const TitlePage = () => {

  window.scrollTo(0, 0)

  return (
    <div className='title-container'>
        <MainInfoSection/>
        <MainSection/>    
    </div>
  )
}
