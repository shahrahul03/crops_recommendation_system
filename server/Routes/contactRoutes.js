const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { authorizeRole } = require("../middleware/authorizationMiddleware");

router.post("/contact", contactController.createContact);

router.get("/contact", contactController.getAllContact);

module.exports = router;
