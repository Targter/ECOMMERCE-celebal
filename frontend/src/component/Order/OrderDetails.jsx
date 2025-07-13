
import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getOrderDetails,
  clearErrors,
} from "../../reducers/store/slice/orderSlice";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBoxOpen,
  FaShoppingBag,
} from "react-icons/fa";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, error, loading } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  console.log("order:", order);
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
    if (error) {
      setErrors((prev) => ({ ...prev, server: error }));
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, navigate, isAuthenticated]);

  return (
    <Fragment>
      <MetaData title="Order Details | ECOMMERCE" />
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gray-100 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2 animate-fade-in">
                <FaBoxOpen className="text-red-500" size={28} />
                Order #{order?._id || id}
              </h1>
              <p className="text-gray-600 text-sm mt-2">
                View your order details below.
              </p>
            </header>

            {errors.server && (
              <p className="text-red-500 text-sm text-center mb-4 animate-fade-in">
                {errors.server}
              </p>
            )}

            {!order ? (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center animate-fade-in">
                <div className="mx-auto w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <FaShoppingBag className="text-gray-400 text-6xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Order Not Found
                </h3>
                <p className="text-gray-600 mb-6">
                  The requested order could not be found. Return to your orders.
                </p>
                <Link
                  to="/orders"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                  aria-label="Return to my orders"
                >
                  <FaBoxOpen size={16} />
                  My Orders
                </Link>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Order Details */}
                <div className="lg:w-2/3 space-y-6">
                  {/* Shipping Info */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" size={20} />
                      Shipping Information
                    </h2>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex gap-2">
                        <p className="font-medium">Name:</p>
                        <span>{order.user?.name || "Not available"}</span>
                      </div>
                      <div className="flex gap-2">
                        <p className="font-medium">Phone:</p>
                        <span>
                          {order.shippingInfo?.phoneNo || "Not provided"}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <p className="font-medium">Address:</p>
                        <span>
                          {order.shippingInfo
                            ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
                            : "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaCreditCard className="text-red-500" size={20} />
                      Payment
                    </h2>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex gap-2">
                        {console.log(order?.paymentInfo?.status)}
                        <p
                          className={`font-medium ${
                            order.paymentInfo?.status === "Paid"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {order.paymentInfo?.status === "Paid"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <p className="font-medium">Amount:</p>
                        <span>₹{(order.totalPrice || 0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Status */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaBoxOpen className="text-red-500" size={20} />
                      Order Status
                    </h2>
                    <div className="text-sm">
                      <p
                        className={`font-medium ${
                          order.orderStatus === "Delivered"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {order.orderStatus || "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="lg:w-1/3">
                  <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaShoppingBag className="text-red-500" size={20} />
                      Order Items
                    </h2>
                    <div className="space-y-4">
                      {order.orderItems?.length === 0 ? (
                        <p className="text-gray-600 text-sm text-center">
                          No items in this order.
                        </p>
                      ) : (
                        order.orderItems.map((item) => (
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
                                aria-label={`View product ${item.name}`}
                              >
                                {item.name || "Unnamed Product"}
                              </Link>
                              <p className="text-sm text-gray-600 mt-1">
                                {item.quantity} × ₹
                                {(item.price || 0).toLocaleString()} ={" "}
                                <span className="font-semibold">
                                  ₹
                                  {(
                                    (item.price || 0) * (item.quantity || 0)
                                  ).toLocaleString()}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OrderDetails;
