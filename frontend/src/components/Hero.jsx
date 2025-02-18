import React from "react";
import "./Hero.css";
import left from '../assets/left.jpg'

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-overlay">
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-heading">Empowering Businesses with IT Solutions & Digital Marketing</h1>
            <p className="hero-subtext">We provide cutting-edge solutions to elevate your business.</p>
            <div className="hero-buttons">
              <button className="hero-button primary">Get Started</button>
              <button className="hero-button secondary">Learn More</button>
            </div>
          </div>
          <div className="hero-right">
            <img src={left} alt="Hero" className="hero-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
