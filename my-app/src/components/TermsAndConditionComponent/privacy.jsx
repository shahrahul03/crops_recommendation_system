import React from 'react';
import Footer from "../FooterComponent/fotterComponent";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow py-16 px-4 md:px-8 lg:px-24">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-10">
          <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy for Crop Recommendation System</h1>
          <p className="text-gray-700 mb-6 text-center">
            Welcome to our Crop Recommendation System. Please read this privacy policy carefully as it outlines how we collect, use, and protect your personal information.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-center">Information We Collect</h2>
          <p className="text-gray-700 mb-6 text-center">
            We collect personal information such as your name, email, location, and other data to provide accurate crop recommendations. Additionally, we may collect information about your interactions with our platform to improve user experience.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-center">How We Use Your Information</h2>
          <p className="text-gray-700 mb-6 text-center">
            The information we collect is used to deliver personalized crop recommendations, improve our system, and ensure efficient communication between you and our platform.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-center">Data Security</h2>
          <p className="text-gray-700 mb-6 text-center">
            We take the security of your data seriously and implement industry-standard measures to protect your information from unauthorized access, disclosure, or loss.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-center">Your Rights</h2>
          <p className="text-gray-700 mb-6 text-center">
            You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at <a href="mailto:support@croprecommendation.com" className="text-blue-600 underline">support@croprecommendation.com</a>.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-center">Changes to This Policy</h2>
          <p className="text-gray-700 mb-6 text-center">
            We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-center">Contact Us</h2>
          <p className="text-gray-700 mb-6 text-center">
            If you have any questions or concerns about this policy, feel free to contact us at <a href="mailto:support@croprecommendation.com" className="text-blue-600 underline">support@croprecommendation.com</a>.
          </p>
          <p className="text-sm text-gray-500 text-center">Effective Date: September 16, 2024</p>
        </div>
      </main>
      <footer className="bg-gray-200 py-4">
        <Footer />
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
