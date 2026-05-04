import { Link, useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  const handleDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (!user) {
      navigate("/login")
      return
    }

    if (user.role === "farmer") {
      navigate("/farmer")
    } else if (user.role === "expert") {
      navigate("/expert")
    } else if (user.role === "admin") {
      navigate("/admin")
    }
  }

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Agriculture Support System</h1>
        <p>
          A simple platform where farmers can upload crop problems, get responses
          from experts or admins, check weather updates, and read crop tips.
        </p>

        <div className="hero-buttons">
          <Link to="/register" className="hero-btn primary-btn">
            Get Started
          </Link>

          <button
            onClick={handleDashboard}
            className="hero-btn secondary-btn"
          >
            View Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home