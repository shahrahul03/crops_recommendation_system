const AdminReadme = require("../models/readme");
const { eventImage } = require("../middleware/uploadMiddleware");

// Create a new entry
exports.createAdminReadme = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Check if an entry with the same title already exists
    const existingEntry = await AdminReadme.findOne({ title });
    if (existingEntry) {
      return res
        .status(400)
        .json({ msg: "An entry with this title already exists" });
    }

    let readmeData = {
      title,
      description,
    };

    if (req.file) {
      const eventImage = `${req.protocol}://${req.get("host")}/uploads/event/${
        req.file.filename
      }`;
      readmeData.eventImage = eventImage;
    }

    const newEntry = new AdminReadme(readmeData);
    await newEntry.save();

    res.status(201).json({
      msg: "Entry created successfully",
      entry: newEntry,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
const sendErrorResponse = (res, error) => {
  res
    .status(500)
    .json({ msg: "Server error: " + error.message, success: false });
};

// Get all entries
exports.getAdminReadmeEntries = async (req, res) => {
  try {
    const entries = await AdminReadme.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// Get a single entry by ID
exports.getAdminReadmeById = async (req, res) => {
  try {
    const entry = await AdminReadme.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// Update an entry
exports.updateAdminReadme = async (req, res) => {
  try {
    const { title, description } = req.body;
    let updateData = { title, description };

    if (req.file) {
      updateData.eventImage = `${req.protocol}://${req.get(
        "host"
      )}/uploads/event/${req.file.filename}`;
    }

    const updatedEntry = await AdminReadme.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// Delete an entry
exports.deleteAdminReadme = async (req, res) => {
  try {
    const deletedEntry = await AdminReadme.findByIdAndDelete(req.params.id);

    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};
