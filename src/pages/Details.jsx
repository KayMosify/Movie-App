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

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;
const imgBase = "https://image.tmdb.org/t/p/w1280";

const MovieDetailsPage = () => {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [gallery, setGallery] = useState([]);

  

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(`${url}/movie/${id}?append_to_response=videos,images,credits,similar`, {
          headers: { accept: 'application/json', Authorization: `Bearer ${key}` }
        });
        setMovie(res.data);
        setCredits(res.data.credits.cast.slice(0, 5)); // Limit to 5 main characters
        setSimilarMovies(res.data.similar.results.slice(0, 5)); // Limit to 5 suggestions
        setGallery(res.data.images.backdrops.slice(0, 6)); // Limit to 6 images
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p className={styles.loading}>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className={styles.detailsPage}>
        <div className={styles.header} style={{ backgroundImage: `url(${imgBase}${movie.backdrop_path})` }}>
          <div className={styles.overlay}>
            <div className={styles.movieDescription}>
              <h1>{movie.title}</h1>
            <p>{movie.runtime} min • {movie.release_date.split('-')[0]} • {movie.production_countries[0]?.iso_3166_1}</p>
            <StarRating rating={movie.vote_average} size={32} />
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
            <img key={index} src={`${imgBase}${img.file_path}`} alt="Movie scene" />
          ))}
        </div>

        {/* Movie Overview */}
        <div className={styles.movieInfo}>
          <h2>About {movie.title}</h2>
          <p>{movie.overview}</p>
        </div>

        {/* Genres */}
        <div className={styles.section}>
          <h3>Genres</h3>
          <div className={styles.tags}>
            {movie.genres.map((genre) => (
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

        {/* Director */}
        <div className={styles.section}>
          <h3>Director</h3>
          <div className={styles.director}>
            {movie.credits.crew.find((member) => member.job === "Director")?.name || "Unknown"}
          </div>
        </div>

        {/* Similar Movies */}
        <div className={styles.section}>
          <h3>Suggestions like "{movie.title}"</h3>
          <div className={styles.similarMovies}>
            {similarMovies.map((sim) => (
              <div key={sim.id} className={styles.similarCard}>
                <img src={sim.poster_path ? `${imgBase}${sim.poster_path}` : '/src/assets/no-image.png'} alt={sim.title} />
                <p>{sim.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieDetailsPage;
