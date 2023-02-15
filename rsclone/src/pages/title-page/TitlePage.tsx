import '../title-page/titlePage.scss';
import { useState, useEffect } from "react"
import { useTitleInfoService } from '../../hooks/titleInfoService';
import { Link } from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import { RateBox } from '../../components/rate-box/rate-box';
import useModal from '../../hooks/useModal';
import { MainInfoSection } from './MainInfoSection';
import { MainSection } from './MainSection';

export const TitlePage = () => {
  const {isTvShow, title, cast, images, videos, reviews, similar, 
    certification, _imgBase, type} = useTitleInfoService()
  const {isShowing, toggle} = useModal();
  
  window.scrollTo(0, 0)

  return (
    <div className='title-container'>
      {/* { title && cast && images && videos && reviews && similar && 
    certification && */}
        <>
        <MainInfoSection/>
        <MainSection/>
      </>
      {/* } */}
      
      
    </div>
  )
}
