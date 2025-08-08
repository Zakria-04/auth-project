import { loginUserAPI } from "../res/api.js";

const loginForm = document.getElementById("loginForm");

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");




loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await loginUserAPI({ email, password });
    console.log("Login successful:", response);

    if (response.success) {
      // Store access token
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      // Redirect to dashboard
      window.location.href = "/frontend/dashboard.html";
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials and try again.");
  }
});
