import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../FooterComponent/fotterComponent';
import Img1 from "../../img/homepage.jpg";  // Replace with relevant images
import Img2 from "../../img/himg2.png";
import Img3 from "../../img/himg1.png";

function HomePage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/recommendationsComponent');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-teal-600 to-green-700 text-white text-center py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center lg:justify-between">
          <div className="lg:w-1/2 mb-6 lg:mb-0 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">CRS</h1>
            <p className="text-lg sm:text-2xl font-medium mb-6 drop-shadow-md">
              Revolutionize Your Agriculture with Precision Crop Recommendations for Maximum Yield.
            </p>
            <button
              onClick={handleButtonClick}
              className="bg-white text-teal-600 mt-6 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-teal-50 transition"
            >
              Get Recommendation
            </button>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src={Img1}
              alt="Agriculture Technology"
              className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto rounded-lg shadow-2xl transform transition-transform hover:scale-105"
            />
          </div>
        </div>
      </header>

      {/* Introduction and Why Choose Us Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
          {/* Introduction Section */}
          <div className="flex flex-col md:w-1/2 bg-white border border-teal-500 rounded-lg shadow-lg overflow-hidden">
            <img src={Img3} alt="Team Discussion" className="w-full h-64 md:h-auto object-cover" />
            <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
              <h2 className="text-3xl sm:text-4xl font-bold text-teal-800 mb-4 relative">
                Say Hello to CRS
                <div className="absolute inset-x-0 bottom-0 h-1 bg-teal-500 -mb-1 rounded-full"></div>
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Our Crop Recommendation System stands out by leveraging cutting-edge AI to improve farm yields. 
                With precise crop recommendations tailored to your unique conditions, CRS is designed to enhance productivity 
                and sustainability. Join the future of farming with technology that adapts to your specific needs.
              </p>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="flex flex-col md:w-1/2 bg-white border border-teal-500 rounded-lg shadow-lg overflow-hidden">
            <img src={Img2} alt="Group Collaboration" className="w-full h-64 md:h-auto object-cover" />
            <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
              <h2 className="text-3xl sm:text-4xl font-bold text-teal-800 mb-4 relative">
                Why Choose Us?
                <div className="absolute inset-x-0 bottom-0 h-1 bg-teal-500 -mb-1 rounded-full"></div>
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Choose our Crop Recommendation System for its precision, ease of use, and proven results. Whether 
                you are new to agriculture or a seasoned farmer, CRS is designed to help you select the best crops based on 
                your land's specific conditions. Rely on our system to maximize your harvest and make informed decisions 
                for a successful farming season.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-auto bg-gray-200 py-4">
        <Footer />
      </footer>
    </div>
  );
}

export default HomePage;
