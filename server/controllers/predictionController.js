const Prediction = require("../models/predictionSchema"); // Adjust the path as needed

// Create a new prediction
const createPrediction = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const prediction = new Prediction({
      user: req.user.id, // Use the logged-in user's ID
      N: req.body.N,
      P: req.body.P,
      K: req.body.K,
      temperature: req.body.temperature,
      humidity: req.body.humidity,
      ph: req.body.ph,
      rainfall: req.body.rainfall,
      prediction: req.body.prediction,
    });

    const savedPrediction = await prediction.save();
    res.status(201).json(savedPrediction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all predictions for the logged-in user
const getPredictionsByUser = async (req, res) => {
  try {
    const predictions = await Prediction.find({ user: req.user.id });
    res.status(200).json(predictions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a prediction by ID (only if it belongs to the logged-in user)
const getPredictionById = async (req, res) => {
  try {
    const prediction = await Prediction.findOne({
      id: req.params.id,
      user: req.user.id,
    });
    if (!prediction)
      return res.status(404).json({ message: "Prediction not found" });
    res.status(200).json(prediction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a prediction by ID (only if it belongs to the logged-in user)
const updatePrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!prediction)
      return res.status(404).json({ message: "Prediction not found" });
    res.status(200).json(prediction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a prediction by ID (only if it belongs to the logged-in user)
const deletePrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findOneAndDelete({
      id: req.params.id,
      user: req.user.id,
    });
    if (!prediction)
      return res.status(404).json({ message: "Prediction not found" });
    res.status(200).json({ message: "Prediction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPrediction,
  getPredictionsByUser,
  getPredictionById,
  updatePrediction,
  deletePrediction,
};
