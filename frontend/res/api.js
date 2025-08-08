const API_BASE_URL = "http://localhost:3000";

const loginUserAPI = async (body) => {
  const route = "/auth/login";
  return fetchData(route, "POST", body);
};

const registerUserAPI = async (body) => {
  const route = "/auth/register";
  return fetchData(route, "POST", body);
};

const getAccountUsernameAPI = async () => {
  const route = "/account/username";
  return fetchData(route, "GET");
};

const fetchData = async (route, method, body) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${route}`, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export { loginUserAPI, registerUserAPI, getAccountUsernameAPI };
