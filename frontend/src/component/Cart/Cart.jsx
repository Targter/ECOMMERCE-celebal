import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../reducers/store/slice/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CartItemCard from "./CartItemCard";
import emptyCart from "../../assets/images/emptyCart.png"; // Adjust path as needed
import Breadcrumbs from "../Breadcrumbs";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);

  useEffect(() => {
    const price = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmt(price);
  }, [cartItems]);

  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 400) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  const increaseQuantity = (id, quantity, stock) => {
    if (stock <= quantity) {
      return;
    }
    const newQty = quantity + 1;
    dispatch(addItemsToCart({ id, quantity: newQty }));
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity <= 1) {
      return;
    }
    const newQty = quantity - 1;
    dispatch(addItemsToCart({ id, quantity: newQty }));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Breadcrumbs title="Cart" />
      {cartItems.length === 0 ? (
        <motion.div className="flex flex-col md:flex-row justify-center items-center gap-4 pb-20">
          <div>
            <img
              className="w-64 sm:w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="Empty Cart"
            />
          </div>
          <div className="w-full max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-sans text-xl font-bold uppercase text-center">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-4 sm:px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop" className="w-full flex justify-center">
              <button className="bg-red-500 rounded-md cursor-pointer hover:bg-red-700 active:bg-red-900 px-6 sm:px-8 py-2 font-sans font-semibold text-lg text-gray-200 hover:text-white transition-colors duration-300 w-full sm:w-auto">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <Fragment>
          <div className="pb-10 md:pb-20">
            <div className="w-full pt-2 pb-2 bg-gray-100 text-gray-800 hidden sm:grid grid-cols-5 place-content-center px-4 sm:px-6 text-base sm:text-lg font-sans font-semibold">
              <h2 className="col-span-2 sm:col-span-2">Product</h2>
              <h2>Price</h2>
              <h2>Quantity</h2>
              <h2>Sub Total</h2>
            </div>
            <div className="mt-2">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.product}
                  item={item}
                  deleteCartItems={deleteCartItems}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
              ))}
            </div>

            <div className="w-full mt-6 md:mt-8 gap-4 flex justify-center md:justify-end">
              <div className="w-full md:w-96 flex flex-col gap-4">
                <h1 className="text-xl sm:text-2xl font-semibold text-center md:text-right">
                  Cart totals
                </h1>
                <div>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-base sm:text-lg px-4 font-medium">
                    Subtotal
                    <span className="font-semibold tracking-wide font-sans">
                      ₹{totalAmt.toLocaleString()}
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-base sm:text-lg px-4 font-medium">
                    Shipping Charge
                    <span className="font-semibold tracking-wide font-sans">
                      ₹{shippingCharge.toLocaleString()}
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-base sm:text-lg px-4 font-medium">
                    Total
                    <span className="font-bold tracking-wide text-base sm:text-lg font-sans">
                      ₹{(totalAmt + shippingCharge).toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="flex justify-center md:justify-end">
                  <button
                    onClick={checkoutHandler}
                    className="w-full sm:w-52 h-10 bg-red-500 text-white hover:bg-red-700 transition-colors duration-300 rounded"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Cart;
