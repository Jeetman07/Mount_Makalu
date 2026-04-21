import { mockProblems } from '../data/mockData'
import ProblemCard from '../components/ProblemCard'

const ExpertDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Expert Dashboard</h1>
      <p>Experts can review crop problems and send responses.</p>

      <section>
        <h2>Assigned Crop Problems</h2>
        <div className="card-grid">
          {mockProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ExpertDashboard