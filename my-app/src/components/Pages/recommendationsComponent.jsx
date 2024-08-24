import React, { useState } from 'react';
import Footer from '../FooterComponent/fotterComponent';
import Products from "../Products/Products.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Prediction() {
  const [N, setN] = useState("");
  const [P, setP] = useState("");
  const [K, setK] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [prediction, setPrediction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      N < 0 || N > 140 ||
      P < 5 || P > 145 ||
      K < 5 || K > 205 ||
      temperature < 8.825674745 || temperature > 43.67549305 ||
      humidity < 14.25803981 || humidity > 99.98187601 ||
      ph < 3.504752314 || ph > 9.93509073 ||
      rainfall < 20.21126747 || rainfall > 298.5601175
    ) {
      toast.error("Invalid input values.", {
        autoClose: 1000,
      });
      return;
    }

    try {
      // Fetch the prediction from the /predict endpoint
      const response = await fetch("http://localhost:7000/predict", {
        method: "POST",
        body: JSON.stringify({
          N, P, K, temperature, humidity, ph, rainfall,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      setPrediction(data.prediction);
      setShowModal(true);
      setExpanded(false);  // Reset expansion when new prediction is shown
      const token = localStorage.getItem('authToken');
      // Save the prediction and input data to the database
      await fetch("http://localhost:5000/api/savePrediction", {
        method: "POST",
        body: JSON.stringify({
          N, P, K, temperature, humidity, ph, rainfall, prediction: data.prediction
        }),
        headers: {
          "Content-Type": "application/json",
          'Authorization': ` ${token}`,
        },
      });
      
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const plantData = Products.plants.find((plant) => plant.name === prediction);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-green-100">
        <div className="bg-white shadow-lg rounded-lg flex flex-col lg:flex-row max-w-5xl w-full">
          {/* Input Fields Section */}
          <div className="lg:w-1/2 p-8 flex flex-col justify-between">
            <h2 className="text-3xl font-bold mb-6 text-green-700">Crops Recommendation System</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="block">
                <span className="text-gray-700">Nitrogen Range: 0-140 eg. 50.55</span>
                <input
                  type="text"
                  className="mt-1 block w-full p-3 border border-green-300 rounded-md"
                  placeholder="N:(Ratio of nitrogen content in the soil)"
                  value={N}
                  onChange={(e) => setN(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Phosphorous Range: 5-145 eg. 53.36</span>
                <input
                  type="text"
                  className="mt-1 block w-full p-3 border border-green-300 rounded-md"
                  placeholder="P:(Ratio of phosphorous content in the soil)"
                  value={P}
                  onChange={(e) => setP(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Potassium Range: 5-205 eg. 48.15</span>
                <input
                  type="text"
                  className="mt-1 block w-full p-3 border border-green-300 rounded-md"
                  placeholder="K:(Ratio of Potassium content in soil)"
                  value={K}
                  onChange={(e) => setK(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Temperature Range: 8.8-43.6 eg. 25.62</span>
                <input
                  type="text"
                  className="mt-1 block w-full p-3 border border-green-300 rounded-md"
                  placeholder="Temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Humidity Range %: 14.2-99.9 eg. 71.48</span>
                <input
                  type="text"
                  className="mt-1 block w-full p-3 border border-green-300 rounded-md"
                  placeholder="Humidity"
                  value={humidity}
                  onChange={(e) => setHumidity(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-gray-700">PH Range: 3.5-9.9 eg. 6.47</span>
                <input
                  type="text"
                  className="mt-1 block w-full p-3 border border-green-300 rounded-md"
                  placeholder="Ph"
                  value={ph}
                  onChange={(e) => setPh(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Rainfall Range: 20.2-298.5 eg. 103.46</span>
                <input
                  type="text"
                  className="mt-1 block w-full p-3 border border-green-300 rounded-md"
                  placeholder="Rainfall"
                  value={rainfall}
                  onChange={(e) => setRainfall(e.target.value)}
                />
              </label>

              <button 
                type="submit" 
                className="mt-4 w-full p-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors">
                Submit
              </button>
            </form>
          </div>

          {/* Rules and Regulations Section */}
          <div className="lg:w-1/2 h-full p-8 bg-green-100 flex flex-col justify-between">
            <div className="text-gray-700">
              <h2 className="text-3xl font-bold mb-4 text-green-700">Rules and Regulations</h2>
              <ul className="list-disc list-inside space-y-2">
                <li className="font-bold">Provide Accurate Data:</li> 
                <span>Input precise information about your soil conditions for the best recommendations.</span>
                <li className="font-bold">Understand the Recommendations:</li>
                <span>Know why certain crops are recommended based on your conditions.</span>
                <li className="font-bold">Follow Local Regulations:</li>
                <span>Ensure recommended crops are allowed in your area.</span>
                <li className="font-bold">Regular Monitoring:</li>
                <span>Monitor crops and soil conditions throughout the season.</span>
                <li className="font-bold">Combine with Expert Advice:</li>
                <span>Use the system's recommendations alongside expert advice.</span>
                <li className="font-bold">Practice Crop Rotation:</li>
                <span>Follow crop rotation suggestions to maintain soil health.</span>
                <li className="font-bold">Stay Informed:</li>
                <span>Keep up-to-date with system updates and improvements.</span>
                <li className="font-bold">Plan for Market Demand:</li>
                <span>Consider market demand for recommended crops.</span>
                <li className="font-bold">Use Sustainable Practices:</li>
                <span>Follow sustainable farming practices.</span>
                <li className="font-bold">Prepare for Variability:</li>
                <span>Have backup plans for unexpected environmental changes.</span>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Description */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className={`bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full ${expanded ? 'max-h-screen' : 'max-h-[400px]'} overflow-auto relative`}>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-green-700">Crop Description</h2>
            <p className="text-gray-700">
              {plantData?.description || "No description available."}
            </p>
            {!expanded && (
              <button
                className="mt-4 text-green-500 hover:underline"
                onClick={toggleExpand}
              >
                Read More
              </button>
            )}
            {expanded && (
              <div>
                <p className="mt-4 text-gray-700">
                  {plantData?.detailedInfo || ""}
                </p>
                <p className="mt-4 text-gray-700">
                  Fertilizer Recommendations: {plantData?.fertilizer || "No fertilizer recommendations available."}
                </p>
                <button
                  className="mt-4 text-green-500 hover:underline"
                  onClick={toggleExpand}
                >
                  Show Less
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className='Footer'>
        <Footer />
      </footer>
      <ToastContainer />
    </>
  );
}

export default Prediction;
