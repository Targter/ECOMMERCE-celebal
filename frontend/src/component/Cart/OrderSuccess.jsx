import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const OrderSuccess = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center p-6"
    >
      <div className="flex flex-col items-center gap-4">
        <FaCheckCircle className="text-green-500 w-16 h-16 sm:w-20 sm:h-20" />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 text-lg sm:text-xl">
          Thank you for your purchase. Your order has been confirmed.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Link
          to="/orders"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 text-center"
        >
          View Your Orders
        </Link>

        <Link
          to="/shop"
          className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-300 text-center"
        >
          Continue Shopping
        </Link>
      </div>

      <p className="text-gray-500 mt-6">
        You'll receive a confirmation email with your order details shortly.
      </p>
    </motion.div>
  );
};

export default OrderSuccess;
