import { mockProblems } from '../data/mockData'
import ProblemCard from '../components/ProblemCard'

const Problems = () => {
  return (
    <div className="dashboard-container">
      <h1>All Crop Problems</h1>
      <div className="card-grid">
        {mockProblems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
    </div>
  )
}

export default Problems