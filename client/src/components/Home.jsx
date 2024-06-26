import React from 'react';
import { Link } from 'react-router-dom';
import twitter from '../assets/twitterBW.svg';
import facebook from '../assets/facebook.svg';
import instagram from '../assets/instagram.svg';
import linkedin from '../assets/linkedin.svg';
import heroImage from '../assets/calculator-bg.jpg';

function Home() {
  return (
    <div className="text-white min-h-screen bg-gradient-to-r from-white via-gray-200 to-white flex flex-col w-full">
      {/* Hero Section */}
      <div className="relative flex flex-col justify-center items-left w-full h-[95vh] p-4">
        <img src={heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-60" style={{ opacity: 1 }} />
        <div className="relative z-10 md:w-[60%] flex flex-col items-center justify-center gap-y-4 p-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold transition-all duration-300 mb-6 text-white bg-clip-text text-transparent animate-gradient leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed">
            Paisa Patrol: Simplify Expense Tracking!
          </h1>
          <p className="text-white font-semibold text-md sm:text-lg md:text-xl lg:text-2xl transition-all duration-300">
            Introducing Paisa Patrol: Your all-in-one tool for effortless expense tracking. Join us today and take control of your finances with ease and precision!
          </p>
          <div className="flex flex-col sm:flex-col md:flex-row gap-5 mt-6">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg text-sm sm:text-lg transition-all duration-300">
              <Link to={"/login"}>Create an Account</Link>
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg text-sm sm:text-lg transition-all duration-300">
              <Link to={"/contact-us"}>Contact Us</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="flex flex-col items-center bg-gray-100 py-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Why Choose Paisa Patrol?</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Claude Anthropic AI Support</h3>
            <p className="text-gray-700 text-center">Get finance-related advice with our integrated Claude Anthropic AI support.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Nodemailer Services</h3>
            <p className="text-gray-700 text-center">Don't worry about forgetting your passwords, reset using OTP verification with Nodemailer.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Expense Statistics</h3>
            <p className="text-gray-700 text-center">Visualize your expenses with graphs and charts using React Charts 2 based on monthly and weekly data.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Access User Expense History</h3>
            <p className="text-gray-700 text-center">Get access to all the history of a user to track their financial activities.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Track Friends' Expenses</h3>
            <p className="text-gray-700 text-center">Add your friends' expenses by simply adding their contact number and keep track of their expenses.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform ">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 ">Secure Authentication</h3>
            <p className="text-gray-700 text-center">Don't worry about security; we use Passport-Google-OAuth20 strategy for signup, login, and authentication.</p>
          </div>
        </div>
      </div>


      {/* Footer Section */}
      <div className="bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 text-white py-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 text-lg sm:text-xl">
          <div className="flex flex-col items-center sm:items-start mb-2 sm:mb-0">
            <p className="text-left text-sm sm:text-base text-black">© {new Date().getFullYear()} Paisa Patrol. All rights reserved.</p>
          </div>
          <div className="flex justify-center space-x-4 mb-2 sm:mb-0">
            <a href="https://x.com/imgirish_07?t=YboCggNXpjvOHfxgWy2QZA&s=08" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
              <img src={twitter} alt="Twitter" className="h-6 sm:h-8" />
            </a>
            <a href="https://www.instagram.com/imgirish_07?utm_source=qr&igsh=OXY3Z2VydGpsdXgz" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
              <img src={instagram} alt="Instagram" className="h-6 sm:h-8" />
            </a>
            <a href="https://www.linkedin.com/in/girish-kumar-b63b52252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
              <img src={linkedin} alt="LinkedIn" className="h-6 sm:h-8" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
              <img src={facebook} alt="Facebook" className="h-6 sm:h-8" />
            </a>
          </div>
          <div className="flex flex-col items-center sm:items-end">
            <p className="text-lg sm:text-xl font-bold text-black">Paisa Patrol</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
