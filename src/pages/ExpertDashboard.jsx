import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchProblems } from "../services/api"

const ExpertDashboard = () => {
  const [problems, setProblems] = useState([])

  useEffect(() => {
    fetchProblems()
      .then((data) => setProblems(Array.isArray(data) ? data : []))
      .catch((error) => console.log(error))
  }, [])

  const pendingProblems = problems.filter(
    (problem) => problem.status === "pending"
  )

  const solvedProblems = problems.filter(
    (problem) => problem.status === "solved"
  )

  return (
    <div className="dashboard-container">
      <h1>Expert Dashboard</h1>
      <p>Experts can review crop problems and send responses.</p>

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
      </div>

      <section>
        <h2>Assigned Crop Problems</h2>

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

                <p className="card-link">View & Respond</p>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default ExpertDashboard