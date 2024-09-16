// import React, { useState } from 'react';
// import { XMarkIcon } from '@heroicons/react/24/outline';
// import introimg from "../../img/readme.png";
// import img1 from "../../img/readme2.jpg";
// import img2 from "../../img/readme3.jpg";
// import img3 from "../../img/readme4.jpg";
// import img4 from "../../img/readme5.jpg";
// import img5 from "../../img/readme6.jpg";
// import Footer from '../FooterComponent/fotterComponent';
// const events = [
//   {
//     size: 'large',
//     category: 'Technology',
//     title: 'The Role of Crop Recommendation Systems',
//     date: 'June 15, 2024',
//     description: 'Crop recommendation systems leverage data analytics, machine learning, and environmental insights to suggest optimal crops for specific conditions. These systems enhance agricultural productivity and sustainability by providing tailored recommendations based on soil quality, climate, and market demand.',
//     imageUrl: introimg,
//   },
//   {
//     size: 'medium',
//     category: 'Introduction',
//     title: 'Introduction to Agriculture',
//     date: 'July 1, 2024',
//     description: 'Agriculture is the cornerstone of human civilization, encompassing the cultivation of plants and animals for food, fiber, and other products. It has evolved over millennia from simple subsistence practices to complex systems driven by science and technology.',
//     imageUrl: img1,
//   },
//   {
//     size: 'medium',
//     category: 'Types',
//     title: 'Types of Agriculture',
//     date: 'August 12, 2024',
//     description: 'Agriculture is categorized into various types based on methods, scale, and purpose. Types include Subsistence Agriculture, Commercial Agriculture, Organic Agriculture, Precision Agriculture, Vertical Farming, and Aquaculture.',
//     imageUrl: img2,
//   },
//   {
//     size: 'medium',
//     category: 'Technology',
//     title: 'The Role of Technology in Modern Agriculture',
//     date: 'September 5, 2024',
//     description: 'Modern tools and techniques such as Smart Sensors, Drones, Machine Learning, Robotics, and Precision Irrigation are reshaping the agricultural landscape.',
//     imageUrl: img3,
//   },
//   {
//     size: 'small',
//     category: 'Challenges',
//     title: 'Challenges in Agriculture',
//     date: 'October 19, 2024',
//     description: 'Despite advancements, agriculture faces numerous challenges, including climate change, resource depletion, and the need for sustainable practices.',
//     imageUrl: img4,
//   },
//   {
//     size: 'small',
//     category: 'Future',
//     title: 'Future of Agriculture',
//     date: 'November 22, 2024',
//     description: 'Future directions include Regenerative Agriculture, Urban Agriculture, Personalized Nutrition, and Global Collaboration.',
//     imageUrl: img5,
//   },
// ];

// const EventCard = ({ event, onClick }) => {
//   const sizeClasses = 'col-span-12 sm:col-span-6 lg:col-span-4'; // Ensure uniform size

//   return (
//     <div onClick={onClick} className={`${sizeClasses} p-4 cursor-pointer`}>
//       <div className="border border-gray-300 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
//         <div className="relative">
//           <img
//             src={event.imageUrl}
//             alt={event.title}
//             className="w-full h-64 object-cover"
//           />
//         </div>
//         <div className="p-6 bg-white">
//           <div className="mb-4">
//             <span className="text-xs font-semibold text-green-600 uppercase">{event.category}</span>
//             <h3 className="mt-2 text-xl font-bold text-gray-800">{event.title}</h3>
//             <p className="text-sm text-gray-500 mt-1">{event.date}</p>
//           </div>
//           <p className="mt-4 text-gray-700">{event.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };


// const ExpandedCard = ({ event, onClose }) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
//     <div className="relative bg-white border border-gray-200 rounded-lg shadow-lg max-w-2xl w-full">
//       <button
//         onClick={onClose}
//         className="absolute top-2 right-2 text-white  hover:text-gray-800 focus:outline-none z-10"
//       >
//         <XMarkIcon className="h-9 w-9" />
//       </button>
//       <div className="relative">
//         <img src={event.imageUrl} alt={event.title} className="w-full h-64 object-cover rounded-t-lg" />
//       </div>
//       <div className="p-6">
//         <div className="mb-4">
//           <span className="text-xs font-semibold text-green-600 uppercase">{event.category}</span>
//           <h3 className="mt-2 text-xl sm:text-3xl font-bold text-gray-800">{event.title}</h3>
//           <p className="text-sm text-gray-500 mt-1">{event.date}</p>
//         </div>
//         <p className="mt-4 text-gray-700">{event.description}</p>
//       </div>
//     </div>
//   </div>
// );




// const ReadMeComponent = () => {
//   const [expandedEvent, setExpandedEvent] = useState(null);

