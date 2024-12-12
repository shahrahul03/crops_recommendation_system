import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminReadmeComponent() {
  const [data, setData] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/event")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleReadMore = (entry) => {
    setSelectedEntry(entry);
  };

  const closeModal = () => {
    setSelectedEntry(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 w-full">
      <div className="w-full text-center border border-solid rounded-2xl border-green-600 m-3 p-5">
        <header className="mb-8 w-full">
          <h1 className="italic text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-4 w-full">
            Exploring Agriculture: From Tradition to Technology
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Discover the pivotal role of modern technologies in agriculture, including crop recommendation systems, and explore the evolution and current trends in the field.
          </p>
        </header>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {data.map((entry) => (
          <div
            key={entry._id}
            className="border border-solid rounded-2xl border-green-600 shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center bg-white"
          >
            <img
              className="w-full h-32 object-cover rounded-lg mb-4 transition-transform duration-300 ease-in-out hover:scale-105"
              src={entry.eventImage || "/path/to/default/image.png"}
              alt="AgroImage"
            />
            <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
              {entry.title || "Exploring Agriculture"}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              {entry.description.slice(0, 100) + "..."}
            </p>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => handleReadMore(entry)}
            >
              Read More!
            </button>
          </div>
        ))}
      </div>

      {selectedEntry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              {selectedEntry.title}
            </h2>
            <img
              className="w-full h-auto max-h-60 object-contain rounded-xl mb-4 transition-transform duration-300 ease-in-out hover:scale-105"
              src={selectedEntry.eventImage}
              alt="Detailed AgroImage"
            />
            <p className="text-gray-600 text-lg mb-4">{selectedEntry.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
