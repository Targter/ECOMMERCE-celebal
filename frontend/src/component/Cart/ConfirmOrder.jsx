// import React, { Fragment } from "react";
// import CheckoutSteps from "./CheckoutSteps";
// import { useSelector } from "react-redux";
// import MetaData from "../layout/MetaData";
// import "./ConfirmOrder.css";
// import { Link, useNavigate } from "react-router-dom";
// // import { div } from "@material-ui/core";

// const ConfirmOrder = () => {
//   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.quantity * item.price,
//     0
//   );

//   const shippingCharges = subtotal > 1000 ? 0 : 200;

//   const tax = subtotal * 0.18;

//   const totalPrice = subtotal + tax + shippingCharges;

//   const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

//   const proceedToPayment = () => {
//     const data = {
//       subtotal,
//       shippingCharges,
//       tax,
//       totalPrice,
//     };

//     sessionStorage.setItem("orderInfo", JSON.stringify(data));

//     navigate("/process/payment");
//   };

//   return (
//     <Fragment>
//       <MetaData title="Confirm Order" />
//       <CheckoutSteps activeStep={1} />
//       <div className="confirmOrderPage">
//         <div>
//           <div className="confirmshippingArea">
//             <div>Shipping Info</div>
//             <div className="confirmshippingAreaBox">
//               <div>
//                 <p>Name:</p>
//                 <span>{user.name}</span>
//               </div>
//               <div>
//                 <p>Phone:</p>
//                 <span>{shippingInfo.phoneNo}</span>
//               </div>
//               <div>
//                 <p>Address:</p>
//                 <span>{address}</span>
//               </div>
//             </div>
//           </div>
//           <div className="confirmCartItems">
//             <div>Your Cart Items:</div>
//             <div className="confirmCartItemsContainer">
//               {cartItems &&
//                 cartItems.map((item) => (
//                   <div key={item.product}>
//                     <img src={item.image} alt="Product" />
//                     <Link to={`/product/${item.product}`}>
//                       {item.name}
//                     </Link>{" "}
//                     <span>
//                       {item.quantity} X ₹{item.price} ={" "}
//                       <b>₹{item.price * item.quantity}</b>
//                     </span>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//         {/*  */}
//         <div>
//           <div className="orderSummary">
//             <div>Order Summery</div>
//             <div>
//               <div>
//                 <p>Subtotal:</p>
//                 <span>₹{subtotal}</span>
//               </div>
//               <div>
//                 <p>Shipping Charges:</p>
//                 <span>₹{shippingCharges}</span>
//               </div>
//               <div>
//                 <p>GST:</p>
//                 <span>₹{tax}</span>
//               </div>
//             </div>

//             <div className="orderSummaryTotal">
//               <p>
//                 <b>Total:</b>
//               </p>
//               <span>₹{totalPrice}</span>
//             </div>

//             <button onClick={proceedToPayment}>Proceed To Payment</button>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default ConfirmOrder;

//
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
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

  const proceedToPayment = () => {
    const data = { subtotal, shippingCharges, tax, totalPrice };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order | ECOMMERCE" />
      <div className="mt-[90px]">
        {" "}
        <CheckoutSteps activeStep={1} />
      </div>
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
            Confirm Your Order
          </h1>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Shipping Info and Cart Items */}
            <div className="lg:w-2/3 space-y-6">
              {/* Shipping Info */}
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

              {/* Cart Items */}
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

            {/* Order Summary */}
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
                  onClick={proceedToPayment}
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
