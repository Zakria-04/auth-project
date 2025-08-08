const API_BASE_URL = "http://localhost:3000";

const loginUserAPI = async (body) => {
  const route = "/auth/login";
  return fetchData(route, "POST", body);
};

const registerUserAPI = async (body) => {
  const route = "/auth/register";
  return fetchData(route, "POST", body);
}

const fetchData = async (route, method, body) => {
  try {
    const response = await fetch(`${API_BASE_URL}${route}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export { loginUserAPI, registerUserAPI };
