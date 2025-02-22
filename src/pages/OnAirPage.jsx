import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './OnAirPage.module.css';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import { Link } from 'react-router-dom';

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const OnAirPage = () => {
  const [onAirShows, setOnAirShows] = useState([]);
  const [genres, setGenres] = useState({});

  useEffect(() => {
    const fetchOnAirShows = async () => {
      try {
        const res = await axios.get(`${url}/tv/on_the_air?language=en-US&page=1`, {
          headers: { accept: 'application/json', Authorization: `Bearer ${key}` }
        });
        setOnAirShows(res.data.results);
      } catch (error) {
        console.error('Error fetching on-air TV shows:', error);
      }
    };

    const fetchGenres = async () => {
      try {
        const res = await axios.get(`${url}/genre/tv/list?language=en-US`, {
          headers: { accept: 'application/json', Authorization: `Bearer ${key}` }
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

    fetchOnAirShows();
    fetchGenres();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.onAirPage}>
        <h2 className={styles.pageTitle}>Currently On Air</h2>
        <div className={styles.showsGrid}>
          {onAirShows.length > 0 ? (
            onAirShows.map((show) =>
              show.poster_path ? (
                 <Link to={`/tv/${show.id}`} className={styles.linkWrapper}>
                <div key={show.id} className={styles.showCard}>
                  {/* Poster */}
                  <div className={styles.showPoster}>
                    <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
                  </div>

                  {/* Overlay */}
                  <div className={styles.showOverlay}>
                    <p className={styles.showOverview}>
                      {show.overview ? show.overview.substring(0, 100) + "..." : "No description available"}
                    </p>
                    <div className={styles.showGenres}>
                      {show.genre_ids?.map((id) => (
                        <span key={id} className={styles.genreTag}>{genres[id] || "Unknown Genre"}</span>
                      ))}
                    </div>
                  </div>

                  {/* Info (Rating & Duration) */}
                  <div className={styles.showInfo}>
                    <div className={styles.rating}>
                      <img src="/src/assets/imdb.png" alt="IMDb" />
                      <span>{show.vote_average ? `${show.vote_average.toFixed(1)}/10` : "N/A"}</span>
                    </div>
                    <div className={styles.duration}>
                      <img src="/src/assets/time-logo.png" alt="Duration" />
                      <span>45m per episode</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={styles.showTitle}>{show.name}</h3>
                </div>
                </Link>
              ) : null
            )
          ) : (
            <p className={styles.noShows}>Loading or No Shows Available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OnAirPage;
