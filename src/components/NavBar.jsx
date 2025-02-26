import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import RedIcon from '../assets/red-icon.png'


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="menu-btn">
          <div className="logo-div">
            <img src={RedIcon} alt="" />
            <p>KayMos</p>
          </div>
        </button>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/now-playing">Movies</a></li>
          <li><a href="/on-air">Series</a></li>
          <li><a href="/">About Us</a></li>
        </ul>
      </div>

      <div className="nav-right">
        <div className="search-box">
          <button className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input type="text" placeholder="Search..." />
        </div>
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
        <div className="hamburger-menu">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
