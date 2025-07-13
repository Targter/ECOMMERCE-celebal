

import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const fullStars = Math.floor(product.ratings);
  const hasHalfStar = product.ratings % 1 >= 0.5;

  return (
    <Link
      to={`/product/${product._id}`}
      className="group bg-white rounded-lg shadow-md p-5 hover:shadow-lg border border-gray-100 hover:border-red-500 transition-all duration-300 transform hover:-translate-y-1"
      aria-label={`View details for ${product.name}`}
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={product.images?.[0]?.url || "/images/default-product.png"}
          alt={product.name}
          className="w-full h-48 sm:h-52 md:h-60 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <p
        className="text-base sm:text-lg font-semibold text-gray-800 mt-4 truncate"
        title={product.name}
      >
        {product.name}
      </p>
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <FaStar key={i} className="text-yellow-400" size={16} />;
          } else if (i === fullStars && hasHalfStar) {
            return (
              <FaStarHalfAlt key={i} className="text-yellow-400" size={16} />
            );
          } else {
            return <FaRegStar key={i} className="text-yellow-400" size={16} />;
          }
        })}
        <span className="ml-2 text-sm text-gray-500">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-base sm:text-lg font-semibold text-red-500">
          ₹{product.price.toLocaleString()}
        </span>
        <span
          className={`text-xs font-medium ${
            product.Stock < 1
              ? "text-red-500"
              : product.Stock <= 5
              ? "text-yellow-600"
              : "text-green-500"
          }`}
        >
          {product.Stock < 1
            ? "Out of Stock"
            : product.Stock <= 5
            ? "Low Stock"
            : "In Stock"}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
