// // import React, { Fragment, useEffect } from "react";
// // // import { DataGrid } from "@material-ui/data-grid";
// // import "./myOrders.css";
// // import { useSelector, useDispatch } from "react-redux";
// // import { clearErrors, myOrders } from "../../actions/orderAction";
// // import Loader from "../layout/Loader/Loader";
// // import { Link } from "react-router-dom";
// // // import { useAlert } from "react-alert";
// // // import div from "@material-ui/core/div";
// // import MetaData from "../layout/MetaData";
// // // import LaunchIcon from "@material-ui/icons/Launch";

// // const MyOrders = () => {
// //   const dispatch = useDispatch();

// //   // // const alert = useAlert();

// //   const { loading, error, orders } = useSelector((state) => state.myOrders);
// //   const { user } = useSelector((state) => state.user);

// //   const columns = [
// //     { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

// //     {
// //       field: "status",
// //       headerName: "Status",
// //       minWidth: 150,
// //       flex: 0.5,
// //       cellClassName: (params) => {
// //         return params.getValue(params.id, "status") === "Delivered"
// //           ? "greenColor"
// //           : "redColor";
// //       },
// //     },
// //     {
// //       field: "itemsQty",
// //       headerName: "Items Qty",
// //       type: "number",
// //       minWidth: 150,
// //       flex: 0.3,
// //     },

// //     {
// //       field: "amount",
// //       headerName: "Amount",
// //       type: "number",
// //       minWidth: 270,
// //       flex: 0.5,
// //     },

// //     {
// //       field: "actions",
// //       flex: 0.3,
// //       headerName: "Actions",
// //       minWidth: 150,
// //       type: "number",
// //       sortable: false,
// //       renderCell: (params) => {
// //         return (
// //           <Link to={`/order/${params.getValue(params.id, "id")}`}>
// //             {/* <LaunchIcon /> */}
// //           </Link>
// //         );
// //       },
// //     },
// //   ];
// //   const rows = [];

// //   orders &&
// //     orders.forEach((item, index) => {
// //       rows.push({
// //         itemsQty: item.orderItems.length,
// //         id: item._id,
// //         status: item.orderStatus,
// //         amount: item.totalPrice,
// //       });
// //     });

// //   useEffect(() => {
// //     if (error) {
// //       // alert.error(error);
// //       dispatch(clearErrors());
// //     }

// //     dispatch(myOrders());
// //   }, [dispatch, error]);

// //   return (
// //     <Fragment>
// //       <MetaData title={`${user.name} - Orders`} />

// //       {loading ? (
// //         <Loader />
// //       ) : (
// //         <div className="myOrdersPage">
// //           {/* <DataGrid
// //             rows={rows}
// //             columns={columns}
// //             pageSize={10}
// //             disableSelectionOnClick
// //             className="myOrdersTable"
// //             autoHeight
// //           /> */}

// //           <div id="myOrdersHeading">{user.name}'s Orders</div>
// //         </div>
// //       )}
// //     </Fragment>
// //   );
// // };

// // export default MyOrders;

// //

// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// // import { clearErrors, myOrders } from "../../actions/orderAction";
// import { myOrders, clearErrors } from "../../reducers/store/slice/orderSlice";
// import Loader from "../layout/Loader/Loader";
// import MetaData from "../layout/MetaData";
// import { FaBoxOpen, FaExternalLinkAlt, FaShoppingBag } from "react-icons/fa";
// import "./myOrders.css";

// const MyOrders = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.user);
//   // console.log("?user", user);
//   const { loading, error, orders } = useSelector((state) => state.order);

//   const columns = [
//     { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
//     {
//       field: "status",
//       headerName: "Status",
//       minWidth: 150,
//       flex: 0.5,
//       cellClassName: (params) =>
//         params.status === "Delivered" ? "greenColor" : "redColor",
//     },
//     {
//       field: "itemsQty",
//       headerName: "Items Qty",
//       type: "number",
//       minWidth: 150,
//       flex: 0.3,
//     },
//     {
//       field: "amount",
//       headerName: "Amount",
//       type: "number",
//       minWidth: 270,
//       flex: 0.5,
//     },
//     {
//       field: "actions",
//       flex: 0.3,
//       headerName: "Actions",
//       minWidth: 150,
//       sortable: false,
//       renderCell: (params) => (
//         <Link to={`/order/${params.id}`}>
//           <FaExternalLinkAlt />
//         </Link>
//       ),
//     },
//   ];

