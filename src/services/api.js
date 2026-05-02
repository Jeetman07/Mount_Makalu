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

export async function fetchProblemDetails(id) {
  const response = await fetch(`${BASE_URL}/problems/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch problem details");
  }

  return response.json();
}

export async function addResponse(responseData) {
  const response = await fetch(`${BASE_URL}/respond`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responseData),
  });

  if (!response.ok) {
    throw new Error("Failed to submit response");
  }

  return response.json();
}

export async function loginUser(loginData) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}

export async function sendOtp(email) {
  const response = await fetch(`${BASE_URL}/send_otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send OTP");
  }

  return data;
}

export async function registerUser(registerData) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

export async function sendResetOtp(resetData) {
  const response = await fetch(`${BASE_URL}/send_reset_otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resetData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send reset OTP");
  }

  return data;
}

export async function resetPassword(resetData) {
  const response = await fetch(`${BASE_URL}/reset_password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resetData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to reset password");
  }

  return data;
}

export async function fetchTips() {
  const response = await fetch(`${BASE_URL}/tips`);

  if (!response.ok) {
    throw new Error("Failed to fetch tips");
  }

  return response.json();
}

export async function addTip(tipData) {
  const response = await fetch(`${BASE_URL}/add_tip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tipData),
  });

  if (!response.ok) {
    throw new Error("Failed to add tip");
  }

  return response.json();
}

export async function fetchWeather(location) {
  const url = location
    ? `${BASE_URL}/weather/${location}`
    : `${BASE_URL}/weather`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  return response.json();
}

export async function addWeather(weatherData) {
  const response = await fetch(`${BASE_URL}/add_weather`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(weatherData),
  });

  if (!response.ok) {
    throw new Error("Failed to add weather");
  }

  return response.json();
}