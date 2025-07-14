import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../reducers/store/slice/productSlice";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import ShopSideNav from "./shopSidePage/ShopSideNav";
import Pagination from "./PageProduct";
import ProductBanner from "./PageProductBanner";
import { FaFilter } from "react-icons/fa";

const Products = () => {
  const dispatch = useDispatch();
  const { products: allProducts, loading } = useSelector(
    (state) => state.product
  );
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [filters, setFilters] = useState({
    category: null,
    color: null,
    brand: null,
    price: null,
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Apply filters whenever allProducts or filters change
  useEffect(() => {
    if (!Array.isArray(allProducts) || allProducts.length === 0) {
      setFilteredProducts([]);
      return;
    }

    let result = [...allProducts];

    // Apply category filter
    if (filters.category) {
      result = result.filter((product) => {
        if (!product.category || typeof product.category !== "string") {
          return false;
        }
        return (
          product.category.toLowerCase() === filters.category.toLowerCase()
        );
      });
    }

    // Apply color filter
    if (filters.color) {
      result = result.filter((product) => {
        if (!product.color || typeof product.color !== "string") {
          return false;
        }
        return product.color.toLowerCase() === filters.color.toLowerCase();
      });
    }

    // Apply brand filter
    if (filters.brand) {
      result = result.filter((product) => {
        if (!product.brand || typeof product.brand !== "string") {
          return false;
        }
        return product.brand.toLowerCase() === filters.brand.toLowerCase();
      });
    }

    // Apply price filter
    if (
      filters.price &&
      Array.isArray(filters.price) &&
      filters.price.length === 2
    ) {
      result = result.filter((product) => {
        if (typeof product.price !== "number") {
          return false;
        }
        return (
          product.price >= filters.price[0] && product.price <= filters.price[1]
        );
      });
    }

    setFilteredProducts(result);
  }, [allProducts, filters]);

  // Update items per page from ProductBanner
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  // Handle filter changes
  const handleCategorySelect = (category) => {
    setFilters((prev) => ({ ...prev, category }));
    setShowMobileFilters(false); // Close mobile filters after selection
  };

  const handleColorSelect = (color) => {
    setFilters((prev) => ({ ...prev, color }));
    setShowMobileFilters(false);
  };

  const handleBrandSelect = (brand) => {
    setFilters((prev) => ({ ...prev, brand }));
    setShowMobileFilters(false);
  };

  const handlePriceSelect = (price) => {
    setFilters((prev) => ({ ...prev, price }));
    setShowMobileFilters(false);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setFilters({
      category: null,
      color: null,
      brand: null,
      price: null,
    });
    setShowMobileFilters(false);
  };

  // Initial load of products
  useEffect(() => {
    dispatch(getProduct({}));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products | ECOMMERCE" />
          <div className="container mx-auto px-4 py-6 md:py-10">
            <style>
              {`
                .no-scrollbar {
                  scrollbar-width: none;
                  -ms-overflow-style: none;
                }
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>

            {/* Mobile Filter Button */}
            <div className="md:hidden mb-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">Products</h1>
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg"
              >
                <FaFilter /> Filters
              </button>
            </div>

            <div className="w-full flex flex-col md:flex-row pb-10 md:pb-20 gap-6 md:gap-10">
              {/* Sidebar - Mobile Overlay */}
              {showMobileFilters && (
                <div className="fixed inset-0 z-50 md:hidden">
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50"
                    onClick={() => setShowMobileFilters(false)}
                  />
                  <div className="absolute left-0 top-0 h-full w-3/4 bg-white p-4 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold">Filters</h2>
                      <button
                        onClick={() => setShowMobileFilters(false)}
                        className="text-gray-500"
                      >
                        ✕
                      </button>
                    </div>
                    <ShopSideNav
                      onCategorySelect={handleCategorySelect}
                      onColorSelect={handleColorSelect}
                      onBrandSelect={handleBrandSelect}
                      onPriceSelect={handlePriceSelect}
                      onClearAllFilters={handleClearAllFilters}
                    />
                  </div>
                </div>
              )}

              {/* Sidebar - Desktop */}
              <div className="hidden md:block w-full md:w-1/4 lg:w-1/5 h-auto md:h-[500px] sticky top-20">
                <ShopSideNav
                  onCategorySelect={handleCategorySelect}
                  onColorSelect={handleColorSelect}
                  onBrandSelect={handleBrandSelect}
                  onPriceSelect={handlePriceSelect}
                  onClearAllFilters={handleClearAllFilters}
                />
              </div>

              {/* Main Content */}
              <div className="w-full md:w-3/4 lg:w-4/5 h-auto flex flex-col gap-6 md:gap-10">
                {/* <ProductBanner
                  itemsPerPageFromBanner={itemsPerPageFromBanner}
                /> */}
                <Pagination
                  itemsPerPage={itemsPerPage}
                  products={
                    filteredProducts.length > 0 ? filteredProducts : allProducts
                  }
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
