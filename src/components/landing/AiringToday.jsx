import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import ImdbLogo from "/src/assets/imdb.png";
import TimeLogo from "/src/assets/time-logo.png";
import Next from "/src/assets/next.png";
import Prev from "/src/assets/prev.png";
import styles from './AiringToday.module.css';
import { Link } from 'react-router-dom';
import { BiChevronRight } from "react-icons/bi";

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const AiringToday = () => {
  const [airingToday, setAiringToday] = useState([]);
  const [genres, setGenres] = useState({});

  useEffect(() => {
    const fetchAiringToday = async () => {
      try {
        const res = await axios.get(`${url}/tv/airing_today?language=en-US&page=1`, {
          headers: { accept: 'application/json', Authorization: `Bearer ${key}` }
        });
        setAiringToday(res.data.results.slice(0, 8)); 
      } catch (error) {
        console.error('Error fetching TV series airing today:', error);
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

    fetchAiringToday();
    fetchGenres();
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      const prevButton = document.querySelector(".airingTodayPrev");
      const nextButton = document.querySelector(".airingTodayNext");

      if (prevButton && nextButton) {
        prevButton.addEventListener("click", () => {
          document.querySelector(".swiper-button-prev")?.click();
        });
        nextButton.addEventListener("click", () => {
          document.querySelector(".swiper-button-next")?.click();
        });
      }
    }, 500);

    return () => clearTimeout(interval);
  }, []);

  return (
    <div className={styles.airingTodayContainer}>
       <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Airing Today</h2>
        {/* Navigation Buttons */}
        <div className={styles.navigationWrapper}>
          <div className={`airingTodayPrev ${styles.swiperButtonPrev}`}>
            <img src={Prev} alt="" />
          </div>
          <div className={`airingTodayNext ${styles.swiperButtonNext}`}>
            <img src={Next} alt="" />
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
        navigation={{
          nextEl: ".airingTodayNext",
          prevEl: ".airingTodayPrev",
        }}
        className={styles.airingTodaySwiper}
      >
        {airingToday.length > 0 ? (
          airingToday.map((show) =>
            show.poster_path ? (
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
            ) : null
          )
        ) : (
          <p style={{ color: "white" }}>Loading or No Shows Available</p>
        )}
      </Swiper>
      <Link to="./on-air"><button className={styles.viewAllBtn}>View All <BiChevronRight size={30}/></button></Link>
    </div>
  );
};

export default AiringToday;
