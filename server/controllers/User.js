import bcrypt from "bcrypt"; // Import the bcrypt library for hashing passwords
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library for creating JWT tokens
import dotenv from "dotenv"; // Import dotenv to load environment variables
import { createError } from "../error.js"; // Import a custom error handling function
import User from "../models/User.js"; // Import the User model
import Workout from "../models/Workout.js"; // Import the Workout model

dotenv.config(); // Load environment variables from the .env file

// User registration handler
export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body; // Destructure user details from request body

    // Check if the email is already in use
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(createError(409, "Email is already in use.")); // Email conflict error
    }

    const salt = bcrypt.genSaltSync(10); // Generate a salt for hashing the password
    const hashedPassword = bcrypt.hashSync(password, salt); // Hash the password

    const user = new User({ // Create a new User instance
      name,
      email,
      password: hashedPassword,
      img,
    });
    const createdUser = await user.save(); // Save the user to the database

    // Generate a JWT token for the user
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
      expiresIn: "9999 years", // Set an expiration time for the token
    });
    return res.status(200).json({ token, user }); // Return the token and user details
  } catch (error) {
    return next(error); // Pass any errors to the error handler
  }
};

// User login handler
export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body; // Destructure email and password from request body

    const user = await User.findOne({ email: email }); // Find the user by email
    if (!user) {
      return next(createError(404, "User not found")); // User not found error
    }
    console.log(user);

    const isPasswordCorrect = await bcrypt.compareSync(password, user.password); // Compare passwords
    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect password")); // Incorrect password error
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "9999 years", // Set an expiration time for the token
    });

    return res.status(200).json({ token, user }); // Return the token and user details
  } catch (error) {
    return next(error); // Pass any errors to the error handler
  }
};

// Fetch user dashboard data
export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.id; // Get the user ID from the verified token
    const user = await User.findById(userId); // Find the user by ID
    if (!user) {
      return next(createError(404, "User not found")); // User not found error
    }

    const currentDateFormatted = new Date();
    const startToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate()
    );
    const endToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate() + 1
    );

    // Calculate total calories burnt
    const totalCaloriesBurnt = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: null,
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    // Calculate total number of workouts
    const totalWorkouts = await Workout.countDocuments({
      user: userId,
      date: { $gte: startToday, $lt: endToday },
    });

    // Calculate average calories burnt per workout
    const avgCaloriesBurntPerWorkout =
      totalCaloriesBurnt.length > 0
        ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
        : 0;

    // Fetch category of workouts
    const categoryCalories = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: "$category",
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    // Format category data for pie chart
    const pieChartData = categoryCalories.map((category, index) => ({
      id: index,
      value: category.totalCaloriesBurnt,
      label: category._id,
    }));

    const weeks = [];
    const caloriesBurnt = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(
        currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
      );
      weeks.push(`${date.getDate()}th`);

      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const endOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );

      const weekData = await Workout.aggregate([
        {
          $match: {
            user: user._id,
            date: { $gte: startOfDay, $lt: endOfDay },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date in ascending order
        },
      ]);

      caloriesBurnt.push(
        weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
      );
    }

    return res.status(200).json({
      totalCaloriesBurnt:
        totalCaloriesBurnt.length > 0
          ? totalCaloriesBurnt[0].totalCaloriesBurnt
          : 0,
      totalWorkouts: totalWorkouts,
      avgCaloriesBurntPerWorkout: avgCaloriesBurntPerWorkout,
      totalWeeksCaloriesBurnt: {
        weeks: weeks,
        caloriesBurned: caloriesBurnt,
      },
      pieChartData: pieChartData,
    });
  } catch (err) {
    next(err); // Pass any errors to the error handler
  }
};

// Fetch workouts by date
export const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user?.id; // Get the user ID from the verified token
    const user = await User.findById(userId); // Find the user by ID
    let date = req.query.date ? new Date(req.query.date) : new Date(); // Get the date from query or use current date
    if (!user) {
      return next(createError(404, "User not found")); // User not found error
    }
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const todaysWorkouts = await Workout.find({
      userId: userId,
      date: { $gte: startOfDay, $lt: endOfDay },
    });
    const totalCaloriesBurnt = todaysWorkouts.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0
    );

    return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
  } catch (err) {
    next(err); // Pass any errors to the error handler
  }
};

// Add a new workout
export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id; // Get the user ID from the verified token
    const { workoutString } = req.body; // Destructure workoutString from request body
    if (!workoutString) {
      return next(createError(400, "Workout string is missing")); // Bad request error
    }
    // Split workoutString into lines
    const eachworkout = workoutString.split(";").map((line) => line.trim());
    // Check if any workouts start with "#" to indicate categories
    const categories = eachworkout.filter((line) => line.startsWith("#"));
    if (categories.length === 0) {
      return next(createError(400, "No categories found in workout string")); // Bad request error
    }

    const parsedWorkouts = [];
    let currentCategory = "";
    let count = 0;

    // Loop through each line to parse workout details
    await eachworkout.forEach((line) => {
      count++;
      if (line.startsWith("#")) {
        const parts = line?.split("\n").map((part) => part.trim());
        console.log(parts);
        if (parts.length < 5) {
          return next(
            createError(400, `Workout string is missing for ${count}th workout`)
          ); // Bad request error
        }

        // Update current category
        currentCategory = parts[0].substring(1).trim();
        // Extract workout details
        const workoutDetails = parseWorkoutLine(parts);
        if (workoutDetails == null) {
          return next(createError(400, "Please enter in proper format ")); // Bad request error
        }

        if (workoutDetails) {
          // Add category to workout details
          workoutDetails.category = currentCategory;
          parsedWorkouts.push(workoutDetails);
        }
      } else {
        return next(
          createError(400, `Workout string is missing for ${count}th workout`)
        ); // Bad request error
      }
    });

    // Calculate calories burnt for each workout
    await parsedWorkouts.forEach(async (workout) => {
      workout.caloriesBurned = parseFloat(calculateCaloriesBurnt(workout));
      await Workout.create({ ...workout, user: userId }); // Create a new workout entry in the database
    });

    return res.status(201).json({
      message: "Workouts added successfully",
      workouts: parsedWorkouts,
    });
  } catch (err) {
    next(err); // Pass any errors to the error handler
  }
};

// Function to parse workout details from a line
const parseWorkoutLine = (parts) => {
  const details = {};
  console.log(parts);
  if (parts.length >= 5) {
    details.workoutName = parts[1].substring(1).trim(); // Extract workout name
    details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim()); // Extract number of sets
    details.reps = parseInt(
      parts[2].split("sets")[1].split("reps")[0].substring(1).trim()
    ); // Extract number of reps
    details.weight = parseFloat(parts[3].split("kg")[0].substring(1).trim()); // Extract weight
    details.duration = parseFloat(parts[4].split("min")[0].substring(1).trim()); // Extract duration
    console.log(details);
    return details;
  }
  return null; // Return null if parsing fails
};

// // Function to calculate calories burnt for a workout
// const calculateCaloriesBurnt = (workoutDetails) => {
//   const durationInMinutes = parseInt(workoutDetails.duration); // Extract duration in minutes
//   const weightInKg = parseInt(workoutDetails.weight); // Extract weight in kg
//   const caloriesBurntPerMinute = 5; // Sample value, actual calculation may vary
//   return durationInMinutes * caloriesBurntPerMinute * weightInKg; // Calculate total calories burnt
// };
