import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../../reducers/store/slice/productSlice";
import { debounce } from "lodash";

const HeaderBottom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products = [], loading } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef();

  // Debounced search function
  const debouncedSearch = debounce((query) => {
    if (query) {
      dispatch(getProduct({ keyword: query, currentPage: 1 }));
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel();
  }, [searchQuery, dispatch]);

  const totalCartItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="w-full bg-[#F5F5F3] relative border-b border-gray-200">
      <div className="max-w-container mx-auto">
        <Flex className="sm:flex items-center justify-between w-full px-4 py-3 gap-4">
          {/* Search Bar - Takes remaining space */}
          <div
            ref={searchRef}
            className="flex-1 max-w-2xl h-10 bg-white flex items-center rounded-lg border border-gray-300 focus-within:border-primeColor transition-all"
          >
            <input
              className="flex-1 h-full outline-none px-4 text-sm placeholder:text-gray-400 placeholder:text-[13px] md:placeholder:text-[14px]"
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Search products..."
              onFocus={() => setIsSearchFocused(true)}
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="px-3 text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            ) : (
              <FaSearch className="w-4 h-4 mx-3 text-gray-400" />
            )}

            {/* Search Results Dropdown */}
            {isSearchFocused && searchQuery && (
              <div className="absolute top-12 left-4 right-4 md:left-auto md:right-auto md:w-[600px] bg-white shadow-lg rounded-b-lg z-50 max-h-96 overflow-y-auto border border-t-0">
                {loading ? (
                  <div className="p-4 text-center text-gray-500">
                    Searching...
                  </div>
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => {
                        navigate(`/product/${product._id}`);
                        setSearchQuery("");
                        setIsSearchFocused(false);
                      }}
                      className="p-3 flex items-center gap-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer"
                    >
                      <img
                        className="w-16 h-16 object-contain"
                        src={product.images[0]?.url}
                        alt={product.name}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {product.description?.substring(0, 60)}...
                        </p>
                        <p className="text-sm font-semibold text-primeColor">
                          ₹{product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right side icons - fixed width */}
          <div className="flex items-center gap-4 ml-4">
            <Link
              to="/orders"
              className="text-sm font-medium text-gray-700 hover:text-primeColor whitespace-nowrap"
            >
              My Orders
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center p-2 text-gray-700 hover:text-primeColor"
            >
              <FaShoppingCart className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primeColor text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
