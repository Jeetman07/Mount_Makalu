import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Agriculture Support System</h1>
        <p>
          A simple platform where farmers can upload crop problems, get responses
          from experts or admins, check weather updates, and read crop tips.
        </p>

        <div className="hero-buttons">
          <Link to="/register" className="hero-btn primary-btn">Get Started</Link>
          <Link to="/farmer" className="hero-btn secondary-btn">View Dashboard</Link>
        </div>
      </div>
    </div>
  )
}

export default Home