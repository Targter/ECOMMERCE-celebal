// import React, { Fragment, useEffect, useState } from "react";
// import "./Products.css";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getProduct,
//   clearErrors,
// } from "../../reducers/store/slice/productSlice";
// import Loader from "../layout/Loader/Loader";
// import ProductCard from "../Home/ProductCard";
// import Pagination from "react-js-pagination";
// import "rc-slider/assets/index.css";
// import Slider from "rc-slider";
// import { useParams } from "react-router-dom";
// import MetaData from "../layout/MetaData";
// import { FaCircle } from "react-icons/fa";

// const categories = [
//   "Laptop",
//   "Footwear",
//   "Bottom",
//   "Tops",
//   "Attire",
//   "Camera",
//   "SmartPhones",
// ];

// const CustomSlider = ({
//   min = 0,
//   max = 100,
//   value,
//   onChange,
//   label,
//   isRange,
// }) => {
//   return (
//     <div className="space-y-2">
//       <label className="text-gray-700 font-medium">{label}</label>
//       {isRange ? (
//         <Slider
//           range
//           min={min}
//           max={max}
//           value={value}
//           onChange={onChange}
//           trackStyle={[{ backgroundColor: "#ef4444" }]}
//           handleStyle={[{ borderColor: "#ef4444" }, { borderColor: "#ef4444" }]}
//           railStyle={{ backgroundColor: "#e5e7eb" }}
//         />
//       ) : (
//         <Slider
//           min={min}
//           max={max}
//           value={value}
//           onChange={onChange}
//           trackStyle={[{ backgroundColor: "#ef4444" }]}
//           handleStyle={[{ borderColor: "#ef4444" }]}
//           railStyle={{ backgroundColor: "#e5e7eb" }}
//         />
//       )}
//       <div className="flex justify-between text-gray-600 text-sm">
//         {isRange ? (
//           <>
//             <span>₹{value[0].toLocaleString()}</span>
//             <span>₹{value[1].toLocaleString()}</span>
//           </>
//         ) : (
//           <span>{value} Stars</span>
//         )}
//       </div>
//     </div>
//   );
// };

// const sortOptions = [
//   { value: "default", label: "Default" },
//   { value: "price-asc", label: "Price: Low to High" },
//   { value: "price-desc", label: "Price: High to Low" },
//   { value: "rating-desc", label: "Rating: High to Low" },
// ];

// const Products = ({ match }) => {
//   const dispatch = useDispatch();

//   // const alert = useAlert();
//   const { Range } = Slider;

//   const [currentPage, setCurrentPage] = useState(1);
//   const [price, setPrice] = useState([0, 25000]);
//   const [category, setCategory] = useState("");

//   const [ratings, setRatings] = useState(0);
//   const { keyword } = useParams();
//   const {
//     products,
//     loading,
//     error,
//     productsCount,
//     resultPerPage,
//     filteredProductsCount,
//   } = useSelector((state) => state.product);

//   // const keyword = id;
//   // console.log("keyword:", keyword);
//   const [sort, setSort] = useState("default");
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const totalPages = Math.ceil(filteredProductsCount / resultPerPage);

//   const setCurrentPageNo = (e) => {
//     setCurrentPage(e);
//   };

//   const clearFilters = () => {
//     setPrice([0, 25000]);
//     setCategory("");
//     setRatings(0);
//     setSort("default");
//     setCurrentPage(1);
//   };

//   const priceHandler = (event, newPrice) => {
//     setPrice(newPrice);
//   };
//   let count = filteredProductsCount;

//   useEffect(() => {
//     if (error) {
//       dispatch(clearErrors());
//     }
//     dispatch(getProduct({ keyword, currentPage: 1, price, category, ratings }));
//   }, [dispatch, keyword, currentPage, price, category, error, ratings, sort]);

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title="PRODUCTS -- ECOMMERCE" />
//           <h2 className="productsHeading">Products</h2>

