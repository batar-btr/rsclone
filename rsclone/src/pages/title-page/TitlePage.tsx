import '../title-page/titlePage.scss';
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import { RateBox } from '../../components/rate-box/rate-box';
import useModal from '../../hooks/useModal';
import { MainInfoSection } from './MainInfoSection';
import { MainSection } from './MainSection';

export const TitlePage = () => {
  
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
