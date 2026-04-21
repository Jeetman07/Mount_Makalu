import { mockProblems, mockWeather, mockTips } from '../data/mockData'
import ProblemCard from '../components/ProblemCard'
import WeatherCard from '../components/WeatherCard'
import TipCard from '../components/TipCard'

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <p>Admins can manage problems, weather information, and crop tips.</p>

      <section>
        <h2>All Crop Problems</h2>
        <div className="card-grid">
          {mockProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </section>

      <section>
        <h2>Weather Management</h2>
        <div className="card-grid">
          {mockWeather.map((weather) => (
            <WeatherCard key={weather.id} weather={weather} />
          ))}
        </div>
      </section>

      <section>
        <h2>Crop Tips Management</h2>
        <div className="card-grid">
          {mockTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard