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
  console.log("relatedProducts:", relatedProducts);
  return (
    <div>
      <h3 className="font-sans text-xl font-semibold mb-6 underline underline-offset-4 decoration-1">
        Products on Sale
      </h3>
      <div className="flex flex-col gap-2">
        {relatedProducts?.map((item) => (
          <Link to={`/product/${item._id}`} key={item._id}>
            <div className="flex items-center gap-4 border-b border-gray-300 py-2">
              <div>
                <img
                  className="w-24 h-24 object-cover"
                  src={item.images?.[0]?.url || "/images/default-product.png"}
                  alt={item.name}
                />
              </div>
              <div className="flex flex-col gap-2 font-sans">
                <p className="text-base font-medium">{item.name}</p>
                <p className="text-sm font-semibold">
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
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold font-sans">{product.name}</h2>
      <p className="text-xl font-semibold text-red-500">
        ₹{product.price.toLocaleString()}
      </p>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) =>
          i < Math.floor(product.ratings) ? (
            <FaStar key={i} className="text-yellow-400" />
          ) : i < Math.ceil(product.ratings) && product.ratings % 1 >= 0.5 ? (
            <FaStarHalfAlt key={i} className="text-yellow-400" />
          ) : (
            <FaRegStar key={i} className="text-yellow-400" />
          )
        )}
        <span className="ml-2 text-gray-500">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <p className="text-base text-gray-600">{product.description}</p>
      <p className="text-sm">
        {product.numOfReviews === 0
          ? "Be the first to leave a review."
          : "Leave a review."}
      </p>
      <div className="flex items-center gap-4">
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
          className={`w-full py-4 rounded-md text-white font-medium font-sans ${
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
        className="w-full py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-sans"
      >
        Submit Review
      </button>
      <p className="text-sm font-normal">
        <span className="text-base font-medium">Status:</span>{" "}
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
    // Set prevLocation only when location changes
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
      <div className="text-center text-gray-600 text-xl">Product not found</div>
    );

  // Mock related products for the ProductsOnSale component
  const relatedProducts = products?.slice(0, 3) || [];

  return (
    <>
      <MetaData title={`${product.name} | ECOMMERCE`} />
      <div className="w-full mx-auto border-b border-gray-300 ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="xl:-mt-10 -mt-7">
            <Breadcrumbs title="" prevLocation={prevLocation} />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
            <div className="h-full">
              <ProductsOnSale relatedProducts={relatedProducts} />
            </div>
            <div className="h-full xl:col-span-2">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={
                  product.images?.[currentImage]?.url ||
                  "/images/default-product.png"
                }
                alt={product.name}
              />
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
            <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
              <ProductInfo
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
                addToCartHandler={addToCartHandler}
                submitReviewToggle={submitReviewToggle}
              />
            </div>
          </div>
          <div className="mt-12 w-full pt-10 pb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 font-sans">
              Reviews
            </h3>
            {product.reviews?.length > 0 ? (
              <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="flex-shrink-0 w-80 snap-start"
                  >
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No Reviews Yet</p>
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
