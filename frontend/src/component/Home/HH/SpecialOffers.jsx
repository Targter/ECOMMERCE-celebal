import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "./Products/Produt";
import { useNavigate } from "react-router-dom";

const SpecialOffers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.product);
  const [specialOffers, setSpecialOffers] = useState([]);


  // Filter special offers when products load
  useEffect(() => {
    if (products && products.length > 0) {
      // Filter products with special offers (assuming they have a discountPrice)
      const offers = products
        .filter((product) => product.discountPrice && product.discountPrice > 0)
        .slice(0, 8);
      setSpecialOffers(offers);
    }
  }, [products]);



  return (
    <div className="w-full pb-20">
      <div className="text-3xl font-semibold pb-6">Special Offers</div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : specialOffers.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No special offers currently available. Check back soon!
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
          {specialOffers.map((product) => (
            <Product
              key={product._id}
              _id={product._id}
              img={product.images[0].url}
              productName={product.name}
              price={product.price}
              discountPrice={product.discountPrice} // Added discount price
              color={product.color || "Mixed"}
              badge={true} // Always show badge for special offers
              des={product.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialOffers;
