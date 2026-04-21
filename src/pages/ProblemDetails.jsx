import { useParams } from "react-router-dom";
import { mockProblems, mockResponses } from "../data/mockData";

function ProblemDetails() {
  const { id } = useParams();

  const problem = mockProblems.find(
    (item) => String(item.id) === String(id)
  );

  const responses = mockResponses.filter(
    (item) => String(item.problemId) === String(id)
  );

  if (!problem) {
    return <div>Problem not found.</div>;
  }

  return (
    <div className="page-container">
      <h1>{problem.title}</h1>
      <p>{problem.description}</p>
      <p>Status: {problem.status}</p>

      <h2>Responses</h2>
      {responses.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        responses.map((response) => (
          <div key={response.id} className="problem-card">
            <p><strong>{response.author}</strong></p>
            <p>{response.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProblemDetails;