import { Link } from "react-router-dom"

const ProblemCard = ({ problem }) => {
  const status = problem.status?.toLowerCase()

  return (
    <div className="card">
      <div className="card-top">
        <h3>{problem.title}</h3>

        <span className={`status ${status === "solved" ? "solved" : "pending"}`}>
          {status === "solved" ? "Solved" : "Pending"}
        </span>
      </div>

      <p>{problem.description}</p>

      <Link
        to={`/problems/${problem.problem_id || problem.id}`}
        className="card-link"
      >
        View Details
      </Link>
    </div>
  )
}

export default ProblemCard