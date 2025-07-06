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
// import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
// import { DELETE_USER_RESET } from "../../constants/userConstants";

// const UsersList = ({ history }) => {
//   const dispatch = useDispatch();

//   // const alert = useAlert();

//   const { error, users } = useSelector((state) => state.allUsers);

//   const {
//     error: deleteError,
//     isDeleted,
//     message,
//   } = useSelector((state) => state.profile);

//   const deleteUserHandler = (id) => {
//     dispatch(deleteUser(id));
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
//       // alert.success(message);
//       history.push("/admin/users");
//       dispatch({ type: DELETE_USER_RESET });
//     }

//     dispatch(getAllUsers());
//   }, [dispatch, error, deleteError, history, isDeleted, message]);

//   const columns = [
//     { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

//     {
//       field: "email",
//       headerName: "Email",
//       minWidth: 200,
//       flex: 1,
//     },
//     {
//       field: "name",
//       headerName: "Name",
//       minWidth: 150,
//       flex: 0.5,
//     },

//     {
//       field: "role",
//       headerName: "Role",
//       type: "number",
//       minWidth: 150,
//       flex: 0.3,
//       cellClassName: (params) => {
//         return params.getValue(params.id, "role") === "admin"
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
//             <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
//               {/* <EditIcon /> */}
//               edit
//             </Link>

//             <button
//               onClick={() =>
//                 deleteUserHandler(params.getValue(params.id, "id"))
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

//   users &&
//     users.forEach((item) => {
//       rows.push({
//         id: item._id,
//         role: item.role,
//         email: item.email,
//         name: item.name,
//       });
//     });

//   return (
//     <Fragment>
//       <MetaData title={`ALL USERS - Admin`} />

//       <div className="dashboard">
//         <SideBar />
//         <div className="productListContainer">
//           <h1 id="productListHeading">ALL USERS</h1>

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

// export default UsersList;

//

// import { Fragment, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import { FiUser, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
// import MetaData from "../layout/MetaData";
// import SideBar from "./Sidebar";
// // import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
// import { getAllUsers, deleteUser, clearErrors } from "../../actions/userAction";
// import { DELETE_USER_RESET } from "../../constants/userConstants";
// import Loader from "../layout/Loader/Loader";

// const UsersList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { error, users, loading } = useSelector((state) => state.user);
//   const {
//     error: deleteError,
//     isDeleted,
//     message,
//   } = useSelector((state) => state.user);

//   const deleteUserHandler = (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       dispatch(deleteUser(id));
//     }
//   };

//   useEffect(() => {
//     if (error) {
//       dispatch(clearErrors());
//     }

//     if (deleteError) {
//       dispatch(clearErrors());
//     }

//     if (isDeleted) {
//       navigate("/admin/users");
//       dispatch({ type: DELETE_USER_RESET });
//     }

//     dispatch(getAllUsers());
//   }, [dispatch, error, deleteError, navigate, isDeleted, message]);

//   return (
//     <Fragment>
//       <MetaData title={`ALL USERS - Admin`} />
//       <div className="flex min-h-screen bg-gray-100">
//         <SideBar />
//         <div className="flex-1 p-6">
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h1 className="text-2xl font-bold text-gray-800">ALL USERS</h1>
//               {/* <Link
//                 to="/admin/user/new"
//                 className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//               >
//                 <FiPlus /> Create User
//               </Link> */}
//             </div>

//             {loading ? (
//               <Loader />
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         User ID
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Email
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Name
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Role
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {users?.map((user) => (
//                       <tr key={user._id}>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {user._id}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {user.email}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                           {user.name}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm">
//                           <span
//                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                               user.role === "admin"
//                                 ? "bg-green-100 text-green-800"
//                                 : "bg-red-100 text-red-800"
//                             }`}
//                           >
//                             {user.role}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                           <div className="flex space-x-4">
//                             <Link
//                               to={`/admin/user/${user._id}`}
//                               className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
//                             >
//                               <FiEdit2 /> Edit
//                             </Link>
//                             <button
//                               onClick={() => deleteUserHandler(user._id)}
//                               className="text-red-600 hover:text-red-900 flex items-center gap-1"
//                             >
//                               <FiTrash2 /> Delete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default UsersList;

//

import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiEdit2, FiTrash2 } from "react-icons/fi";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import {
  getAllUsers,
  deleteUser,
  clearErrors,
  resetDelete,
} from "../../reducers/store/slice/userSlice";
import Loader from "../layout/Loader/Loader";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading, error, isDeleted } = useSelector(
    (state) => state.user
  );

  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    dispatch(getAllUsers());

    if (error) {
      console.error("Error fetching users:", error); // Temporary for debugging
      dispatch(clearErrors());
    }
  }, [dispatch, error, isDeleted, navigate]);

  return (
    <Fragment>
      <MetaData title="All Users - Admin" />
      <div className="flex min-h-screen bg-gray-100">
        <SideBar />
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">All Users</h1>

            {loading ? (
              <Loader />
            ) : error ? (
              <div className="text-red-600 text-center">
                Error loading users. Please try again.
              </div>
            ) : !users || users.length === 0 ? (
              <div className="text-gray-600 text-center">No users found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === "admin"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-4">
                            <Link
                              to={`/admin/user/${user._id}`}
                              className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                            >
                              <FiEdit2 /> Edit
                            </Link>
                            <button
                              onClick={() => deleteUserHandler(user._id)}
                              className="text-red-600 hover:text-red-900 flex items-center gap-1"
                              disabled={loading}
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

export default UsersList;
