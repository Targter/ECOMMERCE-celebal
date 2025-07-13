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
  // console.log("cartItems:", cartItems.length);
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
    <div className="max-w-7xl mx-auto px-4 py-4">
      <Breadcrumbs title="Cart" />
      {cartItems.length === 0 ? (
        <motion.div
          // initial={{ y: 30, opacity: 0 }}
          // animate={{ y: 0, opacity: 1 }}
          // transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="Empty Cart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-sans text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-red-500 rounded-md cursor-pointer hover:bg-red-700 active:bg-red-900 px-8 py-2 font-sans font-semibold text-lg text-gray-200 hover:text-white transition-colors duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <Fragment>
          <div className="pb-20">
            <div className="w-full pt-2 pb-2 bg-gray-100 text-gray-800 hidden lg:grid grid-cols-5 place-content-center px-6 text-lg font-sans font-semibold">
              <h2 className="col-span-2">Product</h2>
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

            {/* <button
              onClick={resetCart}
              className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 transition-colors duration-300"
            >
              Reset cart
            </button> */}

            {/* <div className="flex flex-col md:flex-row justify-between border py-4 px-4 items-center gap-2 md:gap-0">
              <div className="flex items-center gap-4">
                <input
                  className="w-44 md:w-52 h-8 px-4 border text-gray-800 text-sm outline-none border-gray-400"
                  type="text"
                  placeholder="Coupon Number"
                />
                <p className="text-sm md:text-base font-semibold">
                  Apply Coupon
                </p>
              </div>
              <p className="text-lg font-semibold">Update Cart</p>
            </div> */}

            <div className="max-w-7xl gap-4 flex justify-end mt-4">
              <div className="w-96 flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-right">
                  Cart totals
                </h1>
                <div>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                    Subtotal
                    <span className="font-semibold tracking-wide font-sans">
                      ₹{totalAmt.toLocaleString()}
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                    Shipping Charge
                    <span className="font-semibold tracking-wide font-sans">
                      ₹{shippingCharge.toLocaleString()}
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                    Total
                    <span className="font-bold tracking-wide text-lg font-sans">
                      ₹{(totalAmt + shippingCharge).toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={checkoutHandler}
                    className="w-52 h-10 bg-red-500 text-white hover:bg-red-700 transition-colors duration-300"
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
