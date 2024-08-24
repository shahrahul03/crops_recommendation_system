const express = require("express");
const userProfile = require("../controllers/userProfileController");
const app = express();
const router = express.Router();

router.post("/userProfile", userProfile);

module.exports = app;
