import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import { useDispatch } from "react-redux";
import { loadUser } from "./reducers/store/slice/userSlice";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("http://localhost:3005/api/v1/stripeapikey");
  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    dispatch(loadUser());
    // getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <div className="mt-[100px]">
        {" "}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/login" element={<LoginSignUp />} />
          {/*  */}

          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/process/payment" element={<Payment />} />
          </Route>

          {/* ADMIN ROUTE */}
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/product" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin/order/:id" element={<ProcessOrder />} />
            <Route path="/admin/reviews" element={<ProductReviews />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/user/:id" element={<UpdateUser />} />
          </Route>
          {/*  */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

//       {/*  */}

// {/* <Routes>
//   <Route path="/" element={<Home />} />
//   <Route path="/product/:id" element={<ProductDetails />} />
//   {/*
//    */}
//   <Route path="/products" element={<Products />} />
//   <Route path="/products/:keyword" element={<Products />} />

//   <Route path="/search" element={<Search />} />
//   <Route path="/contact" element={<Contact />} />
//   <Route path="/about" element={<About />} />
//   <Route path="/password/forgot" element={<ForgotPassword />} />
//   <Route path="/password/reset/:token" element={<ResetPassword />} />
//   <Route path="/login" element={<LoginSignUp />} />
//   <Route path="/cart" element={<Cart />} />

//   {/* Protected Routes */}
//   {/* <Route element={<ProtectedRoute />}> */}
//   <Route path="/account" element={<Profile />} />
//   <Route path="/me/update" element={<UpdateProfile />} />
//   <Route path="/password/update" element={<UpdatePassword />} />
//   <Route path="/shipping" element={<Shipping />} />
//   <Route path="/success" element={<OrderSuccess />} />
//   <Route path="/orders" element={<MyOrders />} />
//   <Route path="/order/confirm" element={<ConfirmOrder />} />
//   <Route path="/order/:id" element={<OrderDetails />} />

//   {/* {stripeApiKey && (
//     <Route
//       path="/process/payment"
//       element={
//         <Elements stripe={loadStripe(stripeApiKey)}>
//           <Payment />
//         </Elements>
//       }
//     />
//   )} */}
//   {/* </Route> */}

//   {/* Admin Protected Routes */}

//   <Route path="*" element={<NotFound />} />
// </Routes> */}
