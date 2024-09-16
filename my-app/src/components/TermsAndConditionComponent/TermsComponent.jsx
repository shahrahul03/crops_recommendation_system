import React from 'react';
import Footer from "../FooterComponent/fotterComponent";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <div className="flex-grow py-16 px-4 md:px-8 lg:px-24">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-10">
          <h1 className="text-3xl font-bold mb-8">Terms and Conditions for Crop Recommendation System</h1>
          
          <p className="text-gray-700 mb-6">
            Welcome to our Crop Recommendation System. By using our service, you agree to comply with and be bound by the following terms and conditions. Please review the terms carefully.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Conditions of Use</h2>
          <p className="text-gray-700 mb-6">
            By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by these terms, you are advised to stop using the website accordingly. Our system only grants use and access of this website and its services to those who have accepted its terms.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Privacy Policy</h2>
          <p className="text-gray-700 mb-6">
            Before you continue using our website, we advise you to read our privacy policy regarding our user data collection. It will help you better understand our practices.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Age Restriction</h2>
          <p className="text-gray-700 mb-6">
            You must be at least 18 years of age before you can use this website. By using this website, you warrant that you are at least 18 years of age and you may legally adhere to this Agreement. We assume no responsibility for liabilities related to age misrepresentation.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Intellectual Property</h2>
          <p className="text-gray-700 mb-6">
            You agree that all materials, products, and services provided on this website are the property of the Crop Recommendation System, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">User Accounts</h2>
          <p className="text-gray-700 mb-6">
            If you create an account on our website, you are responsible for maintaining the security of your account and for all activities that occur under the account. We reserve the right to terminate accounts, edit or remove content, and cancel orders at our sole discretion.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Limitation of Liability</h2>
          <p className="text-gray-700 mb-6">
            The Crop Recommendation System is not liable for any damages that may occur to you as a result of your misuse of our website. We reserve the right to edit, modify, and update these Terms at any time. If such changes occur, they will be prominently displayed on the site. Continued use of the site after such changes will signify your acknowledgment and agreement to be bound by the modified terms.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Governing Law</h2>
          <p className="text-gray-700 mb-6">
            This Agreement is governed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
          </p>

          <section>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about these terms, please contact us at <a href="mailto:support@croprecommendation.com" className="text-blue-600 underline">support@croprecommendation.com</a>.
            </p>
            <p className="text-sm text-gray-500">Effective Date: September 16, 2024</p>
          </section>
        </div>
      </div>
      <footer className="w-full bg-gray-200 py-4">
        <Footer />
      </footer>
    </div>
  );
};

export default TermsAndConditions;
