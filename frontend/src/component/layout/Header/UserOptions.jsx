import React, { useState } from "react";
// import "./Header.css";
import {
  FaUser,
  FaListAlt,
  FaShoppingCart,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../reducers/store/slice/userSlice";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = [
    { icon: <FaListAlt />, name: "Orders", func: () => navigate("/orders") },
    { icon: <FaUser />, name: "Profile", func: () => navigate("/account") },
    {
      icon: (
        <FaShoppingCart
          style={{ color: cartItems.length > 0 ? "tomato" : "inherit" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: () => navigate("/cart"),
    },
    { icon: <FaSignOutAlt />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <FaTachometerAlt />,
      name: "Dashboard",
      func: () => navigate("/admin/dashboard"),
    });
  }

  function logoutUser() {
    dispatch(logout());
    setIsOpen(false);
    // You can add toast notification here if needed
  }

  return (
    <div className="absolute right-0 top-6">
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="User menu"
      >
        <img
          src={user.avatar?.url || "/Profile.png"}
          alt="User profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          {options.map((item) => (
            <button
              key={item.name}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors duration-200"
              onClick={() => {
                item.func();
                setIsOpen(false);
              }}
            >
              <span className="mr-2">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOptions;
