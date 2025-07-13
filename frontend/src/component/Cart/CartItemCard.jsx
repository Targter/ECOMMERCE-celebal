

import React from "react";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

const CartItemCard = ({
  item,
  deleteCartItems,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 lg:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={() => deleteCartItems(item.product)}
          className="text-gray-800 hover:text-red-500 transition-colors duration-300 cursor-pointer"
        />
        <img className="w-32 h-32" src={item.image} alt={item.name} />
        <Link to={`/product/${item.product}`}>
          <h1 className="font-sans font-semibold">{item.name}</h1>
        </Link>
      </div>
      <div className="col-span-5 lg:col-span-3 flex items-center justify-between py-4 lg:py-0 px-4 lg:px-0 gap-6 lg:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ₹{item.price.toLocaleString()}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={() => decreaseQuantity(item.product, item.quantity)}
            className={`w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer transition-colors duration-300 border-[1px] border-gray-300 hover:border-gray-300 ${
              item.quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            -
          </span>
          <p>{item.quantity}</p>
          <span
            onClick={() =>
              increaseQuantity(item.product, item.quantity, item.stock)
            }
            className={`w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer transition-colors duration-300 border-[1px] border-gray-300 hover:border-gray-300 ${
              item.quantity >= item.stock ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-sans font-bold text-lg">
          <p>₹{(item.quantity * item.price).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
