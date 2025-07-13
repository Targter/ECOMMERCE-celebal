import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import {
  getProduct,
  clearErrors,
} from "../../reducers/store/slice/productSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import Banner from "./HH/Banner";
import BannerBottom from "./HH/BannerBottom";
import Sale from "./HH/Sale";
import NewArrivals from "./HH/NewArrivals";
import BestSellers from "./HH/BestSeller";
import YearProduct from "./HH/YearProduct";
import SpecialOffers from "./HH/SpecialOffers";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);

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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ECOMMERCE" />

          {/* Banner Section */}
          <div className="w-full  mx-auto overflow-hidden">
            <Banner />
            <BannerBottom />
            <div className="max-w-container mx-auto px-4">
              <Sale />
              <NewArrivals />
              <BestSellers />
              <YearProduct />
              <SpecialOffers />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
