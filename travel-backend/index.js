const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

const WEATHER_API_KEY = "750ee688e9714ced9a2204635242709"; 
const FSQ_API_KEY = "fsq3I5GGaviUuiYnWnQXJ7YpGG0qHusqRpVeo8emOlgxiTk=";
const UNSPLASH_ACCESS_KEY = "08Djehj1zAtnbnggTxY6sNSCkcBIBB6c4FCoAaBoLl4";

const fetchDescriptionFromWikipedia = async (destination) => {
  const response = await axios.get(
    `https://en.wikipedia.org/w/api.php`,
    {
      params: {
        action: "parse",
        format: "json",
        page: destination,
        prop: "text",
        section: 0, },
    }
  );

  const page = response.data.parse;
  if (page) {
    const htmlText = page.text["*"];
    const cleanText = htmlText.replace(/<[^>]+>/g, ''); 
    return cleanText.split('.').slice(0, 1).join('.') + '.'; 
  }
  
  return "No description available.";
};

const fetchWeather = async (destination) => {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/current.json`,
    {
      params: {
        key: WEATHER_API_KEY,
        q: destination,
      },
    }
  );

  if (response.data) {
    const weatherData = response.data.current;
    return {
      temperature: weatherData.temp_c,
      description: weatherData.condition.text,
      feels_like: weatherData.feelslike_c,
      humidity: weatherData.humidity,
    };
  }

  return { temperature: "N/A", description: "No weather data available" };
};


app.post("/api/travel", async (req, res) => {
  const { destination } = req.body;

  try {
    const placeDescription = await fetchDescriptionFromWikipedia(destination);


    const imagesResponse = await axios.get(
      `https://api.unsplash.com/search/photos`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
        params: {
          query: `{destination} hotel`,
          per_page: 5,
        },
      }
    );

    const images = imagesResponse.data.results.map((image) => image.urls.small);
    const weather = await fetchWeather(destination);

    const hotelsResponse = await axios.get(
      `https://api.foursquare.com/v3/places/search`,
      {
        headers: {
          Authorization: FSQ_API_KEY,
        },
        params: {
          near: destination,
          query: "hotel",
          limit: 5, 
        },
      }
    );

    const hotels = hotelsResponse.data.results.map((hotel) => ({
      name: hotel.name,
      address: hotel.location.formatted_address || "Address not available.",
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hotel.name + " " + hotel.location.formatted_address
      )}`,
    }));

    const venuesResponse = await axios.get(
      `https://api.foursquare.com/v3/places/search`,
      {
        headers: {
          Authorization: FSQ_API_KEY,
        },
        params: {
          near: destination,
          limit: 5,
          query: "tourist attraction", 
        },
      }
    );

    

    const placesToVisit = venuesResponse.data.results.map((place) => ({
      name: place.name,
      address: place.location.formatted_address || "Address not available.",
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place.name + " " + place.location.formatted_address
      )}`,
    }));

    res.json({
      placeDescription,
      images,
      hotels,
      placesToVisit,
      weather,
    });
  } catch (error) {
    console.error("Error fetching travel data:", error);
    res.status(500).send("Error fetching travel data");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
