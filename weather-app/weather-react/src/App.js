import React, { useState } from 'react';

const api = {
  key: "b2cb02c9bd6ebe5afedc3b6f2627e176",
  base: "https://api.openweathermap.org/data/2.5/",
  geoBase: "http://api.openweathermap.org/data/2.5/find"  // Geocoding API for suggestions
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const searchWeather = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => {
          if (!res.ok) throw new Error("City not found");
          return res.json();
        })
        .then((result) => {
          setWeather(result);
          setQuery(''); // Clear the input field
          setError(null); // Clear previous errors
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  const fetchLocationSuggestions = (evt) => {
    if (evt.target.value.length >= 3) {
      fetch(`${api.geoBase}?q=${evt.target.value}&appid=${api.key}&cnt=5`)
        .then((res) => res.json())
        .then((data) => {
          setLocationSuggestions(data.list || []);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLocationSuggestions([]); // Clear suggestions if input is short
    }
  };

  const dateBuilder = (d) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
  };

  const handleSuggestionClick = (city) => {
    setQuery(city.name); // Set the clicked suggestion to the search input
    setLocationSuggestions([]); // Clear suggestions after selection
    searchWeather({ key: "Enter" }); // Trigger the search
  };

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              fetchLocationSuggestions(e);
            }}
            onKeyPress={searchWeather}
          />
        </div>

        {locationSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {locationSuggestions.map((city, index) => (
              <li key={index} onClick={() => handleSuggestionClick(city)}>
                {city.name}, {city.sys.country}
              </li>
            ))}
          </ul>
        )}

        {error && <div className="error">{error}</div>}

        {weather.main && (
          <>
            <div className="location-box">
              <div className="location">{`${weather.name}, ${weather.sys.country}`}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{`${Math.round(weather.main.temp)}°C`}</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
