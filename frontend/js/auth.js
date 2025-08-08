import { loginUserAPI, registerUserAPI } from "../res/api.js";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await loginUserAPI({ email, password });

    if (response.success) {
      // Redirect to dashboard
      window.location.href = "/frontend/dashboard.html";
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials and try again.");
  }
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const confirmEmail = document.getElementById("confirmEmail").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await registerUserAPI({
      username,
      email,
      confirmEmail,
      password,
      confirmPassword,
    });

    if (response.success) {
      // Redirect to dashboard
      window.location.href = "/frontend/dashboard.html";
    }
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed. Please try again.");
  }
});
