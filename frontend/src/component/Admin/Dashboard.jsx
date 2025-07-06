// import React, { useEffect } from "react";
// import Sidebar from "./Sidebar";
// import "./dashboard.css";
// // import { Typography } from "@material-ui/core";
// import { Link } from "react-router-dom";
// // import { Doughnut, Line } from "react-chartjs-2";
// import { useSelector, useDispatch } from "react-redux";
// import { getAdminProduct } from "../../actions/productAction.js";
// import { getAllOrders } from "../../actions/orderAction.js";
// import { getAllUsers } from "../../actions/userAction.js";
// import MetaData from "../layout/MetaData.jsx";

// const Dashboard = () => {
//   const dispatch = useDispatch();

//   const { products } = useSelector((state) => state.products);

//   const { orders } = useSelector((state) => state.allOrders);

//   const { users } = useSelector((state) => state.allUsers);

//   let outOfStock = 0;

//   products &&
//     products.forEach((item) => {
//       if (item.Stock === 0) {
//         outOfStock += 1;
//       }
//     });

//   useEffect(() => {
//     dispatch(getAdminProduct());
//     dispatch(getAllOrders());
//     dispatch(getAllUsers());
//   }, [dispatch]);

//   let totalAmount = 0;
//   orders &&
//     orders.forEach((item) => {
//       totalAmount += item.totalPrice;
//     });

//   const lineState = {
//     labels: ["Initial Amount", "Amount Earned"],
//     datasets: [
//       {
//         label: "TOTAL AMOUNT",
//         backgroundColor: ["tomato"],
//         hoverBackgroundColor: ["rgb(197, 72, 49)"],
//         data: [0, totalAmount],
//       },
//     ],
//   };

//   const doughnutState = {
//     labels: ["Out of Stock", "InStock"],
//     datasets: [
//       {
//         backgroundColor: ["#00A6B4", "#6800B4"],
//         hoverBackgroundColor: ["#4B5000", "#35014F"],
//         data: [outOfStock, products?.length - outOfStock],
//       },
//     ],
//   };

//   return (
//     <div className="dashboard">
//       <MetaData title="Dashboard - Admin Panel" />
//       <Sidebar />

//       <div className="dashboardContainer">
//         {/* <Typography component="h1">Dashboard</Typography>
//          */}
//         <h1>Dashboard</h1>
//         <div className="dashboardSummary">
//           <div>
//             <p>
//               Total Amount <br /> ₹{totalAmount}
//             </p>
//           </div>
//           <div className="dashboardSummaryBox2">
//             <Link to="/admin/products">
//               <p>Product</p>
//               <p>{products && products.length}</p>
//             </Link>
//             <Link to="/admin/orders">
//               <p>Orders</p>
//               <p>{orders && orders.length}</p>
//             </Link>
//             <Link to="/admin/users">
//               <p>Users</p>
//               <p>{users && users.length}</p>
//             </Link>
//           </div>
//         </div>

//         <div className="lineChart">{/* <Line data={lineState} /> */}</div>

//         <div className="doughnutChart">
//           {/* <Doughnut data={doughnutState} /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { getAdminProduct } from "../../actions/productAction";
import { getAdminProduct } from "../../reducers/store/slice/productSlice";
import { getAllOrders } from "../../reducers/store/slice/orderSlice";
import { getAllUsers } from "../../reducers/store/slice/userSlice";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector((state) => state.product);
  const { orders = [] } = useSelector((state) => state.order);
  const { users = [] } = useSelector((state) => state.user);

  // Calculate metrics
  const outOfStock = products.filter((item) => item.Stock === 0).length;
  const totalAmount = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="flex-1 p-8 ">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600 mb-2">Total Amount</p>
            <p className="text-2xl font-semibold text-gray-800">
              ₹{totalAmount.toFixed(2)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/products"
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <p className="text-gray-600">Products</p>
              <p className="text-xl font-semibold text-blue-600">
                {products.length}
              </p>
            </Link>

            <Link
              to="/admin/orders"
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <p className="text-gray-600">Orders</p>
              <p className="text-xl font-semibold text-green-600">
                {orders.length}
              </p>
            </Link>

            <Link
              to="/admin/users"
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <p className="text-gray-600">Users</p>
              <p className="text-xl font-semibold text-purple-600">
                {users.length}
              </p>
            </Link>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Revenue Overview
            </h2>
            {/* Line Chart Placeholder */}
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Line Chart</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Stock Status
            </h2>
            {/* Doughnut Chart Placeholder */}
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Doughnut Chart</p>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
                <span>In Stock ({products.length - outOfStock})</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-purple-800 rounded-full mr-2"></span>
                <span>Out of Stock ({outOfStock})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
