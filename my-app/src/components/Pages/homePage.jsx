import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";

import Footer from '../FooterComponent/fotterComponent';
import ImgHero from "../../img/readme2.jpg";  // Hero section image
import ImgFeature1 from "../../img/himg3.png";
import ImgFeature2 from "../../img/himg2.png";
import ImgFeature3 from "../../img/himg1.png";
import ImgAbout from "../../img/homepage.jpg";

function HomePage() {
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    navigate('/recommendationsComponent');
  };

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/contact");
        // Access the contacts array from the API response
        setTestimonials(Array.isArray(response.data.contacts) ? response.data.contacts : []);
      } catch (err) {
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : testimonials.length - 1));
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex < testimonials.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Hero Section */}
        <header className="relative bg-cover bg-center h-[60vh] md:h-[80vh] lg:h-[65vh] text-white flex items-center justify-center" style={{ backgroundImage: `url(${ImgHero})` }}>
          <div className="bg-teal-950 absolute inset-0 opacity-50"></div>
          <div className="container mx-auto px-4 text-center relative z-10 flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 lg:mb-10">
              Start Your Journey to Smarter Farming
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 lg:mb-8">
              Join the community of farmers benefiting from AI-driven crop recommendations.
            </p>
            <button
              onClick={handleButtonClick}
              className="bg-yellow-400 text-teal-900 px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-300 transition mt-4"
            >
              Get Recommendation
            </button>
          </div>
        </header>

        {/* Feature Highlights Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-800">Our Key Features</h2>
            <p className="text-gray-700 mt-4">What makes CRS the best choice for farmers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-white border rounded-lg shadow-lg transition hover:shadow-xl">
              <img src={ImgFeature1} alt="Precision AI" className="w-full h-32 mx-auto mb-4 object-contain" />
              <h3 className="text-xl font-semibold text-teal-700 mb-2">Precision AI Recommendations</h3>
              <p className="text-gray-600">Get crop recommendations tailored to your land's unique conditions.</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 bg-white border rounded-lg shadow-lg transition hover:shadow-xl">
              <img src={ImgFeature2} alt="Ease of Use" className="w-full h-32 mx-auto mb-4 object-contain" />
              <h3 className="text-xl font-semibold text-teal-700 mb-2">Easy to Use</h3>
              <p className="text-gray-600">Simple interface designed for both new and experienced farmers.</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 bg-white border rounded-lg shadow-lg transition hover:shadow-xl">
              <img src={ImgFeature3} alt="Sustainable Solutions" className="w-full h-32 mx-auto mb-4 object-contain" />
              <h3 className="text-xl font-semibold text-teal-700 mb-2">Sustainable Solutions</h3>
              <p className="text-gray-600">Enhance productivity while maintaining environmental balance.</p>
            </div>
          </div>
        </section>

        {/* About and Benefits Section */}
        <section className="container mx-auto px-4 py-16 bg-gray-50">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-4">
              <img src={ImgAbout} alt="About CRS" className="rounded-lg shadow-lg w-full h-auto object-cover md:max-h-96 lg:max-h-[60vh]" />
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className="text-3xl font-bold text-teal-800 mb-4">Why Farmers Trust CRS</h2>
              <ul className="text-gray-700 space-y-4 list-disc pl-5">
                <li>AI-powered crop recommendations based on real-time data.</li>
                <li>Easy-to-navigate interface suitable for farmers of all backgrounds.</li>
                <li>Increases yield and minimizes risks by analyzing environmental factors.</li>
                <li>Committed to sustainable agricultural practices for future growth.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-800">What Our Users Say</h2>
          </div>
          {loading && (
            <p className="text-center text-gray-500 animate-pulse">Loading testimonials...</p>
          )}
          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}
          {!loading && !error && testimonials.length > 0 && (
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={handlePrevTestimonial}
                className="text-teal-800 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition"
              >
                &#9664;
              </button>

              <blockquote className="bg-white border rounded-lg shadow-lg p-6 w-1/2 mx-4 text-center">
                <p className="text-gray-700 italic">"{testimonials[currentTestimonialIndex].message}"</p>
                <footer className="mt-4 text-teal-800 font-semibold">
                  - {testimonials[currentTestimonialIndex].name}
                </footer>
                <p className="text-gray-500 text-sm">
                  {new Date(testimonials[currentTestimonialIndex].date).toLocaleDateString()}
                </p>
              </blockquote>

              <button
                onClick={handleNextTestimonial}
                className="text-teal-800 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition"
              >
                &#9654;
              </button>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-auto bg-gray-200 py-4">
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default HomePage;
