import React from 'react'
import { MainCarousel } from '../../components/carousel/carousel'
import { MovieCardCarousel } from '../../components/movie-card-carousel/MovieCardCarousel'

export const HometPage = () => {
  return (
    <>
      <MainCarousel/>
      <MovieCardCarousel topTitle='What to watch' type='favorites'/>
    </>
  )
}
