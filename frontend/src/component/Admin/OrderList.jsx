// import React, { Fragment, useEffect } from "react";
// // import { DataGrid } from "@material-ui/data-grid";
// import "./productList.css";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// // import { useAlert } from "react-alert";
// // import { Button } from "@material-ui/core";
// import MetaData from "../layout/MetaData";
// // import EditIcon from "@material-ui/icons/Edit";
// // import DeleteIcon from "@material-ui/icons/Delete";
// import SideBar from "./Sidebar";
// import {
//   deleteOrder,
//   getAllOrders,
//   clearErrors,
// } from "../../actions/orderAction";
// import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

// const OrderList = ({ history }) => {
//   const dispatch = useDispatch();

//   // const alert = useAlert();

//   const { error, orders } = useSelector((state) => state.allOrders);

//   const { error: deleteError, isDeleted } = useSelector((state) => state.order);

//   const deleteOrderHandler = (id) => {
//     dispatch(deleteOrder(id));
//   };

//   useEffect(() => {
//     if (error) {
//       // alert.error(error);
//       dispatch(clearErrors());
//     }

//     if (deleteError) {
//       // alert.error(deleteError);
//       dispatch(clearErrors());
//     }

//     if (isDeleted) {
//       // alert.success("Order Deleted Successfully");
//       history.push("/admin/orders");
//       dispatch({ type: DELETE_ORDER_RESET });
//     }

//     dispatch(getAllOrders());
//   }, [dispatch, error, deleteError, history, isDeleted]);

//   const columns = [
//     { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

//     {
//       field: "status",
//       headerName: "Status",
//       minWidth: 150,
//       flex: 0.5,
//       cellClassName: (params) => {
//         return params.getValue(params.id, "status") === "Delivered"
//           ? "greenColor"
//           : "redColor";
//       },
//     },
//     {
//       field: "itemsQty",
//       headerName: "Items Qty",
//       type: "number",
//       minWidth: 150,
//       flex: 0.4,
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
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <Fragment>
//             <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
//               {/* <EditIcon /> */}
//             </Link>

//             <button
//               onClick={() =>
//                 deleteOrderHandler(params.getValue(params.id, "id"))
//               }
//             >
//               {/* <DeleteIcon /> */}
//             </button>
//           </Fragment>
//         );
//       },
//     },
//   ];

//   const rows = [];

//   orders &&
//     orders.forEach((item) => {
//       rows.push({
//         id: item._id,
//         itemsQty: item.orderItems.length,
//         amount: item.totalPrice,
//         status: item.orderStatus,
//       });
//     });

//   return (
//     <Fragment>
//       <MetaData title={`ALL ORDERS - Admin`} />

//       <div className="dashboard">
//         <SideBar />
//         <div className="productListContainer">
//           <h1 id="productListHeading">ALL ORDERS</h1>
//           <div>Missing a;lkdsfjadsk;lfjadfsk;ljadsk;lfj;ladskfj</div>
//           {/* <DataGrid
//             rows={rows}
//             columns={columns}
//             pageSize={10}
//             disableSelectionOnClick
//             className="productListTable"
//             autoHeight
//           /> */}
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default OrderList;

//

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../reducers/store/slice/orderSlice";
// import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders = [] } = useSelector((state) => state.order);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    if (
      window.confirm("Are you sure you want to delete this order in orderlist?")
    ) {
      dispatch(deleteOrder(id));
    }
  };

  useEffect(() => {
    if (error) {
      // Handle error (e.g., show toast)
      dispatch(clearErrors());
    }

    if (deleteError) {
      // Handle error (e.g., show toast)
      dispatch(clearErrors());
    }

    if (isDeleted) {
      // Handle success (e.g., show success toast)
      navigate("/admin/orders");
      // dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MetaData title="ALL ORDERS - Admin" />
      <SideBar />

      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">ALL ORDERS</h1>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items Qty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.orderItems.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-4">
                        <Link
                          to={`/admin/order/${order._id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FiEdit2 className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => deleteOrderHandler(order._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
