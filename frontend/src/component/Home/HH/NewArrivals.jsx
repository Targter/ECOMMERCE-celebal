import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import Product from "./Products/Produt";
import SamplePrevArrow from "./SamplePrevArrow";
import SampleNextArrow from "./SampleNextArrow";

const NewArrivals = () => {
  const { products, loading } = useSelector((state) => state.product);
  const [newArrivals, setNewArrivals] = useState([]);
  console.log("products in NewAArrivals:", products);
  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  useEffect(() => {
    if (products && products.length > 0) {
      // Sort by createdAt date (newest first) and take first 4
      const sortedProducts = [...products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8);
      setNewArrivals(sortedProducts);
    }
  }, [products]);

  return (
    <div className="w-full pb-16">
      <div className="text-3xl font-semibold pb-6">New Arrivals</div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Slider {...settings}>
          {newArrivals.map((product) => (
            <div key={product._id} className="px-2">
              <Product
                _id={product._id}
                img={product.images[0].url} // Assuming images array exists
                productName={product.name}
                price={product.price}
                color={product.color || "Mixed"}
                badge={product.stock <= 10} // Show badge if low stock
                des={product.description}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default NewArrivals;