//   return (
//     <>
//     <div className="container mx-auto px-4 sm:px-6 py-12 bg-gray-50">
//       <header className="text-center mb-12 px-4 sm:px-0">
//         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-4">
//           Exploring Agriculture: From Tradition to Technology
//         </h1>
//         <p className="text-base sm:text-lg text-gray-600">
//           Discover the pivotal role of modern technologies in agriculture, including crop recommendation systems, and explore the evolution and current trends in the field.
//         </p>
//       </header>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {events.map((event, index) => (
//           <EventCard key={index} event={event} onClick={() => setExpandedEvent(event)} />
//         ))}
//       </div>

//       {expandedEvent && <ExpandedCard event={expandedEvent} onClose={() => setExpandedEvent(null)} />}
      
//     </div>
//     <footer className="mt-auto  bg-gray-200 py-4">
//     <Footer />
//   </footer>
//   </>
//   );
  
// };


// export default ReadMeComponent;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import logo from "../../img/himg1.png";

// export default function AdminReadmeComponent() {
//   const [data, setData] = useState({ title: "", description: "" });

//   useEffect(() => {
//     // Fetch data from the database or API
//     axios
//       .get("/api/adminReadme") // Replace with your actual API endpoint
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center p-5">
//       {/* Full-width Header */}
//       <div className="w-full text-center border border-solid rounded-2xl border-green-600 m-3 p-5">
//         <header className="mb-8 w-full">
//           <h1 className="italic text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-4 w-full">
//             {data.title ||
//               "Exploring Agriculture: From Tradition to Technology"}
//           </h1>
//           <p className="text-base sm:text-lg text-gray-600">
//             {data.description ||
//               "Discover the pivotal role of modern technologies in agriculture, including crop recommendation systems, and explore the evolution and current trends in the field."}
//           </p>
//         </header>
//       </div>

//       {/* Content Container */}
//       <div className="bg-white rounded-lg shadow-xl transition-opacity max-w-2xl w-full p-5">
//         {/* Responsive Image Container */}
//         <div className="w-full rounded-xl flex items-center justify-center mb-4 overflow-hidden">
//           <img
//             className="w-full h-auto object-contain rounded-xl"
//             src={logo}
//             alt="AgroImage"
//           />
//         </div>

//         {/* Description Section */}
//         <div className="bg-blue-100 w-full rounded-3xl p-5 mb-5">
//           <h3 className="font-bold text-2xl text-center text-green-900 mb-3">
//             Description
//           </h3>
//           <p className="font-sans text-green-800 text-center">
//             {data.description ||
//               "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque quia, omnis deserunt rerum iste, unde, tenetur explicabo quod dolor eos a eligendi numquam architecto sequi placeat perferendis aliquam laborum modi?"}
//           </p>
//         </div>

//         {/* Read More Button Centered */}
//         <div className="flex justify-center">
//           <button className="p-3 w-36 bg-green-500 text-white hover:bg-green-700 rounded-2xl cursor-pointer">
//             Read More!
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminReadmeComponent() {
  const [data, setData] = useState([]); // Initialize as an array to handle multiple entries
  const [selectedEntry, setSelectedEntry] = useState(null); // State to hold the currently selected entry for the modal

  useEffect(() => {
    // Fetch data from the database or API
    axios
      .get("http://localhost:5000/api/event") // Ensure this endpoint matches your backend route
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to handle opening the modal
  const handleReadMore = (entry) => {
    setSelectedEntry(entry);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setSelectedEntry(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 w-full">
      {/* Full-width Header with your specified content */}
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

      {/* Iterate over data to display each entry */}
      {data.map((entry) => (
        <div
          key={entry._id}
          className="w-full text-center border border-solid rounded-2xl border-green-600 mb-6 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <header className="mb-8 w-full p-5">
            <h1 className="italic text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-4">
              {entry.title || "Exploring Agriculture: From Tradition to Technology"}
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              {entry.description.slice(0, 100) + "..."} {/* Display a truncated version */}
            </p>
          </header>

          <div className="bg-white rounded-lg shadow-xl transition-opacity w-full p-5">
            {/* Image Container with Aspect Ratio and Responsive Height */}
            <div className="relative w-full h-0 pb-[56.25%] sm:pb-[40%] lg:pb-[30%] overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
                src={entry.eventImage || "/path/to/default/image.png"}
                alt="AgroImage"
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="p-3 w-36 bg-green-500 text-white hover:bg-green-700 rounded-2xl cursor-pointer"
                onClick={() => handleReadMore(entry)}
              >
                Read More!
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal for displaying selected entry details */}
      {selectedEntry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full relative">
            {/* Close button */}
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
              className="w-full h-auto object-cover rounded-xl mb-4 transition-transform duration-300 ease-in-out hover:scale-105"
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
