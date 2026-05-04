const WeatherCard = ({ weather }) => {
  return (
    <div className="card">
      <div className="card-top">
        <h3>{weather.location}</h3>
        <span className="weather-badge">{weather.condition}</span>
      </div>
      <p><strong>Temperature:</strong> {weather.temperature}</p>
      <p><strong>Humidity:</strong> {weather.humidity}</p>
      <p><strong>Condition:</strong> {weather.condition}</p>
    </div>
  )
}

export default WeatherCard