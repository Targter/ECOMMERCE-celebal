
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