//   const rows =
//     orders?.map((item) => ({
//       id: item._id,
//       itemsQty: item.orderItems.length,
//       status: item.orderStatus,
//       amount: item.totalPrice,
//     })) || [];

//   useEffect(() => {
//     if (error) {
//       // alert.error(error);
//       dispatch(clearErrors());
//     }

//     console.log("thsi CAlled.......");
//     dispatch(myOrders());
//   }, [dispatch, error]);

//   return (
//     <>
//       <MetaData title={`${user.name} - Orders`} />

//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <MetaData title={`${user.name} - Orders`} />

//           <header className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
//               <FaBoxOpen className="text-blue-500 text-2xl" />
//               My Orders
//             </h1>
//             <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
//           </header>

//           {orders?.length === 0 ? (
//             <div className="bg-gray-50 rounded-xl p-8 text-center shadow-sm">
//               <div className="mx-auto w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//                 <FaShoppingBag className="text-gray-400 text-6xl" />
//               </div>
//               <h3 className="text-xl font-medium text-gray-700 mb-4">
//                 You haven't placed any orders yet
//               </h3>
//               <Link
//                 to="/products"
//                 className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
//               >
//                 Start Shopping
//               </Link>
//             </div>
//           ) : (
//             <div className="bg-white shadow-sm rounded-xl overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Order ID
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Status
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Items
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Amount
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {orders?.map((order) => (
//                       <tr
//                         key={order._id}
//                         className="hover:bg-gray-50 transition-colors duration-150"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-xs">
//                           {order._id}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                               order.orderStatus === "Delivered"
//                                 ? "bg-green-100 text-green-800"
//                                 : "bg-yellow-100 text-yellow-800"
//                             }`}
//                           >
//                             {order.orderStatus}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {order.orderItems.length}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           ${order.totalPrice.toFixed(2)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                           <Link
//                             to={`/order/${order._id}`}
//                             className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
//                             aria-label={`View order ${order._id}`}
//                           >
//                             <FaExternalLinkAlt className="inline" />
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default MyOrders;

//

import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { myOrders, clearErrors } from "../../reducers/store/slice/orderSlice";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { FaBoxOpen, FaShoppingBag, FaExternalLinkAlt } from "react-icons/fa";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
    if (error) {
      setErrors((prev) => ({ ...prev, server: error }));
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error, navigate, isAuthenticated]);

  const [errors, setErrors] = useState({});

  return (
    <Fragment>
      <MetaData title={`${user?.name || "User"} - Orders | ECOMMERCE`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gray-100 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2 animate-fade-in">
                <FaBoxOpen className="text-red-500" size={28} />
                My Orders
              </h1>
              <p className="text-gray-600 text-sm mt-2">
                Welcome back, {user?.name || "User"}! View your order history
                below.
              </p>
            </header>

            {errors.server && (
              <p className="text-red-500 text-sm text-center mb-4 animate-fade-in">
                {errors.server}
              </p>
            )}

            {orders?.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center animate-fade-in">
                <div className="mx-auto w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <FaShoppingBag className="text-gray-400 text-6xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  No Orders Found
                </h3>
                <p className="text-gray-600 mb-6">
                  You haven't placed any orders yet. Start shopping now!
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                  aria-label="Start shopping"
                >
                  <FaShoppingBag size={16} />
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Order ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Items
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr
                          key={order._id}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-xs">
                            {order._id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.orderStatus === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {order.orderStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {order.orderItems?.length || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            ₹{(order.totalPrice || 0).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link
                              to={`/order/${order._id}`}
                              className="text-red-500 hover:text-red-600 transition-colors duration-200"
                              aria-label={`View order ${order._id}`}
                            >
                              <FaExternalLinkAlt size={16} />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
