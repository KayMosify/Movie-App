import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Imdb from "/src/assets/imdb.png";
import TimeLogo from "/src/assets/time-logo.png";
import Next from "/src/assets/next.png";
import Prev from "/src/assets/prev.png";
import styles from './NowPlaying.module.css'; 
import { Link } from 'react-router-dom';
import { BiChevronRight } from "react-icons/bi";

const key = import.meta.env.VITE_APP_API_KEY; 
const url = import.meta.env.VITE_APP_BASE_URL; 

const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [genres, setGenres] = useState({});
  const [swiperInstance, setSwiperInstance] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

    const fetchNowPlaying = async () => {
      try {
        const res = await axios.get(`${url}/movie/now_playing?language=en-US&page=1`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${key}`
          }
        });
        console.log(res.data);
        setNowPlaying(res.data.results.slice(0,8));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

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
    fetchNowPlaying();
    fetchGenres();
  }, []);

   useEffect(() => {
      if (swiperInstance) {
        swiperInstance.update();
      }
    }, [nowPlaying]);

     useEffect(() => {
        if (prevRef.current && nextRef.current) {
          prevRef.current.addEventListener("click", () => swiperInstance?.slidePrev());
          nextRef.current.addEventListener("click", () => swiperInstance?.slideNext());
        }
      }, [swiperInstance])

  return (
    <div className={styles.nowPlayingContainer}>
      <div className={styles.header}>
      <h2 className={styles.sectionTitle}>Recommended Movies</h2>
        <div className={styles.navigationWrapper}>
          <div ref={prevRef} className={`onAirPrev ${styles.swiperButtonPrev}`}>
            <img src={Prev} alt="Prev" />
          </div>
          <div ref={nextRef} className={`onAirNext ${styles.swiperButtonNext}`}>
            <img src={Next} alt="Next" />
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        breakpoints={{
            250: { slidesPerView: 2 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
          }}
        spaceBetween={10}
        loop={true}
        autoplay={{ delay: 5000 }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onSwiper={setSwiperInstance}
        className={styles.nowPlayingSwiper}
      >
        {nowPlaying.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movie/${movie.id}`} className={styles.linkWrapper}>
            <div className={styles.movieCard}>
              <div className={styles.moviePoster}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}
                />
              </div>
              <div className={styles.movieOverlay}>
                <p className={styles.movieOverview}>{movie.overview.substring(0, 100)}...</p>
                <div className={styles.movieGenres}>
                  {movie.genre_ids.map((id) => (
                    <span key={id} className={styles.genreTag}>{genres[id]}</span>
                  ))}
                </div>
              </div>
              
            </div>
            <div className={styles.movieInfo}>
                <div className={styles.rating}>
                  <img src={Imdb} alt="IMDb" />
                  <span>{movie.vote_average}/10</span>
                </div>
                <div className={styles.duration}>
                  <img src={TimeLogo} alt="Duration" />
                  <span>2h 30m</span>
                </div>
              </div>
            <h3 className={styles.movieTitle}>{movie.title}</h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <Link to="/now-playing" >
        <button className={styles.viewAllBtn}>Watch them <BiChevronRight size={30}/></button>
      </Link>
    </div>
  );
};

export default NowPlaying;
