// import React from "react";
// import playStore from "../../../images/playstore.png";
// import appStore from "../../../images/Appstore.png";
// import "./Footer.css";

// const Footer = () => {
//   return (
//     <footer id="footer">
//       <div className="leftFooter">
//         <h4>DOWNLOAD OUR APP</h4>
//         <p>Download App for Android and IOS mobile phone</p>
//         <img src={playStore} alt="playstore" />
//         <img src={appStore} alt="Appstore" />
//       </div>

//       <div className="midFooter">
//         <h1>ECOMMERCE.</h1>
//         <p>High Quality is our first priority</p>

//         <p>Copyrights 2021 &copy; MeAbhiSingh</p>
//       </div>

//       <div className="rightFooter">
//         <h4>Follow Us</h4>
//         <a href="http://instagram.com/meabhisingh">Instagram</a>
//         <a href="http://youtube.com/6packprogramemr">Youtube</a>
//         <a href="http://instagram.com/meabhisingh">Facebook</a>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

//

import React from "react";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: App Download */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold mb-4">Download Our App</h4>
          <p className="text-gray-300 mb-4 text-center md:text-left">
            Get our app for Android and iOS devices
          </p>
        </div>

        {/* Middle Section: Branding & Copyright */}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">ECOMMERCE</h1>
          <p className="text-gray-300 mb-4">High Quality is Our Priority</p>
          <p className="text-gray-400 text-sm">
            Copyright &copy; 2025 Ecommerce. All rights reserved.
          </p>
        </div>

        {/* Right Section: Social Media */}
        <div className="flex flex-col items-center md:items-end">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex flex-col space-y-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-red-500 transition-colors duration-200"
            >
              <FaInstagram size={20} />
              <span>Instagram</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-red-500 transition-colors duration-200"
            >
              <FaYoutube size={20} />
              <span>YouTube</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-red-500 transition-colors duration-200"
            >
              <FaFacebook size={20} />
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/**
 * 
 * 
 * 
 * import React, { useState } from "react";
import { FaInstagram, FaYoutube, FaFacebook, FaArrowUp, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Handle newsletter subscription (mock implementation)
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      // Add toast notification or API call here for real subscription
      setTimeout(() => setSubscribed(false), 3000); // Reset subscription message
    }
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white py-12 relative">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="flex flex-col items-center sm:items-start">
          <h4 className="text-lg font-semibold mb-4">Download Our App</h4>
          <p className="text-gray-300 mb-4 text-center sm:text-left">
            Shop on the go with our Android and iOS apps
          </p>
          <div className="flex space-x-4">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on Google Play"
            >
              <img
                src="/images/playstore.png"
                alt="Google Play Store"
                className="h-12 hover:scale-105 transition-transform duration-300"
              />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
            >
              <img
                src="/images/Appstore.png"
                alt="Apple App Store"
                className="h-12 hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col space-y-2">
            <a
              href="/products"
              className="text-gray-300 hover:text-red-500 transition-colors duration-200"
            >
              Products
            </a>
            <a
              href="/about"
              className="text-gray-300 hover:text-red-500 transition-colors duration-200"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="text-gray-300 hover:text-red-500 transition-colors duration-200"
            >
              Contact
            </a>
            <a
              href="/faq"
              className="text-gray-300 hover:text-red-500 transition-colors duration-200"
            >
              FAQ
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <div className="flex flex-col space-y-2 text-gray-300">
            <p>Email: support@ecommerce.com</p>
            <p>Phone: +1 (800) 123-4567</p>
            <p>Address: 123 Commerce St, City, Country</p>
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-red-500 transition-colors duration-200"
              aria-label="Follow on Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-red-500 transition-colors duration-200"
              aria-label="Follow on YouTube"
            >
              <FaYoutube size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-red-500 transition-colors duration-200"
              aria-label="Follow on Facebook"
            >
              <FaFacebook size={24} />
            </a>
          </div>
          <h4 className="text-lg font-semibold mb-2">Newsletter</h4>
          <form onSubmit={handleSubscribe} className="flex flex-col w-full">
            <div className="flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-3 py-2 rounded-l-md bg-gray-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                aria-label="Newsletter email input"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded-r-md hover:bg-red-600 transition-colors duration-200"
                aria-label="Subscribe to newsletter"
              >
                <FaEnvelope />
              </button>
            </div>
            {subscribed && (
              <p className="text-green-400 text-sm mt-2 animate-fade-in">
                Subscribed successfully!
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-gray-400 text-sm">
          Copyright © 2025 Ecommerce. All rights reserved.
        </p>
        <button
          onClick={scrollToTop}
          className="absolute right-4 bottom-4 p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
 */
