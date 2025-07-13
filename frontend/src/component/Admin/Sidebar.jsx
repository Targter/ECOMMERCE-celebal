import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.png";
import {
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiPlusCircle,
  FiList,
  FiStar,
  FiChevronDown,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Sidebar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleProducts = () => setIsProductsOpen(!isProductsOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-red-100 text-red-600"
      : "text-gray-700 hover:bg-red-50 hover:text-red-600";

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Ecommerce" className="h-8" />
        </Link>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:relative inset-y-0 left-0 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-30 transition-transform duration-200 ease-in-out h-full w-64 bg-white shadow-md md:shadow-none`}
      >
        {/* Logo - Hidden on mobile */}
        <div className="p-4 border-b hidden md:block">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Ecommerce" className="h-10" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto h-[calc(100%-80px)]">
          <ul className="space-y-2">
            {/* Dashboard */}
            <li>
              <Link
                to="/admin/dashboard"
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive(
                  "/admin/dashboard"
                )}`}
              >
                <FiHome className="mr-3" size={18} />
                <span>Dashboard</span>
              </Link>
            </li>

            {/* Products Dropdown */}
            <li>
              <button
                onClick={toggleProducts}
                className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors duration-200 ${
                  isActive("/admin/products") || isActive("/admin/product/new")
                }`}
              >
                <div className="flex items-center">
                  <FiShoppingBag className="mr-3" size={18} />
                  <span>Products</span>
                </div>
                <FiChevronDown
                  className={`transition-transform duration-200 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <ul
                className={`pl-8 mt-1 space-y-1 ${
                  isProductsOpen ? "block" : "hidden"
                }`}
              >
                <li>
                  <Link
                    to="/admin/products"
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive(
                      "/admin/products"
                    )}`}
                  >
                    <FiList className="mr-3 text-sm" />
                    <span>All Products</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/product/new"
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive(
                      "/admin/product/new"
                    )}`}
                  >
                    <FiPlusCircle className="mr-3 text-sm" />
                    <span>Create Product</span>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Orders */}
            <li>
              <Link
                to="/admin/orders"
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive(
                  "/admin/orders"
                )}`}
              >
                <FiList className="mr-3" size={18} />
                <span>Orders</span>
              </Link>
            </li>

            {/* Users */}
            <li>
              <Link
                to="/admin/users"
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive(
                  "/admin/users"
                )}`}
              >
                <FiUsers className="mr-3" size={18} />
                <span>Users</span>
              </Link>
            </li>

            {/* Reviews */}
            <li>
              <Link
                to="/admin/reviews"
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive(
                  "/admin/reviews"
                )}`}
              >
                <FiStar className="mr-3" size={18} />
                <span>Reviews</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;
