import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/navBar/navbarComponent";
import HomePage from "../src/components/Pages/homePage";
import AboutUsComponent from "./components/Pages/AboutUsComponent";
import ContactUsComponent from "./components/Pages/contactUsComponent";
import ReadMeComponent from "./components/Pages/readMeComponent";
import Login from "./components/LoginComponent/loginComponent";
import Profile from "./components/profileComponent/profileComponent";
import RecommendationsComponent from "./components/Pages/recommendationsComponent";

import AdminContactPageComponent from "./components/AdminContagePageComponent/AdminContagePageComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoutes/protectedRoute";
import AdminReadmeComponent from "./components/Pages/AdminReadmeComponent";
import PrivacyPolicy from "./components/TermsAndConditionComponent/privacy";
import TermsAndConditions from "./components/TermsAndConditionComponent/TermsComponent";
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <main className="content">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/homePage" element={<HomePage />} />
              <Route path="/about" element={<AboutUsComponent />} />
              <Route path="/contact" element={<ContactUsComponent />} />
              <Route path="/readMe" element={<ReadMeComponent />} />
              <Route path="/login" element={<Login />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recommendationsComponent"
                element={
                  <ProtectedRoute>
                    <RecommendationsComponent />
                  </ProtectedRoute>
                }
              />

              {<Route path="/adminreadme" element={<AdminReadmeComponent />} />}
              <Route
                path="/admin-contact"
                element={
                  <ProtectedRoute role="admin">
                    <AdminContactPageComponent />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
