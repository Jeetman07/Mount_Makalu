import { Link } from 'react-router-dom'

const ProblemCard = ({ problem }) => {
  return (
    <div className="card">
      <div className="card-top">
        <h3>{problem.title}</h3>
        <span className={problem.status === 'Solved' ? 'status solved' : 'status pending'}>
          {problem.status}
        </span>
      </div>
      <p>{problem.description}</p>
      <Link to={`/problems/${problem.id}`} className="card-link">View Details</Link>
    </div>
  )
}

export default ProblemCard