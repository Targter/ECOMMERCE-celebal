import React from "react";
import {
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

const About = () => {
  const visitInstagram = () => {
    window.open(
      "https://instagram.com/_abhay__bansal_",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const visitPortfolio = () => {
    window.open("https://www.abhaybansal.in/", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 ">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 animate-fade-in">
            About Me
          </h1>
          <p className="text-lg text-gray-600 mt-4 animate-fade-in">
            Full Stack Developer | MERN Stack Expert | Content Creator
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
              Full Stack Developer specializing in MERN Stack. Creator of the{" "}
              <strong>6 Pack Programmer</strong> YouTube channel where I teach
              web development. Currently working on innovative e-commerce
              solutions and open-source projects.
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={visitInstagram}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                aria-label="Visit my Instagram profile"
              >
                <FaInstagram size={16} />
                Instagram
              </button>
              <button
                onClick={visitPortfolio}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                aria-label="Visit my portfolio"
              >
                Portfolio
              </button>
            </div>
          </div>

          {/* Mission and Brands */}
          <div className="lg:w-1/2 space-y-8">
            {/* Mission Statement */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                My Journey
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                With expertise in React, Node.js, MongoDB, and Express, I build
                scalable web applications. Through my YouTube channel, I've
                helped thousands of students learn web development. My passion
                lies in creating developer tools, e-commerce solutions, and
                educational content.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mt-3">
                I believe in learning by building real projects, which is why I
                created this e-commerce platform to demonstrate full-stack
                development in action.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Connect With Me
              </h2>
              <div className="flex gap-4 justify-center">
                <a
                  href="https://instagram.com/_abhay__bansal_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-red-500 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram size={28} />
                </a>
                <a
                  href="https://linkedin.com/in/bansalabhay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={28} />
                </a>
                <a
                  href="https://github.com/targter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <FaGithub size={28} />
                </a>
                <a
                  href="https://x.com/Abcheckk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-400 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <FaTwitter size={28} />
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
