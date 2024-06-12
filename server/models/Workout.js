import mongoose from "mongoose"; // Import the Mongoose library for interacting with MongoDB

// Define the Workout schema
const WorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Define a field 'user' which stores ObjectId type from MongoDB
      ref: "User", // Reference to the 'User' collection
      required: true, // This field is required
    },
    category: {
      type: String, // Define a field 'category' which stores a string
      required: true, // This field is required
    },
    workoutName: {
      type: String, // Define a field 'workoutName' which stores a string
      required: true, // This field is required
      unique: true, // This field must be unique across all documents
    },
    // Commented out optional fields
    // sets: {
    //   type: Number, // Field 'sets' which stores a number
    // },
    // reps: {
    //   type: Number, // Field 'reps' which stores a number
    // },
    // weight: {
    //   type: Number, // Field 'weight' which stores a number
    // },
    // duration: {
    //   type: Number, // Field 'duration' which stores a number (presumably in minutes)
    // },
    // caloriesBurned: {
    //   type: Number, // Field 'caloriesBurned' which stores a number
    // },
    date: {
      type: Date, // Define a field 'date' which stores a Date object
      default: Date.now, // Default value is the current date and time
    },
  },
  { timestamps: true } // Options to automatically add 'createdAt' and 'updatedAt' fields
);

// Export the Workout model
export default mongoose.model("Workout", WorkoutSchema); // Create and export a Mongoose model named 'Workout' based on the WorkoutSchema
