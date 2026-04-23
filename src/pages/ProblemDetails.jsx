import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchProblemDetails } from "../services/api"
import "./ProblemDetails.css"

const ProblemDetails = () => {
  const { id } = useParams()
  const [problem, setProblem] = useState(null)
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProblemDetails(id)
      .then((data) => {
        setProblem(data.problem)
        setResponses(data.responses || [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="center-text">Loading...</p>
  if (!problem) return <p className="center-text">Problem not found</p>

  return (
    <div className="details-container">

      <div className="details-card">
        <h1>{problem.title}</h1>

        <p className="description">
          {problem.description}
        </p>

        <span className={`status ${problem.status}`}>
          {problem.status}
        </span>

        {problem.image_url && (
          <img
            src={`http://127.0.0.1:5000${problem.image_url}`}
            alt="problem"
          />
        )}
      </div>

      <div className="responses-section">
        <h2>Responses</h2>

        {responses.length === 0 ? (
          <p className="no-response">No responses yet.</p>
        ) : (
          responses.map((res) => (
            <div key={res.response_id} className="response-card">
              <h4>{res.responder_name || "Expert"}</h4>
              <p>{res.message}</p>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default ProblemDetails