import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = ({ closeMenu }) => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="text-2xl font-semibold mb-4 text-teal-400">About</h5>
            <h5 className="text-xl font-semibold mb-4 text-green-400">Crops Recommendation System</h5>
            <div className="p-2 rounded-lg shadow-lg bg-slate-950">
              <p className="text-lg leading-relaxed">
                <span className="font-bold text-green-500">Welcome to Crops Recommendation System</span>, your one-stop solution for all your agriculture needs!
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="text-2xl font-semibold mb-4 text-teal-400">Customer Service</h5>
            <ul className="space-y-2">
              {/* <li><Link to="/login" onClick={closeMenu} className="hover:text-teal-300">Login</Link></li> */}
              <li><Link to="/homePage" onClick={closeMenu} className="hover:text-teal-300">Dashboard</Link></li>
              <li><Link to="/about" onClick={closeMenu} className="hover:text-teal-300">About</Link></li>
              <li><Link to="/contact" onClick={closeMenu} className="hover:text-teal-300">Contact</Link></li>
              <li><Link to="/readMe" className="hover:text-teal-300">Read Me?</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="text-2xl font-semibold mb-4 text-teal-400">Company</h5>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-teal-300">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-teal-300">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-teal-300">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="text-2xl font-semibold mb-4 text-teal-400">Follow Us</h5>
            <div className="flex space-x-4 justify-center">
              <Link to="https://facebook.com/yourprofile" className="hover:text-teal-300" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f fa-lg"></i>
              </Link>
              <Link to="https://twitter.com/yourprofile" className="hover:text-teal-300" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-lg"></i>
              </Link>
              <Link to="https://instagram.com/yourprofile" className="hover:text-teal-300" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram fa-lg"></i>
              </Link>
              <Link to="https://linkedin.com/in/yourprofile" className="hover:text-teal-300" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in fa-lg"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p>&copy; {new Date().getFullYear()} Crops Recommendation System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
