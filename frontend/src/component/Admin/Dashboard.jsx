
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../reducers/store/slice/productSlice";
import { getAllOrders } from "../../reducers/store/slice/orderSlice";
import { getAllUsers } from "../../reducers/store/slice/userSlice";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products = [], error: productError } = useSelector(
    (state) => state.product
  );
  const { orders = [], error: orderError } = useSelector(
    (state) => state.order
  );
  const {
    users = [],
    isAuthenticated,
    error: userError,
  } = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});

  // Calculate metrics with safety checks
  const outOfStock = Array.isArray(products)
    ? products.filter((item) => item.Stock === 0).length
    : 0;
  const totalAmount = Array.isArray(orders)
    ? orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0)
    : 0;

  // Prepare chart data with safety checks
  const monthlyRevenue = Array(12).fill(0);
  if (Array.isArray(orders)) {
    orders.forEach((order) => {
      if (order.createdAt && order.totalPrice) {
        const date = new Date(order.createdAt);
        const month = date.getMonth();
        monthlyRevenue[month] += order.totalPrice;
      }
    });
  }

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());

    // Handle Redux errors
    const errorMessages = [productError, orderError, userError].filter(Boolean);
    if (errorMessages.length > 0) {
      setErrors({ server: errorMessages.join("; ") });
    }
  }, [
    dispatch,
    navigate,
    isAuthenticated,
    productError,
    orderError,
    userError,
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MetaData title="Dashboard - Admin Panel | ECOMMERCE" />
      <Sidebar />

      <div className="flex-1 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 animate-fade-in">
          Admin Dashboard
        </h1>

        {errors.server && (
          <p className="text-red-500 text-sm text-center mb-4 animate-fade-in">
            {errors.server}
          </p>
        )}

        {/* Summary Cards */}
        <div className="grid gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-sm mb-2">Total Revenue</p>
            <p className="text-2xl font-semibold text-red-500">
              ₹{totalAmount.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/admin/products"
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200"
              aria-label="View all products"
            >
              <p className="text-gray-600 text-sm">Products</p>
              <p className="text-xl font-semibold text-red-500">
                {products.length || 0}
              </p>
            </Link>
            <Link
              to="/admin/orders"
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200"
              aria-label="View all orders"
            >
              <p className="text-gray-600 text-sm">Orders</p>
              <p className="text-xl font-semibold text-red-500">
                {orders.length || 0}
              </p>
            </Link>
            <Link
              to="/admin/users"
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200"
              aria-label="View all users"
            >
              <p className="text-gray-600 text-sm">Users</p>
              <p className="text-xl font-semibold text-red-500">
                {users.length || 0}
              </p>
            </Link>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Revenue Overview
            </h2>
            {Array.isArray(orders) && orders.length > 0 ? (
              // ```chartjs
              // {
              //   "type": "line",
              //   "data": {
              //     "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              //     "datasets": [{
              //       "label": "Monthly Revenue",
              //       "data": [
              //         ${monthlyRevenue[0] || 0},
              //         ${monthlyRevenue[1] || 0},
              //         ${monthlyRevenue[2] || 0},
              //         ${monthlyRevenue[3] || 0},
              //         ${monthlyRevenue[4] || 0},
              //         ${monthlyRevenue[5] || 0},
              //         ${monthlyRevenue[6] || 0},
              //         ${monthlyRevenue[7] || 0},
              //         ${monthlyRevenue[8] || 0},
              //         ${monthlyRevenue[9] || 0},
              //         ${monthlyRevenue[10] || 0},
              //         ${monthlyRevenue[11] || 0}
              //       ],
              //       "borderColor": "#ef4444",
              //       "backgroundColor": "rgba(239, 68, 68, 0.1)",
              //       "fill": true,
              //       "tension": 0.4
              //     }]
              //   },
              //   "options": {
              //     "responsive": true,
              //     "maintainAspectRatio": false,
              //     "scales": {
              //       "y": {
              //         "beginAtZero": true,
              //         "title": { "display": true, "text": "Revenue (₹)" }
              //       },
              //       "x": {
              //         "title": { "display": true, "text": "Month" }
              //       }
              //     },
              //     "plugins": {
              //       "legend": { "display": true, "position": "top" },
              //       "tooltip": { "enabled": true }
              //     }
              //   }
              // }
              // ```
              <p>ab</p>
            ) : (
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500 text-sm">No order data available</p>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Stock Status
            </h2>
            {Array.isArray(products) && products.length > 0 ? (
              // ```chartjs
              // {
              //   "type": "doughnut",
              //   "data": {
              //     "labels": ["In Stock", "Out of Stock"],
              //     "datasets": [{
              //       "data": [${products.length - outOfStock}, ${outOfStock}],
              //       "backgroundColor": ["#ef4444", "#9ca3af"],
              //       "borderColor": ["#fff", "#fff"],
              //       "borderWidth": 2
              //     }]
              //   },
              //   "options": {
              //     "responsive": true,
              //     "maintainAspectRatio": false,
              //     "plugins": {
              //       "legend": { "display": true, "position": "bottom" },
              //       "tooltip": { "enabled": true }
              //     }
              //   }
              // }
              // ```

              <p>ab</p>
            ) : (
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500 text-sm">
                  No product data available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
