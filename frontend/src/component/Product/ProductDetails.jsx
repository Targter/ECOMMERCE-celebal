import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
// import {
//   clearErrors,
//   getProductDetails,
//   newReview,
// } from "../../actions/productAction.js";

import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../reducers/store/slice/productSlice.js";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader.jsx";
import MetaData from "../layout/MetaData.jsx";
// import { addItemsToCart } from "../../actions/cartAction.js";
import { addItemsToCart } from "../../reducers/store/slice/cartSlice.js";
import ReviewDialog from "./ReviewDialog.jsx";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading, error } = useSelector((state) => state.product);
  const { success, error: reviewError } = useSelector((state) => state.product);

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const adjustQuantity = (amount) => {
    console.log("called....");
    console.log("pStockLL", product.Stock);
    setQuantity((prev) => {
      const newQty = prev + amount;
      if (newQty < 1) return 1;
      if (product?.Stock && newQty > product.Stock) return product.Stock;
      return newQty;
    });

    console.log("quntity:", quantity);
  };

  const addToCartHandler = () => {
    console.log("id:", id);
    if (id && quantity > 0) {
      dispatch(addItemsToCart({ id, quantity }));
    }
  };

  const submitReviewToggle = () => setOpen(!open);

  useEffect(() => {
    if (error || reviewError) {
      dispatch(clearErrors());
    }
    if (success) {
      // dispatch({ type: NEW_REVIEW_RESET });
    }
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id, error, reviewError, success]);

  const renderRatingStars = (ratingValue) => {
    const stars = [];
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  if (loading) return <Loader />;
  if (!product)
    return (
      <div className="text-center text-gray-600 text-xl">Product not found</div>
    );

  return (
    <Fragment>
      <MetaData title={`${product.name} | ECOMMERCE`} />
      <div className="container mx-auto px-4 py-10 mt-[100px] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-lg group">
              <img
                src={
                  product.images?.[currentImage]?.url ||
                  "/images/default-product.png"
                }
                alt={`${product.name} - View ${currentImage + 1}`}
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300 z-0"
                loading="lazy"
              />
            </div>
            <div className="flex mt-4 space-x-2 overflow-x-auto">
              {product.images?.map((item, i) => (
                <img
                  key={i}
                  src={item.url || "/images/default-product.png"}
                  alt={`${product.name} - Thumbnail ${i + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    currentImage === i ? "border-red-500" : "border-gray-200"
                  } hover:border-red-500 transition-all duration-200`}
                  onClick={() => setCurrentImage(i)}
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-6 ">
            <div className="border-b pb-4">
              <h2 className="text-3xl font-bold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Product # {product._id}
              </p>
            </div>

            <div className="flex items-center">
              {renderRatingStars(product.ratings)}
              <span className="ml-2 text-gray-500">
                ({product.numOfReviews} Reviews)
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-semibold text-red-500">
                ₹{product.price.toLocaleString()}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => adjustQuantity(-1)}
                    className="px-3 py-2 text-gray-700 hover:bg-gray-100"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-16 text-center border-none focus:outline-none"
                    aria-label="Quantity"
                  />
                  <button
                    onClick={() => adjustQuantity(1)}
                    className="px-3 py-2 text-gray-700 hover:bg-gray-100"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={addToCartHandler}
                  disabled={product.Stock < 1}
                  className={`px-6 py-2 rounded-md text-white font-medium ${
                    product.Stock < 1
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  } transition-colors duration-200`}
                >
                  Add to Cart
                </button>
              </div>
              <p className="text-gray-700">
                Status:{" "}
                <span
                  className={
                    product.Stock < 1 ? "text-red-500" : "text-green-500"
                  }
                >
                  {product.Stock < 1 ? "Out of Stock" : "In Stock"}
                </span>
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Description
              </h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            <button
              onClick={submitReviewToggle}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Submit Review
            </button>
          </div>
        </div>

        {/* Sticky Add to Cart Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-red-500 shadow-lg p-4 lg:hidden">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => adjustQuantity(-1)}
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 text-center English center border-none focus:outline-none"
                  aria-label="Quantity"
                />
                <button
                  onClick={() => adjustQuantity(1)}
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-lg font-semibold text-red-500">
                ₹{product.price.toLocaleString()}
              </span>
            </div>
            <button
              onClick={addToCartHandler}
              disabled={product.Stock < 1}
              className={`px-6 py-2 rounded-md text-white font-medium ${
                product.Stock < 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              } transition-colors duration-200`}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 w-full pt-[100px]  pb-[100px] ">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 mt-6">
            Reviews
          </h3>
          {product.reviews?.length > 0 ? (
            <div className="relative">
              <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {(showAllReviews ? product.reviews : product.reviews).map(
                  (review) => (
                    <div
                      key={review._id}
                      className="flex-shrink-0 w-80 snap-start"
                    >
                      <ReviewCard review={review} />
                    </div>
                  )
                )}
              </div>
              {product.reviews.length > 5 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="mt-4 flex items-center mx-auto text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
                >
                  {showAllReviews ? (
                    <>
                      Show Less <FaChevronUp className="ml-2" />
                    </>
                  ) : (
                    <>
                      Show More <FaChevronDown className="ml-2" />
                    </>
                  )}
                </button>
              )}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No Reviews Yet</p>
          )}
        </div>

        {/* Review Dialog */}
        <div className="">
          {" "}
          <ReviewDialog
            open={open}
            onClose={submitReviewToggle}
            onSubmit={({ rating, comment }) => {
              const formData = new FormData();
              formData.set("rating", rating);
              formData.set("comment", comment);
              formData.set("productId", id);
              dispatch(newReview(formData));
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
