const express = require("express");
const router = express.Router();
const adminReadmeController = require("../controllers/readmeController");
const { eventImage } = require("../middleware/uploadMiddleware");

// Create a new entry with image upload
router.post(
  "/",
  eventImage.single("eventImage"),
  adminReadmeController.createAdminReadme
);

// Get all entries
router.get("/event", adminReadmeController.getAdminReadmeEntries);

// Get a single entry by ID
router.get("/:id", adminReadmeController.getAdminReadmeById);

// Update an entry with optional image upload
router.put(
  "/:id",
  eventImage.single("eventImage"),
  adminReadmeController.updateAdminReadme
);

// Delete an entry
router.delete("/:id", adminReadmeController.deleteAdminReadme);

module.exports = router;
