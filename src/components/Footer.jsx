import React from 'react';
import { Facebook, Instagram, Twitter, Send } from 'lucide-react';
import './Footer.css';
import Logo from '../assets/white-movie-logo.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="decorative-shape">
        <div className="shape-content" />
      </div>
      <div className="decorative-shape-2">
        <div className="footer-logo">
          <span className="logo-text"><img src={Logo} alt="" /></span>
          <h1 className="footer-title">Cinema City: Media for Everyone</h1>
        </div>
      </div>
      
      <div className="footer-container">
      <div className="footer-grid">
        <div className="left-side">
            {/* Info Section */}
          <div className="footer-info">
            
            <p className="footer-description">
              The ***** website started its activity in 2017 and has professionally provided
              uncensored movies and TV series downloads. On this website, you can watch and download
              any movie or TV series with subtitles of your choice online. Specialized dubbing and
              subtitles have been provided for all movies and series.
            </p>
            <p className="contact-info">Support Phone: 15*****0912</p>
          </div>
        </div>


        <div className="right-side">
            
          {/* Navigation Section */}
          <nav className="footer-nav">
            {/* Download Section */}
            <div className="nav-section">
              <h2>Download</h2>
              <ul className="nav-list">
                <li><a href="#">Movies</a></li>
                <li><a href="#">TV Series</a></li>
                <li><a href="#">Animation</a></li>
                <li><a href="#">Search</a></li>
                <li><a href="#">Categories</a></li>
              </ul>
            </div>

            {/* Cinema City Section */}
            <div className="nav-section">
              <h2>Cinema City</h2>
              <ul className="nav-list">
                <li><a href="#">Home Page</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Work With Us</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>

            {/* Legal Section */}
            <div className="nav-section">
              <h2>Legal</h2>
              <ul className="nav-list">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Help & Support</a></li>
                <li><a href="#">Partnerships</a></li>
                <li><a href="#">Common Questions</a></li>
              </ul>
            </div>

            <div className="nav-section seperate">
              <h2>Privacy Policy</h2>
              <h2 className='terms'>Terms & <span>Conditions</span></h2>
              <h2>Help & Support</h2>              
            </div>
          </nav>
          </div>
        </div>

        {/* Social Links */}
        <div className="social-links">
          <a href="#"><Facebook size={40} /></a>
          <a href="#"><Instagram size={40} /></a>
          <a href="#"><Twitter size={40} /></a>
          <a href="#"><Send size={40} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;