//           <div className="products">
//             {products &&
//               products.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//           </div>

//           <div className="filterBox">
//             <div>Price</div>
//             <CustomSlider
//               value={price}
//               onChange={priceHandler}
//               valueLabelDisplay="auto"
//               aria-labelledby="range-slider"
//               min={0}
//               max={25000}
//             />

//             <div>Categories</div>
//             <ul className="categoryBox">
//               {categories.map((category) => (
//                 <li
//                   className="category-link"
//                   key={category}
//                   onClick={() => setCategory(category)}
//                 >
//                   {category}
//                 </li>
//               ))}
//             </ul>

//             <fieldset>
//               <div component="legend">Ratings Above</div>
//               <CustomSlider
//                 value={ratings}
//                 onChange={(e, newRating) => {
//                   setRatings(newRating);
//                 }}
//                 aria-labelledby="continuous-slider"
//                 valueLabelDisplay="auto"
//                 min={0}
//                 max={5}
//               />
//             </fieldset>
//           </div>
//           {resultPerPage < count && (
//             <div className="paginationBox">
//               <Pagination
//                 activePage={currentPage}
//                 itemsCountPerPage={resultPerPage}
//                 totalItemsCount={productsCount}
//                 onChange={setCurrentPageNo}
//                 nextPageText="Next"
//                 prevPageText="Prev"
//                 firstPageText="1st"
//                 lastPageText="Last"
//                 itemClass="page-item"
//                 linkClass="page-link"
//                 activeClass="pageItemActive"
//                 activeLinkClass="pageLinkActive"
//               />
//             </div>
//           )}
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default Products;

//

import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProduct,
  clearErrors,
} from "../../reducers/store/slice/productSlice";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { FaFilter, FaTimes, FaSpinner } from "react-icons/fa";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import debounce from "lodash.debounce";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
];

