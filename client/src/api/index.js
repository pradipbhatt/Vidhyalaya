import axios from "axios";

// Create an instance of axios with a base URL
const API = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// Function to handle user signup
export const UserSignUp = async (data) => 
  // Make a POST request to the /user/signup endpoint with the provided data
  API.post("/user/signup", data);

// Function to handle user signin
export const UserSignIn = async (data) => 
  // Make a POST request to the /user/signin endpoint with the provided data
  API.post("/user/signin", data);

// Function to get dashboard details, requires a token for authorization
export const getDashboardDetails = async (token) =>
  // Make a GET request to the /user/dashboard endpoint with the provided token in headers
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

// Function to get workouts by date, requires a token for authorization
export const getWorkouts = async (token, date) =>
  // Make a GET request to the /user/workout endpoint with the provided date and token in headers
  API.get(`/user/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Function to add a workout, requires a token for authorization
export const addWorkout = async (token, data) =>
  // Make a POST request to the /user/workout endpoint with the provided data and token in headers
  API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
