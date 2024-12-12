
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
app = Flask(__name__)
CORS(app)

# Load the Logistic Regression model from the .pkl file
model = pickle.load(open("crs.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    # Get the inputs from the request
    input_data = {
        "N": [float(request.json.get("N"))],
        "P": [float(request.json.get("P"))],
        "K": [float(request.json.get("K"))],
        "temperature": [float(request.json.get("temperature"))],
        "humidity": [float(request.json.get("humidity"))],
        "ph": [float(request.json.get("ph"))],
        "rainfall": [float(request.json.get("rainfall"))]
    }
    
    # Create a DataFrame with the same feature names as the training data
    features = pd.DataFrame(input_data)
    
    # Use the model to make a prediction
    prediction = model.predict(features)[0]
    
    # Get probabilities for all classes
    prediction_proba = model.predict_proba(features)[0]
    
    # Identify the top-3 crops and their probabilities
    top_indices = np.argsort(prediction_proba)[-3:][::-1]
    top_crops = [
        {"crop": model.classes_[idx], "probability": round(prediction_proba[idx] * 100, 2)}
        for idx in top_indices
    ]
    print(top_crops)
    # Return the prediction and top-3 crops as a JSON response
    return jsonify({
        "prediction": prediction,
        "top_3": top_crops
    })

if __name__ == "__main__":
    app.run(port=7000, debug=True)
