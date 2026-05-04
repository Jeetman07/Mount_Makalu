import { useEffect, useState } from "react"
import { fetchWeather } from "../services/api"
import WeatherCard from "../components/WeatherCard"

const WeatherPage = () => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    fetchWeather()
      .then((data) => setWeather(Array.isArray(data) ? data : []))
      .catch(console.log)
  }, [])

  return (
    <div className="dashboard-container">
      <h1>🌦 Weather</h1>

      <div className="card-grid">
        {weather.length === 0 ? (
          <p>No weather data available</p>
        ) : (
          weather.map((w) => (
            <WeatherCard key={w.id} weather={w} />
          ))
        )}
      </div>
    </div>
  )
}

export default WeatherPage