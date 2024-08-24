// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const authRoutes = require("../server/loginRoutes/auth");
// const profileRoutes = require("./profileRoute/profile");
// const userProfileRoutes = require("./profileRoute/userProfileRoutes");
// const contactRoutes = require("./Routes/contactRoutes");
// const predictionRoutes = require("./Routes/predictionRoutes");
// const dotenv = require("dotenv");
// const { authorizeRole } = require("./middleware/authorizationMiddleware");
// dotenv.config();
// const app = express();
// const port = 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:3000", // Replace with your frontend URL
//     credentials: true, // Allow credentials (cookies, authorization headers)
//   })
// );

// // MongoDB connection
// const mongoURI = "mongodb://127.0.0.1:27017/cropsRecommendationSystmUser";
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB", err);
//     process.exit(1);
//   });

// // Routes
// app.use(authRoutes); // Authentication routes (register, login)
// app.use("/users", userProfileRoutes);
// // Serve static files from the 'uploads' directory
// app.use("/uploads", express.static(__dirname + "/uploads"));

// app.use("/api/profile", profileRoutes);
// app.use("/api", contactRoutes);
// app.use("/api/admin", contactRoutes);
// app.use("/api", predictionRoutes);
// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
