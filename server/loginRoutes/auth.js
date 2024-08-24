const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user"); // Define your User model
const dotenv = require("dotenv");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserProfile = require("../models/userProfile");
dotenv.config();
// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, address, contact, role } = req.body;

    if (!name || !email || !password || !address || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      address,
      contact,
      role,
    });

    // Hash password before saving
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create profile for the new user
    const newProfile = new UserProfile({ user: user._id });
    await newProfile.save();

    res.status(201).json({
      message: "User registered successfully",
      user: user,
      userProfile: newProfile,
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: "User logged in successfully",
          token: `Bearer ${token}`,
          user: user,
          role: user.role,
        });
      }
    );
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
