import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "./Problems.css"

const Problems = () => {
  const [problems, setProblems] = useState([])

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/problems")
      .then((res) => setProblems(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="problems-container">
      <h1 className="page-title">🌾 All Crop Problems</h1>

      <div className="problems-grid">
        {problems.map((problem) => (
          <div key={problem.problem_id} className="problem-card">
            
            {problem.image_url && (
              <img
                src={`http://127.0.0.1:5000${problem.image_url}`}
                alt="problem"
                className="problem-image"
              />
            )}

            <div className="card-content">
              <h3>{problem.title || "No title"}</h3>

              <p>{problem.description || "No description available"}</p>

              <span className={`status ${problem.status}`}>
                {problem.status}
              </span>

              <Link
                to={`/problems/${problem.problem_id}`}
                className="view-btn"
              >
                View Details →
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Problems