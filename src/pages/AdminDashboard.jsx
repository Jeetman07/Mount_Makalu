import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  fetchProblems,
  fetchTips,
  fetchWeather,
  addTip,
  addWeather,
} from "../services/api"
import WeatherCard from "../components/WeatherCard"
import TipCard from "../components/TipCard"

const AdminDashboard = () => {
  const [problems, setProblems] = useState([])
  const [weatherList, setWeatherList] = useState([])
  const [tips, setTips] = useState([])

  const [tip, setTip] = useState({ title: "", description: "" })
  const [weather, setWeather] = useState({
    location: "",
    temperature: "",
    humidity: "",
    condition: "",
  })

  const [message, setMessage] = useState("")

  const loadData = () => {
    fetchProblems()
      .then((data) => setProblems(Array.isArray(data) ? data : []))
      .catch(console.log)

    fetchWeather()
      .then((data) => setWeatherList(Array.isArray(data) ? data : []))
      .catch(console.log)

    fetchTips()
      .then((data) => setTips(Array.isArray(data) ? data : []))
      .catch(console.log)
  }

  useEffect(() => {
    loadData()
  }, [])

  const pendingProblems = problems.filter(
    (problem) => problem.status === "pending"
  )

  const solvedProblems = problems.filter(
    (problem) => problem.status === "solved"
  )

  const handleTipChange = (e) => {
    const { name, value } = e.target
    setTip((prev) => ({ ...prev, [name]: value }))
  }

  const handleWeatherChange = (e) => {
    const { name, value } = e.target
    setWeather((prev) => ({ ...prev, [name]: value }))
  }

  const submitTip = async (e) => {
    e.preventDefault()
    setMessage("")

    try {
      await addTip(tip)
      setMessage("Tip added successfully")
      setTip({ title: "", description: "" })
      loadData()
    } catch {
      setMessage("Failed to add tip")
    }
  }

  const submitWeather = async (e) => {
    e.preventDefault()
    setMessage("")

    try {
      await addWeather(weather)
      setMessage("Weather added successfully")
      setWeather({
        location: "",
        temperature: "",
        humidity: "",
        condition: "",
      })
      loadData()
    } catch {
      setMessage("Failed to add weather")
    }
  }

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <p>Admins can manage problems, weather information and crop tips.</p>

      {message && <p className="form-status">{message}</p>}

      <div className="stats">
        <div className="stat-card">
          <h3>📌 Total Problems</h3>
          <p>{problems.length}</p>
        </div>

        <div className="stat-card">
          <h3>⏳ Pending</h3>
          <p>{pendingProblems.length}</p>
        </div>

        <div className="stat-card">
          <h3>✅ Solved</h3>
          <p>{solvedProblems.length}</p>
        </div>

        <div className="stat-card">
          <h3>🌦 Weather</h3>
          <p>{weatherList.length}</p>
        </div>

        <div className="stat-card">
          <h3>💡 Tips</h3>
          <p>{tips.length}</p>
        </div>
      </div>

      <section>
        <h2>Add Crop Tip</h2>

        <form onSubmit={submitTip} className="form">
          <input
            type="text"
            name="title"
            placeholder="Tip Title"
            value={tip.title}
            onChange={handleTipChange}
            required
          />

          <textarea
            name="description"
            placeholder="Tip Description"
            value={tip.description}
            onChange={handleTipChange}
            required
          />

          <button type="submit">Add Tip</button>
        </form>
      </section>

      <section>
        <h2>Add Weather</h2>

        <form onSubmit={submitWeather} className="form">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={weather.location}
            onChange={handleWeatherChange}
            required
          />

          <input
            type="text"
            name="temperature"
            placeholder="Temperature (e.g. 25°C)"
            value={weather.temperature}
            onChange={handleWeatherChange}
            required
          />

          <input
            type="text"
            name="humidity"
            placeholder="Humidity (e.g. 60%)"
            value={weather.humidity}
            onChange={handleWeatherChange}
            required
          />

          <input
            type="text"
            name="condition"
            placeholder="Condition (Sunny, Rainy...)"
            value={weather.condition}
            onChange={handleWeatherChange}
            required
          />

          <button type="submit">Add Weather</button>
        </form>
      </section>

      <section>
        <h2>All Crop Problems</h2>

        <div className="card-grid">
          {problems.length === 0 ? (
            <p>No problems available.</p>
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
        <h2>Weather Management</h2>

        <div className="card-grid">
          {weatherList.length === 0 ? (
            <p>No weather data available.</p>
          ) : (
            weatherList.map((item) => (
              <WeatherCard key={item.id} weather={item} />
            ))
          )}
        </div>
      </section>

      <section>
        <h2>Crop Tips Management</h2>

        <div className="card-grid">
          {tips.length === 0 ? (
            <p>No tips available.</p>
          ) : (
            tips.map((item) => <TipCard key={item.id} tip={item} />)
          )}
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard