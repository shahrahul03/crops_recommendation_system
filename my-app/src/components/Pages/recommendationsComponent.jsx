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

    // Validation logic
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

    // Backend API requests
    try {
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
      setExpanded(false);  

      const token = localStorage.getItem('authToken');
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
      <div className="min-h-screen flex flex-col items-center bg-green-100">
        {/* Input Fields Section */}
        <div className="w-full p-8 bg-white shadow-lg rounded-lg max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 text-green-700">Crops Recommendation System</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700">Nitrogen (0-140)</span>
              <input
                type="text"
                className="mt-1 block w-full p-3 border border-green-300 rounded-md"
                placeholder="E.g. 50.55"
                value={N}
                onChange={(e) => setN(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Phosphorous (5-145)</span>
              <input
                type="text"
                className="mt-1 block w-full p-3 border border-green-300 rounded-md"
                placeholder="E.g. 53.36"
                value={P}
                onChange={(e) => setP(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Potassium (5-205)</span>
              <input
                type="text"
                className="mt-1 block w-full p-3 border border-green-300 rounded-md"
                placeholder="E.g. 48.15"
                value={K}
                onChange={(e) => setK(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Temperature (8.8-43.6)</span>
              <input
                type="text"
                className="mt-1 block w-full p-3 border border-green-300 rounded-md"
                placeholder="E.g. 25.62"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Humidity (%) (14.2-99.9)</span>
              <input
                type="text"
                className="mt-1 block w-full p-3 border border-green-300 rounded-md"
                placeholder="E.g. 71.48"
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">PH (3.5-9.9)</span>
              <input
                type="text"
                className="mt-1 block w-full p-3 border border-green-300 rounded-md"
                placeholder="E.g. 6.47"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Rainfall (20.2-298.5)</span>
              <input
                type="text"
                className="mt-1 block w-full p-3 border border-green-300 rounded-md"
                placeholder="E.g. 103.46"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
              />
            </label>
            <button 
              type="submit" 
              className="mt-4 w-full p-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors lg:col-span-2">
              Submit
            </button>
          </form>
        </div>

        {/* Enhanced Rules and Regulations Section */}
        <div className="w-full mt-8 p-8 bg-white shadow-lg rounded-lg max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 text-green-700">Rules and Regulations</h2>
          <ul className="list-disc list-inside space-y-4 text-gray-700 text-lg">
            <li><strong>Provide Accurate Data:</strong> Enter precise information about your soil conditions for the best recommendations.</li>
            <li><strong>Understand Recommendations:</strong> Learn why certain crops are suggested based on your inputs.</li>
            <li><strong>Local Compliance:</strong> Ensure the recommended crops are permissible in your area.</li>
            <li><strong>Regular Monitoring:</strong> Continuously monitor the crops and soil conditions during the growing season.</li>
            <li><strong>Expert Advice:</strong> Combine the recommendations with professional agricultural advice for optimal results.</li>
            <li><strong>Crop Rotation:</strong> Follow the suggested crop rotation plans to maintain soil health and fertility.</li>
            <li><strong>Stay Informed:</strong> Keep track of updates in crop recommendation techniques.</li>
            <li><strong>Market Demand:</strong> Consider the market demand for the recommended crops before planting.</li>
            <li><strong>Sustainability:</strong> Adopt sustainable farming methods as part of your agricultural practices.</li>
            <li><strong>Plan for Variability:</strong> Be prepared for environmental fluctuations and have backup plans in place.</li>
          </ul>
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
