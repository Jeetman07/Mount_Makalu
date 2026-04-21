import { useEffect, useState } from "react";
import { fetchProblems } from "../services/api";

function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProblems() {
      try {
        const data = await fetchProblems();
        setProblems(data);
      } catch (err) {
        setError("Could not load problems");
      } finally {
        setLoading(false);
      }
    }

    loadProblems();
  }, []);

  if (loading) return <p>Loading problems...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page-container">
      <h1>All Crop Problems</h1>

      {problems.length === 0 ? (
        <p>No problems found.</p>
      ) : (
        problems.map((problem, index) => (
          <div key={problem.problem_id || index} className="problem-card">
            <h3>{problem.title || "No title"}</h3>
            <p>{problem.description || "No description"}</p>
            <p>Status: {problem.status || "pending"}</p>

            {problem.image_url && (
              <img
                src={`http://127.0.0.1:5000${problem.image_url}`}
                alt={problem.title || "Problem image"}
                style={{
                  width: "200px",
                  marginTop: "10px",
                  borderRadius: "8px",
                  display: "block",
                }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Problems;