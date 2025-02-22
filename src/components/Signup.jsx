import React from "react";
import "./Signup.css"; // Import external CSS
import CallIcon from '../assets/call-icon.png';
import MessageIcon from '../assets/message-icon.png';
import UserIcon from '../assets/user-icon.png';
import GoogleIcon from '../assets/google-icon.png';

const Signup = () => {
  return (
    <div className="signup-container">
      {/* Left Section (Text) */}
      <div className="signup-text">
        <h2>Join Us</h2>
        <p>
          By signing up, you can download daily content easily and without restrictions. If you have already registered, log in using your credentials.
        </p>
      </div>

      {/* Right Section (Form) */}
      <div className="signup-form">
        <h3>Sign Up</h3>
        <form>
          {/* Name & Phone in one row */}
          <div className="input-row">
            <div className="input-container">
              <img src={UserIcon} alt="User" className="input-icon" />
              <input type="text" placeholder="Enter your full name" required />
            </div>

            <div className="input-container">
              <img src={CallIcon} alt="Phone" className="input-icon" />
              <input type="tel" placeholder="Enter your phone number" required />
            </div>
          </div>

          {/* Full-width Email */}
          <div className="input-container">
            <img src={MessageIcon} alt="Email" className="input-icon" />
            <input type="email" placeholder="Enter your email" required />
          </div>

          <button type="submit">Sign Up</button>
        </form>

        <div className="or-divider">OR</div>

        <button className="google-signin">
          <img src={GoogleIcon} alt="Google" className="google-icon" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
