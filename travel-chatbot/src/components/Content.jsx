import React, { useState } from "react";
import axios from "axios";
import "./Content.css";

const Content = () => {

    const [destination, setDestination] = useState("");
    const [travelInfo, setTravelInfo] = useState(null);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      setResult(null);
  
      try {
        const response = await axios.post("http://localhost:5000/api/travel", {
          destination,
        });
        setTravelInfo(response.data);
        setResult(response.data);
        setLoading(false);
  
      } catch (error) {
        console.error("Error fetching travel info:", error);
        setError("Failed to fetch travel info. Please try again later.");
        setLoading(false);
      }
    };

    
  return (
    <div className="App">
      <h1>Travel Guide</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter the destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </label>
        <button type="submit">Get Info</button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && travelInfo &&(
        <div className="travel-info">
          
          <h2>{destination}</h2>
          <p><strong>Description:</strong> {travelInfo.placeDescription}</p>
<br></br>
          <h3>Images:</h3>
          <div className="image-gallery">
            {travelInfo.images.map((url, index) => (
              <img key={index} src={url} alt={`Image ${index + 1}`} />
            ))}
          </div>
          <br></br><br></br>
          <div className="hotel">
          <h3>Top Hotels:</h3>
          <ul>
            {travelInfo.hotels.map((hotel, index) => (
              <li key={index}>
                <strong>{hotel.name}</strong>
                <p>{hotel.address}</p>
              </li>
            ))}
          </ul>
          </div>

          <br></br><br></br>
          <div className="visit">
          <h3>Places to Visit:</h3>
          <ul>
            {travelInfo.placesToVisit.map((place, index) => (
              <li key={index}>
                <strong>{place.name}</strong>
                <p>{place.description}</p>
                <p>{place.address}</p>
              </li>
            ))}
          </ul>
          </div>

          <br></br><br></br>
          <h3>Current Weather Condition</h3>
          <div className="weather">
          
            
            <p><strong>Temperature:</strong> {result.weather.temperature} °C</p>
            <p><strong>Condition:</strong> {result.weather.description}</p>
            <p><strong>Feels Like:</strong> {result.weather.feels_like} °C</p>
          </div>
        </div>
      )}
      <br></br><br></br>
    </div>
  )
}

export default Content