const CustomSlider = ({
  min = 0,
  max = 100,
  value,
  onChange,
  label,
  isRange,
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-gray-800 font-semibold text-sm">
        {label}
      </label>
      {isRange ? (
        <Slider
          range
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          trackStyle={[{ backgroundColor: "#ef4444" }]}
          handleStyle={[{ borderColor: "#ef4444" }, { borderColor: "#ef4444" }]}
          railStyle={{ backgroundColor: "#e5e7eb" }}
          className="py-2"
        />
      ) : (
        <Slider
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          trackStyle={[{ backgroundColor: "#ef4444" }]}
          handleStyle={[{ borderColor: "#ef4444" }]}
          railStyle={{ backgroundColor: "#e5e7eb" }}
          className="py-2"
        />
      )}
      <div className="flex justify-between text-gray-600 text-sm font-medium">
        {isRange ? (
          <>
            <span>₹{value[0].toLocaleString()}</span>
            <span>₹{value[1].toLocaleString()}</span>
          </>
        ) : (
          <span>{value} Stars</span>
        )}
      </div>
    </div>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [sort, setSort] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);

  const totalPages = Math.ceil(filteredProductsCount / resultPerPage);

  // Calculate active filters for badge
  const activeFilters = [
    category && "Category",
    ratings > 0 && "Rating",
    (price[0] > 0 || price[1] < 25000) && "Price",
  ].filter(Boolean).length;

  // Debounced product fetch
  const debouncedFetchProducts = useCallback(
    debounce((filters) => {
      setIsLoadingFilters(false);
      dispatch(getProduct(filters));
    }, 500),
    [dispatch]
  );

  const setCurrentPageNo = (page) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setPrice([0, 25000]);
    setCategory("");
    setRatings(0);
    setSort("default");
    setCurrentPage(1);
  };

  useEffect(() => {
    if (error) {
      // Add toast notification here if needed
      dispatch(clearErrors());
    }
    setIsLoadingFilters(true);
    debouncedFetchProducts({
      keyword,
      currentPage,
      price,
      category,
      ratings,
      sort,
    });
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    ratings,
    sort,
    error,
    debouncedFetchProducts,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products | ECOMMERCE" />
          <div className="container mx-auto px-4 py-10">
            {/* Header and Filter/Sort Controls */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filter Sidebar */}
              <div
                className={`fixed top-0 left-0 h-full bg-white shadow-lg p-6 w-80 z-50 transform transition-transform duration-300 ${
                  isFilterOpen ? "translate-x-0" : "-translate-x-full"
                } lg:sticky lg:top-20 lg:translate-x-0 lg:w-80 lg:bg-transparent lg:shadow-none lg:p-0`}
              >
                <div className="flex justify-between items-center mb-6 lg:mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Filters</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-600 hover:text-red-500 transition-colors duration-200 lg:hidden"
                    aria-label="Close filters"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
                <div className="space-y-6">
                  <CustomSlider
                    label="Price Range"
                    isRange
                    min={0}
                    max={25000}
                    value={price}
                    onChange={(newPrice) => setPrice(newPrice)}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Categories
                    </h3>
                    <ul className="space-y-3">
                      <li
                        className={`cursor-pointer text-gray-700 hover:text-red-500 transition-colors duration-200 text-sm font-medium ${
                          category === "" ? "font-bold text-red-500" : ""
                        }`}
                        onClick={() => setCategory("")}
                      >
                        All Categories
                      </li>
                      {categories.map((cat) => (
                        <li
                          key={cat}
                          className={`cursor-pointer text-gray-700 hover:text-red-500 transition-colors duration-200 text-sm font-medium ${
                            category === cat ? "font-bold text-red-500" : ""
                          }`}
                          onClick={() => setCategory(cat)}
                        >
                          {cat}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <CustomSlider
                    label="Ratings Above"
                    min={0}
                    max={5}
                    value={ratings}
                    onChange={(newRating) => setRatings(newRating)}
                  />
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                    aria-label="Clear all filters"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Header and Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {keyword ? `Results for "${keyword}"` : "All Products"}
                    </h2>
                    {activeFilters > 0 && (
                      <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {activeFilters}{" "}
                        {activeFilters === 1 ? "Filter" : "Filters"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <button
                      onClick={() => setIsFilterOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 lg:hidden"
                      aria-label="Open filters"
                    >
                      <FaFilter size={16} />
                      Filters
                    </button>
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="border rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm w-full sm:w-auto"
                      aria-label="Sort products"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Filter Summary and Result Count */}
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600 text-sm">
                    Showing {filteredProductsCount} of {productsCount} products
                    {category && ` in "${category}"`}
                    {ratings > 0 && ` with ${ratings}+ stars`}
                    {price[0] > 0 || price[1] < 25000
                      ? ` between ₹${price[0].toLocaleString()} - ₹${price[1].toLocaleString()}`
                      : ""}
                  </p>
                  {isLoadingFilters && (
                    <FaSpinner
                      className="animate-spin text-red-500"
                      size={20}
                    />
                  )}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10">
                      <p className="text-gray-600 text-lg font-medium mb-4">
                        No products found
                      </p>
                      <p className="text-gray-500 text-sm">
                        Try adjusting your filters or{" "}
                        <button
                          onClick={clearFilters}
                          className="text-red-500 hover:text-red-600 underline font-medium"
                        >
                          clear all filters
                        </button>{" "}
                        to see more products.
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {resultPerPage < filteredProductsCount && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPageNo(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          currentPage === 1
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-600"
                        } transition-colors duration-200`}
                        aria-label="Previous page"
                      >
                        Prev
                      </button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPageNo(i + 1)}
                          className={`px-4 py-2 rounded-md text-sm font-medium ${
                            currentPage === i + 1
                              ? "bg-red-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          } transition-colors duration-200`}
                          aria-label={`Page ${i + 1}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPageNo(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          currentPage === totalPages
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-600"
                        } transition-colors duration-200`}
                        aria-label="Next page"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
