import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import './Home.css';
import backgroundImage from './download.jpg'; // Adjust the path according to where the image is located


const Home = () => {
  const navigate = useNavigate();
  const handleExploreClick = () => {
    navigate('/content'); // Navigate to /content on button click
  };


  return (
    <div className="home-container"  style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="overlay">
        <div className="content">
          <h1 className="home-title">TourGenie</h1>
          <p className="home-description">
            Welcome to TourGenie, your personalized travel assistant. Discover amazing places, get real-time weather updates, explore local attractions, and plan your perfect trip with ease. From travel itineraries to cost estimates, TourGenie is here to guide you every step of the way.
          </p>
          <button className="explore-button" onClick={handleExploreClick}>
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
