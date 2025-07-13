

import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import Product from "./Products/Product";
import Product from "./Products/Produt";

const BestSellers = () => {
  const { products, loading } = useSelector((state) => state.product);
  const [bestSellers, setBestSellers] = useState([]);

  // Filter best sellers when products load
  useEffect(() => {
    if (products && products.length > 0) {
      // Sort by sales count (highest first) and take first 4
      const sortedProducts = [...products]
        .sort((a, b) => (b.sold || 0) - (a.sold || 0))
        .slice(0, 8);
      setBestSellers(sortedProducts);
    }
  }, [products]);

  return (
    <div className="w-full pb-20">
      <div className="text-3xl font-semibold pb-6">Our Bestsellers</div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
          {bestSellers.map((product) => (
            <Product
              key={product._id}
              _id={product._id}
              img={product.images[0].url}
              productName={product.name}
              price={product.price}
              color={product.color || "Mixed"}
              badge={product.stock <= 10} // Show badge if low stock
              des={product.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSellers;
