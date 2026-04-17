import { useParams } from 'react-router-dom'
import { mockProblems, mockResponses } from '../data/mockData'
import ResponseCard from '../components/ResponseCard'

const ProblemDetails = () => {
  const { id } = useParams()

  const problem = mockProblems.find((item) => item.id === Number(id))
  const responses = mockResponses.filter((item) => item.problemId === Number(id))

  if (!problem) {
    return <div className="dashboard-container"><h1>Problem Not Found</h1></div>
  }

  return (
    <div className="dashboard-container">
      <div className="page-box">
        <h1>📄 {problem.title}</h1>
        <p>{problem.description}</p>
        <p><strong>Status:</strong> {problem.status}</p>
      </div>

      <section>
        <h2>💬 Responses</h2>
        <div className="card-grid">
          {responses.map((response) => (
            <ResponseCard key={response.id} response={response} />
          ))}
        </div>
      </section>

      <section>
        <h2>✍️ Add Response</h2>
        <form className="form">
          <textarea placeholder="Write your response"></textarea>
          <button type="submit">Send Response</button>
        </form>
      </section>
    </div>
  )
}

export default ProblemDetails