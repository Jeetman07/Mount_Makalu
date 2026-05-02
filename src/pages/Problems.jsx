import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "./Problems.css"

const Problems = () => {
  const [problems, setProblems] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/problems")
      .then((res) => setProblems(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  const filteredProblems = problems.filter((problem) => {
    const title = problem.title?.toLowerCase() || ""
    const description = problem.description?.toLowerCase() || ""
    const status = problem.status?.toLowerCase() || ""

    const matchesSearch =
      title.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="problems-container">
      <div className="problems-header">
        <h1 className="page-title">🌾 All Crop Problems</h1>

        <div className="problem-tools">
          <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="solved">Solved</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="empty-text">Loading problems...</p>
      ) : filteredProblems.length === 0 ? (
        <p className="empty-text">No problems found.</p>
      ) : (
        <div className="problems-grid">
          {filteredProblems.map((problem) => (
            <Link
              key={problem.problem_id}
              to={`/problems/${problem.problem_id}`}
              className="problem-card"
            >
              {problem.image_url ? (
                <img
                  src={`http://127.0.0.1:5000${problem.image_url}`}
                  alt={problem.title}
                  className="problem-image"
                />
              ) : (
                <div className="problem-image-placeholder">No Image</div>
              )}

              <div className="card-content">
                <h3>{problem.title || "No title"}</h3>

                <p>{problem.description || "No description available"}</p>

                <div className="card-bottom">
                  <p className="problem-date">
                    {problem.created_at
                      ? new Date(problem.created_at).toLocaleDateString()
                      : ""}
                  </p>

                  <span className={`status ${problem.status}`}>
                    {problem.status}
                  </span>

                  <p className="view-btn">View Details →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Problems