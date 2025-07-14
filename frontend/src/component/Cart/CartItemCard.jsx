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
    <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Product Image and Name */}
      <div className="flex col-span-1 md:col-span-2 items-center gap-4">
        <ImCross
          onClick={() => deleteCartItems(item.product)}
          className="text-gray-500 hover:text-red-500 transition-colors duration-200 cursor-pointer flex-shrink-0"
          title="Remove item"
        />
        <img
          className="w-20 h-20 md:w-24 md:h-24 object-contain rounded"
          src={item.image}
          alt={item.name}
          onError={(e) => {
            e.target.src = "/placeholder-product.png";
            e.target.className =
              "w-20 h-20 md:w-24 md:h-24 object-cover rounded bg-gray-100";
          }}
        />
        <Link to={`/product/${item.product}`} className="min-w-0">
          <h2 className="font-medium text-gray-800 hover:text-primeColor line-clamp-2">
            {item.name}
          </h2>
        </Link>
      </div>

      {/* Price, Quantity and Total */}
      <div className="col-span-1 md:col-span-3 grid grid-cols-3 items-center gap-4 md:gap-8">
        {/* Price */}
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-500 md:hidden">Price</p>
          <p className="font-medium text-gray-800">
            ₹{item.price.toLocaleString()}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-500 md:hidden mb-1">Quantity</p>
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => decreaseQuantity(item.product, item.quantity)}
              disabled={item.quantity <= 1}
              className={`w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors ${
                item.quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() =>
                increaseQuantity(item.product, item.quantity, item.stock)
              }
              disabled={item.quantity >= item.stock}
              className={`w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors ${
                item.quantity >= item.stock
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-500 md:hidden">Total</p>
          <p className="font-semibold text-gray-900">
            ₹{(item.quantity * item.price).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
