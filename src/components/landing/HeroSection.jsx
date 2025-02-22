import React, { useEffect, useState, useRef} from 'react'
import axios from 'axios'
import './HeroSection.css'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Navbar from '../NavBar';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';
import Imdb from "/src/assets/imdb.png"
import TimeLogo from "/src/assets/time-logo.png"
import { Link } from 'react-router-dom';

const key = import.meta.env.VITE_APP_API_KEY; 
const url = import.meta.env.VITE_APP_BASE_URL; 

const HeroSection = () => {
  const [trending, setTrending] = useState([]);
  const [genres, setGenres] = useState({});
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // FETCHING FOR TRENDING
  const fetchTrending = async () => {
    try {
      const res = await axios.get(`${url}/trending/movie/day?language=en-US`,{
         headers: {
          accept: 'application/json',
          Authorization: `Bearer ${key}`
        }
      });
      console.log(res.data);
      setTrending(res.data.results.slice(0,5))
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  };

  const fetchGenres = async () => {
    try{
      const res = await axios.get(`${url}/genre/movie/list?language=en-US`, {
        headers: {
           accept: 'application/json',
          Authorization: `Bearer ${key}`
        }
      });
       const genreMap = {};
       res.data.genres.forEach(genre => {
        genreMap[genre.id] = genre.name;
      });
      setGenres(genreMap)
    } catch (error) {
 console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
  if (prevRef.current && nextRef.current) {
    const swiper = document.querySelector(".hero-swiper").swiper;
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
  }
}, [trending]); // Runs after movies are fetched


    useEffect(() => {
      fetchTrending();
      fetchGenres()
    }, [])


  return (
    <div className='hero-section'>
      <Swiper
      modules= {[Navigation, Pagination, Autoplay, EffectFade]}
      slidesPerView={1}
      loop={true}
      autoplay={{delay: 5000}}
      pagination={{clickable: true}}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      effect="fade"
      className="hero-swiper"
      >
      {trending.map((movie) => (
        <SwiperSlide key={movie.id}>
           
          <div className='background-image' style={{
      backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 60%),url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }} loading="lazy">
        <Navbar/>
      <div className="overlay">
        <div className="description-container">
          <h1 className='movie-title'>{movie.title}</h1>
          <p className='movie-overview'>{movie.overview.substring(0, 350)}...</p>
          <div className="movie-genres">
             {movie.genre_ids.map(id =>(
              <span key={id} className='genre-button'>{genres[id]}</span>
             ))}
          </div>
          <div className='movie-rating'>
            <div className="rating-div">
              <img src={Imdb} alt="" />
            <p style={{color:"yellow"}}>
              {movie.vote_average}
              <span style={{color:"white"}}>/10</span>
            </p>
            </div>
            <div className="timing-div">
              <img src={TimeLogo} alt="" />
              <p>3:10 Hours</p>
            </div>
          </div>
          <button className="watch-button">View and download</button>
        </div>
      </div>
    </div>
    
        </SwiperSlide>
      ))}
      </Swiper>

      {/* Navigation Arrows */}
      <button ref={prevRef} className="swiper-button-prev"></button>
      <button ref={nextRef} className="swiper-button-next"></button>
    </div>
  )
}

export default HeroSection