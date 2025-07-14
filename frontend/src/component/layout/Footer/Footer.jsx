import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { paymentCard } from "../../../assets/images";
import Image from "../../designLayouts/Image";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = (e) => {
    e.preventDefault();
    if (emailInfo === "") {
      setErrMsg("Please provide an Email!");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please enter a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
      setTimeout(() => setSubscription(false), 5000);
    }
  };

  const socialLinks = [
    {
      icon: <FaYoutube />,
      url: "https://www.youtube.com/@reactjsBD",
      color: "bg-red-600",
    },
    {
      icon: <FaGithub />,
      url: "https://github.com/noorjsdivs",
      color: "bg-gray-800",
    },
    {
      icon: <FaFacebook />,
      url: "https://www.facebook.com/Noorlalu143/",
      color: "bg-blue-600",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/noor-mohammad-ab2245193/",
      color: "bg-blue-700",
    },
  ];

  const shopLinks = [
    "Accessories",
    "Clothes",
    "Electronics",
    "Home Appliances",
    "New Arrivals",
  ];

  const accountLinks = [
    "Profile",
    "Orders",
    "Addresses",
    "Account Details",
    "Payment Options",
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About Section */}
          <div className="space-y-6">
            <FooterListTitle title="About aCommerce" />
            <p className="text-gray-600 leading-relaxed">
              Your premier destination for quality products and exceptional
              service. We're committed to bringing you the best shopping
              experience with fast delivery and excellent customer support.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Social link ${index + 1}`}
                  className={`${link.color} w-10 h-10 text-white rounded-full flex items-center justify-center hover:scale-110 transform transition-all duration-300 shadow-md hover:shadow-lg`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <FooterListTitle title="Shop Categories" />
            <nav aria-label="Shop navigation">
              <ul className="mt-4 space-y-3">
                {shopLinks.map((item, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300 group"
                    >
                      <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Account Links */}
          <div>
            <FooterListTitle title="Your Account" />
            <nav aria-label="Account navigation">
              <ul className="mt-4 space-y-3">
                {accountLinks.map((item, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300 group"
                    >
                      <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <FooterListTitle title="Stay Updated" />
            <div>
              <p className="text-gray-600 mb-4">
                Subscribe to our newsletter for exclusive deals and updates.
              </p>

              {subscription ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center p-4 bg-green-50 rounded-xl text-green-700 border border-green-200 shadow-sm"
                >
                  <FaEnvelope className="mr-3 text-lg" />
                  <span className="font-medium">
                    Thank you for subscribing!
                  </span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscription} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={emailInfo}
                      onChange={(e) => setEmailInfo(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-5 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                      aria-label="Email for newsletter subscription"
                    />
                    <FaEnvelope className="absolute right-4 top-3.5 text-gray-400" />
                  </div>
                  {errMsg && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 font-medium"
                    >
                      {errMsg}
                    </motion.p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center"
                  >
                    Subscribe Now
                    <FaArrowRight className="ml-2 text-sm" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Payment Methods and Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="w-full md:w-auto">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                We Accept
              </h3>
              <Image
                className="w-full max-w-xs"
                imgSrc={paymentCard}
                alt="Payment methods"
              />
            </div>

            <div className="text-center md:text-right space-y-2">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} aCommerce Shop. All rights
                reserved.
              </p>
              <div className="flex justify-center md:justify-end space-x-4 text-xs text-gray-400">
                <a href="#" className="hover:text-gray-600">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-gray-600">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-gray-600">
                  Shipping Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
