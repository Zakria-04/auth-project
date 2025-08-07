import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import Routes from "./API/Routes/Router";
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use("/", Routes);

if (!process.env.DB_URL) {
  throw new Error("DB_URL is not defined in the environment variables.");
}

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB successfully.");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

// check if server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
});

export default app;
