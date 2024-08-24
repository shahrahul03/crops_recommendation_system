const predictionController = require("../controllers/predictionController");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
router.post(
  "/savePrediction",
  authMiddleware,

  predictionController.createPrediction
);
router.get(
  "/getPrediction",
  authMiddleware,

  predictionController.getPredictionsByUser
);
router.delete(
  "/deletePrediction",
  authMiddleware,

  predictionController.deletePrediction
);
module.exports = router;
