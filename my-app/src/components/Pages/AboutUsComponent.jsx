import React from 'react';
import { motion } from 'framer-motion';
import MyImage from "../../img/myImage.jpeg";
import Footer from '../FooterComponent/fotterComponent';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from "../../img/readme2.jpg";
import img2 from "../../img/readme3.jpg";
import img3 from "../../img/readme4.jpg";

const AboutUsComponent = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <motion.div 
          className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariant}
        >
          {/* Header Section */}
          <motion.div 
            className="p-8 text-center bg-green-600 text-white"
            variants={textVariant}
          >
            <h1 className="text-4xl font-extrabold mb-2">About Us</h1>
            <p className="text-lg">Learn more about our mission and the team behind our success.</p>
          </motion.div>

          {/* Image Slider Section */}
          <div className="relative h-64 bg-gray-200">
            <Slider {...sliderSettings}>
              <div className="relative h-64 bg-gray-200">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img1})` }}></div>
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
                  <h3 className="text-lg">Modern Farming Techniques</h3>
                  <p className="text-sm">Integrating technology with traditional farming to increase productivity.</p>
                </div>
              </div>
              <div className="relative h-64 bg-gray-200">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img2})` }}></div>
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
                  <h3 className="text-lg">Sustainable Agriculture</h3>
                  <p className="text-sm">Promoting sustainable practices for a healthier environment.</p>
                </div>
              </div>
              <div className="relative h-64 bg-gray-200">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img3})` }}></div>
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
                  <h3 className="text-lg">Precision Farming</h3>
                  <p className="text-sm">Utilizing data-driven techniques to optimize crop yields.</p>
                </div>
              </div>
            </Slider>
          </div>

          {/* Content Section with Animation */}
          <motion.div className="p-8" variants={textVariant}>
            <h2 className="text-3xl font-extrabold text-green-700 mb-6">Our Mission</h2>
            <motion.p className="text-gray-700 mb-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 3 } }}>
              Welcome to our Crop Recommendation System! Our mission is to empower farmers with the knowledge and tools they need to make informed decisions about crop selection based on their unique soil and climate conditions.
            </motion.p>
            <motion.p className="text-gray-700 mb-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 3 } }}>
              Our system considers factors like pH, nitrogen, phosphorus, potassium, temperature, humidity, and rainfall to provide tailored crop recommendations.
            </motion.p>
            <motion.p
              className="text-gray-700 mb-4"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 3 } }}
            >
              By leveraging modern technology, we aim to enhance agricultural productivity and sustainability, supporting farmers in achieving better yields.
            </motion.p>
            <motion.p
              className="text-gray-700"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 3 } }}
            >
              Our team, consisting of experts in agriculture, data science, and software development, is dedicated to creating innovative solutions for the farming community.
            </motion.p>
          </motion.div>

          {/* Team Section */}
          <motion.div className="p-8 bg-gray-50" variants={containerVariant}>
            <motion.h2 
              className="text-3xl font-extrabold text-green-700 mb-6 text-center"
              variants={textVariant}
            >
              Meet Our Team
            </motion.h2>
            <div className="flex flex-wrap justify-center space-y-6 sm:space-y-0 sm:space-x-6">
              <motion.div className="w-full sm:w-1/3 p-4" variants={textVariant}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                  <img className="w-full h-48 object-cover" src={MyImage} alt="Team Member" />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900">Rahul Shah</h3>
                    <p className="text-sm text-gray-600">Software Developer and Researcher</p>
                    <p className="text-sm text-gray-500">Specializing in developing software solutions for modern agriculture.</p>
                  </div>
                </div>
              </motion.div>
              <motion.div className="w-full sm:w-1/3 p-4" variants={textVariant}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                  <img className="w-full h-48 object-cover" src="https://img.freepik.com/premium-photo/memoji-happy-man-white-background-emoji_826801-6836.jpg?size=338&ext=jpg&ga=GA1.1.1395207783.1722188211&semt=sph" alt="Team Member" />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900">Deepak Karn</h3>
                    <p className="text-sm text-gray-600">Supervisor and Data Scientist</p>
                    <p className="text-sm text-gray-500">Expert in data analysis and machine learning for agriculture.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AboutUsComponent;
