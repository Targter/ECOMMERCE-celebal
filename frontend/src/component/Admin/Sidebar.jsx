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
  FiLogOut,
  FiSettings,
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
    location.pathname.startsWith(path)
      ? "bg-red-50 text-red-600 font-medium"
      : "text-gray-600 hover:bg-red-50 hover:text-red-600";

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden  md:p-4  bg-white border-b z-20">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed  md:sticky top-0 left-0 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-30 transition-transform duration-200 ease-in-out h-auto w-54 bg-white border-r flex flex-col`}
      >
        {/* Logo */}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 pl-0 pr-0">
          <ul className="space-y-1">
            {/* Dashboard */}
            <li>
              <Link
                to="/admin/dashboard"
                className={`flex items-center p-3 rounded-lg transition-colors ${isActive(
                  "/admin/dashboard"
                )}`}
              >
                <FiHome className="mr-3 flex-shrink-0" size={18} />
                <span>Dashboard</span>
              </Link>
            </li>

            {/* Products Dropdown */}
            <li>
              <button
                onClick={toggleProducts}
                className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${isActive(
                  "/admin/products"
                )}`}
                aria-expanded={isProductsOpen}
              >
                <div className="flex items-center">
                  <FiShoppingBag className="mr-3 flex-shrink-0" size={18} />
                  <span>Products</span>
                </div>
                <FiChevronDown
                  className={`transition-transform duration-200 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`pl-8 overflow-hidden transition-all duration-200 ${
                  isProductsOpen ? "max-h-40 mt-1" : "max-h-0"
                }`}
              >
                <ul className="space-y-1 py-1">
                  <li>
                    <Link
                      to="/admin/products"
                      className={`flex items-center p-2 rounded-lg transition-colors ${isActive(
                        "/admin/products"
                      )}`}
                    >
                      <FiList className="mr-3 text-sm flex-shrink-0" />
                      <span>All Products</span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      // to="/admin/product/new"
                      className={`flex items-center p-2 rounded-lg transition-colors ${isActive(
                        "/admin/product/new"
                      )}`}
                    >
                      <FiPlusCircle className="mr-3 text-sm flex-shrink-0" />
                      <span>Create Product</span>
                    </Link>
                  </li> */}
                </ul>
              </div>
            </li>

            {/* Orders */}
            <li>
              <Link
                to="/admin/orders"
                className={`flex items-center p-3 rounded-lg transition-colors ${isActive(
                  "/admin/orders"
                )}`}
              >
                <FiList className="mr-3 flex-shrink-0" size={18} />
                <span>Orders</span>
              </Link>
            </li>

            {/* Users */}
            <li>
              <Link
                to="/admin/users"
                className={`flex items-center p-3 rounded-lg transition-colors ${isActive(
                  "/admin/users"
                )}`}
              >
                <FiUsers className="mr-3 flex-shrink-0" size={18} />
                <span>Users</span>
              </Link>
            </li>

            {/* Reviews */}
            <li>
              <Link
                to="/admin/reviews"
                className={`flex items-center p-3 rounded-lg transition-colors ${isActive(
                  "/admin/reviews"
                )}`}
              >
                <FiStar className="mr-3 flex-shrink-0" size={18} />
                <span>Reviews</span>
              </Link>
            </li>

            {/* Settings */}
            <li>
              <Link
                to="/admin/settings"
                className={`flex items-center p-3 rounded-lg transition-colors ${isActive(
                  "/admin/settings"
                )}`}
              >
                <FiSettings className="mr-3 flex-shrink-0" size={18} />
                <span>Settings</span>
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
