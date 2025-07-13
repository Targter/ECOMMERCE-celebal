import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../reducers/store/slice/productSlice";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import ShopSideNav from "./shopSidePage/ShopSideNav";
import Pagination from "./PageProduct";
import ProductBanner from "./PageProductBanner";

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
          return false; // Exclude invalid or missing category
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
  };

  const handleColorSelect = (color) => {
    setFilters((prev) => ({ ...prev, color }));
  };

  const handleBrandSelect = (brand) => {
    setFilters((prev) => ({ ...prev, brand }));
  };

  const handlePriceSelect = (price) => {
    setFilters((prev) => ({ ...prev, price }));
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setFilters({
      category: null,
      color: null,
      brand: null,
      price: null,
    });
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
          <div className="container mx-auto px-4 py-10">
            <style>
              {`
                .no-scrollbar {
                  scrollbar-width: none; /* Firefox */
                  -ms-overflow-style: none; /* Internet Explorer 10+ */
                }
                .no-scrollbar::-webkit-scrollbar {
                  display: none; /* Chrome, Safari, Edge */
                }
              `}
            </style>
            <div className="w-full h-screen flex pb-20 gap-10">
              <div className="w-[16%] hidden md:inline-flex h-[500px]">
                <ShopSideNav
                  onCategorySelect={handleCategorySelect}
                  onColorSelect={handleColorSelect}
                  onBrandSelect={handleBrandSelect}
                  onPriceSelect={handlePriceSelect}
                  onClearAllFilters={handleClearAllFilters}
                />
              </div>
              <div className="w-full md:w-[80%] lg:w-[75%] h-auto flex flex-col gap-10 overflow-y-scroll no-scrollbar">
                <ProductBanner
                  itemsPerPageFromBanner={itemsPerPageFromBanner}
                />
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
