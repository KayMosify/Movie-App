import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menu from './pages/Menu'
import Details from './pages/Details'
import { Route, Routes } from 'react-router-dom'
import NowPlayingPage from './pages/NowPlayingPage'
import TopRatedPage from './pages/TopRatedMPage'
import TopRatedSPage from './pages/TopRatedSPage'
import OnAirPage from './pages/OnAirPage'
import MovieDetailsPage from './pages/Details'
import TVDetailsPage from './pages/DetailsPage'

function App() {
  

  return (
    <>
     <Routes>
       <Route path="/" element={<Menu/>}/>
       <Route path="/now-playing" element={<NowPlayingPage/>} />
       <Route path="/top-rated-m" element={<TopRatedPage/>} />
       <Route path="/top-rated-s" element={<TopRatedSPage/>} />
       <Route path="/on-air" element={<OnAirPage/>} />
       <Route path="/on-air" element={<OnAirPage/>} />
       <Route path ="/movie/:id"  element={<Details/>}/>
       <Route path ="/tv/:id"  element={<TVDetailsPage/>}/>
     </Routes>
    </>
  )
}

export default App
