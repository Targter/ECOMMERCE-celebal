

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import {
  FaUser,
  FaListAlt,
  FaShoppingCart,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../reducers/store/slice/userSlice";

const SpecialCase = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      name: "Dashboard",
      func: () => navigate("/admin/dashboard"),
    });
  }

  function logoutUser() {
    dispatch(logout());
    setShowUserMenu(false);
  }

  return (
    <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
      <div className="relative">
        <Link to="/account">
          {" "}
          <div
            className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-md overflow-x-hidden group cursor-pointer"
            // onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="flex justify-center items-center">
              <FaUser className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
              <FaUser className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
            </div>
            <p className="text-xs font-semibold font-sans">Profile</p>
          </div>
        </Link>
        {showUserMenu && (
          <motion.ul
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
          >
            {userOptions.map((item) => (
              <li
                key={item.name}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors duration-300 cursor-pointer"
                onClick={() => {
                  item.func();
                  setShowUserMenu(false);
                }}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="text-sm font-sans font-semibold">
                  {item.name}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
      <Link to="/cart">
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-md overflow-x-hidden group cursor-pointer relative">
          <div className="flex justify-center items-center">
            <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
            <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-sans">Buy Now</p>
          {cartItems.length > 0 && (
            <p className="absolute top-1 right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {cartItems.length}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default SpecialCase;
