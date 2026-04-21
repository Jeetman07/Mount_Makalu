const BASE_URL = "http://127.0.0.1:5000";

export async function fetchProblems() {
  const response = await fetch(`${BASE_URL}/problems`);

  if (!response.ok) {
    throw new Error("Failed to fetch problems");
  }

  return response.json();
}

export async function addProblem(problemData) {
  const formData = new FormData();
  formData.append("title", problemData.title);
  formData.append("description", problemData.description);
  formData.append("farmer_id", problemData.farmer_id || "");
  formData.append("image", problemData.image || "");

  const response = await fetch(`${BASE_URL}/add_problem`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to add problem");
  }

  return response.json();
}