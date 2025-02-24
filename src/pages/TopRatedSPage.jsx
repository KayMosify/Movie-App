import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TopRatedSPage.module.css';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import { Link } from 'react-router-dom';
import Imdb from "/src/assets/imdb.png"
import TimeLogo from "/src/assets/time-logo.png"

const key = import.meta.env.VITE_APP_API_KEY; 
const url = import.meta.env.VITE_APP_BASE_URL; 

const TopRatedSPage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const res = await axios.get(`${url}/tv/top_rated?language=en-US&page=1`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${key}`
          }
        });
        setMovies(res.data.results);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      }
    };

    const fetchGenres = async () => {
      try {
        const res = await axios.get(`${url}/genre/tv/list?language=en-US`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${key}`
          }
        });
        const genreMap = {};
        res.data.genres.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });
        setGenres(genreMap);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchTopRated();
    fetchGenres();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.topRatedPage}>
        <h2 className={styles.pageTitle}>Top Rated Movies</h2>
        <div className={styles.moviesGrid}>
          {movies.map((series) => (
            <Link to={`/tv/${series.id}`} className={styles.linkWrapper}>
            <div key={series.id} className={styles.movieCard}>
              {/* Poster */}
              <div className={styles.moviePoster}>
                <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt={series.title} />
              </div>

              {/* Overlay */}
              <div className={styles.movieOverlay}>
                <p className={styles.movieOverview}>{series.overview.substring(0, 100)}...</p>
                <div className={styles.movieGenres}>
                  {series.genre_ids.map((id) => (
                    <span key={id} className={styles.genreTag}>{genres[id]}</span>
                  ))}
                </div>
              </div>

              {/* Movie Info (Rating & Duration) */}
              <div className={styles.movieInfo}>
                <div className={styles.rating}>
                  <img src={Imdb} alt="IMDb" />
                  <span>{series.vote_average.toFixed(1)}/10</span>
                </div>
                <div className={styles.duration}>
                  <img src={TimeLogo} alt="Duration" />
                  <span>2h 30m</span> {/* Static Time (Replace with API Data if available) */}
                </div>
              </div>

              {/* Title */}
              <h3 className={styles.movieTitle}>{series.name}</h3>
            </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TopRatedSPage;
