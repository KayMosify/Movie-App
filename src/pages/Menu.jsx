import React from 'react'
import HeroSection from '../components/landing/HeroSection'
import NowPlaying from '../components/landing/NowPlaying'
import TopRatedM from '../components/landing/TopRatedM'
import TrendingMovies from '../components/landing/TrendingMovies'
import TopRatedS from '../components/landing/TopRatedS'
import AiringToday from '../components/landing/AiringToday'
import OnAir from '../components/landing/OnAir'
import Footer from '../components/Footer'
import Signup from '../components/Signup'


const Menu = () => {
  return (
    <>
      <HeroSection/>
      <NowPlaying/>
      <TopRatedM/>
      <TrendingMovies/>
      <TopRatedS/>
      <AiringToday/>
      <OnAir/>
      <Signup/>
      <Footer/>
    </>
  )
}

export default Menu