// Importing required modules and functions
import express from "express"; // Importing Express framework for creating server and handling routes
import {
  UserLogin, // Importing UserLogin controller function
  UserRegister, // Importing UserRegister controller function
  addWorkout, // Importing addWorkout controller function
  getUserDashboard, // Importing getUserDashboard controller function
  getWorkoutsByDate, // Importing getWorkoutsByDate controller function
} from "../controllers/User.js"; // Importing from the User controller
import { verifyToken } from "../middleware/verifyToken.js"; // Importing middleware to verify JWT tokens

// Create a new router object
const router = express.Router(); // Creating an instance of an Express Router

// Define route for user registration
router.post("/signup", UserRegister); // POST request to /api/user/signup will invoke UserRegister controller

// Define route for user login
router.post("/signin", UserLogin); // POST request to /api/user/signin will invoke UserLogin controller

// Define route for getting user dashboard data, protected by token verification
router.get("/dashboard", verifyToken, getUserDashboard); 
// GET request to /api/user/dashboard will first run verifyToken middleware, then getUserDashboard controller

// Define route for getting workouts by date, protected by token verification
router.get("/workout", verifyToken, getWorkoutsByDate); 
// GET request to /api/user/workout will first run verifyToken middleware, then getWorkoutsByDate controller

// Define route for adding a new workout, protected by token verification
router.post("/workout", verifyToken, addWorkout); 
// POST request to /api/user/workout will first run verifyToken middleware, then addWorkout controller

// Export the router object
export default router; // Exporting the router to be used in other parts of the application
