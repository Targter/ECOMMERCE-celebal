import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
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
import Offer from "./component/Offer";
import Header from "./component/Home/HH/Header";
import HeaderBottom from "./component/Home/HH/HeaderBottom";
import SpecialCase from "./component/Home/HH/SpecialCase";
import FooterBottom from "./component/layout/Footer/FotterBottom";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <HeaderBottom />
        <SpecialCase />

        <main className="flex-grow">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/shop" element={<Products />} />
              <Route path="/search" element={<Search />} />
              <Route path="/products/:keyword" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<LoginSignUp />} />
              <Route path="/offer" element={<Offer />} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              />

              {/* Protected User Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/account" element={<Profile />} />
                <Route path="/password/update" element={<UpdatePassword />} />
                <Route path="/me/update" element={<UpdateProfile />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/order/confirm" element={<ConfirmOrder />} />
                <Route path="/success" element={<OrderSuccess />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/order/:id" element={<OrderDetails />} />
              </Route>

              {/* Admin Routes */}
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

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>

        <Footer />
        <FooterBottom />
      </div>
    </Router>
  );
}

export default App;
