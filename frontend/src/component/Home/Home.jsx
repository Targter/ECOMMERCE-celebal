// import React, { Fragment, useEffect } from "react";
// // import { CgMouse } from "react-icons";
// // import { CgMouse } from "react-icons";
// import "./Home.css";
// import ProductCard from "./ProductCard";
// import MetaData from "../layout/MetaData";
// // import { clearErrors, getProduct } from "../../actions/productAction.js";
// import {
//   getProduct,
//   clearErrors,
// } from "../../reducers/store/slice/productSlice";
// import { useSelector, useDispatch } from "react-redux";
// import Loader from "../layout/Loader/Loader";
// // import { useAlert } from "react-alert";

// const Home = () => {
//   // const alert = useAlert();
//   const dispatch = useDispatch();
//   const { loading, error, products } = useSelector((state) => state.product);

//   useEffect(() => {
//     if (error) {
//       // alert.error(error);
//       dispatch(clearErrors());
//     }
//     console.log("rpoducts;:");
//     dispatch(
//       getProduct({
//         keyword: "",
//         currentPage: 1,
//         price: [0, 250000],
//         category: "",
//       })
//     );
//   }, [dispatch]);

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title="ECOMMERCE" />

//           <div className="banner">
//             <p>Welcome to Ecommerce</p>
//             <h1>FIND AMAZING PRODUCTS BELOW</h1>

//             <a href="#container">
//               <button>
//                 Scroll
//                 {/* <CgMouse /> */}
//               </button>
//             </a>
//           </div>

//           <h2 className="homeHeading">Featured Products</h2>

//           <div className="container" id="container">
//             {products &&
//               products.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default Home;

import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import {
  getProduct,
  clearErrors,
} from "../../reducers/store/slice/productSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.product);

  useEffect(() => {
    if (error) {
      // Add toast notification here if needed
      dispatch(clearErrors());
    }
    dispatch(
      getProduct({
        keyword: "",
        currentPage: 1,
        price: [0, 250000],
        category: "",
      })
    );
  }, [dispatch]);

  //
  // Function to handle smooth scrolling
  const handleScroll = () => {
    const container = document.getElementById("container");
    if (container) {
      container.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          {/* Banner Section */}
          <section
            className=" text-white py-20 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat h-screen"
            style={{ backgroundImage: "url('./cover.jfif')" }}
          >
            <p className="text-lg md:text-xl font-medium mb-4 animate-fade-in">
              Welcome to Ecommerce
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center animate-fade-in">
              FIND AMAZING PRODUCTS BELOW
            </h1>
            <button
              onClick={handleScroll}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
              aria-label="Scroll to featured products"
            >
              Scroll <FaArrowDown className="animate-bounce" />
            </button>
          </section>

          {/* Featured Products Section */}
          <h2
            className="text-2xl md:text-3xl font-bold text-gray-800 text-center my-10 "
            id="container"
          >
            Featured Products
          </h2>

          <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-11 mb-11">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
