import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import introimg from "../../img/readme.png";
import img1 from "../../img/readme2.jpg";
import img2 from "../../img/readme3.jpg";
import img3 from "../../img/readme4.jpg";
import img4 from "../../img/readme5.jpg";
import img5 from "../../img/readme6.jpg";
import Footer from '../FooterComponent/fotterComponent';
const events = [
  {
    size: 'large',
    category: 'Technology',
    title: 'The Role of Crop Recommendation Systems',
    date: 'June 15, 2024',
    description: 'Crop recommendation systems leverage data analytics, machine learning, and environmental insights to suggest optimal crops for specific conditions. These systems enhance agricultural productivity and sustainability by providing tailored recommendations based on soil quality, climate, and market demand.',
    imageUrl: introimg,
  },
  {
    size: 'medium',
    category: 'Introduction',
    title: 'Introduction to Agriculture',
    date: 'July 1, 2024',
    description: 'Agriculture is the cornerstone of human civilization, encompassing the cultivation of plants and animals for food, fiber, and other products. It has evolved over millennia from simple subsistence practices to complex systems driven by science and technology.',
    imageUrl: img1,
  },
  {
    size: 'medium',
    category: 'Types',
    title: 'Types of Agriculture',
    date: 'August 12, 2024',
    description: 'Agriculture is categorized into various types based on methods, scale, and purpose. Types include Subsistence Agriculture, Commercial Agriculture, Organic Agriculture, Precision Agriculture, Vertical Farming, and Aquaculture.',
    imageUrl: img2,
  },
  {
    size: 'medium',
    category: 'Technology',
    title: 'The Role of Technology in Modern Agriculture',
    date: 'September 5, 2024',
    description: 'Modern tools and techniques such as Smart Sensors, Drones, Machine Learning, Robotics, and Precision Irrigation are reshaping the agricultural landscape.',
    imageUrl: img3,
  },
  {
    size: 'small',
    category: 'Challenges',
    title: 'Challenges in Agriculture',
    date: 'October 19, 2024',
    description: 'Despite advancements, agriculture faces numerous challenges, including climate change, resource depletion, and the need for sustainable practices.',
    imageUrl: img4,
  },
  {
    size: 'small',
    category: 'Future',
    title: 'Future of Agriculture',
    date: 'November 22, 2024',
    description: 'Future directions include Regenerative Agriculture, Urban Agriculture, Personalized Nutrition, and Global Collaboration.',
    imageUrl: img5,
  },
];

const EventCard = ({ event, onClick }) => {
  const sizeClasses = 'col-span-12 sm:col-span-6 lg:col-span-4'; // Ensure uniform size

  return (
    <div onClick={onClick} className={`${sizeClasses} p-4 cursor-pointer`}>
      <div className="border border-gray-300 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
        <div className="relative">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="p-6 bg-white">
          <div className="mb-4">
            <span className="text-xs font-semibold text-green-600 uppercase">{event.category}</span>
            <h3 className="mt-2 text-xl font-bold text-gray-800">{event.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{event.date}</p>
          </div>
          <p className="mt-4 text-gray-700">{event.description}</p>
        </div>
      </div>
    </div>
  );
};


const ExpandedCard = ({ event, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
    <div className="relative bg-white border border-gray-200 rounded-lg shadow-lg max-w-2xl w-full">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white  hover:text-gray-800 focus:outline-none z-10"
      >
        <XMarkIcon className="h-9 w-9" />
      </button>
      <div className="relative">
        <img src={event.imageUrl} alt={event.title} className="w-full h-64 object-cover rounded-t-lg" />
      </div>
      <div className="p-6">
        <div className="mb-4">
          <span className="text-xs font-semibold text-green-600 uppercase">{event.category}</span>
          <h3 className="mt-2 text-xl sm:text-3xl font-bold text-gray-800">{event.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{event.date}</p>
        </div>
        <p className="mt-4 text-gray-700">{event.description}</p>
      </div>
    </div>
  </div>
);




const ReadMeComponent = () => {
  const [expandedEvent, setExpandedEvent] = useState(null);

  return (
    <>
    <div className="container mx-auto px-4 sm:px-6 py-12 bg-gray-50">
      <header className="text-center mb-12 px-4 sm:px-0">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-4">
          Exploring Agriculture: From Tradition to Technology
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Discover the pivotal role of modern technologies in agriculture, including crop recommendation systems, and explore the evolution and current trends in the field.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event, index) => (
          <EventCard key={index} event={event} onClick={() => setExpandedEvent(event)} />
        ))}
      </div>

      {expandedEvent && <ExpandedCard event={expandedEvent} onClose={() => setExpandedEvent(null)} />}
      
    </div>
    <footer className="mt-auto  bg-gray-200 py-4">
    <Footer />
  </footer>
  </>
  );
  
};


export default ReadMeComponent;
