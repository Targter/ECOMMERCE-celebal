

import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiDollarSign,
  FiUser,
  FiPhone,
  FiMapPin,
  FiShoppingCart,
} from "react-icons/fi";
import { MdAccountTree } from "react-icons/md";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
// import {
//   getOrderDetails,
//   clearErrors,
//   updateOrder,
// } from "../../actions/orderAction";

import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../reducers/store/slice/orderSlice";
import Loader from "../layout/Loader/Loader";
// import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { order, error, loading } = useSelector((state) => state.order);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder({ id, order: myForm }));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (updateError) {
      dispatch(clearErrors());
    }
    if (isUpdated) {
      // dispatch({ type: UPDATE_ORDER_RESET });
      navigate("/admin/orders");
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="flex min-h-screen bg-gray-100">
        <SideBar />
        <div className="flex-1 p-4">
          {loading ? (
            <Loader />
          ) : (
            <div
              className={`${
                order?.orderStatus === "Delivered"
                  ? "block"
                  : "grid grid-cols-1 lg:grid-cols-2 gap-6"
              }`}
            >
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FiTruck /> Shipping Info
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <p className="w-24 font-medium flex items-center gap-1">
                        <FiUser /> Name:
                      </p>
                      <span>{order?.user?.name}</span>
                    </div>
                    <div className="flex items-start">
                      <p className="w-24 font-medium flex items-center gap-1">
                        <FiPhone /> Phone:
                      </p>
                      <span>{order?.shippingInfo?.phoneNo}</span>
                    </div>
                    <div className="flex items-start">
                      <p className="w-24 font-medium flex items-center gap-1">
                        <FiMapPin /> Address:
                      </p>
                      <span>
                        {order?.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FiDollarSign /> Payment
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <p className="w-24 font-medium">Status:</p>
                      <span
                        className={`${
                          order?.paymentInfo?.status === "succeeded"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {order?.paymentInfo?.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <p className="w-24 font-medium">Amount:</p>
                      <span>₹{order?.totalPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FiPackage /> Order Status
                  </h2>
                  <div className="flex items-start">
                    <p className="w-24 font-medium">Status:</p>
                    <span
                      className={`${
                        order?.orderStatus === "Delivered"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {order?.orderStatus}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FiShoppingCart /> Your Cart Items:
                  </h2>
                  <div className="space-y-4">
                    {order?.orderItems?.map((item) => (
                      <div
                        key={item.product}
                        className="flex items-center gap-4 p-3 border rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt="Product"
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <Link
                            to={`/product/${item.product}`}
                            className="text-blue-600 hover:underline"
                          >
                            {item.name}
                          </Link>
                          <p className="text-gray-600">
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {order?.orderStatus !== "Delivered" && (
                <div className="bg-white rounded-lg shadow p-6 h-fit">
                  <form onSubmit={updateOrderSubmitHandler}>
                    <h1 className="text-2xl font-bold mb-6">Process Order</h1>

                    <div className="mb-6">
                      <label className=" mb-2 font-medium flex items-center gap-2">
                        <MdAccountTree /> Update Status
                      </label>
                      <select
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                      >
                        <option value="">Choose Status</option>
                        {order?.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {order?.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors ${
                        loading || status === ""
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={loading || status === ""}
                    >
                      {loading ? "Processing..." : "Process"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
