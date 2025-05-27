import searchIcon from "./assets/711319.png";
import rain from "./assets/rain.png";
import humiditiy from "./assets/humi.png";
import wind from "./assets/wind.jpg";
import loading from "./assets/loading.gif";
import notFound from "./assets/notfound.png";

import "./App.css";
import { useEffect, useState } from "react";

const WeatherDetails = ({
  icon,
  temp,
  location,
  country,
  lat,
  log,
  humidity,
  speed,
}) => {
  return (
    <>
      <div className="weather-image">
        <img src={icon} alt="" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{location}</div>
      <div className="country">{country}</div>
      <div className="latlon">
        <div>
          <span className="lat">Latitude</span> <br />
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude</span> <br />
          <span>{log}</span>
        </div>
      </div>
      <div className="humi-wind">
        <div>
          <div className="humi">
            <img src={humiditiy} alt="" />
          </div>
          <span>{humidity}%</span>
          <br />
          <span>Humidity</span>
        </div>

        <div>
          <div className="wind">
            <img src={wind} alt="" />
          </div>
          <span>{speed} km/h</span>
          <br />
          <span>Wind Speed</span>
        </div>
      </div>
    </>
  );
};

function App() {
  const [city, setCity] = useState("Coimbatore");
  const [icon, SetIcon] = useState(rain);
  const [temp, SetTemp] = useState(0);
  const [location, Setlocation] = useState("");
  const [country, Setcountry] = useState("");
  const [lat, Setlat] = useState("0");
  const [log, Setlog] = useState("0");
  const [humidity, SetHumidity] = useState("0");
  const [speed, SetSpeed] = useState("0");

  const [cityNotFound, SetCityNotFound] = useState(false);
  const [Loading, SetLoading] = useState(false);

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      Search();
    }
  };

  const Search = async () => {
    SetLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=98bb0ea4e4b9c2392691e14803f0a6e0&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        SetCityNotFound(true);
        SetLoading(false);
        return;
      } else {
        console.log(data);
      }
      SetTemp(Math.floor(data.main.temp));
      Setlocation(data.name);
      Setcountry(data.sys.country);
      Setlat(data.coord.lat);
      Setlog(data.coord.lon);
      SetHumidity(data.main.humidity);
      SetSpeed(data.wind.speed);
      SetCityNotFound(false);
    } catch (error) {
      SetCityNotFound(true);
    } finally {
      SetLoading(false);
    }
  };

  useEffect(function () {
    Search();
  }, []);

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Search City"
            onChange={handleCity}
            onKeyDown={handleKeyDown}
            value={city}
          />
          <img src={searchIcon} alt="" onClick={() => Search()} />
        </div>
        {Loading && (
          <div className="loading">
            <img src={loading} alt="" />
          </div>
        )}
        {cityNotFound && (
          <div className="cityNotFound">
            <img src={notFound} alt="" />
          </div>
        )}
        {!Loading && !cityNotFound && (
          <WeatherDetails
            icon={icon}
            temp={temp}
            location={location}
            country={country}
            lat={lat}
            log={log}
            humidity={humidity}
            speed={speed}
          />
        )}
      </div>
      <div className="Vijay">
        Designed By
        <a href="https://www.linkedin.com/in/vijay-sudhakar/">Vijay Sudhakar</a>
      </div>
    </>
  );
}

export default App;
