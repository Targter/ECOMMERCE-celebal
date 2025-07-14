import React, { useState } from "react";
import { FaShoppingCart, FaSpinner } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import { toast } from "react-toastify";
import Image from "../../../designLayouts/Image";
import Badge from "./Badge";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../../../reducers/store/slice/cartSlice";

const Product = (props) => {
  const dispatch = useDispatch();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await dispatch(
        addItemsToCart({
          id: props._id,
          quantity: 1,
          name: props.productName,
          price: props.price,
          image: props.img,
        })
      ).unwrap();

      toast.success(`${props.productName} added to cart!`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.error(error.message || "Failed to add item to cart", {
        position: "bottom-right",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div
      className="w-full relative group border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-square flex items-center justify-center bg-gray-50">
          <Image
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            imgSrc={props.img || "/default-product-image.png"}
            alt={props.productName}
          />
        </div>

        {props.badge && (
          <div className="absolute top-3 left-3">
            <Badge text="New" />
          </div>
        )}

        {/* Action buttons */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white transition-all duration-300 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex flex-col p-2">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium rounded-md mb-2 transition-colors ${
                isAddingToCart
                  ? "bg-gray-200 text-gray-600"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isAddingToCart ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  Add to Cart
                  <FaShoppingCart />
                </>
              )}
            </button>

            <Link
              to={`/product/${props._id}`}
              className="flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium text-gray-700 hover:text-black border border-gray-300 rounded-md hover:border-black transition-colors"
            >
              View Details
              <MdOutlineLabelImportant />
            </Link>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-md font-semibold text-gray-900 truncate">
            {props.productName}
          </h3>
          <p className="text-lg font-bold text-gray-900">₹{props.price}</p>
        </div>
        <p className="text-sm text-gray-500">{props.color}</p>

        {props.stock <= 10 && (
          <p className="text-xs text-orange-500 mt-1">
            Only {props.stock} left in stock!
          </p>
        )}
      </div>
    </div>
  );
};

export default Product;
