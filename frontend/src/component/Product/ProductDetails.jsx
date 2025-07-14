import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../reducers/store/slice/productSlice.js";
import { addItemsToCart } from "../../reducers/store/slice/cartSlice.js";
import ReviewCard from "./ReviewCard";
import ReviewDialog from "./ReviewDialog.jsx";
import Loader from "../layout/Loader/Loader.jsx";
import MetaData from "../layout/MetaData.jsx";
import Products from "./Products.jsx";
import Breadcrumbs from "../Breadcrumbs.jsx";
import { Link } from "react-router-dom";

const ProductsOnSale = ({ relatedProducts }) => {
  return (
    <div className="mb-6">
      <h3 className="font-sans text-lg sm:text-xl font-semibold mb-3 sm:mb-4 underline underline-offset-4 decoration-1">
        You Might Also Like
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {relatedProducts?.map((item) => (
          <Link to={`/product/${item._id}`} key={item._id} className="group">
            <div className="flex flex-col items-center border border-gray-200 rounded-lg p-2 sm:p-3 group-hover:shadow-md transition-shadow">
              <div className="mb-2">
                <img
                  className="w-full h-24 sm:h-32 object-contain"
                  src={item.images?.[0]?.url || "/images/default-product.png"}
                  alt={item.name}
                />
              </div>
              <div className="text-center">
                <p className="text-xs sm:text-sm font-medium line-clamp-1">{item.name}</p>
                <p className="text-xs sm:text-sm font-semibold text-red-500 mt-1">
                  ₹{item.price.toLocaleString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const ProductInfo = ({
  product,
  quantity,
  setQuantity,
  addToCartHandler,
  submitReviewToggle,
}) => {
  const adjustQuantity = (amount) => {
    setQuantity((prev) => {
      const newQty = prev + amount;
      if (newQty < 1) return 1;
      if (product?.Stock && newQty > product.Stock) return product.Stock;
      return newQty;
    });
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold font-sans">
        {product.name}
      </h2>
      <p className="text-lg font-semibold text-red-500">
        ₹{product.price.toLocaleString()}
      </p>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) =>
          i < Math.floor(product.ratings) ? (
            <FaStar key={i} className="text-yellow-400 text-sm" />
          ) : i < Math.ceil(product.ratings) && product.ratings % 1 >= 0.5 ? (
            <FaStarHalfAlt key={i} className="text-yellow-400 text-sm" />
          ) : (
            <FaRegStar key={i} className="text-yellow-400 text-sm" />
          )
        )}
        <span className="ml-2 text-gray-500 text-sm">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <p className="text-sm text-gray-600 line-clamp-3 sm:line-clamp-4">
        {product.description}
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
        <div className="flex items-center border rounded-md w-full sm:w-auto">
          <button
            onClick={() => adjustQuantity(-1)}
            className="px-2 sm:px-3 py-1 sm:py-2 text-gray-700 hover:bg-gray-100"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            className="w-10 sm:w-12 text-center border-none focus:outline-none"
            aria-label="Quantity"
          />
          <button
            onClick={() => adjustQuantity(1)}
            className="px-2 sm:px-3 py-1 sm:py-2 text-gray-700 hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          onClick={addToCartHandler}
          disabled={product.Stock < 1}
          className={`w-full py-2 sm:py-3 rounded-md text-white font-medium font-sans ${
            product.Stock < 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          } transition-colors duration-200`}
        >
          Add to Cart
        </button>
      </div>
      <button
        onClick={submitReviewToggle}
        className="w-full py-2 sm:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-sans text-sm sm:text-base"
      >
        Submit Review
      </button>
      <p className="text-xs sm:text-sm font-normal">
        <span className="font-medium">Status:</span>{" "}
        <span className={product.Stock < 1 ? "text-red-500" : "text-green-500"}>
          {product.Stock < 1 ? "Out of Stock" : "In Stock"}
        </span>
      </p>
    </div>
  );
};

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const { products, product, loading, error } = useSelector(
    (state) => state.product
  );
  const { success, error: reviewError } = useSelector((state) => state.product);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    if (error || reviewError) {
      dispatch(clearErrors());
    }
    if (id) {
      dispatch(getProductDetails(id));
    }
    setPrevLocation(location.pathname);
  }, [dispatch, id, error, reviewError]);

  const addToCartHandler = () => {
    if (id && quantity > 0) {
      dispatch(
        addItemsToCart({
          id,
          quantity,
          name: product.name,
          price: product.price,
          image: product.images?.[0]?.url,
        })
      );
    }
  };

  const submitReviewToggle = () => setOpen(!open);

  if (loading) return <Loader />;
  if (!product)
    return (
      <div className="text-center text-gray-600 text-lg py-10">Product not found</div>
    );

  const relatedProducts = products?.slice(0, 3) || [];

  return (
    <>
      <MetaData title={`${product.name} | ECOMMERCE`} />
      <div className="w-full mx-auto border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="xl:-mt-8 -mt-5">
            <Breadcrumbs title="" prevLocation={prevLocation} />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 h-full -mt-3 xl:-mt-6 pb-8 bg-gray-100 p-3 sm:p-4">
            <div className="md:col-span-1">
              <div className="sticky top-3 sm:top-4">
                <img
                  className="w-full h-auto max-h-80 sm:max-h-96 object-contain rounded-lg bg-white p-4"
                  src={
                    product.images?.[currentImage]?.url ||
                    "/images/default-product.png"
                  }
                  alt={product.name}
                />
                <div className="flex mt-3 space-x-2 overflow-x-auto pb-1">
                  {product.images?.map((item, i) => (
                    <img
                      key={i}
                      src={item.url || "/images/default-product.png"}
                      alt={`${product.name} - Thumbnail ${i + 1}`}
                      className={`w-12 h-12 sm:w-14 sm:h-14 object-cover rounded cursor-pointer border-2 ${
                        currentImage === i
                          ? "border-red-500"
                          : "border-gray-200"
                      } hover:border-red-500 transition-all duration-200`}
                      onClick={() => setCurrentImage(i)}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1 p-2 sm:p-4">
              <ProductInfo
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
                addToCartHandler={addToCartHandler}
                submitReviewToggle={submitReviewToggle}
              />
            </div>
          </div>
          
          {/* Products on Sale section moved here */}
          <div className="px-3 sm:px-4 md:px-6 pb-8">
            <ProductsOnSale relatedProducts={relatedProducts} />
          </div>
          
          <div className="mt-2 w-full pt-4 sm:pt-6 pb-8 px-3 sm:px-4 md:px-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 font-sans">
              Customer Reviews
            </h3>
            {product.reviews?.length > 0 ? (
              <div className="flex space-x-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="flex-shrink-0 w-56 sm:w-64 snap-start"
                  >
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No Reviews Yet</p>
            )}
          </div>
          
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
    </>
  );
};

export default ProductDetails;