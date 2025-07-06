// import React, { Fragment, useEffect } from "react";
// // import { DataGrid } from "@material-ui/data-grid";
// import "./productList.css";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   clearErrors,
//   getAdminProduct,
//   deleteProduct,
// } from "../../actions/productAction";
// import { Link } from "react-router-dom";
// // import { useAlert } from "react-alert";
// // import { Button } from "@material-ui/core";
// import MetaData from "../layout/MetaData";
// // import EditIcon from "@material-ui/icons/Edit";
// // import DeleteIcon from "@material-ui/icons/Delete";
// import SideBar from "./Sidebar";
// import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

// const ProductList = ({ history }) => {
//   const dispatch = useDispatch();

//   // const alert = useAlert();

//   const { error, products } = useSelector((state) => state.products);

//   const { error: deleteError, isDeleted } = useSelector(
//     (state) => state.product
//   );

//   const deleteProductHandler = (id) => {
//     dispatch(deleteProduct(id));
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
//       // alert.success("Product Deleted Successfully");
//       history.push("/admin/dashboard");
//       dispatch({ type: DELETE_PRODUCT_RESET });
//     }

//     dispatch(getAdminProduct());
//   }, [dispatch, error, deleteError, history, isDeleted]);

//   const columns = [
//     { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

//     {
//       field: "name",
//       headerName: "Name",
//       minWidth: 350,
//       flex: 1,
//     },
//     {
//       field: "stock",
//       headerName: "Stock",
//       type: "number",
//       minWidth: 150,
//       flex: 0.3,
//     },

//     {
//       field: "price",
//       headerName: "Price",
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
//             <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
//               {/* <EditIcon /> */}
//               Edit
//             </Link>

//             <button
//               onClick={() =>
//                 deleteProductHandler(params.getValue(params.id, "id"))
//               }
//             >
//               delete
//               {/* <DeleteIcon /> */}
//             </button>
//           </Fragment>
//         );
//       },
//     },
//   ];

//   const rows = [];

//   products &&
//     products.forEach((item) => {
//       rows.push({
//         id: item._id,
//         stock: item.Stock,
//         price: item.price,
//         name: item.name,
//       });
//     });

//   return (
//     <Fragment>
//       <MetaData title={`ALL PRODUCTS - Admin`} />

//       <div className="dashboard">
//         <SideBar />
//         <div className="productListContainer">
//           <h1 id="productListHeading">ALL PRODUCTS</h1>

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

// export default ProductList;

//

import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../reducers/store/slice/productSlice";
// import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products, loading } = useSelector((state) => state.product);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product ..?")) {
      dispatch(deleteProduct(id));
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (deleteError) {
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate("/admin/dashboard");
      // dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, navigate, isDeleted]);
  console.log("products:", products);
  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />
      <div className="flex min-h-screen bg-gray-100">
        <SideBar />
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">ALL PRODUCTS</h1>
              <Link
                to="/admin/product/new"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                <FiPlus /> Add Product
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products?.map((product) => (
                      <tr key={product._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.Stock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-4">
                            <Link
                              to={`/admin/product/${product._id}`}
                              className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                            >
                              <FiEdit2 /> Edit
                            </Link>
                            <button
                              onClick={() => deleteProductHandler(product._id)}
                              className="text-red-600 hover:text-red-900 flex items-center gap-1"
                            >
                              <FiTrash2 /> Delete
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
    </Fragment>
  );
};

export default ProductList;
