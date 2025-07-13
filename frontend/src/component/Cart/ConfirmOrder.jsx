import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { clearCart } from "../../reducers/store/slice/cartSlice";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + shippingCharges + tax;

  const address = shippingInfo.address
    ? `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`
    : "Address not provided";

  const handlePayment = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    // Log order details to verify
    console.log("Order details:", {
      cartItems,
      shippingInfo,
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    });

    try {
      // Create Razorpay order
      const { data } = await axios.post(
        "https://ecommerce-celebal-z4l7.vercel.app/api/v1/create-order",
        {
          amount: totalPrice,
          cartItems: cartItems.map((item) => ({
            productId: item.product,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
            image: item.image,
          })),
          shippingInfo,
        },
        { withCredentials: true }
      );

      if (data.success) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "ECOMMERCE",
          description: `Order for ${cartItems.length} item(s)`,
          order_id: data.order.id,
          handler: async (response) => {
            console.log("Razorpay response:", response);
            const requestBody = {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              orderDetails: {
                cartItems: cartItems.map((item) => ({
                  productId: item.product,
                  quantity: item.quantity,
                  price: item.price,
                  name: item.name,
                  image: item.image,
                })),
                shippingInfo,
                subtotal,
                shippingCharges,
                tax,
                totalPrice,
              },
            };
            console.log("Request body for /verify-payment:", requestBody);
            try {
              const verification = await axios.post(
                "https://ecommerce-celebal-z4l7.vercel.app/api/v1/verify-payment",
                requestBody,
                { withCredentials: true }
              );

              if (verification.data.success) {
                toast.success("Order confirmed!");
                dispatch(clearCart());
                sessionStorage.removeItem("orderInfo");
                navigate("/success");
              } else {
                toast.error("Payment verification failed");
              }
            } catch (error) {
              toast.error("Error verifying payment");
              console.error("Verification error:", error);
            }
          },
          theme: { color: "#0d9488" },
          prefill: {
            name: user?.name || "Customer",
            email: user?.email || "customer@example.com",
            contact: user?.phone || "9999999999",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (response) => {
          toast.error(`Payment failed: ${response.error.description}`);
        });
        rzp.open();
      } else {
        toast.error(data.message || "Failed to create payment order");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Payment initialization failed"
      );
      console.error("Payment error:", error);
    }
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order | ECOMMERCE" />
      <div className="">
        <CheckoutSteps activeStep={1} />
      </div>
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
            Confirm Your Order
          </h1>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Shipping Information
                </h2>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex gap-2">
                    <p className="font-medium">Name:</p>
                    <span>{user?.name || "Not available"}</span>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-medium">Phone:</p>
                    <span>{shippingInfo.phoneNo || "Not provided"}</span>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-medium">Address:</p>
                    <span>{address}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Your Cart Items
                </h2>
                <div className="space-y-4">
                  {cartItems.length === 0 ? (
                    <p className="text-gray-600 text-sm text-center">
                      No items in your cart.
                    </p>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item.product}
                        className="flex items-center gap-4 border-b border-gray-200 pb-4"
                      >
                        <img
                          src={item.image || "/default-product.png"}
                          alt={item.name || "Product"}
                          className="w-16 h-16 object-cover rounded-md"
                          onError={(e) =>
                            (e.target.src = "/default-product.png")
                          }
                        />
                        <div className="flex-1">
                          <Link
                            to={`/product/${item.product}`}
                            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-200"
                            aria-label={`View details for ${item.name}`}
                          >
                            {item.name || "Unnamed Product"}
                          </Link>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.quantity} x ₹{item.price.toLocaleString()} ={" "}
                            <span className="font-semibold">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <p>Subtotal:</p>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping Charges:</p>
                    <span>₹{shippingCharges.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <p>GST (18%):</p>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-800 pt-2 border-t border-gray-200">
                    <p>Total:</p>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={handlePayment}
                  className="w-full mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                  aria-label="Proceed to payment"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
