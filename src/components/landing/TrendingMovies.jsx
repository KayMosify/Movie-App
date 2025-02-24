import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from './TrendingMovies.module.css'; // Import the CSS module
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Imdb from "/src/assets/imdb.png";
import TimeLogo from "/src/assets/time-logo.png";
import { Link } from 'react-router-dom';

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const TrendingMovies = () => {
  const [trending, setTrending] = useState([]);
  const [genres, setGenres] = useState({});
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Fetch trending movies
  const fetchTrending = async () => {
    try {
      const res = await axios.get(`${url}/trending/movie/day?language=en-US`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${key}`
        }
      });
      setTrending(res.data.results.slice(6, 10));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Fetch movie genres
  const fetchGenres = async () => {
    try {
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
      setGenres(genreMap);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchTrending();
    fetchGenres();
  }, []);

  return (
    <div className={styles.trendingMovies}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true, el: `.${styles.swiperPagination}`}}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        effect="fade"
        className={styles.trendingSwiper}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {trending.map((movie) => (
          <SwiperSlide key={movie.id}>
             
            <div
              className={styles.backgroundImage}
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 60%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
              }}
            >
              <div className={styles.overlay}>
                <div className={styles.descriptionContainer}>
                  <h1 className={styles.movieTitle}>{movie.title}</h1>
                  <p className={styles.movieOverview}>{window.innerWidth < 480 ? movie.overview.substring(0, 100) + "..." 
                : movie.overview.substring(0, 300) + "..."}</p>
                  <div className={styles.movieGenres}>
                    {movie.genre_ids.map(id => (
                      <span key={id} className={styles.genreButton}>{genres[id]}</span>
                    ))}
                  </div>
                  <div className={styles.movieRating}>
                    <div className={styles.ratingDiv}>
                      <img src={Imdb} alt="IMDB Logo" />
                      <p style={{ color: "yellow" }}>
                        {movie.vote_average}
                        <span style={{ color: "white" }}>/10</span>
                      </p>
                    </div>
                    <div className={styles.timingDiv}>
                      <img src={TimeLogo} alt="Time Logo" />
                      <p>3:10 Hours</p>
                    </div>
                  </div>
                  <button className={styles.watchButton}>View and Download</button>
                </div>
              </div>
            </div>
            
          </SwiperSlide>
        ))}
       
      </Swiper>
      {/* Pagination */}
      <div className={styles.swiperPaginatio}></div>
         
      {/* Navigation Arrows */}
      {/* <button ref={prevRef} className={styles.swiperButtonPre}></button>
      <button ref={nextRef} className={styles.swiperButtonNex}></button> */}
    </div>
  );
};

export default TrendingMovies;
