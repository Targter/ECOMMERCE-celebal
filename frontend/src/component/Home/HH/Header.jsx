import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import {
  FaUser,
  FaListAlt,
  FaShoppingCart,
  FaSignOutAlt,
  FaTachometerAlt,
  FaCaretDown,
} from "react-icons/fa";
import { LogoImageee } from "../../../assets/images";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../reducers/store/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { navBarList } from "../../../constants";
import Flex from "../../designLayouts/Flex";
import Image from "../../designLayouts/Image";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const userMenuRef = useRef();

  // Responsive menu handling
  useEffect(() => {
    const ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
    return () => window.removeEventListener("resize", ResponsiveMenu);
  }, []);

  // Click outside to close user menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // User menu options
  const userOptions = [
    { icon: <FaListAlt />, name: "Orders", func: () => navigate("/orders") },
    { icon: <FaUser />, name: "Profile", func: () => navigate("/account") },
    {
      icon: (
        <FaShoppingCart
          style={{ color: cartItems.length > 0 ? "#EF4444" : "inherit" }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      func: () => navigate("/cart"),
    },
    { icon: <FaSignOutAlt />, name: "Logout", func: logoutUser },
  ];

  if (user?.role === "admin") {
    userOptions.unshift({
      icon: <FaTachometerAlt />,
      name: "Admin Dashboard",
      func: () => navigate("/admin/dashboard"),
    });
  }

  async function logoutUser() {
    await dispatch(logout());
    setShowUserMenu(false);
    navigate("/");
  }

  // Stylish name display
  const renderUserName = () => {
    if (!isAuthenticated || !user?.name) return null;

    const nameParts = user.name.split(" ");
    const firstName = nameParts[0];
    const lastName =
      nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

    return (
      <div className="flex items-center">
        <div className="relative group">
          <div className="flex items-center space-x-1 cursor-pointer">
            <span className="font-medium text-gray-800 group-hover:text-red-600 transition-colors">
              {firstName}
            </span>
            {lastName && (
              <span className="font-medium text-gray-600 group-hover:text-red-500 transition-colors">
                {lastName}
              </span>
            )}
            <FaCaretDown className="text-gray-500 group-hover:text-red-600 transition-colors" />
          </div>
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full py-3">
          {/* Logo */}
          <Link to="/" className="group relative inline-block">
            <div className="flex items-center">
              <Image className="w-10 h-10" imgSrc={LogoImageee} />
              <span className="ml-2 text-xl font-bold text-gray-800">
                BuyMe
              </span>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-max px-3 py-1 bg-black/80 backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-medium">
              Update with Trend
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center">
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center w-auto z-50 p-0 gap-1"
              >
                {navBarList.map(({ _id, title, link }) => (
                  <NavLink
                    key={_id}
                    className="flex font-normal hover:font-medium h-8 justify-center items-center px-3 text-base text-gray-600 hover:text-gray-900 hover:underline underline-offset-4 decoration-1 md:border-r border-r-gray-200 last:border-r-0 transition-all duration-200"
                    to={link}
                    state={{ data: location.pathname.split("/")[1] }}
                  >
                    <li>{title}</li>
                  </NavLink>
                ))}

                {/* User Menu */}
                <div
                  ref={userMenuRef}
                  className="relative flex items-center group cursor-pointer ml-4"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center text-red-600 border border-red-200">
                      <FaUser className="text-sm" />
                    </div>
                    {isAuthenticated && renderUserName()}
                  </div>

                  {showUserMenu && (
                    <motion.ul
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-12 right-0 w-56 bg-white rounded-lg shadow-xl py-2 z-[1000] border border-gray-100"
                    >
                      {isAuthenticated ? (
                        <>
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-800">
                              {user?.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user?.email}
                            </p>
                          </div>
                          {userOptions.map((item) => (
                            <li
                              key={item.name}
                              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                item.func();
                                setShowUserMenu(false);
                              }}
                            >
                              <span className="mr-3 text-red-500">
                                {item.icon}
                              </span>
                              <span className="text-sm font-medium">
                                {item.name}
                              </span>
                            </li>
                          ))}
                        </>
                      ) : (
                        <>
                          <li
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/login");
                              setShowUserMenu(false);
                            }}
                          >
                            <span className="mr-3 text-red-500">
                              <FaUser />
                            </span>
                            <span className="text-sm font-medium">Login</span>
                          </li>
                          <li
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/login");
                              setShowUserMenu(false);
                            }}
                          >
                            <span className="mr-3 text-red-500">
                              <FaUser />
                            </span>
                            <span className="text-sm font-medium">Sign Up</span>
                          </li>
                        </>
                      )}
                    </motion.ul>
                  )}
                </div>
              </motion.ul>
            )}

            {/* Mobile Menu Button */}
            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className="inline-block md:hidden cursor-pointer w-8 h-6 ml-4 text-gray-600 hover:text-red-600 transition-colors"
            />
          </div>
        </Flex>

        {/* Mobile Side Menu */}
        {sidenav && (
          <div className="fixed inset-0 z-[1000] bg-black bg-opacity-50">
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-4/5 h-full bg-white relative"
            >
              <div className="p-6 h-full overflow-y-auto">
                {/* Close Button */}
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => setSidenav(false)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <MdClose className="text-2xl text-gray-500" />
                  </button>
                </div>

                {/* User Profile */}
                {isAuthenticated && (
                  <div className="flex items-center mb-6 pb-6 border-b border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center text-red-600 border border-red-200 mr-3">
                      <FaUser className="text-lg" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {user?.name}
                      </h3>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <ul className="space-y-4">
                  {navBarList.map((item) => (
                    <li key={item._id}>
                      <NavLink
                        to={item.link}
                        className="block py-2 text-gray-700 hover:text-red-600 transition-colors font-medium"
                        onClick={() => setSidenav(false)}
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                {/* User Menu */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  {isAuthenticated ? (
                    <ul className="space-y-3">
                      {userOptions.map((item) => (
                        <li key={item.name}>
                          <button
                            onClick={() => {
                              item.func();
                              setSidenav(false);
                            }}
                            className="flex items-center w-full py-2 text-gray-700 hover:text-red-600 transition-colors"
                          >
                            <span className="mr-3 text-red-500">
                              {item.icon}
                            </span>
                            <span className="font-medium">{item.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          navigate("/login");
                          setSidenav(false);
                        }}
                        className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          navigate("/login");
                          setSidenav(false);
                        }}
                        className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:border-red-500 hover:text-red-600 transition-colors font-medium"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>

                {/* Categories */}
                <div className="mt-8">
                  <button
                    onClick={() => setCategory(!category)}
                    className="flex justify-between items-center w-full py-2 text-gray-700 font-medium"
                  >
                    <span>Shop by Category</span>
                    <span>{category ? "−" : "+"}</span>
                  </button>
                  {category && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 mt-2 space-y-2 overflow-hidden"
                    >
                      {[
                        "New Arrivals",
                        "Gadgets",
                        "Accessories",
                        "Electronics",
                        "Others",
                      ].map((cat) => (
                        <li key={cat}>
                          <a
                            href="#"
                            className="block py-1 text-gray-600 hover:text-red-600 transition-colors text-sm"
                          >
                            {cat}
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>

                {/* Brands */}
                <div className="mt-4">
                  <button
                    onClick={() => setBrand(!brand)}
                    className="flex justify-between items-center w-full py-2 text-gray-700 font-medium"
                  >
                    <span>Shop by Brand</span>
                    <span>{brand ? "−" : "+"}</span>
                  </button>
                  {brand && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 mt-2 space-y-2 overflow-hidden"
                    >
                      {["Apple", "Samsung", "Sony", "Nike", "Adidas"].map(
                        (brand) => (
                          <li key={brand}>
                            <a
                              href="#"
                              className="block py-1 text-gray-600 hover:text-red-600 transition-colors text-sm"
                            >
                              {brand}
                            </a>
                          </li>
                        )
                      )}
                    </motion.ul>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
