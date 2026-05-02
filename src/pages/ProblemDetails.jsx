import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchProblemDetails, addResponse } from "../services/api"
import "./ProblemDetails.css"

const ProblemDetails = () => {
  const { id } = useParams()

  const [problem, setProblem] = useState(null)
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(true)
  const [responseText, setResponseText] = useState("")
  const [statusMessage, setStatusMessage] = useState("")

  const user = JSON.parse(localStorage.getItem("user"))

  const loadProblem = () => {
    setLoading(true)

    fetchProblemDetails(id)
      .then((data) => {
        setProblem(data.problem)
        setResponses(data.responses || [])
      })
      .catch(() => {
        setProblem(null)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadProblem()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatusMessage("")

    try {
      await addResponse({
        problem_id: id,
        responder_id: user?.id || "",
        responder_name: user?.name || "Expert",
        message: responseText,
      })

      setStatusMessage("Response submitted successfully.")
      setResponseText("")
      loadProblem()
    } catch {
      setStatusMessage("Failed to submit response.")
    }
  }

  if (loading) return <p className="center-text">Loading...</p>
  if (!problem) return <p className="center-text">Problem not found.</p>

  return (
    <div className="details-container">
      <div className="details-card">
        <h1>{problem.title}</h1>

        <p className="description">{problem.description}</p>

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

      {(user?.role === "expert" || user?.role === "admin") && (
        <div className="response-form-card">
          <h2>Add Response</h2>

          <form onSubmit={handleSubmit} className="response-form">
            <textarea
              placeholder="Write your response"
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              required
            />

            <button type="submit">Submit Response</button>
          </form>

          {statusMessage && <p className="form-status">{statusMessage}</p>}
        </div>
      )}
    </div>
  )
}

export default ProblemDetails