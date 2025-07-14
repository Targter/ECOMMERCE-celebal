import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiEdit2, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import {
  getAllUsers,
  deleteUser,
  clearErrors,
} from "../../reducers/store/slice/userSlice";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { users, loading, error, isDeleted } = useSelector(
    (state) => state.user
  );

  const deleteUserHandler = (id, name) => {
    if (
      window.confirm(`Are you sure you want to delete ${name || "this user"}?`)
    ) {
      dispatch(deleteUser(id))
        .unwrap()
        .then(() => {
          toast.success("User deleted successfully");
        })
        .catch((error) => {
          toast.error(error.message || "Failed to delete user");
        });
    }
  };

  useEffect(() => {
    dispatch(getAllUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("User deleted successfully");
      dispatch(getAllUsers()); // Refresh the user list
    }
  }, [dispatch, error, isDeleted]);

  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Fragment>
      <MetaData title="All Users - Admin" />
      <div className="flex min-h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                User Management
              </h1>

              <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Link
                  to="/admin/user/new"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  <FiPlus /> Add User
                </Link>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader />
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-600">
                  Error loading users. Please try again.
                </p>
                <button
                  onClick={() => dispatch(getAllUsers())}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  Retry
                </button>
              </div>
            ) : filteredUsers?.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600">
                  {searchTerm ? "No matching users found" : "No users found"}
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
                        User
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers?.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <FiUser className="text-gray-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user._id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === "admin"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <Link
                              to={`/admin/user/${user._id}`}
                              className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                              title="Edit"
                            >
                              <FiEdit2 size={16} />
                              <span className="hidden md:inline">Edit</span>
                            </Link>
                            <button
                              onClick={() =>
                                deleteUserHandler(user._id, user.name)
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
    </Fragment>
  );
};

export default UsersList;
