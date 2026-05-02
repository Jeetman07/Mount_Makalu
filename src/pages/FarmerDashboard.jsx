import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchProblems, fetchWeather, fetchTips } from "../services/api"
import WeatherCard from "../components/WeatherCard"
import TipCard from "../components/TipCard"

const FarmerDashboard = () => {
  const [problems, setProblems] = useState([])
  const [weather, setWeather] = useState([])
  const [tips, setTips] = useState([])

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetchProblems()
      .then((data) => {
        const allProblems = Array.isArray(data) ? data : []
        const myProblems = allProblems.filter(
          (problem) => problem.farmer_id === user?.id
        )
        setProblems(myProblems)
      })
      .catch(console.log)

    fetchWeather("Espoo")
      .then((data) => setWeather(Array.isArray(data) ? data : []))
      .catch(console.log)

    fetchTips()
      .then((data) => setTips(Array.isArray(data) ? data : []))
      .catch(console.log)
  }, [user?.id])

  return (
    <div className="dashboard-container">
      <h1>🌾 Farmer Dashboard</h1>

      <div className="stats">
        <div className="stat-card">
          <h3>📌 My Problems</h3>
          <p>{problems.length}</p>
        </div>

        <div className="stat-card">
          <h3>🌦 Weather</h3>
          <p>{weather.length}</p>
        </div>

        <div className="stat-card">
          <h3>💡 Tips</h3>
          <p>{tips.length}</p>
        </div>
      </div>

      <section>
        <h2>My Crop Problems</h2>

        <div className="card-grid">
          {problems.length === 0 ? (
            <p>No problems submitted yet.</p>
          ) : (
            problems.map((problem) => (
              <Link
                key={problem.problem_id}
                to={`/problems/${problem.problem_id}`}
                className="card clickable-card"
              >
                <div className="card-top">
                  <h3>{problem.title}</h3>
                  <span className={`status ${problem.status}`}>
                    {problem.status}
                  </span>
                </div>

                <p>{problem.description}</p>

                <p className="card-link">View Details</p>
              </Link>
            ))
          )}
        </div>
      </section>

      <section>
        <h2>Weather Updates</h2>

        <div className="card-grid">
          {weather.length === 0 ? (
            <p>No weather data available.</p>
          ) : (
            weather.map((item) => (
              <WeatherCard key={item.id} weather={item} />
            ))
          )}
        </div>
      </section>

      <section>
        <h2>Crop Tips</h2>

        <div className="card-grid">
          {tips.length === 0 ? (
            <p>No tips available.</p>
          ) : (
            tips.map((tip) => (
              <TipCard key={tip.id} tip={tip} />
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default FarmerDashboard