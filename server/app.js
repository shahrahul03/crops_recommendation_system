// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Import the database connection
const authRoutes = require("../server/loginRoutes/auth");
const profileRoutes = require("./profileRoute/profile");
const userProfileRoutes = require("./profileRoute/userProfileRoutes");
const contactRoutes = require("./Routes/contactRoutes");
const predictionRoutes = require("./Routes/predictionRoutes");
const { authorizeRole } = require("./middleware/authorizationMiddleware");

dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.use(authRoutes); // Authentication routes (register, login)
app.use("/users", userProfileRoutes);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api/profile", profileRoutes);
app.use("/api", contactRoutes);
app.use("/api/admin", contactRoutes);
app.use("/api", predictionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
