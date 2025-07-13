import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../../reducers/store/slice/productSlice";
import { logout } from "../../../reducers/store/slice/userSlice";

const HeaderBottom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.product);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userDropdownRef = useRef();
  const categoryDropdownRef = useRef();

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(e.target)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce search function
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        dispatch(getProduct({ keyword: searchQuery, currentPage: 1 }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    setShowUser(false);
    navigate("/");
  };

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0">
          {/* Category Dropdown */}
          <div
            // onClick={() => setShow(!show)}
            // ref={categoryDropdownRef}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            {/* <HiOutlineMenuAlt4 className="w-5 h-5" /> */}
            {/* <p className="text-[14px] font-normal">Shop by Category</p> */}

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-11 z-50 bg-white w-auto h-auto p-4 pb-6 shadow-lg rounded-md"
              >
                <li className="text-gray-700 px-4 py-1 border-b-[1px] border-b-gray-200 hover:bg-gray-100 duration-300 cursor-pointer">
                  Accessories
                </li>
                <li className="text-gray-700 px-4 py-1 border-b-[1px] border-b-gray-200 hover:bg-gray-100 duration-300 cursor-pointer">
                  Furniture
                </li>
                <li className="text-gray-700 px-4 py-1 border-b-[1px] border-b-gray-200 hover:bg-gray-100 duration-300 cursor-pointer">
                  Electronics
                </li>
                <li className="text-gray-700 px-4 py-1 border-b-[1px] border-b-gray-200 hover:bg-gray-100 duration-300 cursor-pointer">
                  Clothes
                </li>
                <li className="text-gray-700 px-4 py-1 border-b-[1px] border-b-gray-200 hover:bg-gray-100 duration-300 cursor-pointer">
                  Bags
                </li>
                <li className="text-gray-700 px-4 py-1 hover:bg-gray-100 duration-300 cursor-pointer">
                  Home appliances
                </li>
              </motion.ul>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-[600px] h-[40px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-4 h-4" />

            {/* Search Results Dropdown */}
            {searchQuery && products && products.length > 0 && (
              <div className="w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer">
                {products.map((product) => (
                  <div
                    onClick={() => {
                      navigate(`/product/${product._id}`, {
                        state: { item: product },
                      });
                      setSearchQuery("");
                    }}
                    key={product._id}
                    className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3 hover:bg-gray-200"
                  >
                    <img
                      className="w-24 h-24 object-contain"
                      src={product.images[0]?.url}
                      alt={product.name}
                    />
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-lg">{product.name}</p>
                      <p className="text-xs">
                        {product.description?.substring(0, 50)}...
                      </p>
                      <p className="text-sm">
                        Price:{" "}
                        <span className="text-primeColor font-semibold">
                          ₹{product.price}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User and Cart Icons */}
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 relative">
            <Link to="/orders" className="relative">
              <span className="px-3 py-1 rounded-md bg-primeColor text-white text-sm font-medium hover:bg-opacity-90 bg-black transition hover:scale-200 hover:text-black hover:bg-white ">
                Orders
              </span>
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
