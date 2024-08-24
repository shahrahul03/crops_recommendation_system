const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  N: Number,
  P: Number,
  K: Number,
  temperature: Number,
  humidity: Number,
  ph: Number,
  rainfall: Number,
  prediction: String,
});

const Prediction = mongoose.model("Prediction", predictionSchema);
module.exports = Prediction;
