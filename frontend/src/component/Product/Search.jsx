
import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";
import MetaData from "../layout/MetaData";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 250000]);
  const navigate = useNavigate();

  // Mock autocomplete suggestions (replace with API call for real implementation)
  const suggestions = [
    "Laptop",
    "Smartphone",
    "Headphones",
    "Camera",
    "Tablet",
  ].filter((item) => item.toLowerCase().includes(keyword.toLowerCase()));

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      const query = new URLSearchParams({
        keyword,
        category: category || undefined,
        minPrice: priceRange[0] || undefined,
        maxPrice: priceRange[1] || undefined,
      }).toString();
      navigate(`/products/${keyword}?${query}`);
    } else {
      navigate("/shop");
    }
  };

  const clearSearch = () => {
    setKeyword("");
    setCategory("");
    setPriceRange([0, 250000]);
  };

  return (
    <Fragment>
      <MetaData title="Search Products | ECOMMERCE" />
      <section className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-900  flex flex-col items-center justify-center py-12">
        <div className="container mx-auto px-4">
          {/* Hero Header */}
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6 animate-fade-in">
            Find Your Perfect Product
          </h1>
          <p className="text-lg text-gray-200 text-center mb-8 animate-fade-in">
            Search our wide range of products with ease
          </p>

          {/* Search Form */}
          <form
            onSubmit={searchSubmitHandler}
            className="relative max-w-2xl mx-auto bg-white rounded-full shadow-lg flex items-center p-2"
          >
            <FaSearch className="text-gray-500 ml-4" size={20} />
            <input
              type="text"
              placeholder="Search for a product..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 px-4 py-3 text-gray-700 rounded-full focus:outline-none"
              aria-label="Search products"
            />
            {keyword && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-gray-500 hover:text-red-500 mr-4 transition-colors duration-200"
                aria-label="Clear search"
              >
                <FaTimes size={20} />
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
              aria-label="Search"
            >
              Search
            </button>
          </form>

          {/* Autocomplete Suggestions */}
          {keyword && suggestions.length > 0 && (
            <div className="max-w-2xl mx-auto mt-2 bg-white rounded-lg shadow-lg p-4 z-10 relative">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  onClick={() => {
                    setKeyword(suggestion);
                    navigate(`/products/${suggestion}`);
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}

          {/* Filter Toggle */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle advanced filters"
            >
              <FaFilter size={16} />
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Advanced Filters */}
          {isFilterOpen && (
            <div className="max-w-2xl mx-auto mt-4 bg-white rounded-lg shadow-lg p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Advanced Filters
              </h3>
              <div className="space-y-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label="Select product category"
                  >
                    <option value="">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="accessories">Accessories</option>
                    <option value="home">Home & Living</option>
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Price Range
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([+e.target.value, priceRange[1]])
                      }
                      placeholder="Min Price"
                      className="w-1/2 border rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label="Minimum price"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], +e.target.value])
                      }
                      placeholder="Max Price"
                      className="w-1/2 border rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label="Maximum price"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default Search;
