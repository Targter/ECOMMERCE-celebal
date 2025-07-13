import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import {
  createOrder,
  clearErrors,
} from "../../reducers/store/slice/orderSlice";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { FaCreditCard, FaCalendarAlt, FaLock } from "react-icons/fa";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const stripe = useStripe();
  // const elements = useElements();
  const payBtn = useRef(null);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.order);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")) || {};
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const paymentData = {
    amount: orderInfo.totalPrice ? Math.round(orderInfo.totalPrice * 100) : 0,
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal || 0,
    taxPrice: orderInfo.tax || 0,
    shippingPrice: orderInfo.shippingCharges || 0,
    totalPrice: orderInfo.totalPrice || 0,
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!orderInfo.totalPrice || orderInfo.totalPrice <= 0) {
      newErrors.order =
        "Invalid order amount. Please check your order details.";
    }
    if (!stripe || !elements) {
      newErrors.stripe =
        "Payment processing is not available. Please try again later.";
    }
    return newErrors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formErrors = validatePayment();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    if (!payBtn.current) return;

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      const client_secret = data.client_secret;

      if (!stripe || !elements) {
        setErrors({ stripe: "Payment processing is not available." });
        payBtn.current.disabled = false;
        return;
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user?.name || "Unknown",
            email: user?.email || "",
            address: {
              line1: shippingInfo?.address || "",
              city: shippingInfo?.city || "",
              state: shippingInfo?.state || "",
              postal_code: shippingInfo?.pinCode || "",
              country: shippingInfo?.country || "",
            },
          },
        },
      });

      if (result.error) {
        setErrors({ payment: result.error.message });
        payBtn.current.disabled = false;
      } else if (result.paymentIntent.status === "succeeded") {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };
        dispatch(createOrder(order));
        setSuccessMessage("Payment successful! Your order has been placed.");
        setTimeout(() => navigate("/success"), 3000);
      } else {
        setErrors({ payment: "There was an issue processing your payment." });
        payBtn.current.disabled = false;
      }
    } catch (error) {
      setErrors({
        server:
          error.response?.data?.message || "An error occurred during payment.",
      });
      payBtn.current.disabled = false;
    }
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
    if (error) {
      setErrors((prev) => ({ ...prev, server: error }));
      dispatch(clearErrors());
    }
  }, [dispatch, error, navigate, isAuthenticated]);

  return (
    <Fragment>
      <MetaData title="Payment | ECOMMERCE" />
      <CheckoutSteps activeStep={2} />
      <div className="min-h-screen bg-gray-100 flex  justify-center py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Payment Details
          </h2>
          <p className="text-gray-600 text-sm text-center mb-6">
            Enter your payment information to complete your order.
          </p>

          {successMessage && (
            <p className="text-green-500 text-sm text-center mb-4 animate-fade-in">
              {successMessage}
            </p>
          )}
          {Object.values(errors).map((error, index) => (
            <p
              key={index}
              className="text-red-500 text-sm text-center mb-4 animate-fade-in"
            >
              {error}
            </p>
          ))}

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Card Number
              </label>
              <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-red-500">
                <FaCreditCard className="text-gray-400 mx-3" size={16} />
                {/* <CardNumberElement
                  id="cardNumber"
                  className="w-full px-4 py-2 border-l-0 rounded-md focus:outline-none"
                  options={{ style: { base: { fontSize: "14px", color: "#374151" } } }}
                /> */}
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="cardExpiry"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Expiry Date
              </label>
              <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-red-500">
                <FaCalendarAlt className="text-gray-400 mx-3" size={16} />
                {/* <CardExpiryElement
                  id="cardExpiry"
                  className="w-full px-4 py-2 border-l-0 rounded-md focus:outline-none"
                  options={{ style: { base: { fontSize: "14px", color: "#374151" } } }}
                /> */}
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="cardCvc"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                CVC
              </label>
              <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-red-500">
                <FaLock className="text-gray-400 mx-3" size={16} />
                {/* <CardCvcElement
                  id="cardCvc"
                  className="w-full px-4 py-2 border-l-0 rounded-md focus:outline-none"
                  options={{ style: { base: { fontSize: "14px", color: "#374151" } } }}
                /> */}
              </div>
            </div>

            <button
              type="submit"
              ref={payBtn}
              // disabled={!stripe || !orderInfo.totalPrice || loading}
              className={`w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium 
                `}
              //   ${
              //   !stripe || !orderInfo.totalPrice || loading
              //     ? "opacity-50 cursor-not-allowed"
              //     : ""
              // }
              aria-label="Pay now"
            >
              <FaCreditCard size={16} />
              Pay ₹{(orderInfo.totalPrice || 0).toLocaleString()}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
