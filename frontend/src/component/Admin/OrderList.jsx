import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit2, FiTrash2, FiSearch, FiRefreshCw } from "react-icons/fi";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../reducers/store/slice/orderSlice";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { loading, error, orders = [] } = useSelector((state) => state.order);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id, orderId) => {
    if (window.confirm(`Are you sure you want to delete order #${orderId}?`)) {
      dispatch(deleteOrder(id))
        .unwrap()
        .then(() => {
          toast.success("Order deleted successfully");
        })
        .catch((error) => {
          toast.error(error.message || "Failed to delete order");
        });
    }
  };

  const refreshOrders = () => {
    setIsRefreshing(true);
    dispatch(getAllOrders())
      .unwrap()
      .finally(() => setIsRefreshing(false));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order deleted successfully");
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, isDeleted]);

  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MetaData title="Order Management - Admin" />
      <SideBar />

      <div className="flex-1 p-4 md:p-6 overflow-x-hidden">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Order Management
            </h1>

            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button
                onClick={refreshOrders}
                disabled={loading || isRefreshing}
                className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
              >
                <FiRefreshCw
                  className={`${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-600">
                Error loading orders. Please try again.
              </p>
              <button
                onClick={refreshOrders}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                Retry
              </button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600">
                {searchTerm ? "No matching orders found" : "No orders found"}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-blue-600 hover:text-blue-800"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-[120px] md:max-w-xs">
                        {order._id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.user?.name || "Guest"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.orderItems.length}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹
                        {order.totalPrice.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <Link
                            to={`/admin/order/${order._id}`}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                            title="View/Edit"
                          >
                            <FiEdit2 size={16} />
                            <span className="hidden md:inline">Details</span>
                          </Link>
                          <button
                            onClick={() =>
                              deleteOrderHandler(
                                order._id,
                                order._id.slice(-6).toUpperCase()
                              )
                            }
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                            title="Delete"
                            disabled={loading}
                          >
                            <FiTrash2 size={16} />
                            <span className="hidden md:inline">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
