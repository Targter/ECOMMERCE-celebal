import React from "react";
import { FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const About = () => {
  const visitInstagram = () => {
    window.open("https://instagram.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 mt-[90px]">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 animate-fade-in">
            About Us
          </h1>
          <p className="text-lg text-gray-600 mt-4 animate-fade-in">
            Discover the story behind our passion for e-commerce and learning.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Founder Profile */}
          <div className="lg:w-1/2 bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <img
              src="Profile.png"
              alt="Abhay Bansal, Founder"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-md mb-4"
              loading="lazy"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Abhay Bansal
            </h2>
            <p className="text-gray-600 text-center text-sm mb-4">
              Founder of our e-commerce platform, dedicated to teaching MERN
              Stack through the <strong>6 Pack Programmer</strong> YouTube
              channel.
            </p>
            <button
              onClick={visitInstagram}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
              aria-label="Visit our Instagram profile"
            >
              <FaInstagram size={16} />
              Visit Instagram
            </button>
          </div>

          {/* Mission and Brands */}
          <div className="lg:w-1/2 space-y-8">
            {/* Mission Statement */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our platform is more than just an e-commerce site—it's a passion
                project by Abhay Bansal to demonstrate the power of the MERN
                Stack. Through our YouTube channel,{" "}
                <strong>6 Pack Programmer</strong>, we aim to educate and
                inspire developers worldwide while offering quality products to
                our customers.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Connect With Us
              </h2>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/_abhay__bansal_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-red-500 transition-colors duration-200"
                  aria-label="Visit our Instagram profile"
                >
                  <FaInstagram size={28} />
                </a>
                <a
                  href="https://linkedin.com/in/bansalabhay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-red-500 transition-colors duration-200"
                  aria-label="Visit our Instagram profile"
                >
                  <FaLinkedinIn size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
