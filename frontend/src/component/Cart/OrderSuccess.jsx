import React from "react";
import { FaCheckCircle } from "react-icons/fa";

import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess ">
      <FaCheckCircle
        size={24}
        color="green"
        className="sm:w-11 sm:h-11 text-black"
      />
      <div>Your Order has been Placed successfully </div>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
