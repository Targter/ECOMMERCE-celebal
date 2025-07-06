// import React, { Fragment, useEffect, useState } from "react";
// // import { DataGrid } from "@material-ui/data-grid";
// import "./productReviews.css";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   clearErrors,
//   getAllReviews,
//   deleteReviews,
// } from "../../actions/productAction";
// // import { useAlert } from "react-alert";
// // import { Button } from "@material-ui/core";
// import MetaData from "../layout/MetaData";
// // import DeleteIcon from "@material-ui/icons/Delete";
// // import Star from "@material-ui/icons/Star";

// import SideBar from "./Sidebar";
// import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

// const ProductReviews = ({ history }) => {
//   const dispatch = useDispatch();

//   const alert = useAlert();

//   const { error: deleteError, isDeleted } = useSelector(
//     (state) => state.review
//   );

//   const { error, reviews, loading } = useSelector(
//     (state) => state.productReviews
//   );

//   const [productId, setProductId] = useState("");

//   const deleteReviewHandler = (reviewId) => {
//     dispatch(deleteReviews(reviewId, productId));
//   };

//   const productReviewsSubmitHandler = (e) => {
//     e.preventDefault();
//     dispatch(getAllReviews(productId));
//   };

//   useEffect(() => {
//     if (productId.length === 24) {
//       dispatch(getAllReviews(productId));
//     }
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     if (deleteError) {
//       alert.error(deleteError);
//       dispatch(clearErrors());
//     }

//     if (isDeleted) {
//       alert.success("Review Deleted Successfully");
//       history.push("/admin/reviews");
//       dispatch({ type: DELETE_REVIEW_RESET });
//     }
//   }, [dispatch, alert, error, deleteError, history, isDeleted, productId]);

//   const columns = [
//     { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

//     {
//       field: "user",
//       headerName: "User",
//       minWidth: 200,
//       flex: 0.6,
//     },

//     {
//       field: "comment",
//       headerName: "Comment",
//       minWidth: 350,
//       flex: 1,
//     },

//     {
//       field: "rating",
//       headerName: "Rating",
//       type: "number",
//       minWidth: 180,
//       flex: 0.4,

//       cellClassName: (params) => {
//         return params.getValue(params.id, "rating") >= 3
//           ? "greenColor"
//           : "redColor";
//       },
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
//             <button
//               onClick={() =>
//                 deleteReviewHandler(params.getValue(params.id, "id"))
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

//   reviews &&
//     reviews.forEach((item) => {
//       rows.push({
//         id: item._id,
//         rating: item.rating,
//         comment: item.comment,
//         user: item.name,
//       });
//     });

//   return (
//     <Fragment>
//       <MetaData title={`ALL REVIEWS - Admin`} />

//       <div className="dashboard">
//         <SideBar />
//         <div className="productReviewsContainer">
//           <form
//             className="productReviewsForm"
//             onSubmit={productReviewsSubmitHandler}
//           >
//             <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

//             <div>
//               {/* <Star /> */}
//               <input
//                 type="text"
//                 placeholder="Product Id"
//                 required
//                 value={productId}
//                 onChange={(e) => setProductId(e.target.value)}
//               />
//             </div>

//             <button
//               id="createProductBtn"
//               type="submit"
//               disabled={
//                 loading ? true : false || productId === "" ? true : false
//               }
//             >
//               Search
//             </button>
//           </form>

//           {reviews && reviews.length > 0 ? (
//             // <DataGrid
//             //   rows={rows}
//             //   columns={columns}
//             //   pageSize={10}
//             //   disableSelectionOnClick
//             //   className="productListTable"
//             //   autoHeight

//             // />
//             <div>heeh</div>
//           ) : (
//             <h1 className="productReviewsFormHeading">No Reviews Found</h1>
//           )}
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default ProductReviews;

//

import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiStar, FiTrash2, FiSearch } from "react-icons/fi";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import {
  getAllReviews,
  clearErrors,
  deleteReviews,
} from "../../reducers/store/slice/productSlice";
// import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const { error, reviews, loading } = useSelector((state) => state.product);

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReviews(reviewId, productId));
    }
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
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
      navigate("/admin/reviews");
      // dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, navigate, isDeleted, productId]);

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />
      <div className="flex min-h-screen bg-gray-100">
        <SideBar />
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <form onSubmit={productReviewsSubmitHandler} className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                ALL REVIEWS
              </h1>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiStar className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Product ID (24 characters)"
                    className="pl-10 w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    minLength={24}
                    maxLength={24}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || productId.length !== 24}
                  className={`flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors ${
                    loading || productId.length !== 24
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <FiSearch /> Search
                </button>
              </div>
            </form>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : reviews && reviews.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Review ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Comment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reviews.map((review) => (
                      <tr key={review._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {review._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {review.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {review.comment}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              review.rating >= 3
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {review.rating}{" "}
                            <FiStar className="ml-1" size={12} />
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => deleteReviewHandler(review._id)}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                          >
                            <FiTrash2 /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium text-gray-600">
                  {productId
                    ? "No reviews found for this product"
                    : "Enter a product ID to search for reviews"}
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
