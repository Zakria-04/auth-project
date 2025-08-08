import { getAccountUsernameAPI } from "../res/api.js";

const username = document.getElementById("username");

const displayUsername = async () => {
  try {
    const data = await getAccountUsernameAPI();
    username.textContent = data?.username || "Unknown User";
    console.log("data", data);
  } catch (error) {
    console.error("Error fetching username:", error);
  }
};

displayUsername();
