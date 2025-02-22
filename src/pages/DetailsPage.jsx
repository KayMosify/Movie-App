import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Details.module.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Playlist from '../assets/playlist.png';
import Like from '../assets/like.png';
import Dislike from '../assets/dislike.png';
import StarRating from "../components/StarRating";
import { Link } from 'react-router-dom'; 

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;
const imgBase = "https://image.tmdb.org/t/p/w1280";

const TVDetailsPage = () => {
  const { id } = useParams(); // Get TV show ID from URL
  const [show, setShow] = useState(null);
  const [credits, setCredits] = useState([]);
  const [similarShows, setSimilarShows] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        const res = await axios.get(`${url}/tv/${id}?append_to_response=videos,images,credits,similar`, {
          headers: { accept: 'application/json', Authorization: `Bearer ${key}` }
        });
        setShow(res.data);
        setCredits(res.data.credits.cast.slice(0, 5)); // Limit to 5 main actors
        setSimilarShows(res.data.similar.results.slice(0, 5)); // Limit to 5 similar shows
        setGallery(res.data.images.backdrops.slice(0, 6)); // Limit to 6 images
      } catch (error) {
        console.error('Error fetching TV show details:', error);
      }
    };

    fetchTVShowDetails();
  }, [id]);

  if (!show) return <p className={styles.loading}>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className={styles.detailsPage}>
        <div className={styles.header} style={{ backgroundImage: `url(${imgBase}${show.backdrop_path})` }}>
          <div className={styles.overlay}>
            <div className={styles.movieDescription}>
            <h1>{show.name}</h1>
            <p>{show.first_air_date.split('-')[0]} • {show.episode_run_time?.[0] || "N/A"} min per episode • {show.production_countries[0]?.iso_3166_1}</p>
             <StarRating rating={show.vote_average} size={32} />
            <div className={styles.playlistCont}>
               <img src={Playlist} alt="" />
               <img src={Like} alt="" />
               <img src={Dislike} alt="" />
            </div>
            </div>
            <div className={styles.buttons}>
              <button className={styles.watchBtn}>▶ Watch Now</button>
              <button className={styles.previewBtn}>Preview</button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className={styles.gallery}>
          {gallery.map((img, index) => (
            <img key={index} src={`${imgBase}${img.file_path}`} alt="TV show scene" />
          ))}
        </div>

        {/* TV Show Overview */}
        <div className={styles.movieInfo}>
          <h2>About {show.name}</h2>
          <p>{show.overview}</p>
        </div>

        {/* Genres */}
        <div className={styles.section}>
          <h3>Genres</h3>
          <div className={styles.tags}>
            {show.genres.map((genre) => (
              <span key={genre.id} className={styles.genreTag}>{genre.name}</span>
            ))}
          </div>
        </div>

        {/* Characters */}
        <div className={styles.section}>
          <h3>Characters</h3>
          <div className={styles.characterGrid}>
            {credits.map((actor) => (
              <div key={actor.id} className={styles.actorCard}>
                <img src={actor.profile_path ? `${imgBase}${actor.profile_path}` : '/src/assets/default-avatar.png'} alt={actor.name} />
                <p>{actor.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Creator (Instead of Director) */}
        <div className={styles.section}>
          <h3>Created By</h3>
          <div className={styles.director}>
            {show.created_by?.[0]?.name || "Unknown"}
          </div>
        </div>

        {/* Seasons */}
        <div className={styles.section}>
          <h3>Seasons</h3>
          <div className={styles.similarMovies}>
            {show.seasons.map((season) => (
              <div key={season.id} className={styles.similarCard}>
                <img src={season.poster_path ? `${imgBase}${season.poster_path}` : '/src/assets/no-image.png'} alt={season.name} />
                <p>{season.name} ({season.air_date?.split('-')[0]})</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar TV Shows */}
        <div className={styles.section}>
          <h3>Suggestions like "{show.name}"</h3>
          <div className={styles.similarMovies}>
            {similarShows.map((sim) => (
              <div key={sim.id} className={styles.similarCard}>
                <img src={sim.poster_path ? `${imgBase}${sim.poster_path}` : '/src/assets/no-image.png'} alt={sim.name} />
                <p>{sim.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TVDetailsPage;
