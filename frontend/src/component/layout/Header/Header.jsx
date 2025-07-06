// import React from "react";
// import { ReactNavbar } from "overlay-navbar";
// import logo from "../../../images/logo.png";

// const options = {
//   burgerColorHover: "#eb4034",
//   burgerColor: "rgba(0,0,0,0.5)",
//   logo,
//   logoWidth: "20vmax",
//   navColor1: "rgba(0,0,0,0.4)",
//   logoHoverSize: "10px",
//   logoHoverColor: "#eb4034",
//   link1Text: "Home",
//   link2Text: "Products",
//   link3Text: "Contact",
//   link4Text: "About",
//   link1Url: "/",
//   link2Url: "/products",
//   link3Url: "/contact",
//   link4Url: "/about",
//   link1Size: "1.3vmax",
//   link1Color: "rgba(35, 35, 35,0.8)",
//   nav1justifyContent: "flex-end",
//   nav2justifyContent: "flex-end",
//   nav3justifyContent: "flex-start",
//   nav4justifyContent: "flex-start",
//   link1ColorHover: "#eb4034",
//   link1Margin: "1vmax",
//   profileIconUrl: "/login",
//   profileIconColor: "rgba(35, 35, 35,0.8)",
//   searchIconColor: "rgba(35, 35, 35,0.8)",
//   cartIconColor: "rgba(35, 35, 35,0.8)",
//   profileIconColorHover: "#eb4034",
//   searchIconColorHover: "#eb4034",
//   cartIconColorHover: "#eb4034",
//   cartIconMargin: "1vmax",
// };

// const Header = () => {
//   return <ReactNavbar {...options} />;
// };

// export default Header;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import logo from "../../../images/logo.png";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md w-full fixed top-0 px-3">
      <div className=" mx-auto px-6 py-1 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="E-commerce Logo"
            className="h-[70px] w-[150px] hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-red-500 text-lg font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-gray-700 hover:text-red-500 text-lg font-medium transition-colors duration-200"
          >
            Products
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-red-500 text-lg font-medium transition-colors duration-200"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-red-500 text-lg font-medium transition-colors duration-200"
          >
            About
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <Link
            to="/search"
            className="text-gray-700 hover:text-red-500 transition-colors duration-200"
          >
            <FiSearch size={24} />
          </Link>
          <Link
            to="/cart"
            className="text-gray-700 hover:text-red-500 transition-colors duration-200"
          >
            <FiShoppingCart size={24} />
          </Link>
          <Link
            to="/login"
            className="text-gray-700 hover:text-red-500 transition-colors duration-200"
          >
            <FiUser size={24} />
          </Link>
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 hover:text-red-500"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-gray-50 border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-red-500 text-lg font-medium"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-red-500 text-lg font-medium"
              onClick={toggleMobileMenu}
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-red-500 text-lg font-medium"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-red-500 text-lg font-medium"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
