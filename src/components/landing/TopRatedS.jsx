import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import ImdbLogo from "/src/assets/imdb.png";
import TimeLogo from "/src/assets/time-logo.png";
import Next from "/src/assets/next.png";
import Prev from "/src/assets/prev.png";
import styles from './TopRatedM.module.css'; 
import { Link } from 'react-router-dom';
import { BiChevronRight } from "react-icons/bi";

const key = import.meta.env.VITE_APP_API_KEY; 
const url = import.meta.env.VITE_APP_BASE_URL; 

const TopRatedS = () => {
  const [topRated, setTopRated] = useState([]);
  const [genres, setGenres] = useState({});
  const [swiperInstance, setSwiperInstance] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Fetch top-rated TV series
  const fetchTopRated = async () => {
    try {
      const res = await axios.get(`${url}/tv/top_rated?language=en-US&page=1`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${key}`
        }
      });
      setTopRated(res.data.results.slice(0, 8)); // Limit to 8 TV series
    } catch (error) {
      console.error('Error fetching top-rated TV series:', error);
    }
  };

  // Fetch TV genres
  const fetchGenres = async () => {
    try {
      const res = await axios.get(`${url}/genre/tv/list?language=en-US`, {
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
    fetchTopRated();
    fetchGenres();
  }, []);

  useEffect(() => {
      if (swiperInstance) {
        swiperInstance.update();
      }
    }, [topRated]);
  
    useEffect(() => {
        if (prevRef.current && nextRef.current) {
          prevRef.current.addEventListener("click", () => swiperInstance?.slidePrev());
          nextRef.current.addEventListener("click", () => swiperInstance?.slideNext());
        }
      }, [swiperInstance]);
    

  return (
    <div className={styles.topRatedContainer}>
      <div className={styles.header}>
      <h2 className={styles.sectionTitle}>Top Rated TV Series</h2>
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
        navigation={{ prevEl: styles.swiperButtonPrev, nextEl: styles.swiperButtonNext }}
        onSwiper={setSwiperInstance}
        className={styles.topRatedSwiper}
      >
        {topRated.map((series) => (
          <SwiperSlide key={series.id}>
             <Link to={`/tv/${series.id}`} className={styles.linkWrapper}>
            <div className={styles.movieCard}>
              <div className={styles.moviePoster}>
                <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt={series.name} />
              </div>
              <div className={styles.movieOverlay}>
                <p className={styles.movieOverview}>{series.overview.substring(0, 100)}...</p>
                <div className={styles.movieGenres}>
                  {series.genre_ids.map((id) => (
                    <span key={id} className={styles.genreTag}>{genres[id]}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.movieInfo}>
              <div className={styles.rating}>
                <img src={ImdbLogo} alt="IMDb" />
                <span>{series.vote_average}/10</span>
              </div>
              <div className={styles.duration}>
                <img src={TimeLogo} alt="Duration" />
                <span>Varies</span>
              </div>
            </div>
            <h3 className={styles.movieTitle}>{series.name}</h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <Link to='/top-rated-s'><button className={styles.viewAllBtn}>See More <BiChevronRight size={30}/></button></Link>
    </div>
  );
};

export default TopRatedS;
