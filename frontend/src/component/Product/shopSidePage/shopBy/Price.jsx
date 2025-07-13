import React, { useState } from "react";
import NavTitle from "./NavTitle";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Price = ({ onSelectPrice }) => {
  const [priceRange, setPriceRange] = useState([0, 25000]);

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onSelectPrice(value);
  };

  const handleClearPrice = () => {
    setPriceRange([0, 25000]);
    onSelectPrice(null);
  };

  return (
    <div className="w-full">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="space-y-4 mt-2">
        <Slider
          range
          min={0}
          max={25000}
          value={priceRange}
          onChange={handlePriceChange}
          trackStyle={[{ backgroundColor: "#808080" }]}
          handleStyle={[{ borderColor: "#808080" }, { borderColor: "#808080" }]}
          railStyle={{ backgroundColor: "#808080" }}
        />
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            ₹{priceRange[0].toLocaleString()} - ₹
            {priceRange[1].toLocaleString()}
          </span>
          <button
            onClick={handleClearPrice}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Price;
