import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";

const ShopSideNav = ({
  onCategorySelect,
  onColorSelect,
  onBrandSelect,
  onPriceSelect,
  onClearAllFilters,
}) => {
  // Create a clear signal to pass to child components
  const [clearSignal, setClearSignal] = React.useState(0);

  const handleClearAllFilters = () => {
    setClearSignal((prev) => prev + 1); // Increment to trigger child resets
    onClearAllFilters();
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        onClick={handleClearAllFilters}
        className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
      >
        Clear All Filters
      </button>
      <Category onSelectCategory={onCategorySelect} clearSignal={clearSignal} />
      <Color onSelectColor={onColorSelect} clearSignal={clearSignal} />
      <Brand onSelectBrand={onBrandSelect} clearSignal={clearSignal} />
      <Price onSelectPrice={onPriceSelect} clearSignal={clearSignal} />
    </div>
  );
};

export default ShopSideNav;
