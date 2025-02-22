import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import ImdbLogo from "/src/assets/imdb.png";
import TimeLogo from "/src/assets/time-logo.png";
import Next from "/src/assets/next.png";
import Prev from "/src/assets/prev.png";
import styles from './OnAir.module.css';
import { Link } from 'react-router-dom';

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const OnAir = () => {
  const [onAirShows, setOnAirShows] = useState([]);
  const [genres, setGenres] = useState({});
  const [swiperInstance, setSwiperInstance] = useState(null);
  
  const prevRef = useRef(null);
  const nextRef = useRef(null);

   const fetchOnAirShows = async () => {
      try {
        const res = await axios.get(`${url}/tv/airing_today?language=en-US&page=1`, {
          headers: { accept: 'application/json', Authorization: `Bearer ${key}` }
        });
        setOnAirShows(res.data.results.slice(9, 16));
      } catch (error) {
        console.error('Error fetching TV series on air:', error);
      }
    };

    const fetchGenres = async () => {
      try {
        const res = await axios.get(`${url}/genre/tv/list?language=en-US`, {
          headers: { accept: 'application/json', Authorization: `Bearer ${key}` }
        });
        const genreMap = {};
        res.data.genres.forEach(genre => { genreMap[genre.id] = genre.name; });
        setGenres(genreMap);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

  useEffect(() => {
    fetchOnAirShows();
    fetchGenres();
  }, []);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.update();
    }
  }, [onAirShows]);

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      prevRef.current.addEventListener("click", () => swiperInstance?.slidePrev());
      nextRef.current.addEventListener("click", () => swiperInstance?.slideNext());
    }
  }, [swiperInstance]);

  return (
    <div className={styles.onAirContainer}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>On Air</h2>
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
        className={styles.onAirSwiper}
      >
        {onAirShows.map((show) => (
              <SwiperSlide key={show.id}>
                 <Link to={`/tv/${show.id}`} className={styles.linkWrapper}>
                <div className={styles.tvShowCard}>
                  <div className={styles.tvShowPoster}>
                    <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
                  </div>
                  <div className={styles.tvShowOverlay}>
                    <p className={styles.tvShowOverview}>
                      {show.overview ? show.overview.substring(0, 100) + "..." : "No description available"}
                    </p>
                    <div className={styles.tvShowGenres}>
                      {show.genre_ids?.map((id) => (
                        <span key={id} className={styles.genreTag}>{genres[id] || "Unknown Genre"}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.tvShowInfo}>
                  <div className={styles.rating}>
                    <img src={ImdbLogo} alt="IMDb" />
                    <span>{show.vote_average ? `${show.vote_average}/10` : "N/A"}</span>
                  </div>
                  <div className={styles.duration}>
                    <img src={TimeLogo} alt="Duration" />
                    <span>45m per episode</span>
                  </div>
                </div>
                <h3 className={styles.tvShowTitle}>{show.name}</h3>
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>
      <Link to="./on-air"><button className={styles.viewAllBtn}>See More</button></Link>
    </div>
  );
};

export default OnAir;
