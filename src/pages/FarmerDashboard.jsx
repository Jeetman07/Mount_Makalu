import { mockProblems, mockWeather, mockTips } from '../data/mockData'
import ProblemCard from '../components/ProblemCard'
import WeatherCard from '../components/WeatherCard'
import TipCard from '../components/TipCard'

const FarmerDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>🌾 Farmer Dashboard</h1>

      <div className="stats">
        <div className="stat-card">
          <h3>📌 Problems</h3>
          <p>{mockProblems.length}</p>
        </div>
        <div className="stat-card">
          <h3>🌦 Weather</h3>
          <p>{mockWeather.length}</p>
        </div>
        <div className="stat-card">
          <h3>💡 Tips</h3>
          <p>{mockTips.length}</p>
        </div>
      </div>

      <section>
        <h2>My Crop Problems</h2>
        <div className="card-grid">
          {mockProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </section>

      <section>
        <h2>Weather Updates</h2>
        <div className="card-grid">
          {mockWeather.map((weather) => (
            <WeatherCard key={weather.id} weather={weather} />
          ))}
        </div>
      </section>

      <section>
        <h2>Crop Tips</h2>
        <div className="card-grid">
          {mockTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default FarmerDashboard